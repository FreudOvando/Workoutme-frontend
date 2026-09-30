import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useScore, useSaveScore } from '@/hooks/useScores';
const inputStyles = 'w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500';
export function ScoreForm({ wodId, onClose }) {
    const { user } = useAuth();
    const { data: existingScore, isLoading } = useScore(user.id, wodId);
    const saveScore = useSaveScore(user.id, wodId);
    const [completed, setCompleted] = useState(false);
    const [result, setResult] = useState('');
    useEffect(() => {
        if (existingScore) {
            setCompleted(existingScore.completed);
            setResult(existingScore.result ?? '');
        }
    }, [existingScore]);
    function handleSubmit(e) {
        e.preventDefault();
        saveScore.mutate({
            userId: user.id,
            wodId,
            completed,
            result: result.trim() ? result.trim() : null,
        }, { onSuccess: onClose });
    }
    if (isLoading) {
        return _jsx("p", { className: "mt-3 text-sm text-zinc-500", children: "Cargando tu puntaje\u2026" });
    }
    return (_jsxs("form", { onSubmit: handleSubmit, className: "mt-4 flex flex-col gap-3 border-t border-zinc-800 pt-4", children: [_jsxs("label", { className: "flex items-center gap-2 text-sm text-zinc-300", children: [_jsx("input", { type: "checkbox", checked: completed, onChange: (e) => setCompleted(e.target.checked), className: "h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-orange-500 focus:ring-orange-500" }), "Complet\u00E9 el WOD"] }), _jsx("input", { type: "text", placeholder: 'Tu resultado (ej. "8:45", "12 rondas + 5 reps")', value: result, onChange: (e) => setResult(e.target.value), className: inputStyles }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { type: "submit", disabled: saveScore.isPending, className: "flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-orange-400 disabled:opacity-60", children: [saveScore.isPending ? _jsx(Loader2, { size: 16, className: "animate-spin" }) : _jsx(Save, { size: 16 }), "Guardar puntaje"] }), _jsx("button", { type: "button", onClick: onClose, className: "rounded-lg px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800", children: "Cancelar" })] })] }));
}
