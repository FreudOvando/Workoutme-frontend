import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RequireAuth } from "@/components/RequiredAuth";
import { RequireAdmin } from "@/components/RequiredAdmin";
import { WodListPage } from "@/pages/WodListPages";
import { WodFormPage } from "@/pages/WodFormPages";
import { RegisterPage } from "@/pages/RegisterPages";
import { LoginPage } from "@/pages/LoginPages";
import { ProfilePage } from "@/pages/ProfilePage";
import { CompetitionListPage } from "@/pages/CompetitionListPage";
import { CompetitionFormPage } from "@/pages/CompetitionFormPage";
import { CompetitionDetailPage } from "@/pages/CompetitionDetailPage";
import { BillingPage } from '@/pages/BillingPage';
export default function App() {
    return (_jsx(Routes, { children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsxs(Route, { element: _jsx(RequireAuth, {}), children: [_jsx(Route, { path: "/competitions", element: _jsx(CompetitionListPage, {}) }), _jsx(Route, { path: "/competitions/:id", element: _jsx(CompetitionDetailPage, {}) }), _jsx(Route, { path: "/", element: _jsx(WodListPage, {}) }), _jsx(Route, { path: "/history", element: _jsx(WodListPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/competitions", element: _jsx(CompetitionListPage, {}) }), _jsx(Route, { path: "/billing", element: _jsx(BillingPage, {}) }), _jsxs(Route, { element: _jsx(RequireAdmin, {}), children: [_jsx(Route, { path: "/wods/new", element: _jsx(WodFormPage, {}) }), _jsx(Route, { path: "/wods/:id/edit", element: _jsx(WodFormPage, {}) }), _jsx(Route, { path: "/competitions/new", element: _jsx(CompetitionFormPage, {}) }), _jsx(Route, { path: "/competitions/:id/edit", element: _jsx(CompetitionFormPage, {}) })] })] })] }) }));
}
