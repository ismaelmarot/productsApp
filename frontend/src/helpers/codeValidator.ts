export const isValidCode = (code: string): boolean => {
    const regex = /^[A-Z]{3}[0-9]{3}$/;
    return regex.test(code);
};
