import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../api';
import CategoryForm from '../CategoryForm/CategoryForm';

interface Category {
  id: number;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div>
      <h2>Categorías</h2>
      <CategoryForm
        onSuccess={loadCategories}
        categoryToEdit={editingCategory}
        onCancel={() => setEditingCategory(null)}
      />
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}
            <button onClick={() => setEditingCategory(cat)}>Editar</button>
            <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
