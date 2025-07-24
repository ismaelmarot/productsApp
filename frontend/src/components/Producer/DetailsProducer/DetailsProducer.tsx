import { useState } from 'react'
import type { Producer } from '../../../interfaces/producer.interface/Producer.interface'

function DetailsProducer() {
  const [producerId, setProducerId] = useState('')
  const [producer, setProducer] = useState<Producer | null>(null)
  const [error, setError] = useState('')

  const reset = () => {
    setProducer(null)
    setProducerId('')
    setError('')
  }

  const handleSearch = async () => {
    setError('')
    setProducer(null)

    if (!producerId.trim()) {
      setError("Por favor ingrese un código válido")
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/api/producers/${producerId}`)
      if (!res.ok) {
        setError(res.status === 404 ? "Productor no encontrado" : "Error al buscar el productor")
        return
      }
      const data = await res.json()
      setProducer(data)
    } catch {
      setError("Error de conexión con el servidor")
    }
  }

  return (
    <>
      <h2>Buscar detalles de un productor</h2>

      <div className='mb-3'>
        <label htmlFor='producerId' className='form-label'>Id del productor</label>
        <input
          id='producerId'
          type='text'
          className='form-control'
          value={producerId}
          onChange={e => setProducerId(e.target.value)}
        />
      </div>

      <button className='btn btn-primary me-2' onClick={handleSearch}>Buscar</button>
      <button className='btn btn-secondary' onClick={reset}>Cerrar</button>

      {error && <div className='alert alert-danger mt-3'>{error}</div>}

      {producer && (
        <div className='card mt-3'>
          <div className='card-body'>
            <h5 className='card-title text-center mb-4'>Detalles del Productor</h5>
            <p><strong>Nombre completo:</strong> {producer.first_name} {producer.middle_name ?? ''} {producer.last_name}</p>
            <p><strong>Apodo:</strong> {producer.nickname || '-'}</p>
            <p><strong>Categoría:</strong> {producer.category || '_'}</p>
            <p><strong>Celular:</strong> {producer.cell_phone || '-'}</p>
            <p><strong>Teléfono fijo:</strong> {producer.home_phone || '-'}</p>
            <p><strong>Email:</strong> {producer.email || '-'}</p>
            <p><strong>Dirección:</strong> {producer.address || '-'}</p>
            <p><strong>Ciudad / Estado / País:</strong> {producer.city || '-'} / {producer.state || '-'} / {producer.country || '-'}</p>
            <p><strong>Código postal:</strong> {producer.zip_code || '-'}</p>
            <p><strong>Sitio web:</strong> {producer.website || '-'}</p>
            <p><strong>Social media:</strong> {producer.social_media || '-'}</p>
            <hr />
            <p><strong>Notas:</strong> {producer.note || '-'}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailsProducer;

