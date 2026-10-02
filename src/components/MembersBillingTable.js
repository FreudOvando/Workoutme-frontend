import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';
import { useAllPayments, useUpdateFee, useUsers } from '@/hooks/useBilling';
import { RegisterPaymentButton } from './RegisterPaymentButton';
import { formatMXN } from '@/lib/currency';
export function MembersBillingTable() {
    const { data: users } = useUsers();
    const { data: payments } = useAllPayments();
    const updateFee = useUpdateFee();
    const [editingFeeId, setEditingFeeId] = useState(null);
    const [feeDraft, setFeeDraft] = useState('');
    if (!users) {
        return _jsx("div", { className: "rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-6 text-sm text-zinc-400", children: "Cargando miembros..." });
    }
    const athletes = users.filter((u) => {
        const role = String(u.role ?? '').toUpperCase();
        return role === 'ATHLETE' || role === 'USER';
    });
    function latestPaymentFor(userId) {
        return payments
            ?.filter((p) => p.userId === userId)
            .sort((a, b) => b.paymentDate.localeCompare(a.paymentDate))[0];
    }
    function startEditFee(userId, current) {
        setEditingFeeId(userId);
        setFeeDraft(current?.toString() ?? '');
    }
    function confirmFee(userId) {
        const value = Number(feeDraft);
        if (Number.isNaN(value) || value < 0)
            return;
        updateFee.mutate({ id: userId, monthlyFee: value }, { onSuccess: () => setEditingFeeId(null) });
    }
    return (_jsx("div", { className: "rounded-2xl border border-zinc-800 bg-zinc-950/60", children: athletes.length === 0 ? (_jsx("div", { className: "px-4 py-6 text-center text-sm text-zinc-400", children: "No hay atletas registrados para mostrar." })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "hidden overflow-x-auto md:block", children: _jsxs("table", { className: "w-full min-w-[700px] text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-zinc-800 bg-zinc-900/60 text-left text-zinc-400", children: [_jsx("th", { className: "px-4 py-3 font-medium", children: "Atleta" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Mensualidad" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "\u00DAltimo pago" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Pr\u00F3ximo pago" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Estado" }), _jsx("th", { className: "px-4 py-3 font-medium", children: "Pago" })] }) }), _jsx("tbody", { children: athletes.map((athlete) => {
                                    const latest = latestPaymentFor(athlete.id);
                                    const nextDue = latest ? new Date(`${latest.nextDueDate}T23:59:59`) : null;
                                    const isActive = nextDue ? nextDue >= new Date() : false;
                                    const isEditingFee = editingFeeId === athlete.id;
                                    return (_jsxs("tr", { className: "border-b border-zinc-800 last:border-0", children: [_jsxs("td", { className: "px-4 py-3 font-medium text-zinc-100", children: [athlete.firstName, " ", athlete.lastName] }), _jsx("td", { className: "px-4 py-3", children: isEditingFee ? (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("input", { autoFocus: true, type: "number", min: 0, value: feeDraft, onChange: (e) => setFeeDraft(e.target.value), className: "w-24 rounded border border-zinc-700 bg-zinc-900 px-1 py-0.5 text-zinc-100" }), _jsx("button", { onClick: () => confirmFee(athlete.id), className: "text-emerald-400 hover:text-emerald-300", "aria-label": "Guardar", children: _jsx(Check, { size: 14 }) }), _jsx("button", { onClick: () => setEditingFeeId(null), className: "text-zinc-500 hover:text-zinc-300", "aria-label": "Cancelar", children: _jsx(X, { size: 14 }) })] })) : (_jsxs("button", { onClick: () => startEditFee(athlete.id, athlete.monthlyFee), className: "group inline-flex items-center gap-1 text-zinc-300 hover:text-orange-400", children: [formatMXN(athlete.monthlyFee), _jsx(Pencil, { size: 12, className: "opacity-0 group-hover:opacity-100" })] })) }), _jsx("td", { className: "px-4 py-3 text-zinc-300", children: latest ? new Date(`${latest.paymentDate}T00:00:00`).toLocaleDateString('es-MX') : 'Sin pagos' }), _jsx("td", { className: "px-4 py-3 text-zinc-300", children: latest ? new Date(`${latest.nextDueDate}T00:00:00`).toLocaleDateString('es-MX') : '—' }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `font-semibold ${isActive ? 'text-emerald-400' : 'text-red-400'}`, children: isActive ? 'Vigente' : 'Vencida' }) }), _jsx("td", { className: "px-4 py-3", children: _jsx(RegisterPaymentButton, { userId: athlete.id, defaultAmount: athlete.monthlyFee ?? null }) })] }, athlete.id));
                                }) })] }) }), _jsx("div", { className: "grid gap-3 p-3 md:hidden", children: athletes.map((athlete) => {
                        const latest = latestPaymentFor(athlete.id);
                        const nextDue = latest ? new Date(`${latest.nextDueDate}T23:59:59`) : null;
                        const isActive = nextDue ? nextDue >= new Date() : false;
                        const isEditingFee = editingFeeId === athlete.id;
                        return (_jsxs("div", { className: "rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 shadow-sm", children: [_jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-semibold text-zinc-100", children: [athlete.firstName, " ", athlete.lastName] }), _jsx("p", { className: `mt-1 text-xs font-semibold ${isActive ? 'text-emerald-400' : 'text-red-400'}`, children: isActive ? 'Vigente' : 'Vencida' })] }), _jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] text-zinc-500", children: "Atleta" })] }), _jsxs("div", { className: "space-y-2 text-sm text-zinc-300", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("span", { className: "text-zinc-400", children: "Mensualidad" }), isEditingFee ? (_jsxs("div", { className: "flex items-center justify-end gap-1", children: [_jsx("input", { autoFocus: true, type: "number", min: 0, value: feeDraft, onChange: (e) => setFeeDraft(e.target.value), className: "w-20 rounded border border-zinc-700 bg-zinc-950 px-1 py-0.5 text-right text-zinc-100" }), _jsx("button", { onClick: () => confirmFee(athlete.id), className: "text-emerald-400 hover:text-emerald-300", "aria-label": "Guardar", children: _jsx(Check, { size: 14 }) }), _jsx("button", { onClick: () => setEditingFeeId(null), className: "text-zinc-500 hover:text-zinc-300", "aria-label": "Cancelar", children: _jsx(X, { size: 14 }) })] })) : (_jsxs("button", { onClick: () => startEditFee(athlete.id, athlete.monthlyFee), className: "group inline-flex items-center gap-1 text-zinc-200 hover:text-orange-400", children: [formatMXN(athlete.monthlyFee), _jsx(Pencil, { size: 12, className: "opacity-60 group-hover:opacity-100" })] }))] }), _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("span", { className: "text-zinc-400", children: "\u00DAltimo pago" }), _jsx("span", { children: latest ? new Date(`${latest.paymentDate}T00:00:00`).toLocaleDateString('es-MX') : 'Sin pagos' })] }), _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("span", { className: "text-zinc-400", children: "Pr\u00F3ximo pago" }), _jsx("span", { children: latest ? new Date(`${latest.nextDueDate}T00:00:00`).toLocaleDateString('es-MX') : '—' })] })] }), _jsx("div", { className: "mt-3", children: _jsx(RegisterPaymentButton, { userId: athlete.id, defaultAmount: athlete.monthlyFee ?? null }) })] }, athlete.id));
                    }) })] })) }));
}
