import client from "@/api/client"
import type { Comentario, CrearComentarioRequest } from "@/types/api"

export async function crearComentario(
  productoId: string,
  data: CrearComentarioRequest,
): Promise<Comentario> {
  const res = await client.post<Comentario>(
    `/productos/${productoId}/comentarios`,
    data,
  )
  return res.data
}

export async function obtenerComentarios(
  productoId: string,
): Promise<Comentario[]> {
  const res = await client.get<Comentario[]>(
    `/productos/${productoId}/comentarios`,
  )
  return res.data
}
