import type { Category } from '../interfaces/category.interface/Category.interface';

const API_URL = 'http://localhost:3001/api/categories';

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error fetching categories");
  return res.json();
}

export async function addCategory(name: string, note: string): Promise<Category> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, note }),
  });
  if (!res.ok) throw new Error("Error adding category");
  return res.json();
}

export async function updateCategory(id: number, name: string, note: string): Promise<Category> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, note }),
  });
  if (!res.ok) throw new Error('Error updating category');
  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error("Error deleting category");
}
