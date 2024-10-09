import axios from 'axios';

const API = 'http://localhost:3000';

export const signUpRequest = (user) => axios.post(`${API}/sign-up`, user);
