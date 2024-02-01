const { Router } = require('express')
const CreateComponentsRouter = Router()
const {addNewComponents} = require('../controller/addComponents.controller');


// componentsRouter.get('/:test', getComponentsDetails);
CreateComponentsRouter.post('/createnewcomponents', addNewComponents);

module.exports = {CreateComponentsRouter}