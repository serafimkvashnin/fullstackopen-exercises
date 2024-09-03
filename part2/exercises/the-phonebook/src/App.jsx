import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const name = form.get('name')
    const number = form.get('number')
    if (persons.some((person) => person.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already added to phonebook`)
      return
    }
    const newPerson = {
      id: persons.length + 1,
      name: name,
      number: number
    }
    setPersons(persons.concat(newPerson))
  }

  const getFilteredPersons = (filter) => persons.filter((person) => 
    `${person.name} ${person.number}`.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilter = (event) => {
    const newFilter = event.target.value    
    setFilter(newFilter)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <PersonForm onAddPerson={handleAddPerson} />
      <Filter onFilter={handleFilter} />
      <Persons persons={getFilteredPersons(filter)} />
    </div>
  )
}

const Filter = ({ onFilter }) => <div>
  <h2>Filter</h2>
  <label>Filter shown with
    <input name="filter" onChange={onFilter}/>
  </label>
</div>


const PersonForm = ({ onAddPerson }) => <div>
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

const Persons = ({ persons }) => <div>
  <h2>Numbers</h2>
  <div>
    {persons.map((person) => 
      <PersonDetails key={person.id} person={person} />
    )}
  </div>
</div>

const PersonDetails = ({ person }) => <p>
  {person.name} {person.number}
</p>

export default App