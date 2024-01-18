// authRouter.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

async function exchangeGitHubCodeForToken(code) {
  console.log(code);
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    });
    const { access_token } = response.data;
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
  
      const avatarUrl = avatarResponse.data.avatar_url;
      return avatarUrl;
    } catch (error) {
      console.error('Error fetching GitHub user avatar:', error);
      throw error;
    }
  }

module.exports = {exchangeGitHubCodeForToken};
