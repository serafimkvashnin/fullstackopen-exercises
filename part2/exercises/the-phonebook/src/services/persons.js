import axios from 'axios';

const baseUrl = '/api/persons';

const getData = (promise) => promise.then((response) => response.data);

const getAll = () => getData(axios.get(baseUrl));

const createEntry = (person) => axios.post(baseUrl, person);

const deleteEntry = (id) => getData(axios.delete(`${baseUrl}/${id}`));

const updateEntry = (id, person) => axios.put(`${baseUrl}/${id}`, person);

export default { getAll, createEntry, deleteEntry, updateEntry };
