import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WodForm } from '@/components/WodForm';
import { useCreateWod, useUpdateWod, useWod } from '@/hooks/useWods';
export function WodFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const wodId = Number(id);
    const { data: wod, isLoading } = useWod(wodId);
    const createWod = useCreateWod();
    const updateWod = useUpdateWod(wodId);
    const mutation = isEditing ? updateWod : createWod;
    // Traduce el WOD (de la API) a los campos que el formulario espera
    const defaultValues = wod
        ? {
            name: wod.name ?? '',
            publicationDate: wod.publicationDate,
            coachName: wod.coachName,
            type: wod.type,
            description: wod.description,
        }
        : undefined;
    function handleSubmit(values) {
        const payload = {
            ...values,
            name: values.name?.trim() ? values.name.trim() : null,
        };
        mutation.mutate(payload, {
            onSuccess: () => navigate('/'),
        });
    }
    if (isEditing && isLoading) {
        return _jsx("p", { className: "text-center text-zinc-500", children: "Cargando WOD\u2026" });
    }
    return (_jsxs("div", { children: [_jsxs(Link, { to: "/", className: "mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300", children: [_jsx(ArrowLeft, { size: 16 }), "Volver al listado"] }), _jsx("h1", { className: "mb-6 text-2xl font-bold text-zinc-50", children: isEditing ? 'Editar WOD' : 'Nuevo WOD' }), _jsx(WodForm, { defaultValues: defaultValues, onSubmit: handleSubmit, isSubmitting: mutation.isPending, submitLabel: isEditing ? 'Guardar cambios' : 'Publicar WOD' })] }));
}
