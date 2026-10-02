import { isAxiosError } from 'axios'
import type { ApiError } from '@/types/wods'

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<ApiError>(error)) {
    const apiError = error.response?.data
    const message = apiError?.message ?? 'No se pudo conectar con el servidor'
    const fieldErrors = Object.entries(apiError?.fieldErrors ?? {})
      .map(([field, fieldMessage]) => `${field}: ${fieldMessage}`)
      .join('; ')
    return fieldErrors ? `${message}: ${fieldErrors}` : message
  }
  return 'Ocurrió un error inesperado'
}

export function getFieldErrors(error: unknown): Record<string, string> {
  if (isAxiosError<ApiError>(error)) {
    return error.response?.data?.fieldErrors ?? {}
  }
  return {}
}