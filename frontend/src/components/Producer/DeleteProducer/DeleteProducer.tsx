import { useState } from 'react';
import type { DeleteProducerProps } from '../../../interfaces/producer.interface/DeleteProducer.interface';

function DeleteProducer({ onProducerDeleted }: DeleteProducerProps) {
  const [producerId, setProducerId] = useState<number | ''>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const id = Number(producerId);
    if (!id || isNaN(id)) {
      setError('ID inválido');
      return;
    }

    if (!window.confirm(`¿Eliminar productor con ID ${id}?`)) return;

    try {
      const resDelete = await fetch(`http://localhost:3001/api/producers/${id}`, {
        method: 'DELETE',
      });

      if (resDelete.ok) {
        onProducerDeleted(id);
        setProducerId('');
      } else {
        const data = await resDelete.json();
        alert('Error eliminando: ' + data.error);
      }
    } catch (err) {
      console.error("Error eliminando productor:", err);
      alert("Error de conexión al eliminar el productor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <h2>Eliminar productor existente por ID</h2>

      <div className='mb-3'>
        <label className='form-label'>ID del productor:</label>
        <input
          type='number'
          className='form-control'
          value={producerId}
          onChange={(e) => setProducerId(Number(e.target.value))}
          required
        />
      </div>

      {error && <div className='alert alert-danger'>{error}</div>}

      <button type='submit' className='btn btn-danger'>
        Eliminar
      </button>
    </form>
  );
}

export default DeleteProducer;
