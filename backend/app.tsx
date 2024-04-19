import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import path from 'path';
import dotenv from 'dotenv';

import { homeRouter } from './routes/homepage.router';
import { componentsRouter } from './routes/components.router';
import { authRouter } from './routes/github-oauth.router';
import { CreateComponentsRouter } from './routes/addComponents.router';
import { userProfileRouter } from './routes/userProfile.router';
import { apiRouter } from './routes/api.router';

dotenv.config();

const app: Express = express();
const port: number = 4000;

app.use(cors());
app.use(express.json());

const baseFolderPath: string = '../';
const folderPath: string = path.join(baseFolderPath, 'project', 'project_datas', 'buttons');
const indexPath: string = "style.css";

app.use('/', homeRouter);
app.use('/components', componentsRouter);
app.use('/auth', authRouter);
app.use('/', CreateComponentsRouter);
app.use('/profile', userProfileRouter);
app.use('/api', apiRouter);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
