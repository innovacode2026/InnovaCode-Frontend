export const ESTADO_PEDIDO = [
  "PENDIENTE",
  "PAGADO",
  "ENVIADO",
  "ENTREGADO",
] as const
export type EstadoPedido = typeof ESTADO_PEDIDO[number]

export const ROL = ["CLIENTE", "ADMINISTRADOR"] as const
export type Rol = typeof ROL[number]

export type UUID = string

export interface ApiError {
  codigo: number
  mensaje: string
}

export interface MensajeResponse {
  mensaje: string
}

export interface RegistrarRequest {
  nombre: string
  apellido: string
  correo: string
  password: string
}

export interface UsuarioRegistrado {
  id: UUID
  nombreCompleto: string
  correo: string
  rol: Rol
}

export interface LoginRequest {
  correo: string
  password: string
}

export interface UsuarioSesion {
  id: UUID
  nombre: string
  rol: Rol
}

export interface LoginResponse {
  token: string
  usuario: UsuarioSesion
}

export interface Producto {
  id: UUID
  nombre: string
  descripcion: string | null
  precio: number
  stock: number
  imagen: string | null
  categoria: string | null
}

export interface ProductoInput {
  nombre: string
  descripcion?: string | null
  precio: number
  stock: number
  imagen?: string | null
  categoriaId?: string | null
}

export interface ProductoQueryParams {
  categoria?: string
  buscar?: string
  pagina?: number
  limite?: number
}

export interface PaginaProductos {
  pagina: number
  total: number
  productos: Producto[]
}

export interface CarritoItem {
  productoId: UUID
  nombre: string
  precio: number
  cantidad: number
  subtotal: number
}

export interface Carrito {
  items: CarritoItem[]
  total: number
}

export interface AgregarItemCarritoRequest {
  productoId: UUID
  cantidad: number
}

export interface AgregarItemCarritoResponse {
  mensaje: string
  total: number
}

export interface ActualizarItemCarritoRequest {
  cantidad: number
}

export interface ActualizarItemCarritoResponse {
  mensaje: string
  subtotal: number
  total: number
}

export interface CrearPedidoRequest {
  nota?: string
}

export interface CrearPedidoResponse {
  id: UUID
  estado: EstadoPedido
  total: number
  mensaje: string
}

export interface PedidoResumen {
  id: UUID
  fecha: string
  total: number
  estado: EstadoPedido
}

export interface PedidoItem {
  productoId: UUID
  nombre: string
  cantidad: number
  precio: number
}

export interface PedidoDetalle {
  id: UUID
  estado: EstadoPedido
  total: number
  items: PedidoItem[]
}

export interface CrearComentarioRequest {
  puntuacion: number
  contenido: string
}

export interface Comentario {
  id: UUID
  usuario: string
  puntuacion: number
  contenido: string
  fecha: string
}

export interface UsuarioAdmin {
  id: UUID
  nombreCompleto: string | null
  correo: string
  rol: Rol
  fechaRegistro: string | null
}

export interface Categoria {
  id: UUID
  nombre: string
  descripcion: string | null
  orden: number
  activo: boolean
}
