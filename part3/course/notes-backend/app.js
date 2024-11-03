const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.use('/api/notes', require('./controllers/notes'));
app.use('/api/users', require('./controllers/users'));
app.use('/api/login', require('./controllers/login'));

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', require('./controllers/testing'));
}

app.use(require('./middleware/unknownEndpoint'));
app.use(require('./middleware/errorHandler'));

module.exports = app;
