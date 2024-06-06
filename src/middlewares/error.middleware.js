const httpStatus = require('http-status');

const { env } = require('../config');

const errorConverter = (err, req, res, next) => {
  let error = err;
  next(error);
};

const errorHandler = async (err, req, res, next) => {
  let { statusCode, message } = err;

  if (env.nodeEnv === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    statusCode,
    message,
    ...(env.nodeEnv === 'development' && { stack: err.stack }),
  };

  if (env.nodeEnv === 'development') {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
  errorConverter,
};
