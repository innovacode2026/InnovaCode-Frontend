import { useState, useCallback, useEffect } from 'react'
import type { Role, UserSession } from '@/types'
import { iniciarSesion, registrar } from '@/api/authService'
import { TOKEN_KEY } from '@/api/client'

const USER_KEY = 'evox_usuario'

function leerSesion(): UserSession | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    const usuario = JSON.parse(raw) as UserSession
    if (usuario && typeof usuario.id === 'string' && typeof usuario.rol === 'string') {
      return usuario
    }
  } catch {
    /* JSON corrupto: se ignora y queda como guest */
  }
  return null
}

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(leerSesion)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem(USER_KEY)
      setUser(null)
    }
    window.addEventListener('evox:logout', handleLogout)
    return () => window.removeEventListener('evox:logout', handleLogout)
  }, [])

  const login = useCallback(async (correo: string, password: string) => {
    setLoading(true)
    try {
      const res = await iniciarSesion({ correo, password })
      const sesion: UserSession = {
        id: res.usuario.id,
        nombre: res.usuario.nombre,
        correo,
        rol: res.usuario.rol,
      }
      localStorage.setItem(TOKEN_KEY, res.token)
      localStorage.setItem(USER_KEY, JSON.stringify(sesion))
      setUser(sesion)
      return sesion
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(
    async (nombre: string, apellido: string, correo: string, password: string) => {
      setLoading(true)
      try {
        return await registrar({ nombre, apellido, correo, password })
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  const role: Role = user?.rol ?? 'guest'

  return {
    user,
    role,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}