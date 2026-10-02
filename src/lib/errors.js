import { isAxiosError } from 'axios';
export function getErrorMessage(error) {
    if (isAxiosError(error)) {
        const apiError = error.response?.data;
        const message = apiError?.message ?? 'No se pudo conectar con el servidor';
        const fieldErrors = Object.entries(apiError?.fieldErrors ?? {})
            .map(([field, fieldMessage]) => `${field}: ${fieldMessage}`)
            .join('; ');
        return fieldErrors ? `${message}: ${fieldErrors}` : message;
    }
    return 'Ocurrió un error inesperado';
}
export function getFieldErrors(error) {
    if (isAxiosError(error)) {
        return error.response?.data?.fieldErrors ?? {};
    }
    return {};
}
