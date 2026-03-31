import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminFeatureNav from '../components/admin/AdminFeatureNav';
import '../components/admin/admin.css';

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <div className="admin-shell-inner">
        <AdminSidebar />
        <main className="admin-main">
          <AdminFeatureNav />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
