import client from "@/api/client"
import type {
  ActualizarItemCarritoRequest,
  ActualizarItemCarritoResponse,
  AgregarItemCarritoRequest,
  AgregarItemCarritoResponse,
  Carrito,
  MensajeResponse,
} from "@/types/api"

export async function obtenerCarrito(): Promise<Carrito> {
  const res = await client.get<Carrito>("/carrito")
  return res.data
}

export async function agregarItem(
  data: AgregarItemCarritoRequest,
): Promise<AgregarItemCarritoResponse> {
  const res = await client.post<AgregarItemCarritoResponse>(
    "/carrito/items",
    data,
  )
  return res.data
}

export async function actualizarItem(
  productoId: string,
  data: ActualizarItemCarritoRequest,
): Promise<ActualizarItemCarritoResponse> {
  const res = await client.put<ActualizarItemCarritoResponse>(
    `/carrito/items/${productoId}`,
    data,
  )
  return res.data
}

export async function eliminarItem(
  productoId: string,
): Promise<MensajeResponse> {
  const res = await client.delete<MensajeResponse>(
    `/carrito/items/${productoId}`,
  )
  return res.data
}
