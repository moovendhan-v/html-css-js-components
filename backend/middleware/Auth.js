const jwt = require('jsonwebtoken');
const {jsonStatus, jsonStatusError, jsonStatusSuccess} = require('../operations/errorhandlingOperations');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;

const authanticateJwtToken = (req,res,next)=>{

  const authHeader = req.headers['authorization'];
  console.log(req.headers);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.send(jsonStatusError({message: "Unauthorised", statusCode: 401}))
  }

  const token = authHeader.split(' ')[1];

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();  
  } catch (err) {
      // Token verification failed
      return res.send(jsonStatusError({message: err, statusCode: 401}))
  }
}


module.exports = {authanticateJwtToken}