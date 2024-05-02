// authRouter.js
const axios = require('axios');
const GitHubUser = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');
const {getUserInformationsByName} = require('../controller/userProfile.controller');
const { response } = require('express');
const { Client, Databases, Functions, Account, Users, Storage, InputFile, Query, Permission, Role, ID } = require('node-appwrite');
const sdk = require('node-appwrite');


// // Config
// const client = new Client()
//     .setEndpoint('YOUR_ENDPOINT')   // Replace with your endpoint
//     .setProject('6631da7e003003f677f6')  // Replace with your project ID
//     .setKey('YOUR_API_KEY');        // Replace with your API Key
//    //.setJWT('jwt');        

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;
const TOKEN_EXPIRE_TIMEOUT = process.env.TOKEN_EXPIRE_TIMEOUT;
 
const appwrite = new sdk.Client()
                .setEndpoint('http://localhost/v1')
                .setProject('6631da7e003003f677f6') 
                .setKey('145eefe3ff1d960084e6c5c08fac644c30b9715066d27a6da3d492f4764499bc109c33ad47841c88898b3bee3a92fc31181e9cd8dff42544dc58aabd1b4549714565206675834d683a1cf789406771990e27edf49692601a5671aded5e2ec6642d8a7a2f1be9f07cdc25963fc2e90b980f3ce1cb7fcb4648368e967893fbfd77')
                .setSelfSigned(true);

const users = new sdk.Users(appwrite);

async function exchangeGitHubCodeForToken(code) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  const params = `?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token' + params,
      null,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const { access_token } = response.data;
    if (!access_token) {
      console.error('GitHub OAuth code exchange failed. Response:', response.data);
      throw new Error('Bad Verifications Code Exchange');
    }
    return access_token;
  } catch (error) {
    throw error;
  }
}

async function getUserInformationsFromGitApi(githubAccessToken) {
  try {
    const userData = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });
    const userDataInfo = userData.data;
    return userDataInfo;
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    throw error;
  }
}
 
const getUserInfoFromGit = async (req, res) => {
  const data = req.body;

  if (data) {
    try {
      const authKey = data.authKey;
      const userInfo = await getUserInformationsFromGitApi(authKey);
      const existingUser = await GitHubUser.findOne({ id: userInfo.id });

      if (existingUser) {
        return res.json(jsonStatusSuccess({ message: `Welcome Back ${userInfo.name}`, response: userInfo }));
      }

      const githubUser = new GitHubUser(userInfo);
      await githubUser.save();
      
      res.json(jsonStatusSuccess({ message: `Hi ! ${userInfo.name}`, response: userInfo }));
    } catch (error) {
      res.json(jsonStatusError({ response: userInfo, errorStatus: true, statusCode: 11000, message: error.message }));
    }
  } else {
    res.status(400).json({ error: 'Bad Request' });
  }
};

const signup_or_login_with_git = async (req,res)=>{

  // it will create a new account if account not already existis or creates a new account

  const { code } = req.body;
  try {
    // #TODO Upadate a auth token where authanticated by user 
    const githubAccessToken = await exchangeGitHubCodeForToken(code);

    const userInformations = await getUserInformationsFromGitApi(githubAccessToken);

    //get user profile info with github oauth 
    const gitUserId = userInformations.id;
    const existingUser = await GitHubUser.findOne({ id: gitUserId });

      // #TODO test if not an existing user (Test the app behaviour) and update the code (high priyority)
      if (!existingUser) {
        const githubUser = new GitHubUser(userInformations);
        await githubUser.save();
        const response ={ 
          "token": createTokens({userId: githubUser.id, userName: githubUser.name}),
          "user": githubUser,
          "components": []
        }
        return res.json(jsonStatusSuccess({ message: `New Account created ${githubUser.name}`, response: response }));
      }

    getUserInformationsByName(existingUser.name, async (error, userProfileWithComponents) => {
      if (error) {
          return res.status(500).send(`Internal Server Error ${error}`);
      } else {
        userProfileWithComponents['token'] = createTokens({userId: existingUser.id, userName: existingUser.name});
        return res.json(jsonStatusSuccess({ message: `Welcome Back ${existingUser.name}`, response: await userProfileWithComponents }));

        // res.json({ success: true, githubAccessToken: await req.session.githubAccessToken, token: githubAccessToken, response: await userProfileWithComponents});
      }
  });
    // req.session.githubAccessToken = await githubAccessToken;

  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).json({ success: false, error: error });
  }
}

const createTokens = (tokenProperties)=>{
   // Assume user is authenticated via GitHub and obtain user info
  //  const { userId, username } = req.body;

   // Create JWT token
   const token = jwt.sign({ tokenProperties }, JWT_SECRET, { expiresIn: '1h' });
 
   // Set HTTPOnly cookie with JWT token
  //  res.cookie('jwt', token, { httpOnly: true, secure: true });
 
   return token;
}

const validateToken = (req,res)=>{
    // Retrieve JWT token from cookie
  // const token = req.cookies.jwt;
  const { token } = req.body;

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);

      // Access protected resource
      res.status(200).json({ message: 'Token validated', user: decoded });
  } catch (err) {
      // Token verification failed
      res.status(401).json({ message: 'Unauthorized' });
  }
}

const handleGitHubCallback = async (code) => {
  try {

      const accessToken = await exchangeGitHubCodeForToken(code)
      const githubUser = await getUserInformationsFromGitApi(accessToken)
      console.log(`accesstoken ${accessToken} githubUser ${githubUser}`)

      // Update user profile in Appwrite with additional attributes
      // const users = await appwrite.users.list();
      // console.log(`users ${users}`)
      // await appwrite.users.update(
      //     appwrite.auth.user.$id, // ID of the currently authenticated user
      //     {
      //         name: githubUser.data.name,
      //         // Add other attributes as needed
      //     }
      // );

      console.log('User profile updated successfully:', githubUser.data);
  } catch (error) {
      console.error('Error handling GitHub callback:', error);
  }
};

// Function to initiate GitHub OAuth flow via Appwrite
const initiateGitHubOAuth = async () => {
  try {
      const authUrl = await appwrite.account.createOAuth2Session('github', 'http://localhost:5173/');
      console.log('Redirect user to:', authUrl);
  } catch (error) {
      console.error('Error initiating GitHub OAuth flow:', error);
  }
};

const handleAppwriteAuth = (req,res)=>{
  const code = req.query.code;
  handleGitHubCallback(code, res);
}

const test = async () => {
  try {
    console.log(users)
    const result = await users.list(
    );
    console.log('List of users:', result);
  } catch (error) {
      console.error('Error listing users:', error);
  }

};

test();

module.exports = { exchangeGitHubCodeForToken , getUserInformationsFromGitApi, getUserInfoFromGit, createTokens, validateToken, signup_or_login_with_git, handleAppwriteAuth};

