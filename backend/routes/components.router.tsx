import { Router, Request, Response } from 'express';
import { getComponentsDetails, getLatestFiles, getAllCompDetailsFromDatabases, getComponentsBySearch, getParticularComponent, getCategoriesList } from '../controller/components.controller';
import { jsonStatus, jsonStatusError, jsonStatusSuccess } from '../enums/errorhandling.enums';

const componentsRouter: Router = Router();

componentsRouter.get('/latest', (req: Request, res: Response) => {
    const { category, page } = req.query;
    if (category == "all") {
        getAllCompDetailsFromDatabases({ categories: category, page: page }, (err: Error, files: any) => {
            //hadle the data
            if (err) {
                return res.send(jsonStatusError({ errorStatus: true, statusCode: "500", message: 'Internal server error', response: null, }));
            }
            res.send(jsonStatusSuccess({ errorStatus: false, message: `Latest ${category}`, response: files, count: 0 }))
        });
    } else {
        getLatestFiles(category, page, (err: Error, files: any) => {
            const fileStatus = files.length <= 0 ? "Limit reached No More Components where available" : `Latest ${category}`;
            if (err) {
                console.error(err);
                return res.send(jsonStatusError({ errorStatus: true, statusCode: "500", message: 'Internal server error', response: null, }));
            }
            res.send(jsonStatusSuccess({ errorStatus: false, message: fileStatus, response: files, count: files.length }))
        });
    }
});

componentsRouter.get('/:category/:title', getParticularComponent);

componentsRouter.get('/searchcomponents', getComponentsBySearch);

componentsRouter.get('/get-cateogries', getCategoriesList);

export { componentsRouter };