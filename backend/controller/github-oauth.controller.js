// authRouter.js
const axios = require('axios');
const GitHubUser = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {sendStatus, sendJSONError, sendJSONSuccess} = require('../operations/errorhandlingOperations');
const {getUserInformationsByName} = require('../controller/userProfile.controller');
const { response } = require('express');

const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: '172.28.0.3',
    port: 6379 // Default Redis port, change if different
  }
});
redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect().then(() => {
  console.log('Connected to Redis');
  // You can perform Redis operations here
}).catch(err => {
  console.error('Failed to connect to Redis', err);
});

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const TOKEN_EXPIRE_TIMEOUT = process.env.TOKEN_EXPIRE_TIMEOUT;

async function exchangeGitHubCodeForToken(code) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  console.log(client_secret);
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
        return res.success({ message: `Welcome Back ${userInfo.name}`, response: userInfo })
      }

      const githubUser = new GitHubUser(userInfo);
      await githubUser.save();
      
      res.success({ message: `Hi ! ${userInfo.name}`, response: userInfo })
    } catch (error) {
      res.error({ response: userInfo, code: 11000, message: error.message })
    }
  } else {
    res.status(400).json({ error: 'Bad Request' });
  }
};

const signup_or_login_with_git = async (req,res)=>{

  // it will create a new account if account not already existis or creates a new account

  // const { code } = req.query;
  try {
    // #TODO Upadate a auth token where authanticated by user 
    // const githubAccessToken = await exchangeGitHubCodeForToken(code);

    const userInformations = await getUserInformationsFromGitApi("");

    //get user profile info with github oauth 
    const gitUserId = userInformations.id;
    const existingUser = await GitHubUser.findOne({ id: gitUserId });

      // #TODO test if not an existing user (Test the app behaviour) and update the code (high priyority)
      if (!existingUser) {
        const githubUser = new GitHubUser(userInformations);
        await githubUser.save();
        const refreshToken = generateRefreshToken({userId: existingUser._id, userName: existingUser.name});
        await redisClient.set(`refreshToken:${existingUser._id}`, refreshToken);
        // await redisClient.set(refreshToken, user.id.toString(), { EX: 7 * 24 * 60 * 60 });
        const response ={ 
          "token": generateAccessToken({userId: githubUser._id, userName: githubUser.name}),
          "user": githubUser,
          "components": []
        }
        res.cookie('refreshToken', refreshToken, { httpOnly: true});
        return res.success({message: `New Account created ${githubUser.name}`, response: response })
      }

    getUserInformationsByName(existingUser.name, async (error, userProfileWithComponents) => {
      if (error) {
          return res.status(500).send(`Internal Server Error ${error}`);
      } else {
        userProfileWithComponents['token'] = generateAccessToken({userId: existingUser._id, userName: existingUser.name});
        userProfileWithComponents['refreshToken'] = generateRefreshToken({userId: existingUser._id, userName: existingUser.name});
        res.cookie('refreshToken', userProfileWithComponents['refreshToken'], { httpOnly: true});
        await redisClient.set(`refreshToken:${existingUser._id}`, userProfileWithComponents['refreshToken']);
        return res.success({message: `Welcome Back ${existingUser.name}`,response: await userProfileWithComponents })
      }
  });
    // req.session.githubAccessToken = await githubAccessToken;

  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).json({ success: false, error: error });
  }
}

const generateAccessToken = (tokenProperties)=>{
   // Assume user is authenticated via GitHub and obtain user info
  //  const { userId, username } = req.body;

   // Create JWT token
   const token = jwt.sign({ tokenProperties }, JWT_SECRET, { expiresIn: '1m' });
 
   // Set HTTPOnly cookie with JWT token
  //  res.cookie('jwt', token, { httpOnly: true, secure: true });
 
   return token;
}

const generateRefreshToken = (tokenProperties) => {
  return jwt.sign({ tokenProperties }, REFRESH_TOKEN, { expiresIn: '2d' });
};

// const refreshToken = async (req, res, redisClient) => {
//   const { refreshToken } = req.cookies;
//   if (!refreshToken) {
//     return res.sendStatus(401);
//   }

//   try {
//     const userId = await redisClient.get(refreshToken);
//     if (!userId) {
//       return res.sendStatus(403);
//     }

//     const gitUserId = userInformations.id;
//     const existingUser = await GitHubUser.findOne({ id: gitUserId });

//     const user = users.find(u => u.id.toString() === userId);
//     if (!user) {
//       return res.sendStatus(403);
//     }

//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken();
//     // await redisClient.set(newRefreshToken, user.id.toString(), { EX: 7 * 24 * 60 * 60 });
//     // await redisClient.del(refreshToken);

//     res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
//     res.json({ accessToken: newAccessToken });
//   } catch (err) {
//     res.sendStatus(500).json({ message: 'Internal Server Error' });
//   }
// };

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


module.exports = { exchangeGitHubCodeForToken , getUserInformationsFromGitApi, getUserInfoFromGit, generateAccessToken,generateRefreshToken, validateToken, signup_or_login_with_git};

