import {Router} from 'express';
const CreateComponentsRouter = Router()
import {addNewComponents} from '../../controller/components/addComponents.controller.js';
import {authanticateJwtToken} from '../../middleware/Auth.js'; 


// componentsRouter.get('/:test', getComponentsDetails);
CreateComponentsRouter.post('/createnewcomponents', authanticateJwtToken, addNewComponents);

export {CreateComponentsRouter};