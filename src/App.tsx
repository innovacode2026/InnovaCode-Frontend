import { useState } from 'react'
import { Role, Page, AppContext } from './types'
import PaginaInicio from './pages/Landing'
import Catalogo from './pages/Catalog'
import DetalleProducto from './pages/ProductDetail'
import ListaDeseos from './pages/Wishlist'
import InicioSesion from './pages/Login'
import Registro from './pages/Register'
import PanelAdmin from './pages/admin/Dashboard'
import UsuariosAdmin from './pages/admin/Users'
import ProductosAdmin from './pages/admin/Products'
import PanelSuperAdmin from './pages/superadmin/Dashboard'
import RolesPermisos from './pages/superadmin/Roles'
import AccesoDenegado from './pages/AccessDenied'

export default function App() {
  const [role, setRole] = useState<Role>('guest')
  const [page, setPage] = useState<Page>('landing')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3'])
  const [cartCount] = useState(0)
  const [userName] = useState('')

  const navigate = (newPage: Page, productId?: string) => {
    if (productId) setSelectedProductId(productId)
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  const handleSetRole = (newRole: Role) => {
    setRole(newRole)
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
    userName,
    navigate,
    setRole: handleSetRole,
    toggleWishlist,
  }

  // Route guards for admin/superadmin pages
  const isAdminPage = page.startsWith('admin')
  const isSuperPage = page.startsWith('super')

  if (isSuperPage && role !== 'superadmin') {
    return <AccesoDenegado {...ctx} requiredRole="superadmin" />
  }
  if (isAdminPage && role !== 'admin' && role !== 'superadmin') {
    return <AccesoDenegado {...ctx} requiredRole="admin" />
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
    case 'super-dashboard':
      return <PanelSuperAdmin {...ctx} />
    case 'super-roles':
      return <RolesPermisos {...ctx} />
    case 'access-denied':
      return <AccesoDenegado {...ctx} requiredRole="admin" />
    default:
      return <PaginaInicio {...ctx} />
  }
}
