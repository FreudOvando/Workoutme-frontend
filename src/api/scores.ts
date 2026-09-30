import { apiClient } from './client'
import type { Score, ScorePayload } from '@/types/score'

export async function saveOrUpdateScore(payload: ScorePayload): Promise<Score> {
  const { data } = await apiClient.post<Score>('/scores', payload)
  return data
}

export async function getScore(userId: number, wodId: number): Promise<Score> {
  const { data } = await apiClient.get<Score>(`/scores/user/${userId}/wod/${wodId}`)
  return data
}