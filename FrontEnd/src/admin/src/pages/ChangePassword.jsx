// src/pages/ChangePassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../../assets/images/logo.png'; // Replace with your IronZen logo path
const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage('New passwords do not match');
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/change-password',
        formData,
        { withCredentials: true }
      );
      setMessage(res.data.message || 'Password changed successfully');

      const goToDashboard = window.confirm('Password changed successfully. Go to Dashboard?');
      if (goToDashboard) navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Password change failed');
    }
  };
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center px-4">
      {/* Logo Animation */}
      <motion.img
        src={logo}
        alt="IronZen Logo"
        className="w-24 h-24 mb-6"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <motion.form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide text-indigo-500">
          Change Password
        </h2>

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded-lg font-semibold tracking-wide"
        >
          Update Password
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-rose-400">{message}</p>
        )}
      </motion.form>
    </div>
  );
};

export default ChangePassword;
