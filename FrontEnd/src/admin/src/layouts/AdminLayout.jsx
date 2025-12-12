import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminTopbar from '../Components/AdminTopbar';
import AdminSidebar from '../Components/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;