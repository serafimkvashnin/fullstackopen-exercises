const { info } = require('../utils/logger');

const errorHandler = (error, req, res, next) => {
  info(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = errorHandler;
