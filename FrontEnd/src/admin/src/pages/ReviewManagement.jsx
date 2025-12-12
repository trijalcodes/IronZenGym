import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import AdminLayout from '../layouts/AdminLayout';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews", { withCredentials: true });
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <AdminLayout>
    <motion.div
      className="p-6 text-white bg-gradient-to-r from-black via-gray-900 to-black min-h-screen"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Review Management</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
          <table className="min-w-full bg-gray-900">
            <thead className="bg-gray-800 text-yellow-400">
              <tr>
                <th className="py-3 px-3 text-left">Name</th>
                <th className="py-3 px-3 text-left">Rating</th>
                <th className="py-3 px-3 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="py-3 px-4">{review.name}</td>
                  <td className="py-3 px-4">{'⭐'.repeat(review.rating)}</td>
                  <td className="py-3 px-4">{review.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
    </AdminLayout>
  );
};

export default ReviewManagement;
