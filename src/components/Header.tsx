import { useState } from 'react'
import { AppContext } from '../types'
import { SearchIcon, HeartIcon, UserIcon, MenuIcon, XIcon, ChevronDownIcon, CartIcon } from './Icons'

interface EncabezadoProps extends AppContext {
  searchQuery?: string
  onSearchChange?: (q: string) => void
}

export default function Encabezado({ role, page, userName, wishlist, products, cartCount, navigate, logout }: EncabezadoProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)

  const sugerencias = searchQuery.trim()
    ? products
        .filter(p =>
          p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.trim().toLowerCase()),
        )
        .slice(0, 6)
    : []

  const irACatalogo = (q: string) => {
    setSearchFocus(false)
    setMobileOpen(false)
    navigate('catalog', undefined, undefined, q)
  }

  const roleLabels: Record<string, string> = {
    guest: 'Visitante',
    CLIENTE: 'Usuario',
    ADMINISTRADOR: 'Administrador',
  }

  const roleColors: Record<string, string> = {
    guest: 'bg-gray-100 text-gray-600',
    CLIENTE: 'bg-primary-50 text-primary',
    ADMINISTRADOR: 'bg-violet-50 text-violet-700',
  }

  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) irACatalogo(searchQuery.trim())
  }

  const navLinks = [
    { label: 'Inicio', page: 'landing' as const },
    { label: 'Catálogo', page: 'catalog' as const },
    { label: 'Nosotros', page: 'about' as const },
  ]

  const LogoEVOX = () => (
    <button
      onClick={() => navigate('landing')}
      className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer"
    >
      <img src="/logo-evox.png" alt="EVOX" className="w-10 h-10 object-contain rounded-xl" />
      <span
        className="font-display font-800 text-[20px] leading-none"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        EVOX
      </span>
    </button>
  )

  return (
    <header className="backdrop-blur-md border-b sticky top-0 z-50" style={{ background: 'rgba(5,8,22,0.95)', borderColor: 'rgba(99,102,241,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <LogoEVOX />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  page === link.page
                    ? 'text-primary'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={page === link.page ? { background: 'rgba(139,92,246,0.12)' } : {}}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Buscar celulares, laptops..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setTimeout(() => setSearchFocus(false), 150)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none transition-all text-white placeholder:text-white/30"
                style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(99,102,241,0.25)', boxShadow: 'none' }}
                onFocus={e => { setSearchFocus(true); e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)' }}
                onBlur={e => { setTimeout(() => setSearchFocus(false), 150); e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)' }}
              />
              {searchFocus && sugerencias.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 rounded-xl overflow-hidden z-50" style={{ background: '#0D1526', border: '1px solid rgba(99,102,241,0.25)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                  {sugerencias.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onMouseDown={e => {
                        e.preventDefault()
                        setSearchFocus(false)
                        navigate('product', p.id)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 text-left cursor-pointer"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-lg flex-shrink-0" style={{ background: 'rgba(13,21,38,0.6)' }} />
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-white/80 truncate">{p.name}</span>
                        <span className="block text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          $ {p.price.toLocaleString('es-CO')}
                        </span>
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onMouseDown={e => {
                      e.preventDefault()
                      irACatalogo(searchQuery.trim())
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-primary text-center cursor-pointer hover:bg-white/5"
                    style={{ borderTop: '1px solid rgba(99,102,241,0.2)' }}
                  >
                    Ver todos los resultados
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate('cart')}
              className="relative p-2 rounded-lg text-white/50 hover:text-primary hover:bg-white/5 transition-colors cursor-pointer"
              title="Carrito de compras"
            >
              <CartIcon size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {(role === 'CLIENTE' || role === 'guest') && (
              <button
                onClick={() => role === 'CLIENTE' ? navigate('wishlist') : navigate('login')}
                className="relative p-2 rounded-lg text-white/50 hover:text-primary hover:bg-white/5 transition-colors cursor-pointer"
                title="Lista de deseos"
              >
                <HeartIcon size={20} />
                {wishlist.length > 0 && role === 'CLIENTE' && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {role === 'guest' ? (
              <div className="flex items-center gap-2 ml-1">
                <button
                  onClick={() => navigate('login')}
                  className="text-sm text-white/60 hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => navigate('register')}
                  className="text-sm text-white font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}
                >
                  Registrarse
                </button>
              </div>
            ) : (
              <div className="relative ml-1">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)' }}
                  >
                    <UserIcon size={14} className="text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold text-white/80 leading-none">
                      {userName || 'Usuario'}
                    </div>
                    <div className="text-[10px] font-medium mt-0.5 text-primary rounded px-1">
                      {roleLabels[role]}
                    </div>
                  </div>
                  <ChevronDownIcon size={14} className="text-white/30 hidden sm:block" />
                </button>
                {roleMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-xl py-1 z-50 animate-fade-in" style={{ background: '#0D1526', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                    {role === 'ADMINISTRADOR' && (
                      <button
                        onClick={() => { navigate('admin-dashboard'); setRoleMenuOpen(false) }}
                        className="w-full text-left px-3 py-2 text-sm text-white/70 hover:bg-white/5 cursor-pointer"
                      >
                        Panel de control
                      </button>
                    )}
                    {role === 'CLIENTE' && (
                      <>
                        <button
                          onClick={() => { navigate('orders'); setRoleMenuOpen(false) }}
                          className="w-full text-left px-3 py-2 text-sm text-white/70 hover:bg-white/5 cursor-pointer"
                        >
                          Mis pedidos
                        </button>
                        <button
                          onClick={() => { navigate('profile'); setRoleMenuOpen(false) }}
                          className="w-full text-left px-3 py-2 text-sm text-white/70 hover:bg-white/5 cursor-pointer"
                        >
                          Mi perfil
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => { logout(); navigate('landing'); setRoleMenuOpen(false) }}
                      className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger-50/10 cursor-pointer"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-white/50 hover:bg-white/5 transition-colors ml-1 cursor-pointer"
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 animate-fade-in" style={{ borderTop: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { navigate(link.page); setMobileOpen(false) }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    page === link.page ? 'text-primary' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  style={page === link.page ? { background: 'rgba(139,92,246,0.12)' } : {}}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(99,102,241,0.15)' }}>
                <form onSubmit={handleSearch} className="relative">
                  <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg focus:outline-none text-white placeholder:text-white/30"
                    style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(99,102,241,0.25)' }}
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}