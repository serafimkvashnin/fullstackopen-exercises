const { info } = require('../utils/logger');

const errorHandler = (error, request, response, next) => {
  info(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: error.message });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error collection')
  ) {
    return response
      .status(400)
      .send({ error: 'Expected `username` to be unique' });
  }

  next(error);
};

module.exports = errorHandler;
