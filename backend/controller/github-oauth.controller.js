// authRouter.js
const axios = require('axios');
const GitHubUser = require('../models/user.model');
require('dotenv').config();
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');


async function exchangeGitHubCodeForToken(code) {
  console.log(code);
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
    console.log(`--access-token ${access_token}`);
    if (!access_token) {
      console.error('GitHub OAuth code exchange failed. Response:', response.data);
      throw new Error('Access token not received from GitHub.');
    }
    console.log('Access Token:', response);
    return access_token;
  } catch (error) {
    console.error('GitHub OAuth code exchange error:', error);
    throw error;
  }
}

// async function getUserAvatar(githubAccessToken) {
//   try {
//     const avatarResponse = await axios.get('https://api.github.com/user', {
//       headers: {
//         Authorization: `Bearer ${githubAccessToken}`,
//       },
//     });
//     const avatarUrl = avatarResponse.data;
//     console.log(avatarUrl);
//     return avatarUrl;
//   } catch (error) {
//     console.error('Error fetching GitHub user avatar:', error);
//     throw error;
//   }
// }

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

// async function createUserByGitOauth(githubAccessToken) {
//   try {
//     const userInfo = await getUserInformationsFromGitApi(githubAccessToken);
//     return true;
//   } catch (error) {
//     if (error.code === 11000 || error.code === 11001) {
//       console.error(error.message);
//     } else {
//       console.error('Error in createUserByGitOauth:', error.message);
//     }
//   }
// }


// getUserInformationsFromGitApi("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");
module.exports = { exchangeGitHubCodeForToken , getUserInformationsFromGitApi, getUserInfoFromGit};

