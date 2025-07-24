import type { Producer } from '../producer.interface/Producer.interface';
export interface ListProducersProps {
  onViewProducer: (producer: Producer) => void;
  onEditProducer: (producer: Producer) => void;
}
