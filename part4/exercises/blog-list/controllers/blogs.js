const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

router.post('/', async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: 'Bearer token required' });
  }

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
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: 'Bearer token required' });
  }

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === user.id.toString()) {
    await blog.deleteOne();
    return response.status(204).end();
  }

  response.status(400).json({ error: "You cannot delete someone else's blog" });
});

module.exports = router;
