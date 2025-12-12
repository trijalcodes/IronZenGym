import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Member() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    plan: '',
    price: '',
    address: '',
    location: ''
  });

  const [plans, setPlans] = useState([]);

  // Fetch available plans from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/plans')
      .then((res) => {
        setPlans(res.data);
      })
      .catch((err) => {
        console.error('Error fetching plans:', err);
      });
  }, []);

  // Auto-fill price when plan changes
  useEffect(() => {
    const selected = plans.find(p => p.title === formData.plan);
    if (selected) {
      setFormData(prev => ({ ...prev, price: selected.price }));
    }
  }, [formData.plan, plans]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/members', formData);
      alert('🎉 Member added successfully!');
      setFormData({ name: '', mobile: '', gender: '', plan: '', price: '', address: '', location: '' });
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error submitting form');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-lg animate-fade-in border border-purple-700/20">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6 tracking-wide">
          Become a Member at <span className="text-emerald-400">IronZen</span>
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="inputStyle" />
          <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className="inputStyle" />
          
          <select name="gender" value={formData.gender} onChange={handleChange} className="inputStyle">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select name="plan" value={formData.plan} onChange={handleChange} className="inputStyle">
            <option value="">Choose a Plan</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan.title}>
                {plan.title} ({plan.duration} month{plan.duration > 1 ? 's' : ''})
              </option>
            ))}
          </select>

          <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Plan Price" className="inputStyle" readOnly />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Preferred Location" className="inputStyle" />
          
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="inputStyle md:col-span-2" />

          <button type="submit" className="md:col-span-2 mt-2 bg-gradient-to-r from-purple-700 to-emerald-600 hover:from-emerald-600 hover:to-purple-700 transition-all duration-300 p-3 rounded-xl font-bold shadow-xl hover:shadow-purple-500/30">
            Submit Membership
          </button>
        </form>
      </div>
    </div>
  );
}
