const { Router } = require('express')
const userProfileRouter = Router()
const {getUserProfileInformations, getUserInformationsByName, getUserInformationsByNameFromDb, getprofileinfoprotect} = require('../controller/userProfile.controller');
const {authanticateJwtToken} = require('../middleware/Auth')
const {authenticatePublicApi} = require('../middleware/Auth')

userProfileRouter.post('/getuserprofileinfo', getUserProfileInformations);
userProfileRouter.get('/getprofileinfoprotect', authanticateJwtToken, getprofileinfoprotect );
userProfileRouter.post('/getprofileinfo', getUserInformationsByNameFromDb);

module.exports = {userProfileRouter};
