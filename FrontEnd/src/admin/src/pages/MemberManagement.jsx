import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

export default function MemberManagement() {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members');
      setMembers(res.data);
    } catch (err) {
      console.error('Failed to fetch members', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 text-white bg-gray-950 min-h-screen overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6">📋 Member Management</h1>

        {/* Desktop Table (no overflow) */}
        <div className="hidden lg:block">
          <table className="w-full text-sm text-left bg-gray-900 border border-purple-800 rounded-xl">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Mobile</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Plan</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="border-t border-purple-700">
                  <td className="px-4 py-2">{member.name}</td>
                  <td className="px-4 py-2">{member.mobile}</td>
                  <td className="px-4 py-2">{member.gender}</td>
                  <td className="px-4 py-2">{member.plan}</td>
                  <td className="px-4 py-2">₹{member.price}</td>
                  <td className="px-4 py-2">{member.location}</td>
                  <td className="px-4 py-2">{new Date(member.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-400">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {members.length === 0 && (
            <div className="text-gray-400 text-center mt-4">No members found.</div>
          )}

          {members.map((member) => (
            <div key={member._id} className="bg-gray-900 p-4 rounded-lg border border-purple-800 shadow">
              <p><span className="font-semibold text-purple-400">👤 Name:</span> {member.name}</p>
              <p><span className="font-semibold text-purple-400">📱 Mobile:</span> {member.mobile}</p>
              <p><span className="font-semibold text-purple-400">🧍 Gender:</span> {member.gender}</p>
              <p><span className="font-semibold text-purple-400">🏷 Plan:</span> {member.plan}</p>
              <p><span className="font-semibold text-purple-400">💰 Price:</span> ₹{member.price}</p>
              <p><span className="font-semibold text-purple-400">📍 Location:</span> {member.location}</p>
              <p><span className="font-semibold text-purple-400">📆 Start Date:</span> {new Date(member.startDate).toLocaleDateString()}</p>
              <button
                onClick={() => handleDelete(member._id)}
                className="mt-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
