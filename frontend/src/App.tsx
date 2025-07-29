import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/SuperAdmin/Login/Login';
import Dashboard from './components/SuperAdmin/Dashboard/Dashboard';
import CreateCompany from './components/Company/Created company/CreateCompany';
import SuperAdminHome from './components/SuperAdmin/SuperAdminHome/SuperAdminHome';
import Register from './components/SuperAdmin/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/superadmin/login" element={<Login />} />
        {/* Registration route */}
        <Route path="/superadmin/register" element={<Register />} />

        {/* SuperAdmin layout with nested routes */}
        <Route path="/" element={<SuperAdminHome />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-company" element={<CreateCompany />} />
        </Route>

        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;