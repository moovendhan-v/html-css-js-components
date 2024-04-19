import fs from 'fs';
import path from 'path';

interface Config {
  [key: string]: any;
}

function getJsonConfigDetails(): Config {
  const filePath: string = path.join(__dirname, '../../project/config.env.json');
  const configFile: string = fs.readFileSync(filePath, 'utf8');
  const config: Config = JSON.parse(configFile);
  return config;
}

export {
  getJsonConfigDetails,
};