import axios from "axios"

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => getData(axios.get(baseUrl))

const create = (note) => getData(axios.post(baseUrl, note))

const patch = (id, note) => getData(axios.patch(`${baseUrl}/${id}`, note))

const getData = (promise) => promise.then(response => response.data) 

export default { getAll, create, patch }