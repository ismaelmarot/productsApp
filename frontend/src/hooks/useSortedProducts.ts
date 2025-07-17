import type { Product } from '../interfaces/Product.interface';

function useSortedProducts(
        products: Product[],
        sortBy: 'name' | 'price' | 'category',
        sortOrder: 'asc' | 'desc'
    ): Product[] {
    return [...products].sort((a, b) => {
        const aValue = a[sortBy] ?? '';
        const bValue = b[sortBy] ?? '';

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return sortOrder === 'asc'
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
    });
}

export default useSortedProducts;
