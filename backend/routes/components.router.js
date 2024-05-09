const { Router } = require('express')
const componentsRouter = Router()
const {getComponentsDetails , getLatestFiles, getAllCompDetailsFromDatabases, getComponentsBySearch, getParticularComponent, getCategoriesList, addLikesToComponents, removeLikeToComponents, saveComponents, unSavedComponents, addComments} = require('../controller/components.controller');
const {sendStatus, sendJSONError, sendJSONSuccess} = require('../operations/errorhandlingOperations');

// componentsRouter.get('/:test', getComponentsDetails);
// app.use('/components', componentsRouter);

componentsRouter.get('/latest', (req, res) => {
    const { category, page } = req.query;
    if (category == "all") {
      getAllCompDetailsFromDatabases({categories:category, page: page}, (err, files)=>{
        //hadle the data
        if(err){
          return res.send(sendJSONError({ errorStatus : true, statusCode : "500", message : 'Internal server error', response : null,}));
        }
        res.send(sendJSONSuccess({ errorStatus : false, message : `Latest ${category}`, response : files, count : 0 }))
      });
    }else{
      getLatestFiles(category,page, (err, files) => {
        const fileStatus = files.length <= 0 ? "Limit reached No More Components where available" : `Latest ${category}`;
        if (err) {
          console.error(err);
          return res.send(sendJSONError({ errorStatus : true, statusCode : "500", message : 'Internal server error', response : null,}));
        }
        res.send(sendJSONSuccess({ errorStatus : false, message : fileStatus, response : files, count : files.length }))
      });
    }
});

componentsRouter.post('/:postId/like', addLikesToComponents)

componentsRouter.post('/:postId/removelike', removeLikeToComponents)

componentsRouter.post('/:postId/save', saveComponents)

componentsRouter.post('/:postId/unsave', unSavedComponents)

componentsRouter.post('/:postId/addcomments', addComments)

componentsRouter.get('/:category/:title',getParticularComponent);

componentsRouter.get('/searchcomponents', getComponentsBySearch);

componentsRouter.get('/get-cateogries', getCategoriesList)

module.exports = {componentsRouter}
