import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import { clearSession, getStoredUser, setSession, setStoredUser } from '@/lib/authStorage';
import { updateProfilePhoto } from '@/api/users';
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
    async function updatePhotoUrl(photoUrl) {
        if (!user)
            return;
        await updateProfilePhoto(photoUrl);
        const updatedUser = { ...user, photoUrl };
        setStoredUser(updatedUser);
        setUser(updatedUser);
    }
    return _jsx(AuthContext.Provider, { value: { user, login, logout, updatePhotoUrl }, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}
