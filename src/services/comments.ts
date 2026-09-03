import { comments as mockComments } from '@/data/mockData'
import type { Comment } from '@/data/mockData'

export async function getCommentsByProduct(_productId: string): Promise<Comment[]> {
  return mockComments
}

export async function addComment(data: Omit<Comment, 'id'>): Promise<Comment> {
  const comment: Comment = { ...data, id: `c-${Date.now()}` }
  mockComments.push(comment)
  return comment
}
