import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Register.scss'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/api/superadmin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Registration failed')

      setMessage('✅ Registration successful!')
      setTimeout(() => navigate('/superadmin/login'), 1000)
    } catch (err) {
      setMessage('❌ Registration failed')
    }
  }

  return (
    <div className="register-container">
      <h2>SuperAdmin Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="nav-link">
        Already have an account? <Link to="/superadmin/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
