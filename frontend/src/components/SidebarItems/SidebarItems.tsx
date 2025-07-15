import type { View } from '../../types/View';

export const productItems: { label: string; view: View }[] = [
  { label: 'Ver Producto', view: 'detailsProduct' },
  { label: 'Agregar Producto', view: 'addProduct' },
  { label: 'Editar Producto', view: 'editProduct' },
  { label: 'Ver listado Productos', view: 'listProducts' },
  { label: 'Eliminar Producto', view: 'deleteProduct' },
];

export const producerItems: { label: string; view: View }[] = [
  { label: 'Ver Productor', view: 'detailsProducer' },
  { label: 'Agregar Productor', view: 'addProducer' },
  { label: 'Editar Productor', view: 'editProducer' },
  { label: 'Ver listado Productores', view: 'listProducers' },
  { label: 'Eliminar Productor', view: 'deleteProducer' },
];
