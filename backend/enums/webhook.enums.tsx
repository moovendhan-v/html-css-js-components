import axios from 'axios';

interface DiscordWebhooks {
  alert: string;
}

const DiscordWebhooks: DiscordWebhooks = {
  alert: 'DISCORD_ALERT'
};

function sendDiscordWebhookMessage(content: string, uri: keyof DiscordWebhooks): void {
  const envVarName: string = DiscordWebhooks[uri];
  const discordUriToSend: string | undefined = process.env[envVarName];
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

export {
  sendDiscordWebhookMessage,
};