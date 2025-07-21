import type { View } from '../types/View';
import type { Category } from '../interfaces/Category.interface';

export interface CategoryViewProps {
  view: View;
  setView: (view: View) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (c: Category | null) => void;
  onDone: () => void;
}
