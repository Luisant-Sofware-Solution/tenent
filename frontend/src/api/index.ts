// src/api/index.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Make sure this matches your backend routes
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
