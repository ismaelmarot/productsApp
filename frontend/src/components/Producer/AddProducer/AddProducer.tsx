import { useState } from 'react';
import type { Producer } from '../../../interfaces/Producer.interface';

interface Props {
  onProducerAdded: () => void;
}

function AddProducer({ onProducerAdded }: Props) {
  const [formData, setFormData] = useState<Producer>({
    first_name: '',
    last_name: '',
    country: 'Argentina',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.first_name || !formData.last_name) {
      setError('Nombre y apellido son obligatorios');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/producers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al crear productor');

      setSuccess(true);
      setFormData({ first_name: '', last_name: '', country: 'Argentina' });
      onProducerAdded(); // callback para recargar o cambiar vista si querés
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    }
  };

  return (
    <div className="container">
      <h2>Agregar productor</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">Productor creado correctamente.</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Nombre *</label>
          <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Segundo nombre</label>
          <input type="text" className="form-control" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Apellido *</label>
          <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Apodo</label>
          <input type="text" className="form-control" name="nickname" value={formData.nickname || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Celular</label>
          <input type="text" className="form-control" name="cell_phone" value={formData.cell_phone || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={formData.email || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Ciudad</label>
          <input type="text" className="form-control" name="city" value={formData.city || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>País</label>
          <input type="text" className="form-control" name="country" value={formData.country || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Nota</label>
          <textarea className="form-control" name="note" value={formData.note || ''} onChange={handleChange} />
        </div>

        <button className="btn btn-primary" type="submit">Guardar productor</button>
      </form>
    </div>
  );
}

export default AddProducer;
