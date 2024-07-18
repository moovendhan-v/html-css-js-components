import {Router} from 'express';
const homeRouter = Router()
import {homePageController} from '../controller/home.controller.js';

homeRouter.get('/', homePageController);

export {homeRouter};