import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dumbbell } from 'lucide-react';
import { useDeleteWod, useWods } from '@/hooks/useWods';
import { WodCard } from '@/components/WodCard';
export function WodListPage() {
    const { data: wods, isLoading, isError } = useWods();
    const deleteWod = useDeleteWod();
    function handleDelete(id) {
        if (confirm('¿Eliminar este WOD? Esta acción no se puede deshacer.')) {
            deleteWod.mutate(id);
        }
    }
    if (isLoading) {
        return _jsx("p", { className: "text-center text-zinc-500", children: "Cargando WODs\u2026" });
    }
    if (isError) {
        return (_jsx("p", { className: "text-center text-red-400", children: "No se pudo conectar con el servidor. \u00BFEst\u00E1 corriendo el backend en el puerto 8080?" }));
    }
    if (!wods || wods.length === 0) {
        return (_jsxs("div", { className: "flex flex-col items-center gap-3 py-20 text-center", children: [_jsx(Dumbbell, { className: "text-zinc-700", size: 48 }), _jsx("p", { className: "text-zinc-500", children: "Todav\u00EDa no hay WODs publicados." })] }));
    }
    return (_jsx("div", { className: "flex flex-col gap-4", children: wods.map((wod) => (_jsx(WodCard, { wod: wod, onDelete: handleDelete }, wod.id))) }));
}
