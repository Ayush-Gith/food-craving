import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true // This is important for sending cookies
});

export default axiosInstance;
