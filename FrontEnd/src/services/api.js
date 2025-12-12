import axios from 'axios';

export const loginUser = async (credentials) => {
  return axios.post('http://localhost:5000/api/auth/login', credentials, {
    withCredentials: true   // ✅ include cookies!
  });
};