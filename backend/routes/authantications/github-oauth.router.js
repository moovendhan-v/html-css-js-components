// authRouter.js
import express from 'express';

import axios from 'axios';

import {
  exchangeGitHubCodeForToken,
  getUserInfoFromGit,
  getUserInformationsFromGitApi,
  generateAccessToken,
  validateToken,
  signup_or_login_with_git,
} from '../../controller/authantications/github-oauth.controller.js';

const authRouter = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import {GitHubUser} from '../../models/user.model.js';

authRouter.get('/', (req, res) => {
  res.send('welcome to git')
})

authRouter.post('/getUserInfoFromGit', getUserInfoFromGit);

// #TODO upgrade this with proper session 
authRouter.get('/github-oauth', signup_or_login_with_git);

authRouter.post('/github', generateAccessToken )

authRouter.post('/github-validate', validateToken )


export { authRouter };
