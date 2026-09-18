import client from "@/api/client"
import type { UsuarioAdmin } from "@/types/api"

export async function obtenerUsuarios(): Promise<UsuarioAdmin[]> {
  const res = await client.get<UsuarioAdmin[]>("/perfiles")
  return res.data
}