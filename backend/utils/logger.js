// utils/logger.js
import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';
// import stackTrace from 'stack-trace';

const { combine, timestamp, printf, colorize } = format;

// Create log directory if it doesn't exist
const logDirectory = path.resolve(path.dirname(''), 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

// // Define log format with file and line number
// const logFormat = printf(({ level, message, timestamp }) => {
//     const trace = stackTrace.get();
//     const { fileName, lineNumber } = trace[10];
//     return `${timestamp} ${level}: ${message} (${fileName}:${lineNumber})`;
// });
 
// Create a logger instance
const logger = createLogger({
    level: 'info', // Set log level (error, warn, info, verbose, debug, silly)
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        // Log to console
        new transports.Console(),
        // Log to a file
        new transports.File({ filename: path.join(logDirectory, 'app.log') }),
    ],
});

// Optionally, you can log errors to a separate file
logger.add(
    new transports.File({ filename: path.join(logDirectory, 'errors.log'), level: 'error' })
);

export default logger;