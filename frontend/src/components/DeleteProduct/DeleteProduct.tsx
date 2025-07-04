import { useState } from 'react';

interface Props {
    onProductDeleted: (deletedId: number) => void;
}

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

function DeleteProduct({ onProductDeleted }: Props) {
    const [id, setId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const numericId = parseInt(id);

        if (isNaN(numericId)) {
            alert("ID inválido");
            return;
        }

        if (!window.confirm(`¿Eliminar producto #${numericId}?`)) return;

        try {
        const res = await fetch(
            `http://localhost:3001/api/products/${numericId}`,
            { method: "DELETE" }
        );

        if (res.ok) {
            onProductDeleted(numericId);
            setId('');
        } else {
            const data = await res.json();
            alert("Error eliminando: " + data.error);
        }
        } catch (err) {
            console.error("Error eliminando producto:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
        <h2>Eliminar producto por ID</h2>
        {renderSetData('ID', 'number', id, (e) => setId(e.target.value))}
        <button type='submit' className='btn btn-danger'>
            Eliminar
        </button>
        </form>
    );
}

export default DeleteProduct;
