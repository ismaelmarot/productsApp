import { countries } from '../../../../utils/countries';
import type { ProducerFormFieldsProps } from '../../../../interfaces/ProducerFormFields.interface';

function ProducerFormFields({ formData, handleChange }: ProducerFormFieldsProps) {
  return (
    <>
      <div className='mb-2'>
        <label>Nombre *</label>
        <input
          type='text'
          className='form-control'
          name='first_name'
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className='mb-2'>
        <label>Segundo Nombre</label>
        <input
          type='text'
          className='form-control'
          name='middle_name'
          value={formData.middle_name}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Apellido *</label>
        <input
          type='text'
          className='form-control'
          name='last_name'
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className='mb-2'>
        <label>Nombre Completo</label>
        <input
          type='text'
          className='form-control'
          name='full_name'
          value={formData.full_name}
          readOnly
        />
      </div>

      <div className='mb-2'>
        <label>Apodo</label>
        <input
          type='text'
          className='form-control'
          name='nickname'
          value={formData.nickname}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Categoría</label>
        <input
          type='text'
          className='form-control'
          name='category'
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Teléfono Celular</label>
        <input
          type='text'
          className='form-control'
          name='cell_phone'
          value={formData.cell_phone}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Teléfono de Casa</label>
        <input
          type='text'
          className='form-control'
          name='home_phone'
          value={formData.home_phone}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Email</label>
        <input
          type='email'
          className='form-control'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Dirección</label>
        <input
          type='text'
          className='form-control'
          name='address'
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Ciudad</label>
        <input
          type='text'
          className='form-control'
          name='city'
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Estado/Provincia</label>
        <input
          type='text'
          className='form-control'
          name='state'
          value={formData.state}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>País</label>
        <select
          className='form-control'
          name='country'
          value={formData.country}
          onChange={handleChange}
        >
          <option value=''>Seleccionar país</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-2'>
        <label>Código Postal</label>
        <input
          type='text'
          className='form-control'
          name='zip_code'
          value={formData.zip_code}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Sitio Web</label>
        <input
          type='url'
          className='form-control'
          name='website'
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Redes Sociales</label>
        <input
          type='text'
          className='form-control'
          name='social_media'
          value={formData.social_media}
          onChange={handleChange}
        />
      </div>

      <div className='mb-2'>
        <label>Notas</label>
        <textarea
          className='form-control'
          name='note'
          value={formData.note}
          onChange={handleChange}
          rows={3}
        />
      </div>
    </>
  );
}

export default ProducerFormFields;
