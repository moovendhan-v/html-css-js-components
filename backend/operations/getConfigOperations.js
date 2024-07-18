import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getJsonConfigDetails() {
    const filePath = path.join(__dirname, '../../project/config.env.json');
    const configFile = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(configFile);
    return config;
}

export {
    getJsonConfigDetails,
};
