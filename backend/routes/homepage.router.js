const { Router } = require('express')
const homeRouter = Router()
const {homePageController} = require('../controller/home.controller')

homeRouter.get('/', homePageController);

module.exports = {homeRouter}