import { useState, useEffect, useCallback } from 'react'
import type { Product } from '@/data/mockData'
import { getProducts, getProductById } from '@/services/products'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setProducts(await getProducts())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

export function useProduct(id: string | null) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    setLoading(true)
    getProductById(id)
      .then(p => { setProduct(p ?? null) })
      .catch(e => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
