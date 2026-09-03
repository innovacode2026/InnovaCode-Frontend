import { useState } from 'react'
import { Role, Page, AppContext } from './types'
import Landing from './pages/Landing'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'
import AdminProducts from './pages/admin/Products'
import SuperDashboard from './pages/superadmin/Dashboard'
import SuperRoles from './pages/superadmin/Roles'
import AccessDenied from './pages/AccessDenied'

export default function App() {
  const [role, setRole] = useState<Role>('guest')
  const [page, setPage] = useState<Page>('landing')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3'])

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
    navigate,
    setRole: handleSetRole,
    toggleWishlist,
  }

  // Route guards for admin/superadmin pages
  const isAdminPage = page.startsWith('admin')
  const isSuperPage = page.startsWith('super')

  if (isSuperPage && role !== 'superadmin') {
    return <AccessDenied {...ctx} requiredRole="superadmin" />
  }
  if (isAdminPage && role !== 'admin' && role !== 'superadmin') {
    return <AccessDenied {...ctx} requiredRole="admin" />
  }

  switch (page) {
    case 'catalog':
      return <Catalog {...ctx} />
    case 'product':
      return <ProductDetail {...ctx} />
    case 'wishlist':
      return <Wishlist {...ctx} />
    case 'login':
      return <Login {...ctx} />
    case 'register':
      return <Register {...ctx} />
    case 'admin-dashboard':
      return <AdminDashboard {...ctx} />
    case 'admin-users':
      return <AdminUsers {...ctx} />
    case 'admin-products':
    case 'admin-product-form':
      return <AdminProducts {...ctx} />
    case 'super-dashboard':
      return <SuperDashboard {...ctx} />
    case 'super-roles':
      return <SuperRoles {...ctx} />
    case 'access-denied':
      return <AccessDenied {...ctx} requiredRole="admin" />
    default:
      return <Landing {...ctx} />
  }
}
