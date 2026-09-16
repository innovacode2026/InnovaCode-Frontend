import client from "@/api/client"
import type {
  CrearPedidoRequest,
  CrearPedidoResponse,
  PedidoDetalle,
  PedidoResumen,
} from "@/types/api"

export async function crearPedido(
  data: CrearPedidoRequest = {},
): Promise<CrearPedidoResponse> {
  const res = await client.post<CrearPedidoResponse>("/pedidos", data)
  return res.data
}

export async function obtenerPedidos(): Promise<PedidoResumen[]> {
  const res = await client.get<PedidoResumen[]>("/pedidos")
  return res.data
}

export async function obtenerPedido(id: string): Promise<PedidoDetalle> {
  const res = await client.get<PedidoDetalle>(`/pedidos/${id}`)
  return res.data
}
