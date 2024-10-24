import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-forms.onrender.com',
  withCredentials: true,
});

export default instance;
