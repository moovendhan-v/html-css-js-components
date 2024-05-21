// server.js
const express = require('express');
const axios = require('axios');
const fs = require('fs'); //file system
const cors = require('cors');
const connectDB = require('./config/db')
// const bodyParser = require('body-parser');
const path = require('path'); //path
const session = require('express-session');
require('dotenv').config();
const {customResponsesMiddleware} = require('./middleware/customResponse')
const redis = require('redis');
const cookieParser = require('cookie-parser');

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


// json webtokens 
const jwt = require('jsonwebtoken')
  
//getting configeration file informations
const { getJsonConfigDetails } = require('./operations/getConfigOperations'); 
const confFile = getJsonConfigDetails();
// const discordUriToSend = confFile.discord.alert;

//import operations
const { readFileContent } = require('./operations/fileOperations'); //file operations

// discord webhooks operaitons 
// const { sendDiscordWebhookMessage } = require('./operations/webhookOperations');
// sendDiscordWebhookMessage("test","alert");

//importing express js
const app = express();
const port = 4000;
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all HTTP methods
  allowedHeaders: '*', // Allow all headers
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

// app.use(bodyParser.json());

//importing router files
const {homeRouter} = require('./routes/homepage.router')
const {componentsRouter} = require('./routes/components.router')
const {authRouter} = require('./routes/github-oauth.router')
const {CreateComponentsRouter} = require('./routes/addComponents.router')
const {userProfileRouter} = require('./routes/userProfile.router')
const {apiRouter} = require('./routes/api.router')

app.use(customResponsesMiddleware);

const baseFolderPath = '../'; //one step back
const folderPath = path.join(baseFolderPath, 'project', 'project_datas', 'buttons');
const indexPath = "style.css";

app.use('/', homeRouter);

app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/components', componentsRouter);
app.use('/auth', authRouter);
app.use('/', CreateComponentsRouter);
app.use('/profile', userProfileRouter);
app.use('/api', apiRouter);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
