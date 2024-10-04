require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

const BASE_URL = '/api/persons/';

const Person = require('./models/person');

app.post(BASE_URL, (request, response, next) => {
    const { name, number } = request.body;

    const person = new Person({
        name,
        number,
    });

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.get(BASE_URL, (request, response, error) => {
    Person.find({})
        .then((persons) => {
            response.json(persons);
        })
        .catch((error) => next(error));
});

app.get(`${BASE_URL}:id`, (request, response, next) => {
    const id = request.params.id;
    Person.findById(id)
        .then((person) => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.put(`${BASE_URL}:id`, (request, response, next) => {
    const id = request.params.id;
    const { name, number } = request.body;
    const person = { name, number };

    Person.findByIdAndUpdate(id, person, { new: true, runValidators: true })
        .then((updatedEntry) => {
            response.json(updatedEntry);
        })
        .catch((error) => next(error));
});

app.delete(`${BASE_URL}:id`, (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.use(require('./middleware/unknownEndpoint'));
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(` - http://localhost:${PORT}/`);
});
