interface Props {
  value: string | Date | null;
}

function FormatDate({ value }: Props) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) return <span>Fecha inválida</span>;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return <span>{`${day}/${month}/${year}`}</span>;
}

export default FormatDate;
