const { sendDiscordWebhookMessage } = require('./webhookOperations');
// const { EmbedBuilder, MessageEmbed } = require('discord.js');

function jsonStatus({ errorStatus = false, statusCode = "", message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };
    return data;
}

function sendJSONSuccess({ errorStatus = false, statusCode = 200, message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };
    return data;
}

// const sendJSONSuccess = (res, statusCode = 200, message = '', error = false) => {
//     return res.status(statusCode).json({
//       error: false,
//       statusCode: statusCode,
//       message: message,
//       response: null,
//       count: 0
//     });
//   };

function sendJSONError({ errorStatus = true, statusCode = "", message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };

// #TODO https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor update discord messge style with this docs
    // Send the embed message via the provided function

    // sendDiscordWebhookMessage(message, "alert");

    return data
}

// const sendJSONError = (res, statusCode = 400, message = '', error = true) => {
//     return res.status(statusCode).json({
//       error: true,
//       statusCode: statusCode,
//       message: message,
//       response: null,
//       count: 0
//     });
//   };


module.exports = { jsonStatus, sendJSONSuccess, sendJSONError };
