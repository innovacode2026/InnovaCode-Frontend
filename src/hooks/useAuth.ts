import { useState } from 'react'
import type { Role } from '@/types'
import type { AuthUser } from '@/services/auth'
import * as auth from '@/services/auth'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const u = await auth.login(email, password)
      setUser(u)
      return u
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      const u = await auth.register(name, email, password)
      setUser(u)
      return u
    } finally {
      setLoading(false)
    }
  }

  const logout = () => setUser(null)

  const role: Role = user?.role ?? 'guest'

  return { user, role, loading, login, register, logout, isAuthenticated: !!user }
}
