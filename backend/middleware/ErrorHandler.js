import AppError from '../utils/AppError.js'; // Adjust the import path as necessary

const errorHandler = async (err, req, res, next) => {
  if (err instanceof AppError) {
    console.log('AppError', err)
    await err.handleReport();
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
