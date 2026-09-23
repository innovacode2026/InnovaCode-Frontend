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
import PaginaAyuda from './pages/Ayuda'
import WidgetSoporte from './components/SoporteWidget'
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
  const [catalogSearch, setCatalogSearch] = useState('')
  const [helpSection, setHelpSection] = useState('')
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('evox_wishlist_guest') ?? '[]')
    } catch {
      return []
    }
  })
  const [products, setProducts] = useState<ProductoVista[]>([])
  const [carrito, setCarrito] = useState<Carrito>({ items: [], total: 0 })

  // La lista solo se escribe al pulsar Guardar/Quitar (toggleWishlist).
  // Nunca se escribe al cargar: asi una recarga no puede borrar lo guardado.
  useEffect(() => {
    const key = `evox_wishlist_${user?.id ?? 'guest'}`
    try {
      const saved = localStorage.getItem(key)
      if (saved) setWishlist(JSON.parse(saved))
    } catch {
      /* JSON corrupto: se mantiene la lista actual */
    }
  }, [user?.id])

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

  const navigate = (newPage: Page, productId?: string, category?: string, search?: string, section?: string) => {
    if (productId) setSelectedProductId(productId)
    if (newPage === 'catalog') {
      setCatalogCategory(category ?? '')
      setCatalogSearch(search ?? '')
    }
    if (newPage === 'ayuda') setHelpSection(section ?? '')
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  const toggleWishlist = (productId: string) => {
    const next = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId]
    setWishlist(next)
    try {
      localStorage.setItem(`evox_wishlist_${user?.id ?? 'guest'}`, JSON.stringify(next))
    } catch {
      /* almacenamiento lleno o bloqueado: se mantiene en memoria */
    }
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
    catalogSearch,
    helpSection,
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
    return (
      <>
        <AccesoDenegado {...ctx} requiredRole="ADMINISTRADOR" />
        <WidgetSoporte {...ctx} />
      </>
    )
  }

  let contenido: React.ReactNode
  switch (page) {
    case 'catalog':
      contenido = <Catalogo {...ctx} />
      break
    case 'product':
      contenido = <DetalleProducto {...ctx} />
      break
    case 'wishlist':
      contenido = <ListaDeseos {...ctx} />
      break
    case 'cart':
      contenido = <PaginaCarrito {...ctx} />
      break
    case 'login':
      contenido = <InicioSesion {...ctx} />
      break
    case 'register':
      contenido = <Registro {...ctx} />
      break
    case 'admin-dashboard':
      contenido = <PanelAdmin {...ctx} />
      break
    case 'admin-users':
      contenido = <UsuariosAdmin {...ctx} />
      break
    case 'admin-products':
    case 'admin-product-form':
      contenido = <ProductosAdmin {...ctx} />
      break
    case 'about':
      contenido = <QuienesSomos {...ctx} />
      break
    case 'ayuda':
      contenido = <PaginaAyuda {...ctx} />
      break
    case 'access-denied':
      contenido = <AccesoDenegado {...ctx} requiredRole="ADMINISTRADOR" />
      break
    default:
      contenido = <PaginaInicio {...ctx} />
  }
  return (
    <>
      {contenido}
      <WidgetSoporte {...ctx} />
    </>
  )
}