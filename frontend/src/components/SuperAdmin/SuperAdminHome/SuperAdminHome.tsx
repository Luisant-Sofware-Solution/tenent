import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './SuperAdminHome.scss';

const SuperAdminHome = () => {
  return (
    <div className="superadmin-container">
      <aside className="sidebar">
        <h3>SuperAdmin</h3>
        <nav>
          <NavLink to="dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="create-company" className={({ isActive }) => isActive ? 'active' : ''}>Create Company</NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminHome;