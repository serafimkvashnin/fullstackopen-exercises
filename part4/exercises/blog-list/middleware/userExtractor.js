const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userExtractor = async (request, response, next) => {
  const token = request.token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id);
      if (user) {
        request.user = user;
      }
    }
  }

  next();
};

module.exports = userExtractor;
