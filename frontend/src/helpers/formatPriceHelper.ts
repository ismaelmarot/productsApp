export const formatPriceHelper = (input: string): string => {
  let clean = input.replace(/[^\d,]/g, '');

  const parts = clean.split(',');
  
  const integerPart = parts[0].replace(/^0+/, '') || '0';

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const decimalPart = parts[1]?.substring(0, 2) ?? '';

  if (clean.endsWith(',')) return `${formattedInteger},`;

  return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
};
