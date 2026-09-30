import { apiClient } from './client'
import type { Wod, WodPayload } from '@/types/wods'

export async function getWods(): Promise<Wod[]> {
  const { data } = await apiClient.get<Wod[]>('/wods')
  return data
}

export async function getWod(id: number): Promise<Wod> {
  const { data } = await apiClient.get<Wod>(`/wods/${id}`)
  return data
}

export async function createWod(payload: WodPayload): Promise<Wod> {
  const { data } = await apiClient.post<Wod>('/wods', payload)
  return data
}

export async function updateWod(id: number, payload: WodPayload): Promise<Wod> {
  const { data } = await apiClient.put<Wod>(`/wods/${id}`, payload)
  return data
}

export async function deleteWod(id: number): Promise<void> {
  await apiClient.delete(`/wods/${id}`)
}