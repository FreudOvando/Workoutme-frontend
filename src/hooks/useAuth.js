import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import { clearSession, getStoredUser, setSession } from '@/lib/authStorage';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getStoredUser());
    function login(response) {
        setSession(response.token, response.user);
        setUser(response.user);
    }
    function logout() {
        clearSession();
        setUser(null);
    }
    return _jsx(AuthContext.Provider, { value: { user, login, logout }, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}
