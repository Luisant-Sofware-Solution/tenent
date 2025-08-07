import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../../api/user';
import './UserForm.scss';

interface Props {
  onSuccess: (user?: any) => void;
  companyId: number;
  tenantId: string;
}

export default function UserAuthForm({ onSuccess, companyId, tenantId }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    termsAccepted: false,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // ✅ Add navigation hook

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!form.email || !form.password) {
      setError('⚠️ Email and password are required.');
      return;
    }

    if (!isLogin && !form.termsAccepted) {
      setError('⚠️ Please accept the terms & conditions.');
      return;
    }

    try {
      if (isLogin) {
        const result = await loginUser({
          tenantId,
          email: form.email,
          password: form.password,
        });
        setMessage('✅ Login successful!');
        onSuccess(result.user);
        navigate('/dashboard'); // ✅ Redirect after login
      } else {
        await createUser({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          companyId,
          tenantId,
        });
        setMessage('✅ User registered successfully!');
        onSuccess();
        navigate('/dashboard'); // ✅ Redirect after registration
      }

      setForm({
        name: '',
        email: '',
        password: '',
        role: '',
        termsAccepted: false,
      });

      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || '❌ Operation failed.');
    }
  };

  return (
    <div className="form-background">
      <form onSubmit={handleSubmit} className="user-form">
        <h3>{isLogin ? 'Login' : 'Register'}</h3>
        {message && <div className="alert success">{message}</div>}
        {error && <div className="alert error">{error}</div>}

        {!isLogin && (
          <div className="form-field">
            <label>Name:</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
        )}

        <div className="form-field">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <>
            <div className="form-field">
              <label>Role:</label>
              <select name="role" value={form.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="form-field checkbox">
              <label>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                />{' '}
                Accept Terms & Conditions
              </label>
            </div>
          </>
        )}

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

        <p className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'New user? Register here' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
}
