import type { Product } from './Product.interface';

export interface ListProductsProps {
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
}
