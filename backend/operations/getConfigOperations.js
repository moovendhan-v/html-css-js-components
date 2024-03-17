const fs = require('fs');
const path = require('path'); //path

function getJsonConfigDetails() {
    const filePath = path.join(__dirname, '../../project/config.env.json');
    const configFile = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(configFile);
    return config;
}
module.exports = {
    getJsonConfigDetails,
}

