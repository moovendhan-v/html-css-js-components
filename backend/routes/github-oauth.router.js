// authRouter.js
const express = require('express');
const axios = require('axios');
const { exchangeGitHubCodeForToken, getUserInformationsFromGitApi } = require('../controller/github-oauth.controller');
const authRouter = express.Router();
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');
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

authRouter.post('/getUserInfoFromGit', async (req, res) => {
  const data = req.body;
  if (data) {
    try {
      const authKey = data.authKey;
      const userInfo = await getUserInformationsFromGitApi(authKey);
      const existingUser = await GitHubUser.findOne({ id : userInfo.id });
      if (existingUser) {
        return res.json(jsonStatusSuccess({ message: `Welcome Back ${userInfo.name}`, response: userInfo }));
      }
      const githubUser = new GitHubUser(userInfo);
      await githubUser.save();
      res.json(jsonStatusSuccess({ message:`Hi ! ${userInfo.name}`, response: userInfo }));
    } catch (error) {
      res.json(jsonStatusError({ response: userInfo, errorStatus: true, statusCode: 11000, message: error.message }));
    }
  } else {
    res.status(400).json({ error: 'Bad Request' });
  }
});



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
