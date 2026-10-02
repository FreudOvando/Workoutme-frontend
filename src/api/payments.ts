import { apiClient } from './client'
import type { Payment, PaymentPayload } from '@/types/payment'

export async function getUserPayments(userId: number): Promise<Payment[]> {
  const { data } = await apiClient.get<Payment[]>(`/payments/user/${userId}`)
  return data
}

export async function getAllPayments(): Promise<Payment[]> {
  const { data } = await apiClient.get<Payment[]>('/payments')
  return data
}

export async function createPayment(payload: PaymentPayload): Promise<Payment> {
  const { data } = await apiClient.post<Payment>('/payments', payload)
  return data
}