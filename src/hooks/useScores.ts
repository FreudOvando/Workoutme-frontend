import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getScore, saveOrUpdateScore } from '@/api/scores'
import { getErrorMessage } from '@/lib/errors'
import type { ScorePayload } from '@/types/score'

export function useScore(userId: number, wodId: number) {
  return useQuery({
    queryKey: ['scores', userId, wodId],
    queryFn: () => getScore(userId, wodId),
    enabled: !!userId && !!wodId,
    retry: false, // un 404 aquí es normal: significa que aún no hay puntaje
  })
}

export function useSaveScore(userId: number, wodId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ScorePayload) => saveOrUpdateScore(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores', userId, wodId] })
      toast.success('Puntaje guardado correctamente')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}