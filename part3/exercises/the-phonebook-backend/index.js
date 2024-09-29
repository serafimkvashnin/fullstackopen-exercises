const express = require('express');
const app = express();

app.use(express.json());

const BASE_URL = '/api/persons/';

let persons = [
    {
        name: 'Ada Lovelace',
        number: '39-44-53523',
        id: '2',
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: '3',
    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: '4',
    },
    {
        name: 'Arto Hellas',
        number: '623-465477',
        id: '5',
    },
];

const generateId = () => {
    return persons.length > 0
        ? (Math.max(...persons.map((p) => p.id)) + 1).toString()
        : '0';
};

app.post(BASE_URL, (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: 'Name is missing',
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons.push(person);
    response.json(person);
});

app.get(BASE_URL, (request, response) => {
    response.json(persons);
});

app.get(`${BASE_URL}:id`, (request, response) => {
    const id = request.params.id;
    const person = persons.find((p) => p.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete(`${BASE_URL}:id`, (request, response) => {
    const id = request.params.id;
    persons = persons.filter((p) => p.id !== id);

    response.status(204).end();
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
