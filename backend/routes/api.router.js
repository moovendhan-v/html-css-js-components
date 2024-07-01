import {Router} from 'express';
const apiRouter = Router();
import {getAllCompDetailsFromDatabases, getComponentsBySearch} from '../controller/components/components.controller.js';
import { sendJSONError, sendJSONSuccess} from '../operations/errorhandlingOperations.js';


apiRouter.get('/all', (req, res) => {
    const categories = "all";
    getAllCompDetailsFromDatabases({categories, search:"buttons"}, (err, files) => {
        // Handle the data
        if (err) {
            return res.send(sendJSONError({ errorStatus: true, statusCode: "500", message: `${err}`, response: null, }));
        }
        res.send(sendJSONSuccess({ errorStatus: false, message: `${categories} latest components`, response: files, count: files.length }));
    });
});

apiRouter.get('/searchcomponents', getComponentsBySearch);


export { apiRouter };
