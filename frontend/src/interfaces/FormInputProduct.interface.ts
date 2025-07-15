import type { ChangeEvent } from 'react';

export interface FormInputProductProps {
    label: string;
    type: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}
