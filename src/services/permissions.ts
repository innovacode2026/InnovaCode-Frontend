import { permissions as mockPermissions } from '@/data/mockData'
import type { Permission } from '@/data/mockData'

type PermissionRole = 'userAccess' | 'adminAccess' | 'superAdminAccess'

export async function getPermissions(): Promise<Permission[]> {
  return mockPermissions
}

export async function togglePermission(id: string, role: PermissionRole): Promise<Permission> {
  const perm = mockPermissions.find(p => p.id === id)
  if (!perm) throw new Error('Permiso no encontrado')
  perm[role] = !perm[role]
  return perm
}
