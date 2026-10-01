export const COMPETITION_CATEGORIES = ['PRINCIPIANTE', 'INTERMEDIO', 'MASTER', 'AVANZADO', 'RX'] as const
export type CompetitionCategory = (typeof COMPETITION_CATEGORIES)[number]

export interface Competition {
  id: number
  name: string
  competitionDate: string
  createdAt: string
  updatedAt: string
}

export interface CompetitionPayload {
  name: string
  competitionDate: string
}

export interface CompetitionStage {
  id: number
  competitionId: number
  name: string
  stageOrder: number
}

export interface CompetitionStagePayload {
  name: string
  stageOrder: number
}

export interface CompetitionEnrollment {
  id: number
  competitionId: number
  userId: number
  userFullName: string
  category: CompetitionCategory
  enrolledAt: string
}

export interface CompetitionEnrollmentPayload {
  userId: number
  category: CompetitionCategory
}

export interface CompetitionResult {
  id: number
  stageId: number
  stageName: string
  enrollmentId: number
  userId: number
  userFullName: string
  percentage: number
  createdAt: string
  updatedAt: string
}

export interface CompetitionResultPayload {
  stageId: number
  enrollmentId: number
  percentage: number
}