import type { Role } from '@/types'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: Role
}

const demoAccounts = [
  { email: 'ana.garcia@email.com', password: 'demo123', role: 'user' as const, name: 'Ana García', id: 'u1' },
  { email: 'juan.perez@innovacode.com', password: 'demo123', role: 'admin' as const, name: 'Juan Pérez', id: 'u7' },
  { email: 'sofia.chen@innovacode.com', password: 'demo123', role: 'superadmin' as const, name: 'Sofía Chen', id: 'u9' },
]

export async function login(email: string, password: string): Promise<AuthUser> {
  const account = demoAccounts.find(a => a.email === email && a.password === password)
  if (!account) throw new Error('Credenciales incorrectas')
  return { id: account.id, name: account.name, email: account.email, role: account.role }
}

export async function register(name: string, email: string, _password: string): Promise<AuthUser> {
  return { id: `u-${Date.now()}`, name, email, role: 'user' }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  return null
}
