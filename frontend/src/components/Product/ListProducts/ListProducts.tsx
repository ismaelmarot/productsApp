import { useEffect, useState } from 'react';
import type { Product } from '../../../interfaces/Product.interface';
import type { ListProductsProps } from '../../../interfaces/ListProducts.interface';

function ListProducts({ onViewProduct, onEditProduct }: ListProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  if (products.length === 0) return <p>No hay productos disponibles.</p>;

  return (
    <div className='container'>
      <h2>Listado de productos</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category || '-'}</td>
              <td>
                <button
                  className='btn btn-sm btn-primary me-2'
                  onClick={() => onViewProduct(p)}
                >
                  Ver
                </button>
                <button
                  className='btn btn-sm btn-warning'
                  onClick={() => onEditProduct(p)}
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

export default ListProducts;
