import React, { useEffect, useState } from 'react';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../api/categoryApi';
import './CategoryManager.scss';

interface Category {
  id: number;
  category: string;
  companyId: number;
}

interface Props {
  companyId: number;
  tenantId: string;
}

const ITEMS_PER_PAGE = 5;

const CategoryManager: React.FC<Props> = ({ companyId }) => {
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories(companyId);
      setCategories(data);
    } catch {
      alert('❌ Failed to load categories');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await updateCategory(companyId, editingId, categoryInput);
        setEditingId(null);
      } else {
        await createCategory({ category: categoryInput, companyId });
      }
      setCategoryInput('');
      loadCategories();
    } catch {
      alert('❌ Failed to save category');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this category?')) {
      await deleteCategory(companyId, id);
      loadCategories();
    }
  };

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const paginated = categories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="category-manager">
      <h2>📁 Category Manager</h2>

      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder="Enter category"
          required
        />
        <button type="submit">{editingId !== null ? 'Update' : 'Create'}</button>
        {editingId !== null && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditingId(null);
              setCategoryInput('');
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="category-list">
        {paginated.map((cat) => (
          <li key={cat.id}>
            <span>{cat.category}</span>
            <div className="actions">
              <button onClick={() => {
                setEditingId(cat.id);
                setCategoryInput(cat.category);
              }}>✏️</button>
              <button onClick={() => handleDelete(cat.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
