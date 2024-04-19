import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

const getEnvFileInfo = (secret: string): string | undefined => {
    return process.env[secret];
};

export default { getEnvFileInfo };