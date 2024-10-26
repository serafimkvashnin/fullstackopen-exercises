import axios from 'axios';

const baseUrl = '/api/notes';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = () => getData(axios.get(baseUrl));

const create = async (note) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(baseUrl, note, config);
  return response.data;
};

const put = (id, note) => getData(axios.put(`${baseUrl}/${id}`, note));

const getData = (promise) => promise.then((response) => response.data);

export default { getAll, create, put, setToken };
