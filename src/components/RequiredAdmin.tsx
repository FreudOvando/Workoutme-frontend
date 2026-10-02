import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function RequireAdmin() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const userRole = user.role?.toUpperCase()
  if (userRole !== 'ADMIN' && userRole !== 'ADMINISTRATOR') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}