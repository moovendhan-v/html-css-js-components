import {Router} from 'express';
const CreateComponentsRouter = Router()
import {addNewComponents} from '../controller/addComponents.controller.js';


// componentsRouter.get('/:test', getComponentsDetails);
CreateComponentsRouter.post('/createnewcomponents', addNewComponents);

export {CreateComponentsRouter};