import {Router} from 'express';
const componentsRouter = Router()

import {
  getLatestFiles,
  getAllCompDetailsFromDatabases,
  getComponentsBySearch,
  getParticularComponent,
  getCategoriesList,
  addLikesToComponents,
  removeLikeToComponents,
  saveComponents,
  unSavedComponents,
  addComments,
  getpPopularComponents,
  getLatestComponents
} from '../../controller/components/components.controller.js';

import { contributeNewComponents } from '../../controller/components/createComponentStatus.controller.js';

import {authanticateJwtToken, protectRoute} from '../../middleware/Auth.js'; 

import { sendJSONError, sendJSONSuccess} from '../../operations/errorhandlingOperations.js';
import {authenticatePublicApi} from '../../middleware/Auth.js';

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

componentsRouter.post('/:postId/like', addLikesToComponents);

componentsRouter.post('/:postId/removelike', removeLikeToComponents);

componentsRouter.post('/:postId/save', saveComponents);

componentsRouter.post('/:postId/unsave', unSavedComponents);

componentsRouter.post('/:postId/addcomments', addComments);

componentsRouter.post('/contribute-new-components', authanticateJwtToken, contributeNewComponents);

componentsRouter.get('/:category/:title',getParticularComponent);

componentsRouter.get('/searchcomponents', getComponentsBySearch);

componentsRouter.get('/get-cateogries', getCategoriesList);

componentsRouter.get('/get-popular-components', getpPopularComponents);

export {componentsRouter};
