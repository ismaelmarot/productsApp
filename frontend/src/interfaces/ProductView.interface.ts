import type { View } from '../types/View';
import type { Product } from '../interfaces/Product.interface';

export interface ProductViewsProps {
  view: View;
  setView: (view: View) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  onDone: () => void;
}
