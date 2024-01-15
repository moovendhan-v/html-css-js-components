const axios = require('axios');

//operations
const { getJsonConfigDetails } = require('../operations/getConfigOperations'); 

// Function to send Discord webhook message
function sendDiscordWebhookMessage(content) {
  const webhookUrl = getJsonConfigDetails(config.discord.alert);
  console.log(`Webhook url ${webhookUrl}`);
  const payload = {
    content: content,
  };
  axios.post(webhookUrl, payload)
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
  