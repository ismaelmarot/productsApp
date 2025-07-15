import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import type { Product } from './interfaces/Product.interface';
import type { Producer } from './interfaces/Producer.interface';
import AddProduct from './components/Product/AddProduct/AddProduct';
import DeleteProduct from './components/Product/DeleteProduct/DeleteProduct';
import DetailsProduct from './components/Product/DetailsProduct/DetailsProduct';
import EditProduct from './components/Product/EditProduct/EditProduct';
import ListProducts from './components/Product/ListProducts/ListProducts';

import AddProducer from './components/Producer/AddProducer/AddProducer';
import DetailsProducer from './components/Producer/DetailsProducer/DetailsProducer';
import ListProducers from './components/Producer/ListProducers/ListProducers';

export type View =
  | 'products'
  | 'addProduct'
  | 'deleteProduct'
  | 'detailsProduct'
  | 'listProducts'
  | 'editProduct'
  | 'addProducer'
  | 'detailsProducer'
  | 'listProducers'
  | 'deleteProducer'
  | 'lugares';


function App() {
  const [view, setView] = useState<View>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  
  const handleDone = () => {
    setView('products');
  };

  const renderContent = () => {
    switch (view) {
      case 'addProduct':
        return <AddProduct onProductAdded={(p) => setSelectedProduct(p)} />;
      case 'detailsProduct':
        return <DetailsProduct />;
      case 'editProduct':
        return <EditProduct onUpdated={handleDone} />;
      case 'listProducts':
        return (
          <ListProducts
            onViewProduct={(product) => {
              setSelectedProduct(product);
              setView('detailsProduct');
            }}
            onEditProduct={(product) => {
              setSelectedProduct(product);
              setView('editProduct');
            }}
          />
      );
      case 'deleteProduct':
        return <DeleteProduct onProductDeleted={() => {}} />;

      case 'addProducer':
        return <AddProducer onProducerAdded={handleDone} />;
      case 'detailsProducer':
        return <DetailsProducer />;

      case 'listProducers':
        return (
          <ListProducers
            onViewProducer={(producer) => {
              setSelectedProducer(producer);
              setView('detailsProducer');
            }}
            onEditProducer={(producer) => {
              setSelectedProducer(producer);
              setView('editProducer');
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <h1 style={{fontSize:'1.5rem'}}>GESTOR DE PRODUCTOS</h1>
      <div className='d-flex' style={{ height: '100vh' }}>     
        {/*Menú lateral */}
        <Sidebar onChangeView={setView} />
      
        {/* Contenido principal */}
        <div className='flex-grow-1 p-4'>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default App;
