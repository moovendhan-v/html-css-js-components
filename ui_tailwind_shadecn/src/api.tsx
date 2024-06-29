import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/', // Replace with your API base URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  // You can also add other configuration options here
});

export default api;
