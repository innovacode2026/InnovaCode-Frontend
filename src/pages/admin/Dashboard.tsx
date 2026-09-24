import { useEffect, useState } from 'react'
import { AppContext } from '../../types'
import LayoutAdmin from '../../components/AdminLayout'
import { products, categories } from '../../data/mockData'
import { obtenerUsuarios } from '../../api/usuarioService'
import type { UsuarioAdmin } from '../../types/api'
import {
  PackageIcon,
  UsersIcon,
  StarIcon,
  TrendUpIcon,
  ChevronRightIcon,
  AlertIcon,
  MoreVerticalIcon,
} from '../../components/Icons'

function useDateTime() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])
  return now
}

const MONTH_NAMES_ES = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
]

export default function PanelAdmin(ctx: AppContext) {
  const { navigate, userName } = ctx
  const [users, setUsers] = useState<UsuarioAdmin[]>([])
  const now = useDateTime()

  useEffect(() => {
    obtenerUsuarios().then(setUsers).catch(() => setUsers([]))
  }, [])

  const activeProducts  = products.filter(p => p.status === 'active').length
  const inactiveProducts = products.filter(p => p.status === 'inactive').length
  const totalUsers      = users.length
  const clientUsers     = users.filter(u => u.rol === 'CLIENTE').length

  const dateStr = `${now.getDate()} de ${MONTH_NAMES_ES[now.getMonth()]}, ${now.getFullYear()}`
  const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })

  const stats = [
    {
      label: 'Productos activos',
      value: activeProducts,
      sub: `+${inactiveProducts > 0 ? 3 : 0} este mes`,
      trend: '+',
      icon: PackageIcon,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Usuarios registrados',
      value: totalUsers,
      sub: `+${clientUsers} este mes`,
      trend: '+',
      icon: UsersIcon,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      label: 'Reseñas totales',
      value: '2.4K',
      sub: 'Promedio 4.7 ★',
      trend: null,
      icon: StarIcon,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-500',
    },
    {
      label: 'Categorías activas',
      value: categories.length,
      sub: '— Sin cambios —',
      trend: null,
      icon: TrendUpIcon,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-500',
    },
  ]

  const recentProducts = products.slice(0, 5)
  const recentUsers    = users.filter(u => u.rol === 'CLIENTE').slice(0, 5)

  return (
    <LayoutAdmin {...ctx} title="Dashboard" subtitle="Panel de administración">
      <div className="p-6 space-y-5 min-h-full">

        {/* Welcome header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
              Panel de administración
            </p>
            <h1 className="text-[28px] font-bold text-gray-900 leading-tight">
              Bienvenido, {userName || 'Administrador'}
            </h1>
            <p className="text-gray-400 text-sm mt-1">Aquí tienes un resumen del estado de tu tienda.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white rounded-xl border border-gray-100 px-4 py-2.5 shadow-sm flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="font-medium text-gray-700">{dateStr}</span>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-gray-700">{timeStr}</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(({ label, value, sub, trend, icon: Icon, iconBg, iconColor }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group cursor-default"
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <button
                  onClick={() => navigate('admin-products')}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <ChevronRightIcon size={15} />
                </button>
              </div>
              <div className="mt-4">
                <div className="text-[30px] font-bold text-gray-900 leading-none">{value}</div>
                <div className="text-sm font-semibold text-gray-600 mt-1">{label}</div>
                <div className="flex items-center gap-1 mt-1.5">
                  {trend === '+' && (
                    <span className="text-emerald-500 text-xs font-bold">↑</span>
                  )}
                  <span className="text-xs text-gray-400">{sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-6 p-6 flex-wrap">
            <div>
              <h3 className="text-base font-bold text-gray-900">Acciones rápidas</h3>
              <p className="text-sm text-gray-400 mt-0.5">Gestiona tu tienda de forma rápida y sencilla.</p>
              <div className="flex flex-wrap gap-2.5 mt-4">
                <button
                  onClick={() => navigate('admin-products')}
                  className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all cursor-pointer hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #4F7FFF, #3B6FE8)' }}
                >
                  <PackageIcon size={15} />
                  Nuevo producto
                  <ChevronRightIcon size={13} />
                </button>
                <button
                  onClick={() => navigate('admin-users')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
                >
                  <UsersIcon size={15} />
                  Gestionar usuarios
                </button>
                <button
                  onClick={() => navigate('catalog')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
                >
                  Ver tienda
                </button>
              </div>
            </div>
            {/* Decorative tech illustration */}
            <div className="flex items-center gap-3 opacity-80 flex-shrink-0 hidden md:flex">
              <div className="w-24 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                💻
              </div>
              <div className="w-14 h-20 bg-gradient-to-br from-violet-100 to-blue-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                📱
              </div>
              <div className="w-16 h-14 bg-gradient-to-br from-cyan-100 to-sky-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                🎧
              </div>
            </div>
          </div>
        </div>

        {/* Bottom two-column grid */}
        <div className="grid lg:grid-cols-2 gap-5">

          {/* Recent products */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <PackageIcon size={14} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm leading-tight">Productos recientes</h3>
                  <p className="text-[11px] text-gray-400 leading-tight">Últimos productos agregados a la tienda.</p>
                </div>
              </div>
              <button
                onClick={() => navigate('admin-products')}
                className="flex items-center gap-1 text-xs text-blue-500 font-semibold hover:text-blue-600 transition-colors cursor-pointer"
              >
                Ver todos <ChevronRightIcon size={12} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {recentProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                  <img
                    src={product.image}
                    alt=""
                    className="w-10 h-10 object-cover rounded-xl bg-gray-100 flex-shrink-0 border border-gray-100"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/40x40/e2e8f0/94a3b8?text=${product.name.slice(0,2).toUpperCase()}` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{product.name}</div>
                    <div className="text-xs text-gray-400 capitalize">{product.category}</div>
                  </div>
                  <div className="text-right flex-shrink-0 mr-1">
                    <div className="text-sm font-bold text-gray-700">${product.price.toLocaleString('es-CO')}</div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        product.status === 'active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {product.status === 'active' ? 'Activo' : 'Retirado'}
                    </span>
                  </div>
                  <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-300 hover:text-gray-500">
                    <MoreVerticalIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent users */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <UsersIcon size={14} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm leading-tight">Usuarios recientes</h3>
                  <p className="text-[11px] text-gray-400 leading-tight">Últimos usuarios registrados en la plataforma.</p>
                </div>
              </div>
              <button
                onClick={() => navigate('admin-users')}
                className="flex items-center gap-1 text-xs text-blue-500 font-semibold hover:text-blue-600 transition-colors cursor-pointer"
              >
                Ver todos <ChevronRightIcon size={12} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {recentUsers.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertIcon size={22} className="mx-auto mb-2.5 text-gray-200" />
                  <p className="text-sm text-gray-400">
                    No se pudieron cargar usuarios. Verifica que el backend esté en línea.
                  </p>
                </div>
              ) : (
                recentUsers.map((user, idx) => {
                  const avatarColors = [
                    'from-blue-400 to-blue-600',
                    'from-emerald-400 to-emerald-600',
                    'from-violet-400 to-violet-600',
                    'from-rose-400 to-rose-600',
                    'from-amber-400 to-amber-600',
                  ]
                  const initials2 = (user.nombreCompleto || '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                  const isActive = user.rol === 'CLIENTE'
                  const dateLabel = user.fechaRegistro
                    ? (() => {
                        const d = new Date(user.fechaRegistro)
                        return `${d.getDate()} ${MONTH_NAMES_ES[d.getMonth()].slice(0,3)} ${d.getFullYear()}`
                      })()
                    : '—'
                  return (
                    <div key={user.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xs font-bold text-white">{initials2}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate">{user.nombreCompleto || '—'}</div>
                        <div className="text-xs text-gray-400 truncate">{user.correo}</div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isActive ? 'Activo' : 'Inactivo'}
                      </span>
                      <div className="text-xs text-gray-400 flex-shrink-0 hidden sm:block w-24 text-right">
                        {dateLabel}
                      </div>
                      <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-300 hover:text-gray-500">
                        <MoreVerticalIcon size={16} />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </LayoutAdmin>
  )
}
