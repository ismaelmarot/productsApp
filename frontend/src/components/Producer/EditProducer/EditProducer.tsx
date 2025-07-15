import { useState, useEffect } from 'react';
import type { Producer } from '../../../interfaces/Producer.interface';

interface Props {
  onUpdated: () => void;
}

function EditProducer({ onUpdated }: Props) {
  const [fullName, setFullName] = useState('');
  const [producerData, setProducerData] = useState<Producer | null>(null);
  const [form, setForm] = useState<Partial<Producer>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync producer data to form state
  useEffect(() => {
    if (producerData) setForm(producerData);
  }, [producerData]);

  const fetchProducer = async () => {
    setLoading(true);
    setError(null);

    try {
      const encodedName = encodeURIComponent(fullName.trim());
      const res = await fetch(`http://localhost:3001/api/producers/name/${encodedName}`);
      if (!res.ok) throw new Error('Productor no encontrado');
      const data = await res.json();
      setProducerData(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar productor');
      setProducerData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!producerData) return;

    try {
      const res = await fetch(`http://localhost:3001/api/producers/${producerData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error al actualizar productor');

      alert('Productor actualizado correctamente');
      onUpdated();
    } catch (err) {
      alert('Error al actualizar productor');
    }
  };

  return (
    <div className='container'>
      <h2>Editar Productor</h2>

      {/* Ingreso de Nombre completo */}
      {!producerData && (
        <form
          className='mb-4'
          onSubmit={(e) => {
            e.preventDefault();
            fetchProducer();
          }}
        >
          <label className='form-label'>Nombre completo del productor:</label>
          <input
            type='text'
            className='form-control mb-2'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <button className='btn btn-primary' type='submit' disabled={loading}>
            {loading ? "Cargando..." : "Cargar productor"}
          </button>
          {error && <div className='text-danger mt-2'>{error}</div>}
        </form>
      )}

      {/* Formulario de edición */}
      {producerData && (
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Nombre</label>
            <input
              name='first_name'
              type='text'
              className='form-control'
              value={form.first_name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Apellido</label>
            <input
              name='last_name'
              type='text'
              className='form-control'
              value={form.last_name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Apodo</label>
            <input
              name='nickname'
              type='text'
              className='form-control'
              value={form.nickname || ''}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Celular</label>
            <input
              name='cell_phone'
              type='text'
              className='form-control'
              value={form.cell_phone || ''}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              name='email'
              type='email'
              className='form-control'
              value={form.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Notas</label>
            <textarea
              name='note'
              className='form-control'
              rows={3}
              value={form.note || ''}
              onChange={handleChange}
            />
          </div>

          <div className='d-flex gap-2'>
            <button className='btn btn-success' type='submit'>
              Guardar Cambios
            </button>
            <button
              className='btn btn-secondary'
              type='button'
              onClick={onUpdated}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditProducer;
