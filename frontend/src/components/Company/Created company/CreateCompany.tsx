import React, { useState } from 'react';
import './CreateCompany.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    adminEmail: '',
    adminPassword: '',
  });

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
        const { name, tenantId } = result.company;
        toast.success(`Company "${name}" created successfully!`, {
          position: 'top-right',
        });
        setFormData({ name: '', adminEmail: '', adminPassword: '' });
      } else {
        toast.error(result.error || 'Something went wrong', {
          position: 'top-right',
        });
      }
    } catch (err) {
      toast.error('Network error', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="company-form-wrapper">
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
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateCompany;
