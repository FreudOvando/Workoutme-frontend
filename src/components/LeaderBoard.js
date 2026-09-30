import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dumbbell, Trophy } from 'lucide-react';
import { useWodScores } from '@/hooks/useScores';
export function Leaderboard({ wodId }) {
    const { data: scores, isLoading, isError } = useWodScores(wodId);
    const entries = (scores ?? [])
        .filter((score) => score.result?.trim())
        .map((score) => {
        const isScaled = score.result?.startsWith('[ESCALADO]') ?? false;
        return {
            ...score,
            category: isScaled ? 'ESCALADO' : 'AVANZADO',
            displayResult: score.result?.replace(/^\[(AVANZADO|ESCALADO)\]\s*/, '').trim() ?? '',
        };
    });
    const advancedScores = entries.filter((score) => score.category === 'AVANZADO');
    const scaledScores = entries.filter((score) => score.category === 'ESCALADO');
    if (isLoading) {
        return _jsx("p", { className: "py-4 text-center text-sm text-zinc-500", children: "Cargando puntuaciones\u2026" });
    }
    if (isError) {
        return (_jsx("p", { role: "status", className: "rounded-lg border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-300", children: "No se pudieron cargar las puntuaciones. Verifica que tu cuenta tenga permiso para consultar todos los puntajes del WOD." }));
    }
    return (_jsxs("section", { "aria-label": "Puntuaciones del WOD", className: "overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40", children: [_jsxs("div", { className: "border-b border-zinc-800 px-4 py-3 sm:px-5", children: [_jsx("h3", { className: "font-bold text-zinc-100", children: "Puntuaciones de atletas" }), _jsxs("p", { className: "mt-1 text-xs text-zinc-500", children: [entries.length, " ", entries.length === 1 ? 'registro' : 'registros'] })] }), _jsx(CategorySection, { title: "Avanzado", icon: "advanced", scores: advancedScores }), _jsx(CategorySection, { title: "Escalado", icon: "scaled", scores: scaledScores })] }));
}
function CategorySection({ title, icon, scores, }) {
    const Icon = icon === 'advanced' ? Trophy : Dumbbell;
    return (_jsxs("div", { className: "px-4 py-4 sm:px-5", children: [_jsxs("div", { className: "mb-3 flex items-center gap-2", children: [_jsx(Icon, { size: 17, className: icon === 'advanced' ? 'text-orange-400' : 'text-emerald-400' }), _jsx("h4", { className: "text-sm font-bold text-zinc-200", children: title }), _jsx("span", { className: "text-xs text-zinc-500", children: scores.length })] }), scores.length === 0 ? (_jsx("p", { className: "border-t border-zinc-800 py-3 text-sm text-zinc-500", children: "Todav\u00EDa no hay puntajes en esta categor\u00EDa." })) : (_jsx("ul", { className: "divide-y divide-zinc-800 border-t border-zinc-800", children: scores.map((score) => (_jsxs("li", { className: "grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 py-3 sm:grid-cols-[2rem_minmax(0,1fr)_auto_auto]", children: [_jsx(AthleteAvatar, { photoUrl: score.photoUrl, userFullName: score.userFullName }, `${score.id}-${score.photoUrl ?? ''}`), _jsx("span", { className: "min-w-0 truncate text-sm font-medium text-zinc-100", children: score.userFullName }), _jsx("span", { className: "text-sm font-semibold text-zinc-200 sm:text-right", children: score.displayResult || 'Sin resultado' }), _jsx("span", { className: `col-start-2 text-xs sm:col-start-auto ${score.completed ? 'text-emerald-400' : 'text-zinc-500'}`, children: score.completed ? 'Completado' : 'No completado' })] }, score.id))) }))] }));
}
function AthleteAvatar({ photoUrl, userFullName }) {
    const [imageFailed, setImageFailed] = useState(false);
    const initials = userFullName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
    if (!photoUrl || imageFailed) {
        return (_jsx("span", { "aria-hidden": "true", className: "flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300", children: initials }));
    }
    return (_jsx("img", { src: photoUrl, alt: `Foto de ${userFullName}`, onError: () => setImageFailed(true), className: "h-8 w-8 rounded-full border border-zinc-700 object-cover" }));
}
