const { Router } = require('express');
const apiRouter = Router();
const { getAllCompDetailsFromDatabases, getComponentsBySearch } = require('../controller/components.controller');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');


apiRouter.get('/all', (req, res) => {
    const categories = "all";
    getAllCompDetailsFromDatabases({categories:categories, search:"buttons"}, (err, files) => {
        // Handle the data
        if (err) {
            return res.send(jsonStatusError({ errorStatus: true, statusCode: "500", message: `${err}`, response: null, }));
        }
        res.send(jsonStatusSuccess({ errorStatus: false, message: `${categories} latest components`, response: files, count: files.length }));
    });
});

apiRouter.get('/searchcomponents', getComponentsBySearch);


module.exports = { apiRouter };
