// authRouter.js
const express = require('express');
const axios = require('axios');
const { exchangeGitHubCodeForToken, getUserInfoFromGit, getUserInformationsFromGitApi, generateAccessToken, validateToken, signup_or_login_with_git } = require('../controller/github-oauth.controller');
const authRouter = express.Router();
require('dotenv').config();
const GitHubUser = require('../models/user.model');

authRouter.get('/', (req, res) => {
  res.send('welcome to git')
})

authRouter.post('/getUserInfoFromGit', getUserInfoFromGit);

// #TODO upgrade this with proper session 
authRouter.get('/github-oauth', signup_or_login_with_git);

authRouter.post('/github', generateAccessToken )

authRouter.post('/github-validate', validateToken )


module.exports = { authRouter };
