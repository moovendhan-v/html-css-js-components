import axios from 'axios';
import { getEnvVariable } from '@/utils/load.utils';
const baseUri = getEnvVariable('BASE_URI');

const api = axios.create({
  baseURL: baseUri, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  // You can also add other configuration options here
});

export default api;
