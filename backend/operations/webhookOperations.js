const axios = require('axios');
require('dotenv').config();

const DiscordWebhooks = {
  alert: 'DISCORD_ALERT' // Storing the environment variable name as a string
};

function sendDiscordWebhookMessage(content, uri) {
  const envVarName = DiscordWebhooks[uri]; // Get the environment variable name from the DiscordWebhooks object
  const discordUriToSend = process.env[envVarName]; // Access the environment variable using its name
  if (!discordUriToSend) {
    console.error('Webhook URL not found in environment variables');
    return;
  }

  const payload = {
    content: content,
  };

  axios.post(discordUriToSend, payload)
    .then(response => {
      console.log('Webhook message sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending webhook message:', error.message);
    });
}

module.exports = {
  sendDiscordWebhookMessage,
};
