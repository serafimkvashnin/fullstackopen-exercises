require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

const Note = require('./models/note');

app.get('/', (request, response) => {
    response.send('<h1><a href="/api/notes">Notes</a></h1>');
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then((notes) => response.json(notes));
});

app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id;
    Note.findById(id)
        .then((note) => {
            if (note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => {
            next(error);
        });
});

app.post('/api/notes', (request, response, next) => {
    const body = request.body;

    const note = new Note({
        content: body.content,
        important: Boolean(body.important),
    });

    note.save()
        .then((savedNote) => {
            response.json(savedNote);
        })
        .catch((error) => next(error));
});

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body;

    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
});

app.delete('/api/notes/:id', (request, response, next) => {
    const id = request.params.id;
    Note.findByIdAndDelete(id)
        .then(() => response.status(204).end())
        .catch((error) => next(error));
});

app.use(require('./middleware/unknownEndpoint'));

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(` - http://localhost:${PORT}/`);
});
