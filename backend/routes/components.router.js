const { Router } = require('express')
const componentsRouter = Router()
const {getComponentsDetails, gethtmlContent, getCssContent, getJsContent} = require('../controller/components.controller')


componentsRouter.get('/', getComponentsDetails);
// componentsRouter.get('/html', gethtmlContent);
// componentsRouter.get('/css', getCssContent);
// componentsRouter.get('/js', getJsContent);


module.exports = {componentsRouter}