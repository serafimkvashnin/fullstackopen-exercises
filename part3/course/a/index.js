require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

const Note = require('./models/note');

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>');
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then((notes) => response.json(notes));
});

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    Note.findById(id).then((note) => {
        response.json(note);
    });
});

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing',
        });
    }

    const note = new Note({
        content: body.content,
        important: Boolean(body.important),
    });

    note.save().then((savedNote) => {
        response.json(savedNote);
    });
});

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    Note.findByIdAndDelete(id).then(() => response.status(204).end());
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'Unknown endpoint',
    });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(` - http://localhost:${PORT}/`);
});
