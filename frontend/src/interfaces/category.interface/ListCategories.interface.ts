import type { Category } from './Category.interface';
export interface ListCategoriesProps {
  onViewCategory: (category: Category) => void;
  onEditCategory: (category: Category) => void;
}
