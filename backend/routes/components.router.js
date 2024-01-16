const { Router } = require('express')
const componentsRouter = Router()
const {getComponentsDetails , readFilesInformations} = require('../controller/components.controller')


componentsRouter.get('/', getComponentsDetails);
// componentsRouter.get('/file', (req, res) => readFilesInformations(req, res, "buttons", "moovendhan"));
// componentsRouter.get('/css', getCssContent);
// componentsRouter.get('/js', getJsContent);


module.exports = {componentsRouter}