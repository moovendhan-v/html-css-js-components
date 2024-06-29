import { Router } from 'express';
const token = Router();

import { getNewAccessToken } from '../controller/jwt.controller.js';


// Define a route to get a new access token
token.get('/auth-token', getNewAccessToken);

export { token };