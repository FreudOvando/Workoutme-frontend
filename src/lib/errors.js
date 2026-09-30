import { isAxiosError } from 'axios';
export function getErrorMessage(error) {
    if (isAxiosError(error)) {
        return error.response?.data?.message ?? 'No se pudo conectar con el servidor';
    }
    return 'Ocurrió un error inesperado';
}
export function getFieldErrors(error) {
    if (isAxiosError(error)) {
        return error.response?.data?.fieldErrors ?? {};
    }
    return {};
}
