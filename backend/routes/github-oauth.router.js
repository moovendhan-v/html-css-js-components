// authRouter.js
const express = require('express');
const axios = require('axios');
const {exchangeGitHubCodeForToken} = require('../controller/github-oauth.controller');
const {getEnvFileInfo} = require('../operations/dotenvOperations')
const authRouter = express.Router();
require('dotenv').config();

authRouter.get('/', (req, res)=>{
  res.send('welcome to git')
})

authRouter.post('/github-oauth', async (req, res) => {
  const { code } = req.body;
  res.send(code);
  // try {
  //   const githubAccessToken = await exchangeGitHubCodeForToken(code);
  //   req.session.githubAccessToken = githubAccessToken;
  //   res.json({ success: true, githubAccessToken: req.session.githubAccessToken });
  // } catch (error) {
  //   console.error('Error during GitHub OAuth:', error);
  //   res.status(500).json({ success: false, error: error });
  // }
});

module.exports = {authRouter};
