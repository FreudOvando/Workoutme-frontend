import { z } from 'zod';
import { WOD_TYPES } from '@/types/wods';
export const wodSchema = z.object({
    name: z
        .string()
        .max(100, 'Máximo 100 caracteres')
        .optional()
        .or(z.literal('')),
    publicationDate: z.string().min(1, 'La fecha de publicación es obligatoria'),
    coachName: z
        .string()
        .min(1, 'El nombre del coach es obligatorio')
        .max(100, 'Máximo 100 caracteres'),
    type: z.enum(WOD_TYPES, {
        message: 'Selecciona un tipo de WOD',
    }),
    description: z.string().min(1, 'La descripción es obligatoria'),
});
