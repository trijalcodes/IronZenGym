// src/api/auth.js
import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post('https://ironzengym-1.onrender.com/api/auth/login', {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};