import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();
import { customResponsesMiddleware } from './middleware/customResponse.js';
import logger from './utils/logger.js';
import cookieParser from 'cookie-parser';

// Initialize Express app
const app = express();
const port = 4000;

// Middleware setup
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  credentials: true
}));

app.use(express.json());
app.use(customResponsesMiddleware);

// Session management
app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Importing routers
import { homeRouter } from './routes/homepage.router.js';
import { componentsRouter } from './routes/components/components.router.js';
import { authRouter } from './routes/authantications/github-oauth.router.js';
import { CreateComponentsRouter } from './routes/components/addComponents.router.js';
import { userProfileRouter } from './routes/user_management/userProfile.router.js';
import { apiRouter } from './routes/api.router.js';
import { token } from './routes/authantications/jwt.router.js';

// Use routers
app.use('/', homeRouter);
app.use('/components', componentsRouter);
app.use('/auth', authRouter);
app.use('/', CreateComponentsRouter);
app.use('/profile', userProfileRouter);
app.use('/api', apiRouter);
app.use('/token', token);

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
