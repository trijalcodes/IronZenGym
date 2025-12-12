import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://ironzengym-1.onrender.com/api/contacts', formData);
      alert('✅ Message sent successfully!');
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('❌ Failed to send message. Please try again.');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-20 px-4 md:px-20">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center text-yellow-400 mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h2>

      <motion.p
        className="text-center text-gray-400 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Have questions or want to connect? We’re just a message away. Let’s talk about your fitness and wellness goals.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="text"
                placeholder="Your Mobile Number"
                required
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Your Message"
                required
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info + Map */}
        <div className="flex flex-col justify-between gap-6">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">IronZen Studio</h3>
            <p className="text-gray-300">📍 123 Fitness Avenue, Lucknow, India</p>
            <p className="text-gray-300">📞 +91 9876543210</p>
            <p className="text-gray-300">✉ contact@ironzen.com</p>
          </div>

          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.866137693829!2d80.94615917474425!3d26.794259476711816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2b23d746227%3A0x6a0241462c5c75b4!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1616000000000"
            width="100%"
            height="280"
            className="rounded-xl border border-yellow-400"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
