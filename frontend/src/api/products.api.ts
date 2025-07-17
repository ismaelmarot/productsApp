import type { Product } from '../interfaces/Product.interface';

const API_URL = 'http://localhost:3001/api/products';

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error fetching products");
    return res.json();
}

export async function patchProduct(id: number, productData: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Error updating product');
  return res.json();
}

export async function getProductByCode(code: string): Promise<Product> {
  const res = await fetch(`${API_URL}/code/${code}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function addProduct(product: Product): Promise<Product> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Error adding product");
    return res.json();
}

export async function updateProduct(id: number, product: Product): Promise<Product> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Error updating product");
    return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Error deleting product");
}
