import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brainbuzz-backend-1.onrender.com/', // Your FastAPI backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;