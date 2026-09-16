import client from "@/api/client"
import type {
  LoginRequest,
  LoginResponse,
  RegistrarRequest,
  UsuarioRegistrado,
} from "@/types/api"

export async function registrar(
  data: RegistrarRequest,
): Promise<UsuarioRegistrado> {
  const res = await client.post<UsuarioRegistrado>("/auth/register", data)
  return res.data
}

export async function iniciarSesion(
  data: LoginRequest,
): Promise<LoginResponse> {
  const res = await client.post<LoginResponse>("/auth/login", data)
  return res.data
}
