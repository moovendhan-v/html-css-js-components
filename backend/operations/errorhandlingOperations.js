const { sendDiscordWebhookMessage } = require('./webhookOperations');
// const { EmbedBuilder, MessageEmbed } = require('discord.js');

function jsonStatus({ errorStatus = false, statusCode = "", message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };
    return data;
}

function jsonStatusSuccess({ errorStatus = false, statusCode = 200, message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };
    return data;
}

function jsonStatusError({ errorStatus = true, statusCode = "", message = '', response = null, count = 0 }) {
    const data = { error: errorStatus, statusCode: statusCode, message: message, response: response, count: count };

// #TODO https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor update discord messge style with this docs
    // Send the embed message via the provided function

    sendDiscordWebhookMessage(message, "alert");

    return data;
}


module.exports = { jsonStatus, jsonStatusSuccess, jsonStatusError };
