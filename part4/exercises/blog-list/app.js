const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
require('express-async-errors');
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

app.use(require('./middleware/tokenExtractor'));

app.use(
  '/api/blogs',
  require('./middleware/userExtractor'),
  require('./controllers/blogs')
);
app.use('/api/users', require('./controllers/users'));
app.use('/api/login', require('./controllers/login'));

app.use(require('./middleware/errorHandler'));

module.exports = app;
