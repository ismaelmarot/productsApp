import { countries } from '../../../../utils/countries';
import type { ProducerFormFieldsProps } from '../../../../interfaces/ProducerFormFields.interface'
import TextInput from '../TextInput/TextInput';
import SelectInput from '../SelectInput/SelectInput';
import TextareaInput from '../TextAreaInput/TextAreaInput';

function ProducerFormFields({ formData, handleChange }: ProducerFormFieldsProps) {
  return (
    <>
      <TextInput
        label='Nombre'
        name='first_name'
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <TextInput
        label='Segundo Nombre'
        name='middle_name'
        value={formData.middle_name}
        onChange={handleChange}
      />
      <TextInput
        label='Apellido'
        name='last_name'
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <TextInput
        label='Nombre Completo'
        name='full_name'
        value={formData.full_name}
        onChange={handleChange}
        readOnly
      />
      <TextInput
        label='Apodo'
        name='nickname'
        value={formData.nickname}
        onChange={handleChange}
      />
      <TextInput
        label='Categoría'
        name='category'
        value={formData.category}
        onChange={handleChange}
      />
      <TextInput
        label='Teléfono Celular'
        name='cell_phone'
        value={formData.cell_phone}
        onChange={handleChange}
      />
      <TextInput
        label='Teléfono de Casa'
        name='home_phone'
        value={formData.home_phone}
        onChange={handleChange}
      />
      <TextInput
        label='Email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        type='email'
      />
      <TextInput
        label='Dirección'
        name='address'
        value={formData.address}
        onChange={handleChange}
      />
      <TextInput
        label='Ciudad'
        name='city'
        value={formData.city}
        onChange={handleChange}
      />
      <TextInput
        label='Estado/Provincia'
        name='state'
        value={formData.state}
        onChange={handleChange}
      />
      <SelectInput
        label='País'
        name='country'
        value={formData.country}
        options={countries}
        onChange={handleChange}
      />
      <TextInput
        label='Código Postal'
        name='zip_code'
        value={formData.zip_code}
        onChange={handleChange}
      />
      <TextInput
        label='Sitio Web'
        name='website'
        value={formData.website}
        onChange={handleChange}
        type='url'
      />
      <TextInput
        label='Redes Sociales'
        name='social_media'
        value={formData.social_media}
        onChange={handleChange}
      />
      <TextareaInput
        label='Notas'
        name='note'
        value={formData.note}
        onChange={handleChange}
      />
    </>
  );
}

export default ProducerFormFields;
