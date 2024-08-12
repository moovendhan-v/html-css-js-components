import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();
import { customResponsesMiddleware } from './middleware/customResponse.js';
import logger from './utils/logger.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/ErrorHandler.js';
import requestLogger from './middleware/RequestLogger.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Initialize Express app
const app = express();
const port = 4000;
app.use(helmet());

// Middleware setup
app.use(cookieParser());
app.use(requestLogger);

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
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true,
}));

app.use(express.json());
app.use(customResponsesMiddleware);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  // store: new RedisStore({
  //   sendCommand: (...args) => redisClient.call(...args),
  // }),
  handler: (req, res) => {
    res.badreq({
      code: 429,
      message: "Too many requests. Please try again later."
    });
  }
});
app.use('/', limiter);

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

// error-handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
