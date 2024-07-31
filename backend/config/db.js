// Database Connection
import mongoose from 'mongoose';
import logger from '../utils/logger.js';

import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        logger.info("Connected to Mongo")
    } catch (err) {
        console.error('Error in MongoDB Connection:', err);
        process.exit(1);
    }
}

export {connectDB};
