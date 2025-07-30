import React, { useState } from 'react';
import './CreateCompany.scss';

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    adminEmail: '',
    adminPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const {
          name,
          tenantId,
          dbUrl,
          status,
          createdAt,
          adminEmail,
          id,
        } = result.company;

        const schema = dbUrl?.split('schema=')[1] || 'N/A';
        const formattedDate = new Date(createdAt).toLocaleString();

//         setMessage(
//           `✅ Company "${name}" created successfully!
// • ID: ${id}
// • Admin Email: ${adminEmail}
// • Tenant ID: ${tenantId}
// • Database Schema: ${schema}
// • Status: ${status ? 'Active' : 'Inactive'}
// • Created At: ${formattedDate}`
//         );

        setError('');
        setFormData({ name: '', adminEmail: '', adminPassword: '' });
      } else {
        setError(result.error || 'Something went wrong');
        setMessage('');
      }
    } catch (err) {
      setError('Network error');
      setMessage('');
    }
  };

  return (
    <form className="company-form" onSubmit={handleSubmit}>
      <h2>Create Company</h2>

      <input
        type="text"
        name="name"
        placeholder="Company Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="adminEmail"
        placeholder="Admin Email"
        value={formData.adminEmail}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="adminPassword"
        placeholder="Admin Password"
        value={formData.adminPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>

      {message && <pre className="success">{message}</pre>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CreateCompany;
