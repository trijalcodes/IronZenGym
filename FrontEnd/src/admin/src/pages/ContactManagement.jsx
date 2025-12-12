import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('https://ironzengym-1.onrender.com/api/contacts',{ withCredentials:true });
      setContacts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await axios.delete(`https://ironzengym-1.onrender.com/api/contacts/${id}`,);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };
  useEffect(() => {
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };
}, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <AdminLayout>
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Contact Messages</h2>

      {loading ? (
        <p className="text-gray-300">Loading messages...</p>
      ) : contacts.length === 0 ? (
        <p className="text-red-400">No messages found.</p>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 relative">
              <button
                onClick={() => deleteContact(contact._id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs rounded"
              >
                Delete
              </button>
              <h3 className="text-lg font-semibold text-yellow-300">{contact.name}</h3>
              <p className="text-sm text-gray-400">{contact.email} | {contact.mobile}</p>
              <p className="mt-2 text-white">{contact.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default ContactManagement;
