const API_URL = import.meta.env.VITE_API_URL ?? ''

export interface ApiError {
  status: number
  message: string
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }))
    throw { status: res.status, message: body.message ?? res.statusText } as ApiError
  }

  if (res.status === 204) return undefined as T
  return res.json()
}
