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

  const blog = new Blog(data);

  const savedBlog = await blog.save();

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
