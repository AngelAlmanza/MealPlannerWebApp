import axios from 'axios';
import { ENVIRONMENT } from '../constants/enviroment';

const api = axios.create({
  baseURL: ENVIRONMENT.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (
    error.response && error.response.status === 401 &&
    window.location.pathname !== '/login'
  ) {
    console.error("Unauthorized access - redirecting to login");
    localStorage.removeItem('token');
    localStorage.setItem('isAuthenticated', 'false');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api
