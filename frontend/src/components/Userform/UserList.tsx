import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../../api/user';
import { User } from '../../types/User';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaUserShield,
  FaUser,
} from 'react-icons/fa';
import './UserList.scss';

interface Props {
  tenantId: string;
}

const UserList: React.FC<Props> = ({ tenantId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await getUsers(tenantId);
      setUsers(data);
    } catch (err) {
      toast.error('❌ Failed to fetch users');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(tenantId, id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success('✅ User deleted!');
    } catch (err) {
      toast.error('❌ Failed to delete user');
    }
    setConfirmDeleteId(null);
  };

  const handleEdit = (user: User) => {
    setEditId(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (editId === null) return;
    try {
      const updated = await updateUser(tenantId, editId, editForm);
      setUsers((prev) =>
        prev.map((u) => (u.id === editId ? updated.user : u))
      );
      toast.success('✅ User updated!');
      setEditId(null);
    } catch (err) {
      toast.error('❌ Failed to update user');
    }
  };

  const handleCancelEdit = () => setEditId(null);

  useEffect(() => {
    fetchUsers();
  }, [tenantId]);

  return (
    <div className="user-list-wrapper">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <h2>User List</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editId === user.id ? (
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <input
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <select
                    name="role"
                    value={editForm.role}
                    onChange={handleInputChange}
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                ) : (
                  <span className={`badge ${user.role}`}>
                    {user.role === 'admin' ? (
                      <>
                        <FaUserShield /> Admin
                      </>
                    ) : (
                      <>
                        <FaUser /> User
                      </>
                    )}
                  </span>
                )}
              </td>
              <td>
                {editId === user.id ? (
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
                    <button className="edit-btn" onClick={() => handleEdit(user)}>
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setConfirmDeleteId(user.id)}
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
            <p>❓ Are you sure you want to delete this user?</p>
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

export default UserList;
