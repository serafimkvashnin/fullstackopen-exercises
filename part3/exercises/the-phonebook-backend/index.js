require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

const BASE_URL = '/api/persons/';

const Person = require('./models/person');

app.post(BASE_URL, (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: 'Name is missing',
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then((savedPerson) => {
        response.json(savedPerson);
    });
});

app.get(BASE_URL, (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.get(`${BASE_URL}:id`, (request, response) => {
    const id = request.params.id;
    Person.findById(id).then((person) => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    });
});

app.delete(`${BASE_URL}:id`, (request, response) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(() => {
        response.status(204).end();
    });
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'Unknown endpoint',
    });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(` - http://localhost:${PORT}/`);
});
