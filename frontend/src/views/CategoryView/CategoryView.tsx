import type { CategoryViewProps } from '../../interfaces/CategoryView.interface';
import AddCategory from '../../components/Categories/AddCategory/AddCategory';

function CategoryViews({ view, setView, selectedCategory, setSelectedCategory, onDone }: CategoryViewProps) {
  switch (view) {
    case 'addCategory':
      return <AddCategory onCategoryAdded={(c) => setSelectedCategory(c)} />;
    default:
      return null;
  }
}

export default CategoryViews;
