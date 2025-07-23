import type { TextInputProps } from '../../../../interfaces/TextInput.interface'; 

function TextInput({
    label,
    name,
    value,
    onChange,
    required = false,
    readOnly = false,
    type = 'text',
    }: TextInputProps) {
    return (
        <div className='mb-2'>
        <label>{label}{required && ' *'}</label>
        <input
            type={type}
            className='form-control'
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            readOnly={readOnly}
        />
        </div>
    );
}

export default TextInput; 
