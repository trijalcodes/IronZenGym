import axios from 'axios';

export const loginUser = async (credentials) => {
  return axios.post('https://ironzengym-1.onrender.com/api/auth/login', credentials, {
    withCredentials: true   // ✅ include cookies!
  });
};