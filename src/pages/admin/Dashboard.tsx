import { AppContext } from '../../types'
import LayoutAdmin from '../../components/AdminLayout'
import { products, users } from '../../data/mockData'
import { PackageIcon, UsersIcon, StarIcon, TrendUpIcon, ChevronRightIcon, CheckIcon, AlertIcon } from '../../components/Icons'

export default function PanelAdmin(ctx: AppContext) {
  const { navigate } = ctx

  const activeProducts = products.filter(p => p.status === 'active').length
  const inactiveProducts = products.filter(p => p.status === 'inactive').length
  const totalUsers = users.filter(u => u.role === 'CLIENTE').length
  const activeUsers = users.filter(u => u.role === 'CLIENTE' && u.status === 'active').length

  const stats = [
    {
      label: 'Productos activos',
      value: activeProducts,
      sub: `${inactiveProducts} retirados`,
      icon: PackageIcon,
      color: 'text-primary',
      bg: 'bg-primary-50',
      trend: '+3 este mes',
    },
    {
      label: 'Usuarios registrados',
      value: totalUsers,
      sub: `${activeUsers} activos`,
      icon: UsersIcon,
      color: 'text-success',
      bg: 'bg-success-50',
      trend: '+12 este mes',
    },
    {
      label: 'Reseñas totales',
      value: '2.4K',
      sub: 'Promedio 4.7★',
      icon: StarIcon,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      trend: '+87 esta semana',
    },
    {
      label: 'Categorías activas',
      value: 6,
      sub: '165 productos',
      icon: TrendUpIcon,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      trend: 'Sin cambios',
    },
  ]

  const recentProducts = products.slice(0, 5)
  const recentUsers = users.filter(u => u.role === 'CLIENTE').slice(0, 5)

  return (
    <LayoutAdmin {...ctx} title="Dashboard" subtitle="Panel de administración">
      <div className="p-5 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, sub, icon: Icon, color, bg, trend }) => (
            <div key={label} className="bg-white rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon size={18} className={color} />
                </div>
                <span className="text-xs text-gray-400 font-medium">{trend}</span>
              </div>
              <div className="font-display font-800 text-2xl text-gray-900">{value}</div>
              <div className="text-sm text-gray-600 font-medium mt-0.5">{label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <h3 className="font-display font-600 text-gray-900 text-sm mb-3">Acciones rápidas</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate('admin-products')}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-hover transition-colors cursor-pointer"
            >
              <PackageIcon size={15} />
              Nuevo producto
            </button>
            <button
              onClick={() => navigate('admin-users')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <UsersIcon size={15} />
              Gestionar usuarios
            </button>
            <button
              onClick={() => navigate('catalog')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Ver tienda
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Recent products */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-600 text-gray-900 text-sm">Productos recientes</h3>
              <button onClick={() => navigate('admin-products')} className="text-xs text-primary font-medium hover:underline cursor-pointer flex items-center gap-0.5">
                Ver todos <ChevronRightIcon size={12} />
              </button>
            </div>
            <div className="divide-y divide-border">
              {recentProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <img src={product.image} alt="" className="w-10 h-8 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{product.name}</div>
                    <div className="text-xs text-gray-400 capitalize">{product.category}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-gray-700">${product.price.toLocaleString()}</div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.status === 'active' ? 'bg-success-50 text-success' : 'bg-gray-100 text-gray-500'}`}>
                      {product.status === 'active' ? 'Activo' : 'Retirado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent users */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-600 text-gray-900 text-sm">Usuarios recientes</h3>
              <button onClick={() => navigate('admin-users')} className="text-xs text-primary font-medium hover:underline cursor-pointer flex items-center gap-0.5">
                Ver todos <ChevronRightIcon size={12} />
              </button>
            </div>
            <div className="divide-y divide-border">
              {recentUsers.map(user => (
                <div key={user.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{user.name}</div>
                    <div className="text-xs text-gray-400 truncate">{user.email}</div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.status === 'active' ? 'bg-success-50 text-success' : 'bg-gray-100 text-gray-500'}`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System status */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-display font-600 text-gray-900 text-sm mb-4">Estado del sistema</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Disponibilidad del servicio', status: 'ok', value: '99.9%' },
              { label: 'Tiempo de respuesta API', status: 'ok', value: '~180ms' },
              { label: 'Errores en las últimas 24h', status: 'warning', value: '3' },
            ].map(item => (
              <div key={item.label} className={`flex items-center gap-3 p-3 rounded-xl border ${item.status === 'ok' ? 'bg-success-50 border-success-100' : 'bg-warning-50 border-warning-100'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${item.status === 'ok' ? 'bg-success/10' : 'bg-warning/10'}`}>
                  {item.status === 'ok' ? <CheckIcon size={14} className="text-success" /> : <AlertIcon size={14} className="text-warning" />}
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-700">{item.label}</div>
                  <div className={`text-sm font-bold ${item.status === 'ok' ? 'text-success' : 'text-warning'}`}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}
