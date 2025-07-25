import React, { useState } from 'react';
import './CreateCompany.scss';

const CreateCompany = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error('Failed to create company');

      const data = await res.json();
      setMessage(`✅ Company created: ${data.id}`);
      setName('');
    } catch (err) {
      setMessage('❌ Failed to create company');
    }
  };

  return (
    <div className="create-company-container">
      <div className="create-company-card">
        <h2>Create Company</h2>
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default CreateCompany;
