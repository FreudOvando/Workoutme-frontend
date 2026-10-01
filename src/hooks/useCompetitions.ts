import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createCompetition, deleteCompetition, getCompetition, getCompetitions, updateCompetition } from '@/api/competitions'
import { getErrorMessage } from '@/lib/errors'
import type { CompetitionPayload } from '@/types/competition'

const COMPETITIONS_KEY = ['competitions']

export function useCompetitions() {
  return useQuery({
    queryKey: COMPETITIONS_KEY,
    queryFn: getCompetitions,
  })
}

export function useCompetition(id: number) {
  return useQuery({
    queryKey: [...COMPETITIONS_KEY, id],
    queryFn: () => getCompetition(id),
    enabled: !!id,
  })
}

export function useCreateCompetition() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CompetitionPayload) => createCompetition(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPETITIONS_KEY })
      toast.success('Competencia creada correctamente')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}

export function useUpdateCompetition(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CompetitionPayload) => updateCompetition(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPETITIONS_KEY })
      toast.success('Competencia actualizada correctamente')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}

export function useDeleteCompetition() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteCompetition(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPETITIONS_KEY })
      toast.success('Competencia eliminada')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}