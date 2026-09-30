import { createContext, useContext, useState, type ReactNode } from 'react'
import { clearSession, getStoredUser, setSession, setStoredUser } from '@/lib/authStorage'
import { updateProfilePhoto } from '@/api/users'
import type { AuthResponse, User } from '@/types/user'

interface AuthContextValue {
  user: User | null
  login: (response: AuthResponse) => void
  logout: () => void
  updatePhotoUrl: (photoUrl: string | null) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser())

  function login(response: AuthResponse) {
    setSession(response.token, response.user)
    setUser(response.user)
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  async function updatePhotoUrl(photoUrl: string | null) {
    if (!user) return
    await updateProfilePhoto(photoUrl)
    const updatedUser = { ...user, photoUrl }
    setStoredUser(updatedUser)
    setUser(updatedUser)
  }

  return <AuthContext.Provider value={{ user, login, logout, updatePhotoUrl }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}