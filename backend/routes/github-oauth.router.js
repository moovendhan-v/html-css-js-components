// authRouter.js
const express = require('express');
const axios = require('axios');
const { exchangeGitHubCodeForToken, getUserInfoFromGit, getUserInformationsFromGitApi } = require('../controller/github-oauth.controller');
const authRouter = express.Router();
require('dotenv').config();
const GitHubUser = require('../models/user.model');

authRouter.get('/', (req, res) => {
  res.send('welcome to git')
})

authRouter.post('/getUserInfoFromGit', getUserInfoFromGit);

authRouter.post('/github-oauth', async (req, res) => {
  const { code } = req.body;
  try {
    const githubAccessToken = await exchangeGitHubCodeForToken(code);
    console.log(await githubAccessToken);

    const userInformations = await getUserInformationsFromGitApi(githubAccessToken);
    const gitUserId = userInformations.id;
    const existingUser = await GitHubUser.findOne({ id: gitUserId });

    if (!existingUser) {
      const githubUser = new GitHubUser(userInformations);
      await githubUser.save();
    }
 
    req.session.githubAccessToken = await githubAccessToken;
    res.json({ success: true, githubAccessToken: await req.session.githubAccessToken, token: githubAccessToken, profile: existingUser });
  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).json({ success: false, error: error });
  }
});

module.exports = { authRouter };
