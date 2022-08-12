import axios from 'axios';

const API = axios.create({ baseURL: 'https://localhost:1234' });

API.interceptors.response.use(undefined, (err) => {
  if (err.response?.status === 500) {
    return Promise.reject(new Error('Error interno del servidor'));
  }
  return Promise.reject(err);
});

export default API;