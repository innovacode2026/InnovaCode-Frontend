import { useState, useEffect, useCallback } from 'react'
import { Page, AppContext } from './types'
import { useAuth } from './hooks/useAuth'
import { cargarCatalogo, ProductoVista } from './data/catalogo'
import { agregarItem, actualizarItem, eliminarItem, obtenerCarrito } from './api/carritoService'
import { crearPedido as crearPedidoApi } from './api/pedidoService'
import type { Carrito, CrearPedidoResponse } from './types/api'
import PaginaInicio from './pages/Landing'
import Catalogo from './pages/Catalog'
import DetalleProducto from './pages/ProductDetail'
import ListaDeseos from './pages/Wishlist'
import PaginaCarrito from './pages/Cart'
import InicioSesion from './pages/Login'
import Registro from './pages/Register'
import PanelAdmin from './pages/admin/Dashboard'
import UsuariosAdmin from './pages/admin/Users'
import ProductosAdmin from './pages/admin/Products'
import AccesoDenegado from './pages/AccessDenied'
import QuienesSomos from './pages/About'

export default function App() {
  const { user, role, login, register, logout } = useAuth()
  const [page, setPage] = useState<Page>('landing')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [catalogCategory, setCatalogCategory] = useState('')
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('evox_wishlist_guest') ?? '[]')
    } catch {
      return []
    }
  })
  const [products, setProducts] = useState<ProductoVista[]>([])
  const [carrito, setCarrito] = useState<Carrito>({ items: [], total: 0 })

  useEffect(() => {
    const key = `evox_wishlist_${user?.id ?? 'guest'}`
    try {
      const saved = localStorage.getItem(key)
      setWishlist(saved ? JSON.parse(saved) : [])
    } catch {
      setWishlist([])
    }
  }, [user?.id])

  useEffect(() => {
    const key = `evox_wishlist_${user?.id ?? 'guest'}`
    try {
      localStorage.setItem(key, JSON.stringify(wishlist))
    } catch {
      /* almacenamiento lleno o bloqueado: se mantiene en memoria */
    }
  }, [wishlist, user?.id])

  useEffect(() => {
    let active = true
    cargarCatalogo().then(list => {
      if (active) setProducts(list)
    })
    return () => {
      active = false
    }
  }, [])

  const refrescarCarrito = useCallback(async () => {
    if (role !== 'CLIENTE') return
    try {
      const c = await obtenerCarrito()
      setCarrito(c)
    } catch {
      /* se mantiene el estado actual */
    }
  }, [role])

  useEffect(() => {
    void refrescarCarrito()
  }, [refrescarCarrito])

  const addToCart = useCallback(
    async (productoId: string, cantidad = 1) => {
      await agregarItem({ productoId, cantidad })
      void refrescarCarrito()
    },
    [refrescarCarrito],
  )

  const removeFromCart = useCallback(
    async (productoId: string) => {
      await eliminarItem(productoId)
      void refrescarCarrito()
    },
    [refrescarCarrito],
  )

  const updateCartQty = useCallback(
    async (productoId: string, cantidad: number) => {
      await actualizarItem(productoId, { cantidad })
      void refrescarCarrito()
    },
    [refrescarCarrito],
  )

  const crearPedido = useCallback(
    async (nota?: string): Promise<CrearPedidoResponse> => {
      const res = await crearPedidoApi({ nota })
      void refrescarCarrito()
      return res
    },
    [refrescarCarrito],
  )

  const navigate = (newPage: Page, productId?: string, category?: string) => {
    if (productId) setSelectedProductId(productId)
    if (newPage === 'catalog') setCatalogCategory(category ?? '')
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }

  const handleLogin = async (correo: string, password: string) => {
    const sesion = await login(correo, password)
    void refrescarCarrito()
    return sesion
  }

  const handleLogout = () => {
    setCarrito({ items: [], total: 0 })
    logout()
  }

  const cartCount = carrito.items.reduce((n, i) => n + i.cantidad, 0)

  const ctx: AppContext = {
    role,
    page,
    selectedProductId,
    wishlist,
    products,
    carrito,
    cartCount,
    userName: user?.nombre ?? '',
    user,
    login: handleLogin,
    register,
    logout: handleLogout,
    navigate,
    catalogCategory,
    toggleWishlist,
    addToCart,
    removeFromCart,
    updateCartQty,
    crearPedido,
    refrescarCarrito,
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
    case 'cart':
      return <PaginaCarrito {...ctx} />
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
    case 'about':
      return <QuienesSomos {...ctx} />
    case 'access-denied':
      return <AccesoDenegado {...ctx} requiredRole="ADMINISTRADOR" />
    default:
      return <PaginaInicio {...ctx} />
  }
}