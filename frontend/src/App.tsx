import { useState } from 'react';
import AddProduct from './components/AddProduct/AddProduct';
import DeleteProduct from './components/DeleteProduct/DeleteProduct';
import DetailsProduct from './components/DetailsProduct/DetailsProduct';
import Sidebar from './components/Sidebar/Sidebar';
import type { Product } from './interfaces/Product.interface';

export type View =
  | 'products'
  | 'addProduct'
  | 'deleteProduct'
  | 'detailsProduct'
  | 'personas'
  | 'lugares';

function App() {
  const [view, setView] = useState<View>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const renderContent = () => {
    switch (view) {
      case 'addProduct':
        return <AddProduct onProductAdded={(p) => setSelectedProduct(p)} />;
      case 'deleteProduct':
        return <DeleteProduct onProductDeleted={() => {}} />;
      case 'detailsProduct':
        return <DetailsProduct />
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
