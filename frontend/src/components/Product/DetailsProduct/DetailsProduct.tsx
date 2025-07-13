import { useState } from 'react';
import type { Product } from '../../../interfaces/Product.interface';
import FormatPrice from '../../FormattedPriceInput/FormatPrice';
import FormatDate from '../../FormatDate/FormatDate';

function DetailsProduct() {
    const [productCode, setProductCode] = useState('');
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState('');

    const handleClose = () => {
        setProduct(null);
        setProductCode('');
        setError('');
    };

    const handleSearch = async () => {
        setError('');
        setProduct(null);

        if (!productCode.trim()) {
            setError('Por favor ingrese un Código válido');
            return;
        }

        try {
            const res = await fetch(`http://localhost:3001/api/products/code/${productCode}`);
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
            <h2>Buscar detalles de un producto</h2>

            <div className='mb-3'>
                <label htmlFor='productCode' className='form-label'>Código del producto</label>
                <input
                    id='productCode'
                    type='text'
                    className='form-control'
                    value={productCode}
                    onChange={e => setProductCode(e.target.value)}
                />
            </div>

            <button className='btn btn-primary me-2' onClick={handleSearch}>Buscar</button>
            <button className='btn btn-secondary' onClick={handleClose}>Cerrar</button>

            {error && <div className='alert alert-danger mt-3'>{error}</div>}

            {product && (
                <div className='card mt-3'>
                    <div className='card-body'>
                        <h5 className='card-title text-center mb-4'>Detalles del Producto</h5>
                        
                        <p><strong>Nombre:</strong> {product.name}</p>
                        <p><strong>Categoría</strong> {product.category}</p>
                        <p><strong>Código:</strong> {product.code}</p>
                        <p><strong>Precio:</strong><FormatPrice value={product.sales_price} /></p>
                        <hr />
                        <p><strong>Fecha de ingreso:</strong> <FormatDate value={product.incoming_date} /></p>
                        <p><strong>Precio de Costo:</strong> <FormatPrice value={product.cost_price} /></p>
                        <hr />
                        <p><strong>Fecha de salida:</strong> <FormatDate value={product.outgoing_date} /></p>
                        <p><strong>Precio de Venta:</strong> <FormatPrice value={product.sales_price} /></p>
                        <p><strong>Motivo de Salida</strong> {product.reason_outgoing}</p>
                        <p><strong>Método de pago:</strong> {product.payment_method}</p>
                        <p><strong>Fecha de pago:</strong> <FormatDate value={product.payment_date} /></p>
                        <hr />
                        <p><strong>Nota:</strong> {product.note}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailsProduct;
