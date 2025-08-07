const BASE_URL = 'http://localhost:3001/api/users';

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
  companyId: number;
  tenantId: string;
}) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
};
export const loginUser = async (data: {
  tenantId: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return res.json();
};

export const getUsers = async (tenantId: string) => {
  const res = await fetch(`${BASE_URL}?tenantId=${tenantId}`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const deleteUser = async (tenantId: string, userId: number) => {
  const res = await fetch(`${BASE_URL}/${userId}?tenantId=${tenantId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
};

export const updateUser = async (
  tenantId: string,
  userId: number,
  data: {
    name: string;
    email: string;
    role: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/${userId}?tenantId=${tenantId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
};
