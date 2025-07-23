import { useEffect, useState } from 'react';
import type { Category } from '../../../interfaces/Category.interface';
import { getCategories } from '../../../api/categories.api';

function ListCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  if (categories.length === 0) return <p>No hay Categorías disponibles.</p>;

  return (
    <div className='container'>
      <h2>Listado de Categorías</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.note || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCategories;
