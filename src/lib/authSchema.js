import { z } from 'zod';
function getTodayLocalDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
}
export const loginSchema = z.object({
    email: z.string().email('Ingresa un correo válido'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
});
export const registerSchema = z.object({
    firstName: z.string().trim().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
    lastName: z.string().trim().min(1, 'El apellido es obligatorio').max(100, 'Máximo 100 caracteres'),
    birthDate: z
        .string()
        .min(1, 'La fecha de nacimiento es obligatoria')
        .refine((date) => !date || date < getTodayLocalDate(), 'La fecha de nacimiento debe ser anterior a hoy'),
    email: z.string().trim().email('Ingresa un correo válido').max(150, 'Máximo 150 caracteres'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    photoUrl: z.string().optional(),
});
