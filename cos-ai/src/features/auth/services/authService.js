import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

axios.defaults.withCredentials = true;

const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(API_URL + 'logout');
  return response.data;
};

const getMe = async () => {
  const response = await axios.get(API_URL + 'me');
  return response.data;
};

const authService = { register, login, logout, getMe };
export default authService;
