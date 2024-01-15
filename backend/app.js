// server.js
const express = require('express');
const axios = require('axios');
const fs = require('fs'); //file system
const path = require('path'); //path

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
app.use(express.json());

//importing router files
const {homeRouter} = require('./routes/homepage.router')
const {componentsRouter} = require('./routes/components.router')

const baseFolderPath = '../'; //one step back
const folderPath = path.join(baseFolderPath, 'project', 'project_datas', 'buttons');
const indexPath = "style.css";

app.use('/', homeRouter);
app.use('/components', componentsRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});