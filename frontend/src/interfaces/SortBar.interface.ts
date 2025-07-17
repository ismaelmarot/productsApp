export interface SortBarProps {
  sortBy: string;
  sortOrder: string;
  onChangeSortBy: (value: string) => void;
  onChangeSortOrder: (value: string) => void;
}