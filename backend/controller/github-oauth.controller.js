// authRouter.js
const express = require('express');
const axios = require('axios');
const GitHubUser = require('../models/user.model');
require('dotenv').config();

async function exchangeGitHubCodeForToken(code) {
  console.log(code);
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
    console.log(`--access-token ${access_token}`);
    if (!access_token) {
      console.error('GitHub OAuth code exchange failed. Response:', response.data);
      throw new Error('Access token not received from GitHub.');
    }
    console.log('Access Token:', response);
    return access_token;
  } catch (error) {
    console.error('GitHub OAuth code exchange error:', error);
    throw error;
  }
}

async function getUserAvatar(githubAccessToken) {
  try {
    const avatarResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });
    const avatarUrl = avatarResponse.data;
    console.log(avatarUrl);
    return avatarUrl;
  } catch (error) {
    console.error('Error fetching GitHub user avatar:', error);
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
    const userDataInfo = userData;
    console.log(userDataInfo);
    // createUserByGitOauth();
    return userDataInfo;
  } catch (error) {
    console.error('Error fetching GitHub user avatar:', error);
    throw error;
  }
}

async function createUserByGitOauth(userData) {
  try {
    const githubUser = new GitHubUser(userData);
    await githubUser.save();
    console.log('GitHub user information saved successfully');
  } catch (error) {
    console.error('Error saving GitHub user information:', error);
  }
}

getUserAvatar("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");

module.exports = { exchangeGitHubCodeForToken , createUserByGitOauth};
