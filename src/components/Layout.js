import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
export function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate('/');
    }
    return (_jsxs("div", { className: "min-h-screen bg-zinc-950 text-zinc-100", children: [_jsx("header", { className: "sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur", children: _jsxs("div", { className: "mx-auto flex max-w-4xl items-center justify-between px-4 py-4", children: [_jsxs(Link, { to: "/", className: "text-2xl font-black tracking-tight", children: ["Workout", _jsx("span", { className: "text-orange-500", children: "Me" })] }), _jsx("div", { className: "flex items-center gap-3", children: user ? (_jsxs(_Fragment, { children: [user.role === 'ADMIN' && (_jsxs(Link, { to: "/wods/new", className: "flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-orange-400", children: [_jsx(Plus, { size: 18, strokeWidth: 3 }), "Nuevo WOD"] })), _jsxs("span", { className: "text-sm text-zinc-400", children: ["Hola, ", _jsx("span", { className: "font-semibold text-zinc-200", children: user.firstName })] }), _jsx("button", { onClick: handleLogout, className: "flex items-center gap-1.5 rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100", "aria-label": "Cerrar sesi\u00F3n", children: _jsx(LogOut, { size: 18 }) })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "text-sm text-zinc-400 hover:text-zinc-100", children: "Iniciar sesi\u00F3n" }), _jsx(Link, { to: "/register", className: "rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-orange-400", children: "Crear cuenta" })] })) })] }) }), _jsx("main", { className: "mx-auto max-w-4xl px-4 py-8", children: _jsx(Outlet, {}) })] }));
}
