import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '@/hooks/useAuth';
import { useUserPayments } from '@/hooks/useBilling';
export function MembershipBadge() {
    const { user } = useAuth();
    const { data: payments } = useUserPayments(user?.id ?? 0);
    if (!user)
        return null;
    // El backend ya los entrega ordenados del más reciente al más viejo
    const latest = payments?.[0];
    const isActive = latest ? new Date(`${latest.nextDueDate}T23:59:59`) >= new Date() : false;
    return (_jsxs("span", { className: `flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${isActive
            ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'
            : 'bg-red-500/15 text-red-400 ring-1 ring-red-500/30'}`, children: [_jsx("span", { className: `h-2 w-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-red-400'}` }), isActive ? 'Mensualidad vigente' : 'Mensualidad vencida'] }));
}
