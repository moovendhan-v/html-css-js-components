// authRouter.js
const express = require('express');
const axios = require('axios');
const { exchangeGitHubCodeForToken,getUserInfoFromGit } = require('../controller/github-oauth.controller');
const authRouter = express.Router();
require('dotenv').config();
const GitHubUser = require('../models/user.model');

authRouter.get('/', (req, res) => {
  res.send('welcome to git')
})

// authRouter.post('/createGitUser', (req, res) => {
//   const authToken = req.body;
//   try {
//     if (authToken.authKey) {
//       console.log(authToken);
//       if(createUserByGitOauth(authToken)){
//           res.send(jsonStatusSuccess({ errorStatus : false, message : 'New Account has been created'}));
//       }
//     }
//   } catch (error) {
//     res.send(error);
//   }
// })

authRouter.post('/getUserInfoFromGit', getUserInfoFromGit);


authRouter.post('/github-oauth', async (req, res) => {
  const { code } = req.body;
  try {
    const githubAccessToken = await exchangeGitHubCodeForToken(code);
    console.log(await githubAccessToken);
    req.session.githubAccessToken = await githubAccessToken;
    res.json({ success: true, githubAccessToken: await req.session.githubAccessToken, token: githubAccessToken });
  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).json({ success: false, error: error });
  }
});

module.exports = { authRouter };
