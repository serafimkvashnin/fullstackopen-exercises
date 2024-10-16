const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Note = require('../models/note');

const api = supertest(app);

const initialNotes = [
  {
    content: 'Test note 1',
    important: true
  },
  {
    content: 'Test note 2',
    important: false
  }
];

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(initialNotes);
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    assert.strictEqual(response.body.length, initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const noteToView = response.body[0];

    const contents = response.body.map((n) => n.content);

    assert(contents.includes(noteToView.content));
  });

  describe('viewing a specific note', () => {
    test('succeeds if a valid id', async () => {
      const response = await api.get('/api/notes');
      const noteToView = response.body[0];
      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test('fails with 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';
      await api.get(`/api/notes/${invalidId}`).expect(400);
    });
  });

  describe('addition of a new note', () => {
    test('succeeds with 201 if data is valid', async () => {
      await api
        .post('/api/notes')
        .send({
          content: 'Test note'
        })
        .expect(201);
      const response = await api.get('/api/notes');
      assert.strictEqual(response.body.length, initialNotes.length + 1);
    });
  });

  test('fails with 400 if data is invalid', async () => {
    const note = {};
    await api.post('/api/notes').send(note).expect(400);
  });

  describe('deletion of a new note', () => {
    test('succeeds with 204 if id is valid', async () => {
      let response = await api.get('/api/notes');
      const noteToDelete = response.body[0];
      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
      response = await api.get('/api/notes');
      assert.strictEqual(response.body.length, initialNotes.length - 1);
    });

    test('fails with 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';
      await api.delete(`/api/notes/${invalidId}`).expect(400);
    });
  });

  describe('updating a note', () => {
    test('succeeds if id is valid', async () => {
      let response = await api.get('/api/notes');
      let note = response.body[0];
      const modifiedContent = 'Updated note';
      note = { ...note, content: modifiedContent };
      const resultNote = await api
        .put(`/api/notes/${note.id}`)
        .send(note)
        .expect(200);
      assert(resultNote.body.content, modifiedContent);
    });

    test('fails with 400 if data is invalid', async () => {
      let note = {};
      await api.put(`/api/notes/${note.id}`).send(note).expect(400);
    });

    test('fails with 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';
      await api.put(`/api/notes/${invalidId}`).expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
