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

beforeEach(async () => {
  await Note.deleteMany({});

  for (let note of initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('update individual note', async () => {
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

test('view individual note', async () => {
  const response = await api.get('/api/notes');
  const noteToView = response.body[0];
  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.deepStrictEqual(resultNote.body, noteToView);
});

test('delete individual note', async () => {
  let response = await api.get('/api/notes');
  const noteToDelete = response.body[0];
  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
  response = await api.get('/api/notes');
  assert.strictEqual(response.body.length, initialNotes.length - 1);
});

describe('api test', () => {
  test('add two more notes test', async () => {
    await api
      .post('/api/notes')
      .send({
        content: 'Test note 3'
      })
      .expect(201);
    await api
      .post('/api/notes')
      .send({
        content: 'Test note 4'
      })
      .expect(201);
    const response = await api.get('/api/notes');
    assert.strictEqual(response.body.length, initialNotes.length + 2);
  });

  test('note without content not added', async () => {
    const note = {};
    await api.post('/api/notes').send(note).expect(400);
    const response = await api.get('/api/notes');
    assert.strictEqual(response.body.length, initialNotes.length);
  });

  test('the first note contains "Test note 1" text', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map((n) => n.content);
    assert(contents.includes('Test note 1'));
  });

  test('delete all notes', async () => {
    let response = await api.get('/api/notes');
    response.body.forEach(async (n) => {
      await api.delete(`/api/notes/${n.id}`);
    });
    response = await api.get('/api/notes');
    assert.strictEqual(response.body.length, 0);
  });
});

after(async () => {
  await mongoose.connection.close();
});
