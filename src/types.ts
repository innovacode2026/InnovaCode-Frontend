import type { CrearPedidoResponse } from './types/api'
import type { ProductoVista } from './data/catalogo'

export type Role = 'guest' | 'CLIENTE' | 'ADMINISTRADOR'

export interface UserSession {
  id: string
  nombre: string
  correo: string
  rol: Exclude<Role, 'guest'>
}

export interface UsuarioRegistrado {
  id: string
  nombreCompleto: string
  correo: string
  rol: Exclude<Role, 'guest'>
}

export type Page =
  | 'landing'
  | 'catalog'
  | 'product'
  | 'wishlist'
  | 'cart'
  | 'orders'
  | 'login'
  | 'register'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-products'
  | 'admin-product-form'
  | 'access-denied'

export interface CartItem {
  productoId: string
  nombre: string
  precio: number
  cantidad: number
  subtotal: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface AppContext {
  role: Role
  page: Page
  selectedProductId: string | null
  wishlist: string[]
  products: ProductoVista[]
  carrito: Cart
  cartCount: number
  userName: string
  user: UserSession | null
  login: (correo: string, password: string) => Promise<UserSession>
  register: (
    nombre: string,
    apellido: string,
    correo: string,
    password: string
  ) => Promise<UsuarioRegistrado>
  logout: () => void
  navigate: (page: Page, productId?: string) => void
  toggleWishlist: (productId: string) => void
  addToCart: (productoId: string, cantidad?: number) => Promise<void>
  removeFromCart: (productoId: string) => Promise<void>
  updateCartQty: (productoId: string, cantidad: number) => Promise<void>
  crearPedido: (nota?: string) => Promise<CrearPedidoResponse>
  refrescarCarrito: () => Promise<void>
}