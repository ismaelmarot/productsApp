import type { Producer } from '../interfaces/Producer.interface';

export interface ListProducersProps {
  onViewProducer: (producer: Producer) => void;
  onEditProducer: (producer: Producer) => void;
}
