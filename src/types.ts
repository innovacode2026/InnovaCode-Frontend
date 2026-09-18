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
  productoId: number
  nombre: string
  precio: number
  cantidad: number
  subtotal: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface Order {
  id: number
  fecha: string
  total: number
  estado: string
}

export interface AppContext {
  role: Role
  page: Page
  selectedProductId: string | null
  wishlist: string[]
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
}