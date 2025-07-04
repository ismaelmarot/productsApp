import { useState } from 'react';
import type { Product } from '../../interfaces/Product.interface';

function DetailsProduct() {
    const [productId, setProductId] = useState('');
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState('');

    const handleClose = () => {
        setProduct(null);
        setProductId('');
        setError('');
    };

    const handleSearch = async () => {
        setError('');
        setProduct(null);

        if (!productId) {
            setError('Por favor ingrese un ID válido');
            return;
        }

        try {
            const res = await fetch(`http://localhost:3001/api/products/${productId}`);
            if (!res.ok) {
                if (res.status === 404) {
                    setError("Producto no encontrado");
                } else {
                    setError("Error al buscar el producto");
                }
                return;
            }

            const data = await res.json();
            setProduct(data);
        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className='container mt-3'>
            <h2>Buscar detalles del producto</h2>

            <div className='mb-3'>
                <label htmlFor='productId' className='form-label'>ID del producto</label>
                <input
                    id='productId'
                    type='number'
                    className='form-control'
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                />
            </div>

            <button className='btn btn-primary me-2' onClick={handleSearch}>Buscar</button>
            <button className='btn btn-secondary' onClick={handleClose}>Cerrar</button>

            {error && <div className='alert alert-danger mt-3'>{error}</div>}

            {product && (
                <div className='card mt-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>Detalles del Producto</h5>
                        <p><strong>ID:</strong> {product.id}</p>
                        <p><strong>Nombre:</strong> {product.name}</p>
                        <p><strong>Precio:</strong> ${product.price}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailsProduct;
