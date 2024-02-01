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

//getting configeration file informations
const { getJsonConfigDetails } = require('./operations/getConfigOperations'); 
const confFile = getJsonConfigDetails();
// const discordUriToSend = confFile.discord.alert;

//import operations
const { readFileContent } = require('./operations/fileOperations'); //file operations
const { sendDiscordWebhookMessage } = require('./operations/webhookOperations');

//importing express js
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

//importing router files
const {homeRouter} = require('./routes/homepage.router')
const {componentsRouter} = require('./routes/components.router')
const {authRouter} = require('./routes/github-oauth.router')
const {CreateComponentsRouter} = require('./routes/addComponents.router')

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
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});