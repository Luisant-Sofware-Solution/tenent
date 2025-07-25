import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/superadmin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // ✅ Properly use response fields
      setMessage(`✅ Welcome, ${data.superadmin.email}`);

      // Optional: store session info
      localStorage.setItem('superadmin', JSON.stringify(data.superadmin));

      // ✅ Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setMessage('❌ Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>SuperAdmin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
