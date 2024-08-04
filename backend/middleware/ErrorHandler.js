import AppError from '../utils/AppError.js'; // Adjust the import path as necessary
import logger from '../utils/logger.js';

const errorHandler = async (err, req, res, next) => {
  if (err instanceof AppError) {
    logger.error(`AppError: ${err.message} - ${JSON.stringify(err.details)}`);
    await err.handleReport();
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
