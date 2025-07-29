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
    status: true, // ✅ default to true (active)
  })

  const [message, setMessage] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post<CompanyResponse>(
        'http://localhost:3001/api/companies',
        formData
      )
      setMessage(`✅ Created: ${res.data.name}`)
    } catch (err: any) {
      setMessage(`❌ Error: ${err.response?.data?.error || 'Something went wrong'}`)
    }
  }

  return (
    <div className="company-form-container">
      <h2>Create Company</h2>
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
            type="password"
            name="adminPassword"
            placeholder="••••••••"
            value={formData.adminPassword}
            onChange={handleChange}
            required
          />
        </label>

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

        <label>
          Active Status:
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />{' '}
          {formData.status ? '✅ Active' : '⛔ Inactive'}
        </label>

        <button type="submit">Create Company</button>
      </form>

      {message && (
        <p className={message.startsWith('✅') ? 'success' : 'error'}>
          {message}
        </p>
      )}

      {/* 🔍 Sample Preview for Debugging */}
      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <h4>🧾 Sample Form Data:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  )
}

export default CreateCompany
