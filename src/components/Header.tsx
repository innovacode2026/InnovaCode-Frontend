import { useState } from 'react'
import { AppContext } from '../types'
import { SearchIcon, HeartIcon, UserIcon, MenuIcon, XIcon, ChevronDownIcon } from './Icons'

interface EncabezadoProps extends AppContext {
  searchQuery?: string
  onSearchChange?: (q: string) => void
}

export default function Encabezado({ role, page, wishlist, navigate, setRole }: EncabezadoProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const roleLabels: Record<string, string> = {
    guest: 'Visitante',
    user: 'Usuario',
    admin: 'Administrador',
    superadmin: 'Superadministrador',
  }

  const roleColors: Record<string, string> = {
    guest: 'bg-gray-100 text-gray-600',
    user: 'bg-primary-50 text-primary',
    admin: 'bg-violet-50 text-violet-700',
    superadmin: 'bg-cyan-50 text-cyan-700',
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) navigate('catalog')
  }

  const navLinks = [
    { label: 'Inicio', page: 'landing' as const },
    { label: 'Catálogo', page: 'catalog' as const },
  ]

  const LogoEVOX = () => (
    <button
      onClick={() => navigate('landing')}
      className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer"
    >
      <img src="/logo-evox.png" alt="EVOX" className="w-10 h-10 object-contain rounded-xl" />
      <span
        className="font-display font-900 text-[17px] leading-none"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        EVOX
      </span>
    </button>
  )

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      {/* Demo role switcher bar */}
      <div className="px-4 py-1.5 flex items-center justify-between gap-4 text-xs" style={{ background: '#0B0B14' }}>
        <span className="font-display font-medium text-white/40">Prototipo EVOX · Simulación de rol:</span>
        <div className="flex items-center gap-1.5">
          {(['guest', 'user', 'admin', 'superadmin'] as const).map(r => (
            <button
              key={r}
              onClick={() => {
                setRole(r)
                if (r === 'admin') navigate('admin-dashboard')
                else if (r === 'superadmin') navigate('super-dashboard')
                else navigate('landing')
              }}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                role === r ? 'bg-primary text-white font-semibold' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {roleLabels[r]}
            </button>
          ))}
        </div>
      </div>

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
                    ? 'bg-primary-50 text-primary'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar celulares, laptops..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {(role === 'user' || role === 'guest') && (
              <button
                onClick={() => role === 'user' ? navigate('wishlist') : navigate('login')}
                className="relative p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary-50 transition-colors cursor-pointer"
                title="Lista de deseos"
              >
                <HeartIcon size={20} />
                {wishlist.length > 0 && role === 'user' && (
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
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => navigate('register')}
                  className="text-sm text-white font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                >
                  Registrarse
                </button>
              </div>
            ) : (
              <div className="relative ml-1">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)' }}
                  >
                    <UserIcon size={14} className="text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold text-gray-800 leading-none">
                      {role === 'admin' ? 'Juan Pérez' : role === 'superadmin' ? 'Sofía Chen' : 'Ana García'}
                    </div>
                    <div className={`text-[10px] font-medium mt-0.5 ${roleColors[role]} rounded px-1`}>
                      {roleLabels[role]}
                    </div>
                  </div>
                  <ChevronDownIcon size={14} className="text-gray-400 hidden sm:block" />
                </button>
                {roleMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border py-1 z-50 animate-fade-in">
                    {(role === 'admin' || role === 'superadmin') && (
                      <button
                        onClick={() => { navigate(role === 'superadmin' ? 'super-dashboard' : 'admin-dashboard'); setRoleMenuOpen(false) }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        Panel de control
                      </button>
                    )}
                    <button
                      onClick={() => { setRole('guest'); navigate('landing'); setRoleMenuOpen(false) }}
                      className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger-50 cursor-pointer"
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
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors ml-1 cursor-pointer"
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { navigate(link.page); setMobileOpen(false) }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    page === link.page ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 pt-2 border-t border-border">
                <div className="relative">
                  <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
