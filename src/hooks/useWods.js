import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createWod, deleteWod, getWod, getWods, updateWod } from '@/api/wods';
import { getErrorMessage } from '@/lib/errors';
const WODS_KEY = ['wods'];
export function useWods() {
    return useQuery({
        queryKey: WODS_KEY,
        queryFn: getWods,
    });
}
export function useWod(id) {
    return useQuery({
        queryKey: [...WODS_KEY, id],
        queryFn: () => getWod(id),
        enabled: !!id,
    });
}
export function useCreateWod() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => createWod(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: WODS_KEY });
            toast.success('WOD creado correctamente');
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}
export function useUpdateWod(id) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => updateWod(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: WODS_KEY });
            toast.success('WOD actualizado correctamente');
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}
export function useDeleteWod() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteWod(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: WODS_KEY });
            toast.success('WOD eliminado');
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}
