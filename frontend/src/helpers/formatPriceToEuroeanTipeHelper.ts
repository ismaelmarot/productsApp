export const formatPriceToEuropeanTipeHelper = (value: number): string => {
  if (isNaN(value)) return '';
  return value.toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
