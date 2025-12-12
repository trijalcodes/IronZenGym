import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      delay,
    },
  },
});

const Forgotpassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You would call your email sending logic here (e.g. nodemailer endpoint)
    console.log("Password reset email sent to:", email);
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setEmail('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <motion.div
        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-lg border border-gray-700 text-white"
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.2)}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          variants={fadeIn(0.4)}
        >
          <h2 className="text-3xl font-bold">Forgot Password?</h2>
          <p className="text-gray-300 mt-2 text-sm">
            Enter your registered email to reset your password.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition duration-300"
          >
            Send Reset Link
          </button>

          <div className="text-sm text-gray-400 text-center">
            <Link to="/login" className="hover:text-yellow-400">Back to Login</Link>
          </div>

          {emailSent && (
            <motion.p
              className="text-green-400 text-center font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ Reset link sent to your email!
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Forgotpassword;
