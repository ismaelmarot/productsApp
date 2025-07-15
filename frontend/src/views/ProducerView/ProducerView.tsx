import AddProducer from '../../components/Producer/AddProducer/AddProducer';
import DeleteProducer from '../../components/Producer/DeleteProducer/DeleteProducer';
import DetailsProducer from '../../components/Producer/DetailsProducer/DetailsProducer';
import EditProducer from '../../components/Producer/EditProducer/EditProducer';
import ListProducers from '../../components/Producer/ListProducers/ListProducers';
import type { ProducerViewProps } from '../../interfaces/ProducerView.interface';

function ProducerViews({ view, setView, selectedProducer, setSelectedProducer, onDone }: ProducerViewProps) {
  switch (view) {
    case 'addProducer':
      return <AddProducer onProducerAdded={onDone} />;
    case 'editProducer':
      return <EditProducer onUpdated={onDone} />;
    case 'detailsProducer':
      return <DetailsProducer />;
    case 'listProducers':
      return (
        <ListProducers
          onViewProducer={(producer) => {
            setSelectedProducer(producer);
            setView('detailsProducer');
          }}
          onEditProducer={(producer) => {
            setSelectedProducer(producer);
            setView('editProducer');
          }}
        />
      );
    case 'deleteProducer':
      return (
        <DeleteProducer
          onProducerDeleted={(name) => {
            alert(`Productor eliminado: ${name}`);
            onDone();
          }}
        />
      );
    default:
      return null;
  }
}

export default ProducerViews;
