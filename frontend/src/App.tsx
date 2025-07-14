import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import type { Product } from './interfaces/Product.interface';
import AddProduct from './components/Product/AddProduct/AddProduct';
import DeleteProduct from './components/Product/DeleteProduct/DeleteProduct';
import DetailsProduct from './components/Product/DetailsProduct/DetailsProduct';
import EditProduct from './components/Product/EditProduct/EditProduct';
import ProductList from './components/Product/ListProduct/ListProduct';

import AddProducer from './components/Producer/AddProducer/AddProducer';
import DetailsProducer from './components/Producer/DetailsProducer/DetailsProducer';


export type View =
  | 'products'
  | 'addProduct'
  | 'deleteProduct'
  | 'detailsProduct'
  | 'listProducts'
  | 'editProduct'
  | 'addProducer'
  | 'detailsProducer'
  | 'lugares';


function App() {
  const [view, setView] = useState<View>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
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
          <ProductList
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


      default:
        return null;
    }
  };

  return (
    <>
      <h1>GESTOR DE PRODUCTOS</h1>
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
