import axios from 'axios';
const baseUrl = '/api/blogs';

let bearerToken = '';

const setToken = (token) => {
  bearerToken = `Bearer ${token}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const add = async (data) => {
  const config = {
    headers: {
      Authorization: bearerToken
    }
  };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

export default { getAll, setToken, add };
