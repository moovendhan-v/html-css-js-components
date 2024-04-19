import { Router, Request, Response } from 'express';
import { addNewComponents } from '../controller/addComponents.controller';

const CreateComponentsRouter: Router = Router();

CreateComponentsRouter.post('/createnewcomponents', (req: Request, res: Response) => {
  addNewComponents(req, res);
});

export { CreateComponentsRouter };