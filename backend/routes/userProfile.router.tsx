import { Router, Request, Response } from 'express';
import { getUserProfileInformations, getUserInformationsByName, getUserInformationsByNameFromDb } from '../controller/userProfile.controller';

const userProfileRouter: Router = Router();

userProfileRouter.post('/getuserprofileinfo', (req: Request, res: Response) => {
  getUserProfileInformations(req, res);
});

userProfileRouter.post('/getprofileinfo', (req: Request, res: Response) => {
  getUserInformationsByNameFromDb(req, res);
});

export { userProfileRouter };