import { useState, useEffect } from 'react';
import type { Product } from '../../../interfaces/Product.interface';
import { toInputDate } from '../../../helpers/dateHelpers';
import type { EditProductProps } from '../../../interfaces/EditProduct.interface';
import { getProductByCode, patchProduct } from '../../../api/products.api';
import { toUppercaseHelper } from '../../../helpers/toUppercaseHlper';

function EditProduct({ onUpdated }: EditProductProps) {
  const [productCode, setProductCode] = useState('');
  const [productData, setProductData] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productData) setForm(productData);
  }, [productData]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProductByCode(productCode);
      setProductData(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar producto');
      setProductData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' || name.includes('price') ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productData) return;

    try {
      await patchProduct(productData.id, form);
      alert('Producto actualizado correctamente');
      onUpdated();
    } catch (err) {
      alert('Error al actualizar producto');
    }
  };

  return (
    <div className='container'>
      <h2>Editar Producto</h2>

      {!productData && (
        <form
          className='mb-4'
          onSubmit={(e) => {
            e.preventDefault();
            fetchProduct();
          }}
        >
          <label className='form-label'>Código del producto:</label>
          <input
            type='text'
            className='form-control mb-2'
            value={productCode}
            onChange={(e) => setProductCode(toUppercaseHelper(e.target.value))}
            required
          />
          <button className='btn btn-primary' type='submit' disabled={loading}>
            {loading ? "Cargando..." : "Cargar producto"}
          </button>
          {error && <div className='text-danger mt-2'>{error}</div>}
        </form>
      )}

      {productData && (
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
            <label className='form-label'>Precio</label>
            <input
              name='price'
              type='number'
              className='form-control'
              value={form.price ?? ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Fecha de ingreso</label>
            <input
              type='date'
              name='incoming_date'
              className='form-control'
              value={toInputDate(form.incoming_date || '')}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Notas</label>
            <textarea
              name='note'
              className='form-control'
              rows={3}
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
    </div>
  );
}

export default EditProduct;
