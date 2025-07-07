interface FormatPriceProps {
  value: number | string;
  currency?: string;
}

function FormatPrice({ value, currency = 'ARS' }: FormatPriceProps) {
  const number =
    typeof value === 'string'
      ? parseFloat(value.replace(/\./g, '').replace(',', '.'))
      : value;

  if (isNaN(number)) return <span>-</span>;

  const formatted = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return <span>{formatted}</span>;
}

export default FormatPrice;
