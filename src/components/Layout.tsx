import { Link, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Plus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-2xl font-black tracking-tight">
            Workout<span className="text-orange-500">Me</span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link
                    to="/wods/new"
                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-orange-400"
                  >
                    <Plus size={18} strokeWidth={3} />
                    Nuevo WOD
                  </Link>
                )}
                <span className="text-sm text-zinc-400">
                  Hola, <span className="font-semibold text-zinc-200">{user.firstName}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-zinc-400 hover:text-zinc-100">
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-orange-400"
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}