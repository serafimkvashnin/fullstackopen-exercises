const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

const blogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('get blogs', () => {
  test('there is exactly one blog', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.length, blogs.length);
  });

  test('blog has an id field', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body[0].id);
  });
});

describe('post blogs', () => {
  const newBlog = {
    title: 'Title',
    author: 'Author',
    url: 'https://google.com',
    likes: 999
  };

  test('new blog is added', async () => {
    await api.post('/api/blogs').send(newBlog).expect(201);

    const response = await api.get('/api/blogs');

    assert(response.body.length, blogs.length);
  });

  test('added blog is in correct format', async () => {
    const response = await api.post('/api/blogs').send(newBlog).expect(201);

    const addedBlog = response.body;
    const blog = {
      ...newBlog,
      id: addedBlog.id
    };

    assert.deepStrictEqual(addedBlog, blog);
  });

  test('if no likes given defaults to zero', async () => {
    const newBlogWithoutLikes = {
      title: 'Title',
      author: 'Author',
      url: 'https://google.com'
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201);

    assert.equal(response.body.likes, 0);
  });

  test('cannot save blog without title', async () => {
    const newBlogWithoutTitle = {
      author: 'Author',
      url: 'https://google.com'
    };

    await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400);
  });

  test('cannot save blog without url', async () => {
    const newBlogWithoutUrl = {
      title: 'Blog',
      author: 'Author'
    };

    await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
