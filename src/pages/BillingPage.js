import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '@/hooks/useAuth';
import { MyMembershipCard } from '@/components/MyMembershipCard';
import { MembersBillingTable } from '@/components/MembersBillingTable';
export function BillingPage() {
    const { user } = useAuth();
    const userRole = user?.role?.toUpperCase();
    const isAdmin = userRole === 'ADMIN' || userRole === 'ADMINISTRATOR';
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsx("h1", { className: "text-2xl font-bold text-zinc-50", children: "Facturaci\u00F3n" }), _jsx(MyMembershipCard, {}), isAdmin && (_jsxs("div", { children: [_jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wide text-zinc-400", children: "Miembros" }), _jsx(MembersBillingTable, {})] }))] }));
}
