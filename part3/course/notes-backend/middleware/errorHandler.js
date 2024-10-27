const { info } = require('../utils/logger');

const errorHandler = (error, req, res, next) => {
  info(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res.status(400).send({ error: 'Expected `username` to be unique' });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token invalid' });
  }

  next(error);
};

module.exports = errorHandler;
