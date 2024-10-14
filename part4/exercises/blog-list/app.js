const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const app = express();
const cors = require('cors');
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

app.use('/api/blogs', require('./controllers/blogs'));

module.exports = app;
