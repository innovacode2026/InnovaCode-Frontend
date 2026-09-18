import { useState } from 'react'
import { Page, AppContext } from './types'
import { useAuth } from './hooks/useAuth'
import PaginaInicio from './pages/Landing'
import Catalogo from './pages/Catalog'
import DetalleProducto from './pages/ProductDetail'
import ListaDeseos from './pages/Wishlist'
import InicioSesion from './pages/Login'
import Registro from './pages/Register'
import PanelAdmin from './pages/admin/Dashboard'
import UsuariosAdmin from './pages/admin/Users'
import ProductosAdmin from './pages/admin/Products'
import AccesoDenegado from './pages/AccessDenied'

export default function App() {
  const { user, role, login, register, logout } = useAuth()
  const [page, setPage] = useState<Page>('landing')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3'])
  const [cartCount] = useState(0)

  const navigate = (newPage: Page, productId?: string) => {
    if (productId) setSelectedProductId(productId)
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }

  const ctx: AppContext = {
    role,
    page,
    selectedProductId,
    wishlist,
    cartCount,
    userName: user?.nombre ?? '',
    user,
    login,
    register,
    logout,
    navigate,
    toggleWishlist,
  }

  // Route guard for admin pages
  const isAdminPage = page.startsWith('admin')

  if (isAdminPage && role !== 'ADMINISTRADOR') {
    return <AccesoDenegado {...ctx} requiredRole="ADMINISTRADOR" />
  }

  switch (page) {
    case 'catalog':
      return <Catalogo {...ctx} />
    case 'product':
      return <DetalleProducto {...ctx} />
    case 'wishlist':
      return <ListaDeseos {...ctx} />
    case 'login':
      return <InicioSesion {...ctx} />
    case 'register':
      return <Registro {...ctx} />
    case 'admin-dashboard':
      return <PanelAdmin {...ctx} />
    case 'admin-users':
      return <UsuariosAdmin {...ctx} />
    case 'admin-products':
    case 'admin-product-form':
      return <ProductosAdmin {...ctx} />
    case 'access-denied':
      return <AccesoDenegado {...ctx} requiredRole="ADMINISTRADOR" />
    default:
      return <PaginaInicio {...ctx} />
  }
}