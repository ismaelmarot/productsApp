import type { ChangeEvent } from 'react';

interface Props {
    label: string;
    type: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

function FormInputProduct({ label, type, value, onChange, required = true }: Props) {
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
