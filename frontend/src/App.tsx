import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/SuperAdmin/Login/Login';
import Dashboard from './components/SuperAdmin/Dashboard/Dashboard';
import CreateCompany from './components/SuperAdmin/CreateCompany/CreateCompany';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-company" element={<CreateCompany />} />
        
      </Routes>
    </Router>
  );
}

export default App;
