import { isAxiosError } from 'axios'
import type { ApiError } from '@/types/wods'

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<ApiError>(error)) {
    return error.response?.data?.message ?? 'No se pudo conectar con el servidor'
  }
  return 'Ocurrió un error inesperado'
}

export function getFieldErrors(error: unknown): Record<string, string> {
  if (isAxiosError<ApiError>(error)) {
    return error.response?.data?.fieldErrors ?? {}
  }
  return {}
}