// server.js
const express = require('express');
const axios = require('axios');
const fs = require('fs'); //file system
const path = require('path'); //path

//import operations
const { readFileContent } = require('./operations/fileOperations'); //file operations
const { sendDiscordWebhookMessage } = require('./operations/webhookOperations');

const app = express();
// app.use(bodyParser.json());
const port = 4000;
app.use(express.json());

const baseFolderPath = '../'; //one step back
const folderPath = path.join(baseFolderPath, 'project', 'project_datas', 'buttons');
const indexPath = "style.css";

app.get('/components', (req, res) => {
  readFileContent(folderPath, indexPath, (err, content) => {
    if (err) {
      console.error(err);
      return res.status(500).send(`${err} Internal Server Error`);
    }
    res.send(content);
    // sendDiscordWebhookMessage('Discord webhooks working properly');
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});