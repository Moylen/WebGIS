import axios from 'axios';
import router from '../router';
import config from '../config';

const api = axios.create({
  baseURL: config.baseAPIURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
      await router.push('/login');
    }
    return Promise.reject(error);
  },
);

export default api;
