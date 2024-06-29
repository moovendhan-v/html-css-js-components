import express from 'express';
import axios from 'axios';
import fs from 'fs'; // File system
import cors from 'cors';
import {connectDB} from './config/db.js';
import path from 'path'; // Path
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();
import {customResponsesMiddleware} from './middleware/customResponse.js';
import AppError from './utils/AppError.js';
import logger from './utils/logger.js';
// import {authenticatePublicApi} from './middleware/Auth.js';
import redis from 'redis';
import cookieParser from 'cookie-parser';

// JWT for authentication
import jwt from 'jsonwebtoken';

// Get configuration file information
import {getJsonConfigDetails} from './operations/getConfigOperations.js';

const confFile = getJsonConfigDetails();

// Import file operations
import {readFileContent} from './operations/fileOperations.js';

// Initialize Express app
const app = express();
const port = 4000;

// Middleware setup
app.use(cookieParser());
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all HTTP methods
  allowedHeaders: '*', // Allow all headers
  credentials: true // Allow cookies to be sent
}));
app.options('*', cors());
app.use(express.json());
app.use(customResponsesMiddleware);
// app.use(authenticatePublicApi);

// Session management
app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Importing routers
import {homeRouter} from './routes/homepage.router.js';

import {componentsRouter} from './routes/components.router.js';
import {authRouter} from './routes/github-oauth.router.js';
import {CreateComponentsRouter} from './routes/addComponents.router.js';
import {userProfileRouter} from './routes/userProfile.router.js';
import {apiRouter} from './routes/api.router.js';
import {token} from './routes/jwt.router.js';

// Use routers
app.use('/', homeRouter);
app.use('/components', componentsRouter);
app.use('/auth', authRouter);
app.use('/', CreateComponentsRouter);
app.use('/profile', userProfileRouter);
app.use('/api', apiRouter);
app.use('/token', token)

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
