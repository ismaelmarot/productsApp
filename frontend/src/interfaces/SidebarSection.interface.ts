import type { View } from '../types/View';

export interface SidebarSectionProps {
  title: string;
  items: { label: string; view: View }[];
  onChangeView: (view: View) => void;
}
