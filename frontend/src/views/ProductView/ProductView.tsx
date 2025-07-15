import AddProduct from "../../components/Product/AddProduct/AddProduct";
import DeleteProduct from "../../components/Product/DeleteProduct/DeleteProduct";
import DetailsProduct from "../../components/Product/DetailsProduct/DetailsProduct";
import EditProduct from "../../components/Product/EditProduct/EditProduct";
import ListProducts from "../../components/Product/ListProducts/ListProducts";
import type { ProductViewsProps } from '../../interfaces/ProductView.interface';

function ProductViews({ view, setView, selectedProduct, setSelectedProduct, onDone }: ProductViewsProps) {
  switch (view) {
    case 'addProduct':
      return <AddProduct onProductAdded={(p) => setSelectedProduct(p)} />;
    case 'detailsProduct':
      return <DetailsProduct />;
    case 'editProduct':
      return <EditProduct onUpdated={onDone} />;
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
      return <DeleteProduct onProductDeleted={() => onDone()} />;
    default:
      return null;
  }
}

export default ProductViews;
