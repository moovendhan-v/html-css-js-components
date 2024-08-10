import jwt from 'jsonwebtoken';
import redisClient from '../../config/redis.config.js';
import { GitHubUser } from '../../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const UI_BASE_URI = process.env.UI_BASE_URI;

// Function to get a new access token
const getNewAccessToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken;
    console.log('refreshToken', refreshToken)
    if (!refreshToken) {
      console.error('No refresh token found in cookies');
      return res.status(403).json({ message: 'Forbidden' });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN);

    const isTokenInRedisCache = await isTokenInCache(decoded.tokenProperties);
    console.log('Is token in Redis cache:', isTokenInRedisCache);

    if (!isTokenInRedisCache) {
      console.error('Refresh token not found in Redis cache');
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const existingUser = await GitHubUser.findOne(
      { _id: decoded.tokenProperties.userId },
      { _id: 1, name: 1 }
    );

    if (!existingUser) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    await removeTokenFromCache(decoded.tokenProperties);

    const newSessionId = uuidv4();
    const newAccessToken = generateAccessToken({ userId: existingUser._id, userName: existingUser.name, sessionId: newSessionId  });
    const newRefreshToken = generateRefreshToken({ userId: existingUser._id, userName: existingUser.name, sessionId: newSessionId });

    res.cookie('authToken', newAccessToken, { httpOnly: false, sameSite: 'strict', path: '/' });
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'strict', path: '/' });

    await setRefreshTokensInRedis(existingUser._id, newSessionId, newRefreshToken, { userId: existingUser._id, userName: existingUser.name, sessionId: newSessionId });

    return res.json({ message: "New Auth token generated successfully", response: { authToken: newAccessToken, refreshToken: newRefreshToken } });

  } catch (error) {
    console.error('Error generating new access token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const generateAccessToken = (tokenProperties) => {
  const tokenExpireTimeout = process.env.TOKEN_EXPIRE_TIMEOUT || '3600'; // Default to 1 hour
  const expiresIn = `${tokenExpireTimeout}s`;
  const token = jwt.sign({ tokenProperties }, JWT_SECRET, { expiresIn });
  return token;
}

const generateRefreshToken = (tokenProperties) => {
  const refreshTokenExpireTimeout = process.env.REFRESH_TOKEN_EXPIRE_TIMEOUT || '604800';
  const expiresIn = `${refreshTokenExpireTimeout}s`;
  return jwt.sign({ tokenProperties }, REFRESH_TOKEN, { expiresIn });
};

const validateToken = ({ body }, res) => {
  // Retrieve JWT token from cookie
  // const token = req.cookies.jwt;
  const { token } = body;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    // Access protected resource
    res.status(200).json({ message: 'Token validated', user: decoded });
  } catch (err) {
    // Token verification failed
    res.status(401).json({ message: 'Unauthorized' });
  }
}

const isTokenInCache = async (tokenProperties) => {
  try {
    const { userId, sessionId } = tokenProperties;
    const cachedToken = await redisClient.get(`refreshToken:${userId}:${sessionId}`);
    return !!cachedToken; // Returns true if a token is found, false otherwise
  } catch (err) {
    console.error('Error checking token in cache:', err);
    return false;
  }
};

// Function to remove token from cache
const removeTokenFromCache = async (tokenProperties) => {
  try {
    const { userId, sessionId } = tokenProperties;
    const deleteResult = await redisClient.del(`refreshToken:${userId}:${sessionId}`);
    if (deleteResult === 1) {
      console.log('Token removed successfully from cache');
    } else {
      console.log('Token not found in cache');
    }
    return deleteResult === 1; // Returns true if a token was deleted, false otherwise
  } catch (err) {
    console.error('Error removing token from cache:', err);
    return false;
  }
};


const setRefreshTokensInRedis = async (userId, uuid, refreshToken, tokenProperties) => {
  const tokenKey = `refreshToken:${userId}:${uuid}`;
  const tokenValue = JSON.stringify({ ...tokenProperties, refreshToken });
  
  // Get expiration time from environment variables
  const refreshTokenExpireTimeout = process.env.REFRESH_TOKEN_EXPIRE_TIMEOUT || 60 * 60 * 24 * 7; // Default to 7 days if not set
  
  await redisClient.set(tokenKey, tokenValue, 'EX', refreshTokenExpireTimeout); // Set expiration based on env variable
};


export { getNewAccessToken, generateAccessToken, generateRefreshToken, validateToken, isTokenInCache, removeTokenFromCache, setRefreshTokensInRedis };
