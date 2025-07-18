export const capitalizeWordsHelper = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
