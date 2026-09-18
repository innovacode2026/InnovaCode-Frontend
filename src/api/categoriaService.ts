import client from "@/api/client"
import type { Categoria } from "@/types/api"

export async function obtenerCategorias(): Promise<Categoria[]> {
  const res = await client.get<Categoria[]>("/categorias")
  return res.data
}