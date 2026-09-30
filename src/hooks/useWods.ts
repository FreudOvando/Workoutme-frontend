import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createWod, deleteWod, getWod, getWods, updateWod } from '@/api/wods'
import { getErrorMessage } from '@/lib/errors'
import type { WodPayload } from '@/types/wods'

const WODS_KEY = ['wods']

export function useWods() {
  return useQuery({
    queryKey: WODS_KEY,
    queryFn: getWods,
  })
}

export function useWod(id: number) {
  return useQuery({
    queryKey: [...WODS_KEY, id],
    queryFn: () => getWod(id),
    enabled: !!id,
  })
}

export function useCreateWod() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: WodPayload) => createWod(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WODS_KEY })
      toast.success('WOD creado correctamente')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}

export function useUpdateWod(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: WodPayload) => updateWod(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WODS_KEY })
      toast.success('WOD actualizado correctamente')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}

export function useDeleteWod() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteWod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WODS_KEY })
      toast.success('WOD eliminado')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}