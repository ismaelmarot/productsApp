import { useState, useEffect } from 'react';
import type { Category } from '../../../interfaces/category.interface/Category.interface';
import type { EditCategoryProps } from '../../../interfaces/category.interface/EditCategory.interface';

function EditCategory({ onUpdated }: EditCategoryProps) {
  const [categoryId, setCategoryId] = useState('');
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [form, setForm] = useState<Partial<Category>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (categoryData) setForm(categoryData);
  }, [categoryData]);

  useEffect(() => {
  }, [form.name, form.note]);

  const fetchCategory = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:3001/api/categories/${categoryId}`);
      if (!res.ok) throw new Error("Categoría no encontrado");
      const data = await res.json();
      setCategoryData(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar la Categoría");
      setCategoryData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryData) return;

    try {
      const res = await fetch(`http://localhost:3001/api/categories/${categoryData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al actualizar Categoría");

      alert("Categoría actualizada correctamente");
      onUpdated();
    } catch (err) {
      alert("Error al actualizar la Catgoría");
    }
  };

  return (
    <>
      <h2>Editar Categoría</h2>

      {/* Ingreso de ID */}
      {!categoryData && (
        <form
          className='mb-4'
          onSubmit={(e) => {
            e.preventDefault();
            fetchCategory();
          }}
        >
          <label className='form-label'>ID de la Categoría:</label>
          <input
            type='number'
            className='form-control mb-2'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
          <button className='btn btn-primary' type='submit' disabled={loading}>
            {loading ? "Cargando..." : "Cargar Categoría"}
          </button>
          {error && <div className='text-danger mt-2'>{error}</div>}
        </form>
      )}

      {/* Formulario de edición */}
      {categoryData && (
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Nombre</label>
            <input
              name='name'
              type='text'
              className='form-control'
              value={form.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Nota</label>
            <input
              name='note'
              type='text'
              className='form-control'
              value={form.note || ''}
              onChange={handleChange}
            />
          </div>
          <div className='d-flex gap-2'>
            <button className='btn btn-success' type='submit'>
              Guardar Cambios
            </button>
            <button
              className='btn btn-secondary'
              type='button'
              onClick={onUpdated}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditCategory;
