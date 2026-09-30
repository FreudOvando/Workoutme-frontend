export interface Score {
  id: number
  userId: number
  userFullName: string
  wodId: number
  wodName: string
  completed: boolean
  result: string | null
  createdAt: string
  updatedAt: string
}

export interface ScorePayload {
  userId: number
  wodId: number
  completed: boolean
  result: string | null
}