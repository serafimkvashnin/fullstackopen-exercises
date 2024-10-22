const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const payload = {
    id: user.id,
    username: user.username
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 });
  response.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
