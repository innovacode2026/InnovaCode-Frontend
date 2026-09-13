export type Role = 'guest' | 'user' | 'admin' | 'superadmin'

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
  | 'super-dashboard'
  | 'super-roles'
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
  navigate: (page: Page, productId?: string) => void
  setRole: (role: Role) => void
  toggleWishlist: (productId: string) => void
}
