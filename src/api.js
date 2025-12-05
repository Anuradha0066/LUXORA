// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // change if different
});

// If staff logs in and you store token (e.g. in localStorage)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('staffToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
