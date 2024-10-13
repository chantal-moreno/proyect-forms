import axios from './axios';

export const signUpRequest = (user) => axios.post(`/sign-up`, user);

export const signInRequest = (user) => axios.post(`/sign-in`, user);

export const verifyTokenRequest = () => axios.get('/verify');
