const { Router } = require('express')
const componentsRouter = Router()
const {getComponentsDetails , getLatestFiles, getAllCompDetailsFromDatabases} = require('../controller/components.controller');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');

// componentsRouter.get('/:test', getComponentsDetails);
componentsRouter.get('/latest', (req, res) => {
    const { category } = req.query;
    if (category == "all") {
      getAllCompDetailsFromDatabases(category, (err, files)=>{
        //hadle the data
        if(err){
          return res.send(jsonStatusError({ errorStatus : true, statusCode : "500", message : 'Internal server error', response : null,}));
        }
        res.send(jsonStatusSuccess({ errorStatus : false, message : `Latest ${category}`, response : files, count : 0 }))
      });
    }else{
      getLatestFiles(category, (err, files) => {
        if (err) {
          console.error(err);
          return res.send(jsonStatusError({ errorStatus : true, statusCode : "500", message : 'Internal server error', response : null,}));
        }
        res.send(jsonStatusSuccess({ errorStatus : false, message : `Latest ${category}`, response : files, count : 0 }))
      });
    }

  });


module.exports = {componentsRouter}