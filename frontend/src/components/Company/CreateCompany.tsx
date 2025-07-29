import React, { useState } from 'react'
import axios from 'axios'
import './CreateCompany.scss'

type CompanyResponse = {
  id: number
  tenantId: string
  name: string
  adminEmail: string
  dbUrl: string
  status: boolean
  createdAt: string
}

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    adminEmail: '',
    adminPassword: '',
    dbUrl: '',
  })

  const [message, setMessage] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [useCustomDbUrl, setUseCustomDbUrl] = useState(false)

  const generateDbUrl = (companyName: string) => {
    const dbName = companyName.trim().toLowerCase().replace(/\s+/g, '_')
    return `postgresql://username:password@localhost:5432/${dbName}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dbUrl = useCustomDbUrl ? formData.dbUrl : generateDbUrl(formData.name)

    try {
      const res = await axios.post<CompanyResponse>(
        'http://localhost:3001/api/companies',
        {
          ...formData,
          dbUrl,
        }
      )
      setMessage(`✅ Company "${res.data.name}" created successfully!`)
      setFormData({ name: '', adminEmail: '', adminPassword: '', dbUrl: '' })
    } catch (err: any) {
      setMessage(`❌ Error: ${err.response?.data?.error || 'Something went wrong'}`)
    }
  }

  return (
    <div className="company-form-container">
      <h2>🚀 Create New Company</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            name="name"
            placeholder="e.g. MyCompany Pvt Ltd"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Admin Email:
          <input
            type="email"
            name="adminEmail"
            placeholder="admin@company.com"
            value={formData.adminEmail}
            onChange={handleChange}
            required
          />
        </label>

        <label className="password-field">
          Admin Password:
          <input
            type={showPassword ? 'text' : 'password'}
            name="adminPassword"
            placeholder="••••••••"
            value={formData.adminPassword}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={useCustomDbUrl}
            onChange={() => setUseCustomDbUrl(!useCustomDbUrl)}
          />
          &nbsp;Use custom database URL
        </label>

        {useCustomDbUrl && (
          <label>
            Database URL:
            <input
              type="text"
              name="dbUrl"
              placeholder="postgresql://..."
              value={formData.dbUrl}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <button type="submit">Create Company</button>
      </form>

      {message && (
        <p className={message.startsWith('✅') ? 'success' : 'error'}>{message}</p>
      )}
    </div>
  )
}

export default CreateCompany
