import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const AdminTopbar = ({ toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuToggle = () => setMenuOpen(prev => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      const res = await fetch("https://ironzengym-1.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Logout failed");
        } else {
          throw new Error("Logout failed: Unexpected server response");
        }
      }

      const data = await res.json();
      alert(data.message || "Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
      alert(err.message || "Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-950 text-white px-4 py-2 shadow-md relative z-10">
      <h2 className="text-xl font-semibold">Admin Panel</h2>

      <div className="relative" ref={menuRef}>
        <button onClick={handleMenuToggle} className="text-3xl focus:outline-none">
          <IoPersonCircleOutline />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg py-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              <FiLogOut className="text-red-500" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar;
