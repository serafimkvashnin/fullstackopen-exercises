const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post('/', async (request, response) => {
  const data = {
    ...request.body,
    likes: request.body.likes || 0
  };

  if (!data.title || !data.url) {
    response.status(400).end();
    return;
  }

  const blog = new Blog(data);

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

module.exports = router;
