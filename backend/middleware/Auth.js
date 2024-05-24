const jwt = require('jsonwebtoken');
const {sendStatus, sendJSONError, sendJSONSuccess} = require('../operations/errorhandlingOperations');
require('dotenv').config();
const {generateAccessToken, generateRefreshToken} = require('../controller/github-oauth.controller')

const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: '172.28.0.3',
    port: 6379 // Default Redis port, change if different
  }
});
redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect().then(() => {
  console.log('Connected to Redis');
  // You can perform Redis operations here
}).catch(err => {
  console.error('Failed to connect to Redis', err);
});

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


const isTokenInCache = async (token) => {
  try {
    const cachedToken = await redisClient.get(`refreshToken:${token}`);
    return !!cachedToken; // Returns true if a token is found, false otherwise
  } catch (err) {
    console.error('Error checking token in cache:', err);
    return false;
  }
};

const removeTokenFromCache = async (userId) => {
  try {
    await redisClient.del(`refreshToken:${userId}`);
  } catch (err) {
    console.error('Error removing token from cache:', err);
  }
};

const authanticateJwtToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized no tokens avaialbel" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("token executed")
    next();
  } catch (err) {
    console.log(err);
    // Token verification failed, check if it's due to expiration
    if (err.name === 'TokenExpiredError') {
      console.log('refreshtoken executed')
      // Get the refresh token from the cookies
      const refreshToken = req.cookies.refreshToken;
      console.log(req.cookies.refreshToken);
      if (!refreshToken) {
        // No refresh token found
        return res.status(401).json({ message: "Unauthorized no refresh tokens" });
      }
      try {
        const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN);
        const checkTokenInRedis = isTokenInCache(decodedRefreshToken.tokenProperties.userId)
        console.log(`checkTokenInRedis ${await checkTokenInRedis}`)
        if(!await checkTokenInRedis){
          return res.status(401).json({ message: "Unauthorized  no refresh tokeins in reids" });
        }
        // Verify the refresh token

        console.log(`decodedRefreshToken ${JSON.stringify(decodedRefreshToken.tokenProperties)}`);
        // Generate new access and refresh tokens
        const newAccessToken = generateAccessToken(decodedRefreshToken.tokenProperties);
        const newRefreshToken = generateRefreshToken(decodedRefreshToken.tokenProperties);

        // Store the new refresh token in Redis
        const userId = decodedRefreshToken.tokenProperties.userId; // Assuming you have a userId in the tokenProperties
        removeTokenFromCache(refreshToken)
        await redisClient.set(`refreshToken:${userId}`, newRefreshToken);
    
        // Set the new tokens in the response
        res.cookie('authToken', newAccessToken, { httpOnly: false, sameSite: 'strict', path: '/' });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'strict', path: '/' });
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        // Pass the new access token to the next middleware
        req.user = jwt.verify(newAccessToken, JWT_SECRET);
        next();
      } catch (err) {
        // Refresh token verification failed
        return res.status(401).json({ message: `Unauthorized ${err}` });
      }
    } else {
      // Other token verification errors
      return res.status(401).json({ message: "Unauthorizeds" });
    }
  }
};



module.exports = {authanticateJwtToken}