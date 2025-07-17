import React from 'react';
import type { SortBarProps } from '../../interfaces/SortBar.interface';

const SortBar: React.FC<SortBarProps> = ({
  sortBy,
  sortOrder,
  onChangeSortBy,
  onChangeSortOrder,
}) => {
  return (
    <div className='d-flex align-items-center justify-content-between mb-3'>
      <div>
        <label className='me-2'>Ordenar por:</label>
        <select
          className='form-select d-inline w-auto me-2'
          value={sortBy}
          onChange={(e) => onChangeSortBy(e.target.value)}
        >
          <option value='name'>Nombre</option>
          <option value='price'>Precio</option>
          <option value='category'>Categoría</option>
        </select>
        <select
          className='form-select d-inline w-auto'
          value={sortOrder}
          onChange={(e) => onChangeSortOrder(e.target.value)}
        >
          <option value='asc'>Ascendente</option>
          <option value='desc'>Descendente</option>
        </select>
      </div>
    </div>
  );
};

export default SortBar;
