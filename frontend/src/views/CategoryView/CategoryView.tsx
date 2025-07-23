import type { CategoryViewProps } from '../../interfaces/CategoryView.interface';
import AddCategory from '../../components/Categories/AddCategory/AddCategory';
import DetailsCategory from '../../components/Categories/DetailsCategory/DetailsCategory';

function CategoryViews({ view, setView, selectedCategory, setSelectedCategory, onDone }: CategoryViewProps) {
  switch (view) {
    case 'addCategory':
      return <AddCategory onCategoryAdded={(c) => setSelectedCategory(c)} />;
    case 'detailsCategory':
      return <DetailsCategory />;
    default:
      return null;
  }
}

export default CategoryViews;
