const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.use('/api/notes', require('./controllers/notes'));

app.use(require('./middleware/unknownEndpoint'));
app.use(require('./middleware/errorHandler'));

module.exports = app;
