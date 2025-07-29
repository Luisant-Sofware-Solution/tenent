import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.scss'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/superadmin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Invalid login')

      // ✅ Store token and user in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('superadmin', JSON.stringify(data.superadmin))

      setMessage(`✅ Welcome ${data.superadmin.name || data.superadmin.email}`)

      // Redirect after short delay
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (err: any) {
      console.error('Login failed:', err)
      setMessage('❌ Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="login-container">
      <h2>SuperAdmin Login</h2>

      <label>Email:</label>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <div className="password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      <button onClick={handleLogin}>Login</button>
      {message && <p className="message">{message}</p>}

      <p className="nav-link">
        Don&apos;t have an account? <Link to="/superadmin/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
