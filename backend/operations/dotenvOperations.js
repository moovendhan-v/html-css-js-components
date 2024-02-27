const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


const getEnvFileInfo = (secret) => {
    return process.env[secret];
};

module.exports = {getEnvFileInfo}