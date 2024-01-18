const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


const getEnvFileInfo = (secret) => {
    console.log(process.env[secret]);
    return process.env[secret];
};

module.exports = {getEnvFileInfo}