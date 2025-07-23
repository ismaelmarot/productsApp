import { useEffect, useState } from 'react';
import type { Category } from '../../../interfaces/Category.interface';
import type { ListCategoriesProps } from '../../../interfaces/ListCategories.interface';

function ListCategories({ onViewCategory, onEditCategory }: ListCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/categories');
        if (!res.ok) throw new Error("Error al cargar Categorías");
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Cargando Categorías...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  if (categories.length === 0) return <p>No hay Categorías disponibles.</p>;

  return (
    <div className='container'>
      <h2>Listado de Categorías</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoría</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.note || '-'}</td>
              <td>
                <button
                  className='btn btn-sm btn-primary me-2'
                  onClick={() => onViewCategory(c)}
                >
                  Ver
                </button>
                <button
                  className='btn btn-sm btn-warning'
                  onClick={() => onEditCategory(c)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCategories;
