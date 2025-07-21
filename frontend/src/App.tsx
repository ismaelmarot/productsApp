import { useState } from 'react';
import type { View } from './types/View';
import type { Product } from './interfaces/Product.interface';
import type { Producer } from './interfaces/Producer.interface';
import type { Category } from './interfaces/Category.interface';
import Sidebar from './components/Sidebar/Sidebar';
import MainView from './views/MainView/MainView';

function App() {
  const [view, setView] = useState<View>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>GESTOR DE PRODUCTOS</h1>
      <div className='d-flex' style={{ height: '100vh' }}>
        <Sidebar onChangeView={setView} />
        <div className='flex-grow-1 p-4'>
          <MainView
            view={view}
            setView={setView}
            selectedProduct={null}
            setSelectedProduct={setSelectedProduct}
            selectedProducer={null}
            setSelectedProducer={setSelectedProducer}
            selectedCategory={null}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </>
  );
}

export default App;
