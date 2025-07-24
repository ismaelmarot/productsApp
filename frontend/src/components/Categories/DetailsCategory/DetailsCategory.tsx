import { useState } from 'react'
import type { Category } from '../../../interfaces/category.interface/Category.interface'

function DetailsCategory() {
  const [categoryId, setCategoryId] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const [error, setError] = useState('')

  const reset = () => {
    setCategory(null)
    setCategoryId('')
    setError('')
  }

  const handleSearch = async () => {
    setError('')
    setCategory(null)

    if (!categoryId.trim()) {
      setError("Por favor ingrese un código válido")
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/api/categories/${categoryId}`)
      if (!res.ok) {
        setError(res.status === 404 ? "Categoría no encontrada" : "Error al buscar la categoría")
        return
      }
      const data = await res.json()
      setCategory(data)
    } catch {
      setError("Error de conexión con el servidor")
    }
  }

  return (
    <>
      <h2>Buscar detalles de la Categoría</h2>

      <div className='mb-3'>
        <label htmlFor='categoryId' className='form-label'>Id de la Categoría</label>
        <input
          id='categoryId'
          type='number'
          className='form-control'
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        />
      </div>

      <button className='btn btn-primary me-2' onClick={handleSearch}>Buscar</button>
      <button className='btn btn-secondary' onClick={reset}>Cerrar</button>

      {error && <div className='alert alert-danger mt-3'>{error}</div>}

      {category && (
        <div className='card mt-3'>
          <div className='card-body'>
            <h5 className='card-title text-center mb-4'>Detalles de la Categoría</h5>
            <p><strong>Id:</strong> {category.id || '_'}</p>
            <p><strong>Categoría:</strong> {category.name || '_'}</p>
            <hr />
            <p><strong>Notas:</strong> {category.note || '-'}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailsCategory;

