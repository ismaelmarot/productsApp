import type { TextareaInputProps } from '../../../../interfaces/TextAreaInput.interface';

function TextareaInput({
    label,
    name,
    value,
    onChange,
    rows = 3,
    }: TextareaInputProps) {
    return (
        <div className='mb-2'>
        <label>{label}</label>
        <textarea
            className='form-control'
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
        />
        </div>
    );
}

export default TextareaInput;
