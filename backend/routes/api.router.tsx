import { Router, Request, Response } from 'express';
import { getAllCompDetailsFromDatabases, getComponentsBySearch } from '../controller/components.controller';
import { jsonStatus, jsonStatusError, jsonStatusSuccess } from '../enums/errorhandling.enums';

const apiRouter: Router = Router();

apiRouter.get('/all', (req: Request, res: Response) => {
    const categories: string = "all";
    getAllCompDetailsFromDatabases({categories:categories, search:"buttons"}, (err: Error, files: any) => {
        // Handle the data
        if (err) {
            return res.send(jsonStatusError({ errorStatus: true, statusCode: "500", message: `${err}`, response: null, }));
        }
        res.send(jsonStatusSuccess({ errorStatus: false, message: `${categories} latest components`, response: files, count: files.length }));
    });
});

apiRouter.get('/searchcomponents', getComponentsBySearch);

export { apiRouter };