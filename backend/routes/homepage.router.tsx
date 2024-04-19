import { Router, Request, Response } from 'express';
import { homePageController } from '../controller/home.controller';

const homeRouter: Router = Router();

homeRouter.get('/', homePageController);

export { homeRouter };