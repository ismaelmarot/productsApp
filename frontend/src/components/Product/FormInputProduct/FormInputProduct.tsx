import type { FormInputProductProps } from '../../../interfaces/FormInputProduct.interface';

function FormInputProduct({ label, type, value, onChange, required = true }: FormInputProductProps) {
    return (
        <div className='mb-3'>
            <label className='form-label'>{ label }:</label>
            <input
                type={type}
                className='form-control'
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}

export default FormInputProduct;
