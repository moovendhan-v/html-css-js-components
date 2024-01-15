const fs = require('fs');
const path = require('path'); //path
const filePath = path.join(__dirname, '../../project/config.env.json');

const configFile = fs.readFileSync(filePath, 'utf8');
const config = JSON.parse(configFile);

function getJsonConfigDetails(key) {
   return key;
}
getJsonConfigDetails(config.discord.alert);
module.exports = {
    getJsonConfigDetails,
}
        