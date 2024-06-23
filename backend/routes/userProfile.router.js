import {Router} from 'express';
const userProfileRouter = Router()

import {
  getUserProfileInformations,
  getUserInformationsByName,
  getUserInformationsByNameFromDb,
  getprofileinfoprotect,
} from '../controller/userProfile.controller.js';

import {authanticateJwtToken} from '../middleware/Auth.js';
import {authenticatePublicApi} from '../middleware/Auth.js';

userProfileRouter.post('/getuserprofileinfo', getUserProfileInformations);
userProfileRouter.get('/getprofileinfoprotect', authanticateJwtToken, getprofileinfoprotect );
userProfileRouter.post('/getprofileinfo', getUserInformationsByNameFromDb);

export {userProfileRouter};
