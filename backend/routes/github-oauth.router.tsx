import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import { exchangeGitHubCodeForToken, getUserInfoFromGit, getUserInformationsFromGitApi } from '../controller/github-oauth.controller';
import dotenv from 'dotenv';
import GitHubUser from '../models/user.model';
import { getUserInformationsByName } from '../controller/userProfile.controller';

dotenv.config();
const authRouter: Router = express.Router();

authRouter.get('/', (req: Request, res: Response) => {
  res.send('welcome to git');
});

authRouter.post('/getUserInfoFromGit', getUserInfoFromGit);

// #TODO upgrade this with proper session 
authRouter.post('/github-oauth', async (req: Request, res: Response) => {
  const { code }: { code: string } = req.body;
  try {
    // #TODO Upadate a auth token where authanticated by user 
    // const githubAccessToken = await exchangeGitHubCodeForToken(code);
    const githubAccessToken: string = "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";
    console.log(`Git access token ${githubAccessToken}`);

    const userInformations = await getUserInformationsFromGitApi(githubAccessToken);

    //get user profile info with github oauth 
    const gitUserId: number = userInformations.id;
    const existingUser = await GitHubUser.findOne({ id: gitUserId });

      // #TODO test if not an existing user (Test the app behaviour) and update the code (high priyority)
      if (!existingUser) {
        const githubUser = new GitHubUser(userInformations);
        await githubUser.save();
      }

    getUserInformationsByName(existingUser.name, async (error: Error, userProfileWithComponents: any) => {
      if (error) {
          return res.status(500).send(`Internal Server Error ${error}`);
      } else {
        res.json({ success: true, githubAccessToken: await req.session.githubAccessToken, token: githubAccessToken, response: await userProfileWithComponents});
      }
  });
    // req.session.githubAccessToken = await githubAccessToken;

  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).json({ success: false, error: error });
  }
});

export { authRouter };