import {Router} from 'express';
const CreateComponentsRouter = Router()
import {addNewComponents} from '../../controller/components/addComponents.controller.js';
import {authanticateJwtToken, protectRoute} from '../../middleware/Auth.js'; 


CreateComponentsRouter.post('/createnewcomponents', authanticateJwtToken, addNewComponents);


// CreateComponentsRouter.post('/createnewcomponents', authanticateJwtToken, protectRoute, addNewComponents);


export {CreateComponentsRouter};