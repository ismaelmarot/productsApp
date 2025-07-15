import ProducerViews from '../ProducerView/ProducerView';
import ProductViews from '../ProductView/ProductView';
import type { MainViewProps } from '../../interfaces/MainView.interface';

function MainView({
  view,
  setView,
  selectedProduct,
  setSelectedProduct,
  selectedProducer,
  setSelectedProducer
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
  }

  return <p>Selecciona una acción desde el menú.</p>;
}

export default MainView;
