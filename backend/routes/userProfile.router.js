const { Router } = require('express')
const userProfileRouter = Router()
const {getUserProfileInformations, getUserInformationsByName, getUserInformationsByNameFromDb} = require('../controller/userProfile.controller');

userProfileRouter.post('/getuserprofileinfo', getUserProfileInformations);
userProfileRouter.post('/getprofileinfo', getUserInformationsByNameFromDb);

module.exports = {userProfileRouter};
