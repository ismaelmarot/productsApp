import { useEffect, useState } from 'react';
import type { Producer } from '../../../interfaces/Producer.interface';

interface Props {
  onViewProducer: (producer: Producer) => void;
  onEditProducer: (producer: Producer) => void;
}

function ListProducers({ onViewProducer, onEditProducer }: Props) {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/producers');
        if (!res.ok) throw new Error("Error al cargar productores");
        const data = await res.json();
        setProducers(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducers();
  }, []);

  if (loading) return <p>Cargando productores...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  if (producers.length === 0) return <p>No hay productores disponibles.</p>;

  return (
    <div className='container'>
      <h2>Listado de Productores</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Categoría</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {producers.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.full_name}</td>
              <td>{p.email || '-'}</td>
              <td>{p.cell_phone || '-'}</td>
              <td>{p.category || '_'}</td>
              <td>
                <button
                  className='btn btn-sm btn-primary me-2'
                  onClick={() => onViewProducer(p)}
                >
                  Ver
                </button>
                <button
                  className='btn btn-sm btn-warning'
                  onClick={() => onEditProducer(p)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProducers;
