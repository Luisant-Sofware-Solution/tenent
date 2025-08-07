import React, { useEffect, useState } from 'react';
import './CompanyList.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaToggleOn,
  FaToggleOff,
} from 'react-icons/fa';

interface Company {
  id: number;
  name: string;
  tenantId: string;
  adminEmail: string;
  status: boolean;
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    adminEmail: '',
    status: false,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view companies');
        return;
      }

      const res = await fetch('http://localhost:3001/api/companies', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        const sorted = data.sort((a: Company, b: Company) => a.id - b.id);
        setCompanies(sorted);
      } else {
        toast.error(data.error || 'Failed to fetch companies');
      }
    } catch (err) {
      toast.error('Failed to fetch companies');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to perform this action');
        return;
      }

      const res = await fetch(`http://localhost:3001/api/companies/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setCompanies((prev) => prev.filter((c) => c.id !== id));
        toast.success('Company deleted!');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to delete company');
      }
      setConfirmDeleteId(null);
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleEdit = (company: Company) => {
    setEditId(company.id);
    setEditForm({
      name: company.name,
      adminEmail: company.adminEmail,
      status: company.status,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusToggle = () => {
    setEditForm((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleUpdate = async () => {
    if (editId === null) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to perform this action');
        return;
      }

      const res = await fetch(`http://localhost:3001/api/companies/${editId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const updated = await res.json();
        setCompanies((prev) =>
          prev.map((c) => (c.id === editId ? updated.company : c))
        );
        toast.success('Company updated!');
        setEditId(null);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to update company');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleCancelEdit = () => setEditId(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="company-list-wrapper">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <h2>Company List</h2>

      <table className="company-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Tenant ID</th>
            <th>Admin Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>
                {editId === company.id ? (
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  company.name
                )}
              </td>
              <td>{company.tenantId}</td>
              <td>
                {editId === company.id ? (
                  <input
                    name="adminEmail"
                    value={editForm.adminEmail}
                    onChange={handleInputChange}
                  />
                ) : (
                  <a href={`mailto:${company.adminEmail}`}>
                    {company.adminEmail}
                  </a>
                )}
              </td>
              <td>
                {editId === company.id ? (
                  <button
                    className={editForm.status ? 'status-on' : 'status-off'}
                    onClick={handleStatusToggle}
                  >
                    {editForm.status ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                ) : company.status ? (
                  <span className="active-status">
                    <FaCheckCircle /> Active
                  </span>
                ) : (
                  <span className="inactive-status">
                    <FaTimesCircle /> Inactive
                  </span>
                )}
              </td>
              <td>
                {editId === company.id ? (
                  <>
                    <button className="edit-btn" onClick={handleUpdate}>
                      <FaSave /> Save
                    </button>
                    <button className="delete-btn" onClick={handleCancelEdit}>
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(company)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setConfirmDeleteId(company.id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmDeleteId !== null && (
        <div className="confirm-popup">
          <div className="popup-content">
            <p>❓ Are you sure you want to delete this company?</p>
            <div className="popup-actions">
              <button onClick={() => handleDelete(confirmDeleteId)}>✅ Yes</button>
              <button onClick={() => setConfirmDeleteId(null)}>❌ No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList;