import { users as mockUsers } from '@/data/mockData'
import type { User } from '@/data/mockData'

export async function getUsers(): Promise<User[]> {
  return mockUsers
}

export async function toggleUserStatus(id: string): Promise<User> {
  const user = mockUsers.find(u => u.id === id)
  if (!user) throw new Error('Usuario no encontrado')
  user.status = user.status === 'active' ? 'inactive' : 'active'
  return user
}
