import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';
import type { AddCategoryProps } from '../../../interfaces/AddCategory.interface';
import SuccessModal from '../../SuccessModal/SuccessModal';

const AddCategory = ({ onCategoryAdded }: AddCategoryProps) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      const modal = Modal.getOrCreateInstance(modalRef.current);
      showModal ? modal.show() : modal.hide();
    }
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);

    if (!id.trim() || !name.trim()) {
      alert("ID y Nombre son obligatorios");
      return;
    }

    const newCategory = {
      id: id.trim(),
      name: name.trim(),
      note: note.trim() || null,
    };

    try {
      const res = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      const data = await res.json();

      if (res.ok) {
        onCategoryAdded(data);
        setId('');
        setName('');
        setNote('');
        setShowModal(true);
      } else {
        alert("Error al agregar la categoría: " + (data.error || ''));
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='mb-4'>
        <h2>Agregar nueva categoría</h2>

        <div className='mb-3'>
          <label className='form-label'>ID:</label>
          <input
            type='text'
            className='form-control'
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Nombre:</label>
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Nota:</label>
          <input
            type='text'
            className='form-control'
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-success'>
          Agregar
        </button>
      </form>

      <SuccessModal show={showModal} onClose={() => setShowModal(false)} message="CATEGORÍA agregada correctamente." />
    </>
  );
};

export default AddCategory;
