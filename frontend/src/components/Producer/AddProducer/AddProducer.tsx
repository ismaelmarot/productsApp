import { useState } from 'react';
import { initialProducerData } from '../../../constants/initialProducerData';
import type { Producer } from '../../../interfaces/producer.interface/Producer.interface';
import { useSuccessModal } from '../../../hooks/useSuccessModal';
import ProducerFormFields from '../ProducerForm/ProducerFormFields/ProducerFormFields';
import SuccessModal from '../../SuccessModal/SuccessModal';
import type { AddProducerProps } from '../../../interfaces/producer.interface/AddProducer.interface';

function AddProducer({ onProducerAdded }: AddProducerProps) {
  const [formData, setFormData] = useState<Producer>(initialProducerData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { showModal, setShowModal, modalRef } = useSuccessModal();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.first_name || !formData.last_name) {
      setError('Nombre y apellido son obligatorios');
      return;
    }

    const full_name = [formData.first_name, formData.middle_name, formData.last_name].filter(Boolean).join(' ');
    const dataToSend = { ...formData, full_name };

    try {
      const res = await fetch('http://localhost:3001/api/producers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error("Error al crear productor");

      setSuccess(true);
      setShowModal(true);
      setFormData(initialProducerData);
      onProducerAdded();
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    }
  };

  return (
    <>
      <h2>Agregar productor</h2>
      {error && <p className='text-danger'>{error}</p>}
      {success && <p className='text-success'>Productor creado correctamente.</p>}
      <form onSubmit={handleSubmit}>
        <ProducerFormFields formData={formData} handleChange={handleChange} />
        <button className='btn btn-primary' type='submit'>
          Guardar productor
        </button>
      </form>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} message="PRODUCTOR agregada correctamente." />
    </>
  );
}

export default AddProducer;
