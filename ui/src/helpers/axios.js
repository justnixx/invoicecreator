import axios from "axios";

const API_BASE_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : process.env.REACT_APP_BACKEND_URI;

const axiosInstance = axios.create({ baseURL: API_BASE_URI });

export default axiosInstance;
