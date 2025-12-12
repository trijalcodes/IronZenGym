import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

export default function PlanManagement() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    title: '',
    duration: '',
    price: '',
    benefits: ''
  });

  const fetchPlans = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/plans');
      setPlans(res.data);
    } catch (err) {
      console.error('Failed to fetch plans', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/plans/${id}`);
      setPlans((prev) => prev.filter((plan) => plan._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/plans', newPlan);
      setPlans((prev) => [...prev, res.data.plan]);
      setNewPlan({ title: '', duration: '', price: '', benefits: '' });
    } catch (err) {
      console.error('Create failed', err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 bg-gray-950 text-white min-h-screen overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6">📦 Plan Management</h1>

        {/* Add Plan Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            name="title"
            value={newPlan.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 rounded bg-gray-800 border border-purple-600 focus:outline-none"
            required
          />
          <input
            type="number"
            name="duration"
            value={newPlan.duration}
            onChange={handleChange}
            placeholder="Duration (months)"
            className="p-2 rounded bg-gray-800 border border-purple-600 focus:outline-none"
            required
          />
          <input
            type="number"
            name="price"
            value={newPlan.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 rounded bg-gray-800 border border-purple-600 focus:outline-none"
            required
          />
          <input
            type="text"
            name="benefits"
            value={newPlan.benefits}
            onChange={handleChange}
            placeholder="Benefits"
            className="p-2 rounded bg-gray-800 border border-purple-600 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 lg:col-span-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded transition"
          >
            Add Plan
          </button>
        </form>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="w-full bg-gray-900 border border-purple-700 text-sm rounded-lg overflow-hidden">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Duration (months)</th>
                <th className="px-4 py-2">Price (₹)</th>
                <th className="px-4 py-2">Benefits</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan._id} className="border-t border-purple-700">
                  <td className="px-4 py-2">{plan.title}</td>
                  <td className="px-4 py-2">{plan.duration}</td>
                  <td className="px-4 py-2">₹{plan.price}</td>
                  <td className="px-4 py-2">{plan.benefits}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-4">No plans found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-gray-900 border border-purple-700 p-4 rounded-lg shadow text-sm"
            >
              <p><span className="text-purple-400 font-semibold">Title:</span> {plan.title}</p>
              <p><span className="text-purple-400 font-semibold">Duration:</span> {plan.duration} months</p>
              <p><span className="text-purple-400 font-semibold">Price:</span> ₹{plan.price}</p>
              <p><span className="text-purple-400 font-semibold">Benefits:</span> {plan.benefits}</p>
              <button
                onClick={() => handleDelete(plan._id)}
                className="mt-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
              >
                Delete
              </button>
            </div>
          ))}
          {plans.length === 0 && (
            <div className="text-center text-gray-400">No plans available.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
