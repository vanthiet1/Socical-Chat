import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://socical-chat.onrender.com/api/v1', 
  // baseURL: 'http://localhost:1000/api/v1', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});
