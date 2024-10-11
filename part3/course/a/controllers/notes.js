const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.post('/', async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: Boolean(body.important)
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const note = await Note.findById(id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body;

  const note = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  );
  response.json(note);
});

notesRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  await Note.findByIdAndDelete(id);
  response.status(204).end();
});

module.exports = notesRouter;
