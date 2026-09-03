import { products as mockProducts } from '@/data/mockData'
import type { Product } from '@/data/mockData'

export async function getProducts(): Promise<Product[]> {
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return mockProducts.find(p => p.id === id)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return mockProducts.filter(p => p.category === category)
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  const product: Product = { ...data, id: `prod-${Date.now()}` }
  mockProducts.push(product)
  return product
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  const idx = mockProducts.findIndex(p => p.id === id)
  if (idx === -1) throw new Error('Producto no encontrado')
  mockProducts[idx] = { ...mockProducts[idx], ...data }
  return mockProducts[idx]
}

export async function deleteProduct(id: string): Promise<void> {
  const idx = mockProducts.findIndex(p => p.id === id)
  if (idx === -1) throw new Error('Producto no encontrado')
  mockProducts.splice(idx, 1)
}
