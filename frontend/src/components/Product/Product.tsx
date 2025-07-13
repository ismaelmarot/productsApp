import { useEffect, useState } from 'react';
import type { Product } from '../../interfaces/Product.interface';
import AddProduct from './AddProduct/AddProduct';


function Products() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleProductAdded = (newProduct: Product) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    return (
        <div className='container mt-4'>
            <h2>Lista de Productos</h2>
            <AddProduct onProductAdded={handleProductAdded} />
            <ul className='list-group'>
                {products.map((product) => (
                    <li key={product.id} className='list-group-item'>
                        <strong>{ product.name }</strong> - ${ product.price }
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
