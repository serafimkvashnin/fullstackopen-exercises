import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getData = (promise) => promise.then(response => response.data) 

const getAll = () => getData(axios.get(baseUrl))

const createEntry = (person) => getData(axios.post(baseUrl, person))

const deleteEntry = (id) => getData(axios.delete(`${baseUrl}/${id}`))

const updateEntry = (id, person) => getData(axios.put(`${baseUrl}/${id}`, person))

export default { getAll, createEntry, deleteEntry, updateEntry }
