// authRouter.js
const express = require('express');
const axios = require('axios');
const { exchangeGitHubCodeForToken, getUserInfoFromGit, getUserInformationsFromGitApi } = require('../controller/github-oauth.controller');
const authRouter = express.Router();
require('dotenv').config();
const GitHubUser = require('../models/user.model');
const {getUserInformationsByName} = require('../controller/userProfile.controller');

authRouter.get('/', (req, res) => {
  res.send('welcome to git')
})

authRouter.post('/getUserInfoFromGit', getUserInfoFromGit);

// #TODO upgrade this with proper session 
authRouter.post('/github-oauth', async (req, res) => {
  const { code } = req.body;
  try {
    // const githubAccessToken = await exchangeGitHubCodeForToken(code);
    console.log(`Git access token ${githubAccessToken}`);

    const userInformations = await getUserInformationsFromGitApi(githubAccessToken);

    //get user profile info with github oauth 
    const gitUserId = userInformations.id;
    const existingUser = await GitHubUser.findOne({ id: gitUserId });
    var gitCompleProfile ;
    // const getUserCompleteInfo = getUserInformationsByName(await `${existingUser.name}`);

    getUserInformationsByName(existingUser.name, (error, userProfileWithComponents) => {
      if (error) {
          return res.status(500).send(`Internal Server Error ${error}`);
      } else {
        gitCompleProfile = userProfileWithComponents;
      }
  });

    console.log(`GitUserId ${await gitUserId} existingUser ${await existingUser} `);

    if (!existingUser) {
      const githubUser = new GitHubUser(userInformations);
      await githubUser.save();
    }
 
    req.session.githubAccessToken = await githubAccessToken;

    res.json({ success: true, githubAccessToken: await req.session.githubAccessToken, token: githubAccessToken, profile: existingUser, profileInfo: await gitCompleProfile });
  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).json({ success: false, error: error });
  }
});

module.exports = { authRouter };
