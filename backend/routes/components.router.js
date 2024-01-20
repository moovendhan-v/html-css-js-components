const { Router } = require('express')
const componentsRouter = Router()
const {getComponentsDetails , getLatestFiles} = require('../controller/components.controller');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');

// componentsRouter.get('/:test', getComponentsDetails);
componentsRouter.get('/latest', (req, res) => {
    const { category } = req.query;
    getLatestFiles(category, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({err: `${err}`, error: 'Internal Server Error' });
      }
      res.send(jsonStatusSuccess({ errorStatus : false, message : `Latest ${category}`, response : files, count : 0 }))
    });
  });


module.exports = {componentsRouter}