const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

router.post('/', async (request, response) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: 'Bearer token required' });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' });
  }

  const user = await User.findById(decodedToken.id);

  const data = {
    ...request.body,
    likes: request.body.likes || 0,
    user: user.id
  };

  const blog = new Blog(data);

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
});

router.put('/:id', async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      runValidators: true,
      new: true,
      context: 'query'
    }
  );
  response.json(updated);
});

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = router;
