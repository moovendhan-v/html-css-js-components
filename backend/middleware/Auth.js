import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {generateAccessToken, generateRefreshToken, isTokenInCache, removeTokenFromCache} from '../controller/authantications/jwt.controller.js';
import redisClient from '../config/redis.config.js';

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


const authanticateJwtToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized no tokens avaialbel" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.user.isAuthorized = true;
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
        const checkTokenInRedis = isTokenInCache(decodedRefreshToken.tokenProperties)
        console.log(`checkTokenInRedis ${await checkTokenInRedis}`)
        if (!(await checkTokenInRedis)) {
          return res.status(401).json({ message: "Unauthorized  no refresh tokeins in reids" });
        }
        // Verify the refresh token

        console.log(`decodedRefreshToken ${JSON.stringify(decodedRefreshToken.tokenProperties)}`);
        // Generate new access and refresh tokens
        const newAccessToken = generateAccessToken(decodedRefreshToken.tokenProperties);
        const newRefreshToken = generateRefreshToken(decodedRefreshToken.tokenProperties);

        // Store the new refresh token in Redis
        const userId = decodedRefreshToken.tokenProperties.userId; // Assuming you have a userId in the tokenProperties
        removeTokenFromCache(decodedRefreshToken.tokenProperties)
        await redisClient.set(`refreshToken:${userId}`, newRefreshToken);

        // Set the new tokens in the response
        res.cookie('authToken', newAccessToken, { httpOnly: false, sameSite: 'strict', path: '/' });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'strict', path: '/' });
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        // Pass the new access token to the next middleware
        req.user = jwt.verify(newAccessToken, JWT_SECRET);
        req.user.isAuthorized = true;
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

const authenticatePublicApi = async (req, res, next) => {

  const refreshToken = req.cookies.refreshToken;
  const authHeader = req.headers['authorization'];


  req.user = {};

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user.isAuthorized = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    req.user.isAuthorized = true;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      try {
        if (!refreshToken) {
          return res.status(401).json({ message: "Unauthorized: No refresh token provided" });
        }
 
        console.log("refreshToken", refreshToken);
        const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN);
        const isTokenInRedis = await isTokenInCache(decodedRefreshToken.tokenProperties);
        console.log(`checkTokenInRedis ${isTokenInRedis}`);

        if (!isTokenInRedis) {
          return res.status(401).json({ message: "Unauthorized: No valid refresh token in cache" });
        }

        const newAccessToken = generateAccessToken(decodedRefreshToken.tokenProperties);
        const newRefreshToken = generateRefreshToken(decodedRefreshToken.tokenProperties);

        const userId = decodedRefreshToken.tokenProperties.userId;
        await removeTokenFromCache(decodedRefreshToken.tokenProperties);
        await redisClient.set(`refreshToken:${userId}`, newRefreshToken);
        res.cookie('authToken', newAccessToken, { httpOnly: false, sameSite: 'strict', path: '/' });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'strict', path: '/' });
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);

        req.user = jwt.verify(newAccessToken, JWT_SECRET);
        req.user.isAuthorized = true;
        return next();
      } catch (refreshErr) {
        return res.status(401).json({ message: "Unauthorized: Invalid refresh token" });
      }
    } else {
      console.error('Error verifying access token:', err);
      req.user.isAuthorized = false;
      return next();
    }
  }
};


export { authanticateJwtToken, authenticatePublicApi };