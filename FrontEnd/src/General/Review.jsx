import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Review = () => {
  const [form, setForm] = useState({
    name: '',
    rating: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Convert rating to a number before sending
  const reviewData = {
    ...form,
    rating: parseInt(form.rating, 10), // ensures it's a number
  };

  try {
    const res = await fetch("https://ironzengym-1.onrender.com/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      alert("Thanks for your feedback!");
      setForm({ name: '', rating: '', message: '' });
    } else {
      const data = await res.json();
      alert(data.error || "Something went wrong");
    }
  } catch (err) {
    alert("Server error");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-12 flex items-center justify-center">
      <motion.div
        className="w-full max-w-2xl backdrop-blur-md bg-gray-900/60 border border-yellow-500/30 rounded-xl p-8 shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-8 tracking-wide drop-shadow-md">Share Your Experience</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 font-medium">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Rating <span className="text-red-500">*</span></label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select rating</option>
              <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
              <option value="4">⭐⭐⭐⭐ - Good</option>
              <option value="3">⭐⭐⭐ - Average</option>
              <option value="2">⭐⭐ - Poor</option>
              <option value="1">⭐ - Very Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Review Message <span className="text-red-500">*</span></label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Write your review here..."
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-black font-bold px-8 py-2 rounded-full shadow-md hover:bg-yellow-300 transition duration-300"
            >
              Submit Review
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Review;
