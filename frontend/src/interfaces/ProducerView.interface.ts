import type { View } from '../types/View';
import type { Producer } from '../interfaces/Producer.interface';

export interface ProducerViewProps {
  view: View;
  setView: (view: View) => void;
  selectedProducer: Producer | null;
  setSelectedProducer: (p: Producer | null) => void;
  onDone: () => void;
}
