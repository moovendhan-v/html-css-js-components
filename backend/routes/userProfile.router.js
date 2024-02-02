const { Router } = require('express')
const userProfileRouter = Router()
const {getUserProfileInformations} = require('../controller/userProfile.controller');


userProfileRouter.post('/getuserprofileinfo', getUserProfileInformations);

module.exports = {userProfileRouter};
