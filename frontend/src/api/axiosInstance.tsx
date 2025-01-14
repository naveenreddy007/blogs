// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000', // Replace with your base URL
  // https://userflowbackend.onrender.com/
     baseURL: 'https://userflowbackend.onrender.com/', 
  timeout: 10000, // Optional timeout
});

export default axiosInstance;
