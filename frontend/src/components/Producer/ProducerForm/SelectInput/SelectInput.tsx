import type { SelectInputProps } from '../../../../interfaces/SelectedInput.interface';

function SelectInput({
    label,
    name,
    value,
    options,
    onChange,
    }: SelectInputProps) {
    return (
        <div className='mb-2'>
        <label>{label}</label>
        <select
            className='form-control'
            name={name}
            value={value}
            onChange={onChange}
        >
            <option value=''>Seleccionar {label.toLowerCase()}</option>
            {options.map((opt) => (
            <option key={opt} value={opt}>
                {opt}
            </option>
            ))}
        </select>
        </div>
    );
}

export default SelectInput;
