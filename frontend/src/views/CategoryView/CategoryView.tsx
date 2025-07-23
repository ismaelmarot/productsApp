import type { CategoryViewProps } from '../../interfaces/CategoryView.interface';
import AddCategory from '../../components/Categories/AddCategory/AddCategory';
import DetailsCategory from '../../components/Categories/DetailsCategory/DetailsCategory';
import EditCategory from '../../components/Categories/EditCategory/EditCategory';
import ListCategories from '../../components/Categories/ListCategories/ListCategory';
import DeleteCategory from '../../components/Categories/DeleteCategory/DeleteCategory';

function CategoryViews({ view, setView, selectedCategory, setSelectedCategory, onDone }: CategoryViewProps) {
  switch (view) {
    case 'addCategory':
      return <AddCategory onCategoryAdded={(c) => setSelectedCategory(c)} />;
    case 'detailsCategory':
      return <DetailsCategory />;
    case 'editCategory':
      return <EditCategory onUpdated={onDone} />;
    case 'listCategories':
      return (
        <ListCategories
          onViewCategory={(category) => {
            setSelectedCategory(category);
            setView('detailsCategory');
          }}
          onEditCategory={(category) => {
            setSelectedCategory(category);
            setView('editCategory');
          }}
        />
      );
    case 'deleteCategory':
      return (
        <DeleteCategory
             onCategoryDeleted={(name) => {
            alert(`Categoría eliminada: ${name}`);
            onDone();
          }}
        />
      );
    default:
      return null;
  }
}

export default CategoryViews;
