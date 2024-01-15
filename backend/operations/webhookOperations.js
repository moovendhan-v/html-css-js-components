const axios = require('axios');

//operations
const { getJsonConfigDetails } = require('../operations/getConfigOperations'); 

// Function to send Discord webhook message
function sendDiscordWebhookMessage(content) {
  const webhookUrl = getJsonConfigDetails();
  const discordUriToSend = webhookUrl.discord.alert;
  console.log(discordUriToSend);
  // return;
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
sendDiscordWebhookMessage("testing message");
module.exports = {
    sendDiscordWebhookMessage,
  };
  