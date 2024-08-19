import {Router} from 'express';
const componentsRouter = Router()

import {
  getLatestFiles,
  getAllCompDetailsFromDatabases,
  getComponent,
  getComponentsBySearch,
  getParticularComponent,
  getCategoriesList,
  addLikesToComponents,
  removeLikeToComponents,
  saveComponents,
  unSavedComponents,
  addComments,
  getpPopularComponents,
  getLatestComponents,
  getComponentsByStatus
} from '../../controller/components/components.controller.js';

import { contributeNewComponents } from '../../controller/components/createComponentStatus.controller.js';

import {authanticateJwtToken, authenticatePublicApi, protectRoute} from '../../middleware/Auth.js'; 

import { sendJSONError, sendJSONSuccess} from '../../operations/errorhandlingOperations.js';

// componentsRouter.get('/:test', getComponentsDetails);
// app.use('/components', componentsRouter);

// componentsRouter.get('/latest', (req, res) => {
//     const { category, page } = req.query;
//     if (category == "all") {
//       getAllCompDetailsFromDatabases({categories:category, page}, (err, files)=>{
//         //hadle the data
//         if(err){
//           return res.send(sendJSONError({ errorStatus : true, statusCode : "500", message : 'Internal server error', response : null,}));
//         }
//         res.send(sendJSONSuccess({ errorStatus : false, message : `Latest ${category}`, response : files, count : 0 }))
//       });
//     }else{
//       getLatestFiles(category,page, (err, files) => {
//         const fileStatus = files.length <= 0 ? "Limit reached No More Components where available" : `Latest ${category}`;
//         if (err) {
//           console.error(err);
//           return res.send(sendJSONError({ errorStatus : true, statusCode : "500", message : 'Internal server error', response : null,}));
//         }
//         res.send(sendJSONSuccess({ errorStatus : false, message : fileStatus, response : files, count : files.length }))
//       });
//     }
// });

componentsRouter.get('/latest', getLatestComponents)

componentsRouter.post('/:postId/like', authanticateJwtToken, addLikesToComponents);

componentsRouter.post('/:postId/removelike', authanticateJwtToken, removeLikeToComponents);

componentsRouter.post('/:postId/save', authanticateJwtToken, saveComponents);

componentsRouter.post('/:postId/unsave', authanticateJwtToken, unSavedComponents);

componentsRouter.post('/:postId/addcomments', authanticateJwtToken, addComments);

componentsRouter.post('/contribute-new-components', authanticateJwtToken, contributeNewComponents);

componentsRouter.get('/:category/:title', getComponent);

componentsRouter.get('/searchcomponents', getComponentsBySearch);

componentsRouter.get('/get-components-by-status', authanticateJwtToken, getComponentsByStatus);

componentsRouter.get('/get-cateogries', getCategoriesList);

componentsRouter.get('/get-popular-components', getpPopularComponents);

export {componentsRouter};
