// authRouter.js
const axios = require('axios');
const GitHubUser = require('../models/user.model');
require('dotenv').config();
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');
const {getUserInformationsByName} = require('../controller/userProfile.controller');
const { response } = require('express');

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;
const TOKEN_EXPIRE_TIMEOUT = process.env.TOKEN_EXPIRE_TIMEOUT;

async function exchangeGitHubCodeForToken(code) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  const params = `?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token' + params,
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

const getUserInfoFromGit = async (req, res) => {
  const data = req.body;

  if (data) {
    try {
      const authKey = data.authKey;
      const userInfo = await getUserInformationsFromGitApi(authKey);
      const existingUser = await GitHubUser.findOne({ id: userInfo.id });

      if (existingUser) {
        return res.json(jsonStatusSuccess({ message: `Welcome Back ${userInfo.name}`, response: userInfo }));
      }

      const githubUser = new GitHubUser(userInfo);
      await githubUser.save();
      
      res.json(jsonStatusSuccess({ message: `Hi ! ${userInfo.name}`, response: userInfo }));
    } catch (error) {
      res.json(jsonStatusError({ response: userInfo, errorStatus: true, statusCode: 11000, message: error.message }));
    }
  } else {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = { exchangeGitHubCodeForToken , getUserInformationsFromGitApi, getUserInfoFromGit};

