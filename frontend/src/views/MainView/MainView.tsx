// import AddProduct from '../../components/Product/AddProduct/AddProduct';
// import DetailsProduct from '../../components/Product/DetailsProduct/DetailsProduct';
// import EditProduct from '../../components/Product/EditProduct/EditProduct';
// import ListProducts from '../../components/Product/ListProducts/ListProducts';
// import DeleteProduct from '../../components/Product/DeleteProduct/DeleteProduct';

// import AddProducer from '../../components/Producer/AddProducer/AddProducer';
// import DetailsProducer from '../../components/Producer/DetailsProducer/DetailsProducer';
// import EditProducer from '../../components/Producer/EditProducer/EditProducer';
// import ListProducers from '../../components/Producer/ListProducers/ListProducers';
// import DeleteProducer from '../../components/Producer/DeleteProducer/DeleteProducer';

// import type { Product } from '../../interfaces/Product.interface';
// import type { Producer } from '../../interfaces/Producer.interface';
// import type { View } from '../../components/types/View';

// interface Props {
//   view: View;
//   setView: (v: View) => void;
//   setSelectedProduct: (p: Product | null) => void;
//   setSelectedProducer: (p: Producer | null) => void;
// }

// function MainView({ view, setView, setSelectedProduct, setSelectedProducer }: Props) {
//   const handleDone = () => setView('products');

//   switch (view) {
//     case 'addProduct':
//       return <AddProduct onProductAdded={setSelectedProduct} />;

//     case 'detailsProduct':
//       return <DetailsProduct />;

//     case 'editProduct':
//       return <EditProduct onUpdated={handleDone} />;

//     case 'listProducts':
//       return (
//         <ListProducts
//           onViewProduct={(p) => {
//             setSelectedProduct(p);
//             setView('detailsProduct');
//           }}
//           onEditProduct={(p) => {
//             setSelectedProduct(p);
//             setView('editProduct');
//           }}
//         />
//       );

//     case 'deleteProduct':
//       return <DeleteProduct onProductDeleted={() => {}} />;

//     case 'addProducer':
//       return <AddProducer onProducerAdded={handleDone} />;

//     case 'editProducer':
//       return <EditProducer onUpdated={handleDone} />;

//     case 'detailsProducer':
//       return <DetailsProducer />;

//     case 'listProducers':
//       return (
//         <ListProducers
//           onViewProducer={(p) => {
//             setSelectedProducer(p);
//             setView('detailsProducer');
//           }}
//           onEditProducer={(p) => {
//             setSelectedProducer(p);
//             setView('editProducer');
//           }}
//         />
//       );

//     case 'deleteProducer':
//       return (
//         <DeleteProducer
//           onProducerDeleted={(name) => {
//             alert(`Productor eliminado: ${name}`);
//           }}
//         />
//       );

//     default:
//       return <p>Selecciona una opción del menú</p>;
//   }
// }

// export default MainView;

// src/components/MainView.tsx
// import type { View } from '../types/View';
// import type { Product } from '../interfaces/Product.interface';
// import type { Producer } from '../interfaces/Producer.interface';
// import ProductViews from './Product/ProductViews';
// import ProducerViews from './Producer/ProducerViews';
import type { View } from '../../components/types/View';
import type { Producer } from '../../interfaces/Producer.interface';
import type { Product } from '../../interfaces/Product.interface';
import ProducerViews from '../ProducerView/ProducerView';
import ProductViews from '../ProductView/ProductView';

interface Props {
  view: View;
  setView: (view: View) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedProducer: Producer | null;
  setSelectedProducer: (p: Producer | null) => void;
}

function MainView({
  view,
  setView,
  selectedProduct,
  setSelectedProduct,
  selectedProducer,
  setSelectedProducer
}: Props) {
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
