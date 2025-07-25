import React from 'react';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome to the SuperAdmin Dashboard</h1>
        <p>You are now logged in.</p>
        {/* Add navigation or stats here */}
      </div>
    </div>
  );
};

export default Dashboard;
