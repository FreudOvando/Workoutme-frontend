import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
export function RequireAdmin() {
    const { user } = useAuth();
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    const userRole = user.role?.toUpperCase();
    if (userRole !== 'ADMIN' && userRole !== 'ADMINISTRATOR') {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(Outlet, {});
}
