import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { RequireAuth } from '@/components/RequiredAuth'
import { RequireAdmin } from '@/components/RequiredAdmin'
import { WodListPage } from '@/pages/WodListPages'
import { WodFormPage } from '@/pages/WodFormPages'
import { RegisterPage } from '@/pages/RegisterPages'
import { LoginPage } from '@/pages/LoginPages'
import { ProfilePage } from '@/pages/ProfilePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<WodListPage />} />
          <Route path="/history" element={<WodListPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route element={<RequireAdmin />}>
            <Route path="/wods/new" element={<WodFormPage />} />
            <Route path="/wods/:id/edit" element={<WodFormPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}