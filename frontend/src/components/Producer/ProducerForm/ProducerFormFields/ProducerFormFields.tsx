import { countries } from '../../../../utils/countries';
import type {  ProducerFormFieldsProps } from '../../../../interfaces/ProducerFormFields.interface';

function ProducerFormFields({ formData, handleChange }:  ProducerFormFieldsProps) {
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
        </>
    );
}

export default ProducerFormFields;
