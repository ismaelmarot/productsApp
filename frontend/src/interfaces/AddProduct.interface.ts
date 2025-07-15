import type { Product } from './Product.interface';

export interface AddProductProps {
    onProductAdded: (newProduct: Product) => void;
}
