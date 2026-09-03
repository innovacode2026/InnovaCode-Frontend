export type Role = 'guest' | 'user' | 'admin' | 'superadmin'

export type Page =
  | 'landing'
  | 'catalog'
  | 'product'
  | 'wishlist'
  | 'login'
  | 'register'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-products'
  | 'admin-product-form'
  | 'super-dashboard'
  | 'super-roles'
  | 'access-denied'

export interface AppContext {
  role: Role
  page: Page
  selectedProductId: string | null
  wishlist: string[]
  navigate: (page: Page, productId?: string) => void
  setRole: (role: Role) => void
  toggleWishlist: (productId: string) => void
}
