import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCompany.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CreateCompanyProps {
  setCompanyId: (id: number) => void;
  setToken: (token: string) => void;
}

const CreateCompany: React.FC<CreateCompanyProps> = ({ setCompanyId, setToken }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: '',
    adminEmail: '',
    adminPassword: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    adminEmail: '',
    adminPassword: '',
    email: '',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'register' | 'login'
  ) => {
    const { name, value } = e.target;
    if (type === 'register') {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateRegister = () => {
    let isValid = true;
    const newErrors = { name: '', adminEmail: '', adminPassword: '' };

    if (!registerData.name.trim()) {
      newErrors.name = 'Company name is required';
      isValid = false;
    }
    if (!registerData.adminEmail.trim()) {
      newErrors.adminEmail = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(registerData.adminEmail)) {
      newErrors.adminEmail = 'Invalid email format';
      isValid = false;
    }
    if (!registerData.adminPassword.trim()) {
      newErrors.adminPassword = 'Password is required';
      isValid = false;
    } else if (registerData.adminPassword.length < 6) {
      newErrors.adminPassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const validateLogin = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(loginData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!loginData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`✅ Company "${result.company.name}" registered! Please login.`);

        // Fill login fields for convenience
        setLoginData({
          email: registerData.adminEmail,
          password: registerData.adminPassword,
        });

        // Switch to login screen
        setIsLogin(true);
      } else {
        toast.error(result.error || '❌ Registration failed');
      }
    } catch (err) {
      toast.error('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: loginData.email,
          adminPassword: loginData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('✅ Login successful');

        localStorage.setItem('token', result.token);
        localStorage.setItem('companyId', result.companyId.toString());
        localStorage.setItem('tenantId', result.tenantId);

        setCompanyId(result.companyId);
        setToken(result.token);

        navigate('/user-list');
      } else {
        toast.error(result.error || '❌ Login failed');
      }
    } catch (err) {
      toast.error('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-auth-container">
      <h2>{isLogin ? 'Company Login' : 'Register Company'}</h2>

      <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={(e) => handleChange(e, 'register')}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <small className="error-text">{errors.name}</small>}
            </div>

            <div className="form-group">
              <label>Admin Email *</label>
              <input
                type="email"
                name="adminEmail"
                value={registerData.adminEmail}
                onChange={(e) => handleChange(e, 'register')}
                className={errors.adminEmail ? 'error' : ''}
              />
              {errors.adminEmail && <small className="error-text">{errors.adminEmail}</small>}
            </div>

            <div className="form-group">
              <label>Admin Password *</label>
              <input
                type="password"
                name="adminPassword"
                value={registerData.adminPassword}
                onChange={(e) => handleChange(e, 'register')}
                className={errors.adminPassword ? 'error' : ''}
              />
              {errors.adminPassword && (
                <small className="error-text">{errors.adminPassword}</small>
              )}
            </div>
          </>
        )}

        {isLogin && (
          <>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={(e) => handleChange(e, 'login')}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <small className="error-text">{errors.email}</small>}
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, 'login')}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <small className="error-text">{errors.password}</small>}
            </div>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? isLogin
              ? 'Logging in...'
              : 'Registering...'
            : isLogin
            ? 'Login'
            : 'Register'}
        </button>
      </form>

      <p className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '← New company? Register here' : '→ Already have an account? Login'}
      </p>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default CreateCompany;
