export const WOD_TYPES = ['FOR_TIME', 'AMRAP', 'EMOM', 'TABATA', 'CHIPPER'] as const

export type WodType = (typeof WOD_TYPES)[number]

export interface Wod {
  id: number
  name: string | null
  publicationDate: string // ISO "yyyy-MM-dd"
  coachName: string
  type: WodType
  description: string
  createdAt: string
  updatedAt: string
}

// Lo que se envía al crear/actualizar (espejo de WodRequest en el backend)
export interface WodPayload {
  name: string | null
  publicationDate: string
  coachName: string
  type: WodType
  description: string
}

export interface ApiError {
  timestamp: string
  status: number
  error: string
  message: string
  fieldErrors: Record<string, string> | null
}