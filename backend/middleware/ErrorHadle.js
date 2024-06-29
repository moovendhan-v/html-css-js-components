import logger from './logger'; // Import your logger module

const errorHandler = (err, req, res, next) => {
  const { message, statusCode = 500, stack } = err;

  // Log the error
  logger.error({
    message,
    statusCode,
    stack,
    path: req.path,
    method: req.method,
    user: req.user ? req.user._id : 'guest',
    timestamp: new Date().toISOString(),
  });

  // Respond with JSON error message
  res.status(statusCode).json({
    status: 'error',
    message: message || 'Internal Server Error',
  });
};

export default errorHandler;
