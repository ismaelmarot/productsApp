export const toInputDate = (value: string | Date | null): string => {
    if (!value) return '';
        const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';
        return date.toISOString().split('T')[0]; // Get back "2025-07-07"
};
