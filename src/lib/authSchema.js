import { z } from 'zod';
export const loginSchema = z.object({
    email: z.string().email('Ingresa un correo válido'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
});
export const registerSchema = z.object({
    firstName: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
    lastName: z.string().min(1, 'El apellido es obligatorio').max(100, 'Máximo 100 caracteres'),
    birthDate: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
    email: z.string().email('Ingresa un correo válido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    photoUrl: z.string().optional(),
});
