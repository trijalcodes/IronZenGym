// src/pages/Login.jsx
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png'; // use your actual gym logo path

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await loginUser(formData);
      alert(res.data.message || 'Login successful');
      localStorage.setItem("token", res.data.token);
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-sm backdrop-blur"
      >
        {/* Animated IronZen Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <img src={logo} alt="IronZen Logo" className="h-16 w-16 animate-pulse drop-shadow-xl" />
        </motion.div>

        <h2 className="text-2xl font-extrabold text-center mb-6 text-white tracking-wide">
          IronZen Admin Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-300"
        >
          Login
        </motion.button>

        {error && (
          <p className="text-red-500 mt-4 text-center text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
