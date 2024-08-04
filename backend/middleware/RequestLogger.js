// middleware/requestLogger.js
import logger from '../utils/logger.js';

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export default requestLogger;
