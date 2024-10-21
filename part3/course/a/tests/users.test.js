const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const api = supertest(app);

const users = [
  {
    username: 'User123',
    name: 'Joe Goldenberg',
    password: '12345'
  }
];

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash(users[0].password, 10);
    const user = new User({ ...users[0], passwordHash });
    await user.save();

    const u = await User.find({});
    console.log(u);
  });

  test('creation with new username succeeds with 201', async () => {
    const newUser = {
      username: 'User321',
      name: 'Matti Luukkainen',
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersInDb = await User.find({});

    assert.strictEqual(usersInDb.length, users.length + 1);
  });

  test('creation with same username fails with 400', async () => {
    const response = await api
      .post('/api/users')
      .send(users[0])
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(response.body.error.includes('Expected `username` to be unique'));

    const usersInDb = await User.find({});
    assert.strictEqual(usersInDb.length, users.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
