import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { RequireAuth } from '@/components/RequiredAuth';
import { RequireAdmin } from '@/components/RequiredAdmin';
import { WodListPage } from '@/pages/WodListPages';
import { WodFormPage } from '@/pages/WodFormPages';
import { RegisterPage } from '@/pages/RegisterPages';
import { LoginPage } from '@/pages/LoginPages';
export default function App() {
    return (_jsx(Routes, { children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsxs(Route, { element: _jsx(RequireAuth, {}), children: [_jsx(Route, { path: "/", element: _jsx(WodListPage, {}) }), _jsxs(Route, { element: _jsx(RequireAdmin, {}), children: [_jsx(Route, { path: "/wods/new", element: _jsx(WodFormPage, {}) }), _jsx(Route, { path: "/wods/:id/edit", element: _jsx(WodFormPage, {}) })] })] })] }) }));
}
