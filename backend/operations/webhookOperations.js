import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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
    content,
  };

  axios.post(discordUriToSend, payload)
    .then(({data}) => {
      console.log('Webhook message sent successfully:', data);
    })
    .catch(({message}) => {
      console.error('Error sending webhook message:', message);
    });
}

export  {
  sendDiscordWebhookMessage,
};
