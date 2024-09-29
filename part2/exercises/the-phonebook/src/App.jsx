import { useEffect, useState } from 'react';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        personsService.getAll().then((returnedPersons) => {
            setPersons(returnedPersons);
        });
    }, []);

    const showInfoMessage = (text, duration) =>
        showMessage(text, 'info', duration);

    const showErrorMessage = (text, duration) =>
        showMessage(text, 'error', duration);

    const showMessage = (text, state, duration) => {
        setMessage({ text, state });
        clearTimeout();
        setTimeout(() => {
            setMessage(null);
        }, duration);
    };

    const handleAddPerson = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        event.target.reset();
        const name = form.get('name');
        const number = form.get('number');
        for (const person of persons) {
            if (person.name.toLowerCase() === name.toLowerCase()) {
                if (
                    confirm(
                        `${name} is already added to phonebook, replace the old number with a new one?`
                    )
                ) {
                    const newPerson = { name, number };
                    personsService
                        .updateEntry(person.id, newPerson)
                        .then((returnedPerson) => {
                            showInfoMessage(
                                `Updated ${returnedPerson.name} number`,
                                5000
                            );
                            setPersons(
                                persons.map((p) =>
                                    p.id !== returnedPerson.id
                                        ? p
                                        : returnedPerson
                                )
                            );
                        });
                }
                return;
            }
        }
        const newPerson = { name, number };
        personsService.createEntry(newPerson).then((returnedPerson) => {
            showInfoMessage(`Added ${returnedPerson.name}`, 5000);
            setPersons(persons.concat(returnedPerson));
        });
    };

    const handleDeletePerson = (person) => {
        if (confirm(`Do you really want to delete ${person.name}?`)) {
            personsService
                .deleteEntry(person.id)
                .then(() => {
                    showInfoMessage(`Deleted ${person.name}`, 5000);
                    setPersons(persons.filter((p) => p.id !== person.id));
                })
                .catch((error) => {
                    showErrorMessage(
                        `Information of ${person.name} has already been removed`,
                        5000
                    );
                });
        }
    };

    const getFilteredPersons = (filter) =>
        persons.filter((person) =>
            `${person.name} ${person.number}`
                .toLowerCase()
                .includes(filter.toLowerCase())
        );

    const handleFilter = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} />
            <PersonForm onAddPerson={handleAddPerson} />
            <Filter onFilter={handleFilter} />
            <Persons
                persons={getFilteredPersons(filter)}
                onDeletePerson={handleDeletePerson}
            />
        </div>
    );
};

const Filter = ({ onFilter }) => (
    <div>
        <h2>Filter</h2>
        <label>
            Filter shown with
            <input name="filter" onChange={onFilter} />
        </label>
    </div>
);

const PersonForm = ({ onAddPerson }) => (
    <div>
        <h2>Add</h2>
        <form onSubmit={onAddPerson}>
            <div>
                name:
                <input name="name" />
            </div>
            <div>
                number:
                <input name="number" />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </div>
);

const Persons = ({ persons, onDeletePerson }) => (
    <div>
        <h2>Numbers</h2>
        <div>
            {persons.map((person) => (
                <PersonDetails
                    key={person.id}
                    person={person}
                    onDeletePerson={onDeletePerson}
                />
            ))}
        </div>
    </div>
);

const PersonDetails = ({ person, onDeletePerson }) => (
    <p>
        {person.name} {person.number}
        <button onClick={() => onDeletePerson(person)}>delete</button>
    </p>
);

export default App;
