import axios from 'axios';

const API_BASE_URI = import.meta.env.DEV
  ? 'http://localhost:5000'
  : import.meta.env.VITE_APP_BACKEND_URI;

const axiosInstance = axios.create({ baseURL: API_BASE_URI });

export default axiosInstance;
