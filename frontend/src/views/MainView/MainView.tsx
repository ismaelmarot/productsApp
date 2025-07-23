import type { MainViewProps } from '../../interfaces/MainView.interface';
import ProducerViews from '../ProducerViews/ProducerViews';
import ProductViews from '../ProductViews/ProductViews';
import CategoryViews from '../CategoryViews/CategoryViews';

function MainView({
  view,
  setView,
  selectedProduct,
  setSelectedProduct,
  selectedProducer,
  setSelectedProducer,
  selectedCategory,
  setSelectedCategory,
}: MainViewProps) {
  const handleDone = () => setView('products');

  if (view.startsWith('add') || view.startsWith('edit') || view.startsWith('details') || view.startsWith('list') || view.startsWith('delete')) {
    if (view.includes('Product')) {
      return (
        <ProductViews
          view={view}
          setView={setView}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          onDone={handleDone}
        />
      );
    }

    if (view.includes('Producer')) {
      return (
        <ProducerViews
          view={view}
          setView={setView}
          selectedProducer={selectedProducer}
          setSelectedProducer={setSelectedProducer}
          onDone={handleDone}
        />
      );
    }

    if (view.includes('Category')) {
      return (
        <CategoryViews
          view={view}
          setView={setView}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onDone={handleDone}
        />
      );
    }
  }

  return <p>Selecciona una acción desde el menú.</p>;
}

export default MainView;
