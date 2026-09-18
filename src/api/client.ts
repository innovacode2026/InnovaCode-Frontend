import axios, { AxiosError } from "axios"
import type { ApiError } from "@/types/api"

export const TOKEN_KEY = "evox_token"

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8081/api/v1",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      window.dispatchEvent(new Event("evox:logout"))
    }
    return Promise.reject(error)
  },
)

export function getMensajeError(err: unknown): string {
  if (axios.isAxiosError<ApiError>(err)) {
    return err.response?.data?.mensaje ?? err.message
  }
  if (err instanceof Error) {
    return err.message
  }
  return "Error desconocido"
}

export function isAxiosError(err: unknown): err is AxiosError<ApiError> {
  return axios.isAxiosError(err)
}

export default client
