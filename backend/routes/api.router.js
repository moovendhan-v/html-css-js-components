const { Router } = require('express');
const apiRouter = Router();
const { getAllCompDetailsFromDatabases } = require('../controller/components.controller');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');


apiRouter.get('/all', (req, res) => {
    const categories = "all";
    getAllCompDetailsFromDatabases(categories, (err, files) => {
        // Handle the data
        if (err) {
            return res.send(jsonStatusError({ errorStatus: true, statusCode: "500", message: `${err}`, response: null, }));
        }
        res.send(jsonStatusSuccess({ errorStatus: false, message: `Latest ${category}`, response: files, count: 0 }));
    });
});

module.exports = { apiRouter };
