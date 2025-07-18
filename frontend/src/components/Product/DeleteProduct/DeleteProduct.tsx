import { useState } from 'react';
import type { DeleteProductProps } from '../../../interfaces/DeleteProduct.interface';
import { toUppercaseHelper } from '../../../helpers/toUppercaseHelper';

const renderSetData = (
    label: string,
    type: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    ) => (
        <div className='mb-3'>
            <label className="form-label">{label}:</label>
            <input
                type={type}
                className='form-control'
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );

function DeleteProduct({ onProductDeleted }: DeleteProductProps) {
    const [code, setCode] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!code.trim()) {
            alert("Código inválido");
            return;
        }

        if (!window.confirm(`¿Eliminar producto con Código "${code}"?`)) return;

        try {
            const resGet = await fetch(`http://localhost:3001/api/products/code/${code}`);
            if (!resGet.ok) {
            const errData = await resGet.json();
                alert("Error al buscar el producto: " + errData.error);
            return;
        }

        const product = await resGet.json();

        const resDelete = await fetch(`http://localhost:3001/api/products/${product.id}`, {
            method: 'DELETE'
        });

        if (resDelete.ok) {
            onProductDeleted(code);
            setCode('');
        } else {
            const data = await resDelete.json();
            alert("Error eliminando: " + data.error);
        }
        } catch (err) {
            console.error("Error eliminando producto:", err);
            alert("Error de conexión al eliminar el producto");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
        <h2>Eliminar producto existente por ID</h2>
        {renderSetData('ID', 'text', code, (e) => setCode(toUppercaseHelper(e.target.value)))}
        <button type='submit' className='btn btn-danger'>
            Eliminar
        </button>
        </form>
    );
}

export default DeleteProduct;
