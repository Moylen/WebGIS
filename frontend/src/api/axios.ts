import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.defaults.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;

export default axios;