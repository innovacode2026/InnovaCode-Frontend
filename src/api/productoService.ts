import client from "@/api/client"
import type {
  MensajeResponse,
  PaginaProductos,
  Producto,
  ProductoInput,
  ProductoQueryParams,
} from "@/types/api"

export async function obtenerProductos(
  params: ProductoQueryParams = {},
): Promise<PaginaProductos> {
  const res = await client.get<PaginaProductos>("/productos", { params })
  return res.data
}

export async function obtenerProducto(id: string): Promise<Producto> {
  const res = await client.get<Producto>(`/productos/${id}`)
  return res.data
}

export async function crearProducto(
  data: ProductoInput,
): Promise<MensajeResponse> {
  const res = await client.post<MensajeResponse>("/productos", data)
  return res.data
}

export async function actualizarProducto(
  id: string,
  data: ProductoInput,
): Promise<MensajeResponse> {
  const res = await client.put<MensajeResponse>(`/productos/${id}`, data)
  return res.data
}

export async function eliminarProducto(id: string): Promise<MensajeResponse> {
  const res = await client.delete<MensajeResponse>(`/productos/${id}`)
  return res.data
}
