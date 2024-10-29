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

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const remove = async (blog) => {
  const config = {
    headers: {
      Authorization: bearerToken
    }
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

export default { getAll, setToken, add, update, remove };
