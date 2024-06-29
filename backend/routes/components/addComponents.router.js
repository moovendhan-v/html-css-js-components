import {Router} from 'express';
const CreateComponentsRouter = Router()
import {addNewComponents} from '../../controller/components/addComponents.controller.js';


// componentsRouter.get('/:test', getComponentsDetails);
CreateComponentsRouter.post('/createnewcomponents', addNewComponents);

export {CreateComponentsRouter};