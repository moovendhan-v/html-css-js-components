// authRouter.js
import axios, { HttpStatusCode } from 'axios';
import AppError from '../../utils/AppError.js';

import { GitHubUser } from '../../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();
import { getUserInformationsByName } from '../user_management/userProfile.controller.js';
import { generateAccessToken, generateRefreshToken, validateToken, setRefreshTokensInRedis, removeTokenFromCache } from './jwt.controller.js';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const UI_BASE_URI = process.env.UI_BASE_URI;
const TOKEN_EXPIRE_TIMEOUT = process.env.TOKEN_EXPIRE_TIMEOUT;

async function exchangeGitHubCodeForToken(code) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  console.log(client_secret);
  const params = `?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  try {
    const response = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      null,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const { access_token } = response.data;
    if (!access_token) {
      console.error('GitHub OAuth code exchange failed. Response:', response.data);
      throw new Error('Bad Verifications Code Exchange');
    }
    return access_token;
  } catch (error) {
    throw error;
  }
}

async function getUserInformationsFromGitApi(githubAccessToken) {
  try {
    const userData = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });
    const userDataInfo = userData.data;
    return userDataInfo;
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    throw error;
  }
}

const getUserInfoFromGit = async ({ body }, res) => {
  const data = body;

  if (data) {
    try {
      const authKey = data.authKey;
      const userInfo = await getUserInformationsFromGitApi(authKey);
      const existingUser = await GitHubUser.findOne({ id: userInfo.id });

      if (existingUser) {
        return res.success({ message: `Welcome Back ${userInfo.name}`, response: userInfo })
      }

      const githubUser = new GitHubUser(userInfo);
      await githubUser.save();

      res.success({ message: `Hi ! ${userInfo.name}`, response: userInfo })
    } catch (error) {
      res.error({ response: userInfo, code: 11000, message: error.message })
    }
  } else {
    res.status(400).json({ error: 'Bad Request' });
  }
};

const signup_or_login_with_git = async ({ query }, res) => {
  // it will create a new account if account not already existis or creates a new account
  const { code } = query;
  try {
    // #TODO Upadate a auth token where authanticated by user 
    const githubAccessToken = await exchangeGitHubCodeForToken(code);

    const userInformations = await getUserInformationsFromGitApi(githubAccessToken);

    //get user profile info with github oauth 
    const gitUserId = userInformations.id;
    const existingUser = await GitHubUser.findOne({ id: gitUserId });
    const UUID = uuidv4();

    // #TODO test if not an existing user (Test the app behaviour) and update the code (high priyority)
    if (!existingUser) {
      const githubUser = new GitHubUser(userInformations);
      await githubUser.save();
      const authToken = generateAccessToken({ userId: githubUser._id, userName: githubUser.name })
      const refreshToken = generateRefreshToken({ userId: existingUser._id, userName: existingUser.name, sessionId: UUID });
      await setRefreshTokensInRedis(existingUser._id, existingUser.name, UUID, refreshToken, { userId: existingUser._id, userName: existingUser.name, sessionId: UUID });

      res.cookie('authToken', authToken, { httpOnly: false, sameSite: 'strict', path: '/' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', path: '/' });

      return res.redirect(`${UI_BASE_URI}/Login`);
      // return res.success({message: `New Account created ${githubUser.name}`, response: response })
    }

    getUserInformationsByName(existingUser.name, async (error, userProfileWithComponents) => {
      if (error) {
        return res.status(500).send(`Internal Server Error ${error}`);
      } else {
        userProfileWithComponents['token'] = generateAccessToken({ userId: existingUser._id, userName: existingUser.name });
        userProfileWithComponents['refreshToken'] = generateRefreshToken({ userId: existingUser._id, userName: existingUser.name, sessionId: UUID });

        res.cookie('authToken', userProfileWithComponents['token'], { httpOnly: false, sameSite: 'strict', path: '/' });
        res.cookie('refreshToken', userProfileWithComponents['refreshToken'], { httpOnly: true, sameSite: 'strict', path: '/' });

        await setRefreshTokensInRedis(existingUser._id, UUID, userProfileWithComponents['refreshToken'], { userId: existingUser._id, userName: existingUser.name, sessionId: UUID });

        return res.redirect(`${UI_BASE_URI}/Login`);
      }
    });

  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).json({ success: false, error: `Unknown error happens` });
  }
}

const logout = async (req, res, next) => {
  let code = 500;
  const errDetails = {
    operation: 'logout',
    functionName: logout.name,
    apiPath: req.originalUrl,
  };
  try {
    const cookies = req.cookies;
    const { refreshToken, authToken } = cookies;

    if (!refreshToken) {
      errDetails.info = 'No refresh tokens founded';
      throw new AppError('No refresh token found', code = 403, errDetails);
    }

    const decodedJwtSecret = jwt.verify(authToken, JWT_SECRET);
    const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN);

    if (decodedJwtSecret.sessionId !== decodedRefreshToken.sessionId) {
      errDetails.info = 'Session Id not match for logout';
      throw new AppError('Unable to logout something went wrong', code, details);
    }

    const isTokenInRedisCache = await isTokenInCache(decodedRefreshToken?.tokenProperties);

    if (!isTokenInRedisCache) {
      console.error('Refresh token not found in Redis cache');
      errDetails.other = decodedRefreshToken?.tokenProperties;
      errDetails.info = 'No refresh tokens found in redis cache';
      throw new AppError('In valid refresh tokens', code = 403, details);
    }

    await removeTokenFromCache(decoded.tokenProperties);

    res.success('Successfull logout');

  } catch (error) {
    next(error);
  }
}


export { exchangeGitHubCodeForToken, getUserInformationsFromGitApi, getUserInfoFromGit, generateAccessToken, generateRefreshToken, validateToken, signup_or_login_with_git, logout };

