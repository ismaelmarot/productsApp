import type { View } from '../types/View';
import type { Producer } from './Producer.interface';
import type { Product } from './Product.interface';
import type { Category } from './Category.interface';
export interface MainViewProps {
    view: View;
    setView: (view: View) => void;
    selectedProduct: Product | null;
    setSelectedProduct: (p: Product | null) => void;
    selectedProducer: Producer | null;
    setSelectedProducer: (p: Producer | null) => void;
    selectedCategory: Category | null;
    setSelectedCategory: (c: any) => void;
}
