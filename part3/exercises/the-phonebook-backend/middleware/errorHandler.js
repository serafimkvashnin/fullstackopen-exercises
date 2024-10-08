const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

module.exports = errorHandler;
