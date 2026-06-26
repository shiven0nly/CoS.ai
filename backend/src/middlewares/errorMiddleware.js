const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production modes
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = `Resource not found`;
      error = new AppError(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = 'Duplicate field value entered';
      error = new AppError(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message).join(', ');
      error = new AppError(message, 400);
    }

    if (error.isOperational) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      // Programming or other unknown error
      console.error('ERROR 💥', err);
      res.status(500).json({
        success: false,
        error: 'Something went very wrong!',
      });
    }
  }
};

module.exports = errorHandler;
