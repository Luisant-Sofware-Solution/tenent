const BASE_URL = 'http://localhost:3001/api/categories';

export const fetchCategories = async (companyId: number) => {
  const res = await fetch(`${BASE_URL}/${companyId}`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchCategoryById = async (companyId: number, id: number) => {
  const res = await fetch(`${BASE_URL}/${companyId}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json();
};

export const createCategory = async (data: { category: string; companyId: number }) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
};

export const updateCategory = async (companyId: number, id: number, category: string) => {
  const res = await fetch(`${BASE_URL}/${companyId}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category }),
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
};

export const deleteCategory = async (companyId: number, id: number) => {
  const res = await fetch(`${BASE_URL}/${companyId}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return res.json();
};
