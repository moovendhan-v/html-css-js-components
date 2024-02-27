// Database Connection
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected!');
    } catch (err) {
        console.error('Error in MongoDB Connection:', err);
        process.exit(1);
    }
}

module.exports = connectDB
