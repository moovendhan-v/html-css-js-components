// authRouter.js
const express = require('express');
const axios = require('axios');
const {exchangeGitHubCodeForToken} = require('../controller/github-oauth.controller');
const authRouter = express.Router();
require('dotenv').config();

authRouter.get('/', (req, res)=>{
  res.send('welcome to git')
})

authRouter.post('/github-oauth', async (req, res) => {
  const { code } = req.body;
  try {
    const githubAccessToken = await exchangeGitHubCodeForToken(code);
    console.log(await githubAccessToken);
    req.session.githubAccessToken = await githubAccessToken;
    res.json({ success: true, githubAccessToken: await req.session.githubAccessToken});
  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).json({ success: false, error: error });
  }
});

module.exports = {authRouter};
