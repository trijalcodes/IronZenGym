import React, { useState } from 'react';
import { FaTachometerAlt, FaUser, FaEnvelope, FaPlus, FaList, FaLock, FaSignOutAlt, FaBars } from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/Dashboard' },
  { name: 'Contact Management', icon: <FaEnvelope />, path: '/ContactManagement' },
  { name: 'Member Management', icon: <FaUser />, path: '/MemberManagement' },
  { name: 'Plan Management', icon: <FaList />, path: '/PlanManagement' },
  { name: 'Change Password', icon: <FaLock />, path: '/ChangePassword' },
  { name: 'Reviews', icon: <FaLock />, path: '/review-management' },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className={`${isOpen ? 'w-auto' : 'w-16'} bg-gray-950 h-screen p-4 relative`}>
        {/* Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu Items */}
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4 hover:bg-gray-700 rounded-lg">
              <a href={item.path} className="flex items-center gap-3 px-3 py-2">
                <span className="text-yellow-400">{item.icon}</span>
                {isOpen && <span className="text-sm">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
    
    </div>
  );
};

export default AdminSidebar;
