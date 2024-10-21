const { describe, after, test, beforeEach } = require('node:test');
const assert = require('node:assert');
const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

const api = supertest(app);

describe('when there is initially one user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({
      username: 'username',
      password: 'password'
    });

    await user.save();
  });

  test('adding with new username succeeds with 201', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: 'unique',
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);
  });

  test('adding with same username fails with 400', async () => {
    const usersAtStart = await User.find({});

    const sameUser = {
      username: 'username',
      password: 'password'
    };

    const response = await api
      .post('/api/users')
      .send(sameUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    console.log(response.body);
    assert(response.body.error.includes('Expected `username` to be unique'));

    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  test('adding with short username fails with 400', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: 'un',
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  test('adding with short password fails with 400', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: 'unique',
      password: 'pa'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  test('adding without username fails with 400', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  test('adding without password fails with 400', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: 'username'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
