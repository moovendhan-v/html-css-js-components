// authRouter.js
const express = require('express');
const axios = require('axios');
const { exchangeGitHubCodeForToken, getUserInfoFromGit, getUserInformationsFromGitApi, createTokens, validateToken, signup_or_login_with_git, handleAppwriteAuth } = require('../controller/github-oauth.controller');
const authRouter = express.Router();
require('dotenv').config();
const GitHubUser = require('../models/user.model');

authRouter.get('/', (req, res) => {
  res.send('welcome to git')
})

authRouter.post('/getUserInfoFromGit', getUserInfoFromGit);

// #TODO upgrade this with proper session 
authRouter.post('/github-oauth', signup_or_login_with_git);

authRouter.post('/github', createTokens )

authRouter.post('/github-validate', validateToken )

authRouter.get('/github-appwrite', handleAppwriteAuth )

module.exports = { authRouter };
