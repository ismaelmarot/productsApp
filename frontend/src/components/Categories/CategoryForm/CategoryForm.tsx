import React, { useEffect, useState } from 'react';
import { createCategory, updateCategory } from '../../../api/categories.api';

interface Props {
  onSuccess: () => void;
  categoryToEdit: { id: number; name: string } | null;
  onCancel: () => void;
}

const CategoryForm: React.FC<Props> = ({ onSuccess, categoryToEdit, onCancel }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (categoryToEdit) setName(categoryToEdit.name);
    else setName('');
  }, [categoryToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryToEdit) {
      await updateCategory(categoryToEdit.id, { name });
    } else {
      await createCategory({ name });
    }
    onSuccess();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={name}
        placeholder='Nombre de categoría'
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">{categoryToEdit ? 'Actualizar' : 'Agregar'}</button>
      {categoryToEdit && <button onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default CategoryForm;