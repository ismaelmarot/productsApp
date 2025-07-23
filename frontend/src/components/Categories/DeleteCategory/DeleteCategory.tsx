// import { useState } from 'react';
// import type { DeleteCategoryProps } from '../../../interfaces/DeleteCategory.interface';
// import { toUppercaseHelper } from '../../../helpers/toUppercaseHelper';

// const renderSetData = (
//     label: string,
//     type: string,
//     value: string | number,
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//     ) => (
//         <div className='mb-3'>
//             <label className="form-label">{label}:</label>
//             <input
//                 type={type}
//                 className='form-control'
//                 value={value}
//                 onChange={onChange}
//                 required
//             />
//         </div>
//     );

// function DeleteCategory({ onCategoryDeleted}: DeleteCategoryProps) {
//     const [id, setId] = useState('');

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!id.trim()) {
//             alert("ID inválido");
//             return;
//         }

//         if (!window.confirm(`¿Eliminar Categoría con ID "${id}"?`)) return;

//         try {
//             const resGet = await fetch(`http://localhost:3001/api/category/id/${id}`);
//             if (!resGet.ok) {
//             const errData = await resGet.json();
//                 alert("Error al buscar el producto: " + errData.error);
//             return;
//         }

//         const product = await resGet.json();

//         const resDelete = await fetch(`http://localhost:3001/api/category/${product.id}`, {
//             method: 'DELETE'
//         });

//         if (resDelete.ok) {
//             onCategoryDeleted(id);
//             setId('');
//         } else {
//             const data = await resDelete.json();
//             alert("Error eliminando: " + data.error);
//         }
//         } catch (err) {
//             console.error("Error eliminando Categoría:", err);
//             alert("Error de conexión al eliminar la Categoría");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className='mb-4'>
//         <h2>Eliminar Categoría existente por ID</h2>
//         {renderSetData('ID', 'text', id, (e) => setId(toUppercaseHelper(e.target.value)))}
//         <button type='submit' className='btn btn-danger'>
//             Eliminar
//         </button>
//         </form>
//     );
// }

// export default DeleteCategory;


import { useState } from 'react';
import type { DeleteCategoryProps } from '../../../interfaces/DeleteCategory.interface';
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

function DeleteCategory({ onCategoryDeleted }: DeleteCategoryProps) {
    const [id, setId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id.trim()) {
            alert("ID inválido");
            return;
        }

        if (!window.confirm(`¿Eliminar Categoría con ID "${id}"?`)) return;

        try {
            // GET de la categoría por ID
            const resGet = await fetch(`http://localhost:3001/api/categories/${id}`);
            if (!resGet.ok) {
                const errData = await resGet.json();
                alert("Error al buscar la categoría: " + errData.error);
                return;
            }

            const category = await resGet.json();

            // DELETE de la categoría
            const resDelete = await fetch(`http://localhost:3001/api/categories/${category.id}`, {
                method: 'DELETE'
            });

            if (resDelete.ok) {
                onCategoryDeleted(id); // callback para actualizar lista
                setId('');
            } else {
                const data = await resDelete.json();
                alert("Error eliminando: " + data.error);
            }
        } catch (err) {
            console.error("Error eliminando Categoría:", err);
            alert("Error de conexión al eliminar la Categoría");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <h2>Eliminar Categoría existente por ID</h2>
            {renderSetData('ID', 'text', id, (e) => setId(toUppercaseHelper(e.target.value)))}
            <button type='submit' className='btn btn-danger'>
                Eliminar
            </button>
        </form>
    );
}

export default DeleteCategory;
