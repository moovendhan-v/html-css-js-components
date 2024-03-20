const { Router } = require('express')
const componentsRouter = Router()
const {getComponentsDetails , getLatestFiles, getAllCompDetailsFromDatabases, getComponentsBySearch, getParticularComponent} = require('../controller/components.controller');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');

// componentsRouter.get('/:test', getComponentsDetails);
// app.use('/components', componentsRouter);

componentsRouter.get('/latest', (req, res) => {
    const { category, page } = req.query;
    if (category == "all") {
      getAllCompDetailsFromDatabases({categories:category}, (err, files)=>{
        //hadle the data
        if(err){
          return res.send(jsonStatusError({ errorStatus : true, statusCode : "500", message : 'Internal server error', response : null,}));
        }
        res.send(jsonStatusSuccess({ errorStatus : false, message : `Latest ${category}`, response : files, count : 0 }))
      });
    }else{
      getLatestFiles(category,2, (err, files) => {
        const fileStatus = files.length <= 0 ? "Limit reached No More Components where available" : `Latest ${category}`;
        if (err) {
          console.error(err);
          return res.send(jsonStatusError({ errorStatus : true, statusCode : "500", message : 'Internal server error', response : null,}));
        }
        res.send(jsonStatusSuccess({ errorStatus : false, message : fileStatus, response : files, count : files.length }))
      });
    }
});

componentsRouter.get('/:category/:title',getParticularComponent);

componentsRouter.get('/searchcomponents', getComponentsBySearch);

module.exports = {componentsRouter}
