import { useState } from 'react';
interface Props {
  onProducerDeleted: (deletedName: string) => void;
}

function DeleteProducer({ onProducerDeleted }: Props) {
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setError("Nombre completo inválido");
      return;
    }

    if (!window.confirm(`¿Eliminar productor "${trimmedName}"?`)) return;

    try {
      const resGet = await fetch(`http://localhost:3001/api/producers/name/${encodeURIComponent(trimmedName)}`);
      if (!resGet.ok) {
        const errData = await resGet.json();
        alert("Error al buscar el productor: " + errData.error);
        return;
      }

      const producer = await resGet.json();

      const resDelete = await fetch(`http://localhost:3001/api/producers/${producer.id}`, {
        method: 'DELETE',
      });

      if (resDelete.ok) {
        onProducerDeleted(trimmedName);
        setFullName('');
      } else {
        const data = await resDelete.json();
        alert("Error eliminando: " + data.error);
      }
    } catch (err) {
      console.error("Error eliminando productor:", err);
      alert("Error de conexión al eliminar el productor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <h2>Eliminar productor existente por nombre completo</h2>

      <div className='mb-3'>
        <label className='form-label'>Nombre completo:</label>
        <input
          type='text'
          className='form-control'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
