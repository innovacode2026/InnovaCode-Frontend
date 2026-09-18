import type { Product } from './mockData'
import { products as mockProducts, categories } from './mockData'
import { obtenerProductos, obtenerProducto } from '../api/productoService'
import type { Producto } from '../types/api'

export type ProductoVista = Product & { stock: number }

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

const IMAGEN_DEFECTO =
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format'

export const esSellable = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

function idCategoria(nombre: string): string {
  const base = norm(nombre)
  const match = categories.find(c => norm(c.name) === base)
  if (match) return match.id
  return base.replace(/[^a-z0-9]+/g, '-') || 'otros'
}

function buscarMock(nombre: string): Product | undefined {
  const n = norm(nombre)
  if (!n) return undefined
  return mockProducts.find(p => {
    const m = norm(p.name)
    return n.includes(m) || m.includes(n) || norm(p.shortDescription).includes(n)
  })
}

function desdeApi(p: Producto): ProductoVista {
  const mock = buscarMock(p.nombre)
  const imagen = p.imagen ?? mock?.image ?? IMAGEN_DEFECTO
  return {
    id: p.id,
    name: p.nombre,
    shortDescription: mock?.shortDescription ?? p.descripcion ?? '',
    description: mock?.description ?? p.descripcion ?? '',
    price: p.precio,
    category: idCategoria(p.categoria ?? ''),
    image: imagen,
    video: p.video ?? mock?.video,
    videoDuration: p.videoDuration ?? mock?.videoDuration,
    videoStartTime: p.videoStartTime ?? mock?.videoStartTime,
    gallery: mock?.gallery?.length ? mock.gallery : (p.imagen ? [p.imagen] : [imagen]),
    colors: mock?.colors,
    rating: mock?.rating ?? 0,
    reviewCount: mock?.reviewCount ?? 0,
    features: mock?.features ?? [],
    status: p.stock > 0 ? 'active' : 'inactive',
    createdAt: new Date().toISOString(),
    brand: mock?.brand ?? '',
    sku: mock?.sku ?? '',
    stock: p.stock,
  }
}

function desdeMock(p: Product): ProductoVista {
  return { ...p, stock: 10 }
}

export async function cargarCatalogo(): Promise<ProductoVista[]> {
  try {
    const pagina = await obtenerProductos({ limite: 100 })
    if (pagina.productos.length > 0) {
      return pagina.productos.map(desdeApi)
    }
  } catch {
    /* sin backend: se usa el catálogo de respaldo */
  }
  return mockProducts.map(desdeMock)
}

export async function cargarProducto(
  id: string,
): Promise<ProductoVista | null> {
  if (esSellable(id)) {
    try {
      return desdeApi(await obtenerProducto(id))
    } catch {
      /* no existe: respaldo */
    }
  }
  const mock = mockProducts.find(p => p.id === id)
  return mock ? desdeMock(mock) : null
}