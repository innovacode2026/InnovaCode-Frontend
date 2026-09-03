import { AppContext } from '../../types'
import AdminLayout from '../../components/AdminLayout'
import { products, users, permissions } from '../../data/mockData'
import { PackageIcon, UsersIcon, ShieldIcon, SettingsIcon, ChevronRightIcon, CheckIcon, AlertIcon, TrendUpIcon } from '../../components/Icons'

export default function SuperDashboard(ctx: AppContext) {
  const { navigate } = ctx

  const totalUsers = users.filter(u => u.role === 'user').length
  const totalAdmins = users.filter(u => u.role === 'admin').length
  const activeProducts = products.filter(p => p.status === 'active').length
  const totalPermissions = permissions.length

  const stats = [
    { label: 'Usuarios finales', value: totalUsers, icon: UsersIcon, color: 'text-primary', bg: 'bg-primary-50', sub: `${users.filter(u => u.role === 'user' && u.status === 'active').length} activos` },
    { label: 'Administradores', value: totalAdmins, icon: ShieldIcon, color: 'text-blue-600', bg: 'bg-blue-50', sub: 'Todos activos' },
    { label: 'Productos activos', value: activeProducts, icon: PackageIcon, color: 'text-success', bg: 'bg-success-50', sub: `${products.length} en total` },
    { label: 'Permisos configurados', value: totalPermissions, icon: SettingsIcon, color: 'text-purple-600', bg: 'bg-purple-50', sub: '3 módulos' },
  ]

  const roleBreakdown = [
    { role: 'Superadministrador', count: users.filter(u => u.role === 'superadmin').length, color: 'bg-purple-500', textColor: 'text-purple-700', bgLight: 'bg-purple-50' },
    { role: 'Administrador', count: users.filter(u => u.role === 'admin').length, color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50' },
    { role: 'Usuario final', count: users.filter(u => u.role === 'user').length, color: 'bg-primary', textColor: 'text-primary', bgLight: 'bg-primary-50' },
  ]

  const totalRoleUsers = users.length

  const modules = [
    { name: 'Autenticación', perms: permissions.filter(p => p.module === 'Autenticación').length, status: 'ok' },
    { name: 'Productos', perms: permissions.filter(p => p.module === 'Productos').length, status: 'ok' },
    { name: 'Usuario', perms: permissions.filter(p => p.module === 'Usuario').length, status: 'ok' },
    { name: 'Administración', perms: permissions.filter(p => p.module === 'Administración').length, status: 'ok' },
    { name: 'Super Administración', perms: permissions.filter(p => p.module === 'Super Administración').length, status: 'ok' },
  ]

  return (
    <AdminLayout {...ctx} title="Panel Superadministrador" subtitle="Control global del sistema InnovaCode">
      <div className="p-5 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg, sub }) => (
            <div key={label} className="bg-white rounded-2xl border border-border p-4">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <div className="font-display font-800 text-2xl text-gray-900">{value}</div>
              <div className="text-sm text-gray-600 font-medium mt-0.5">{label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Role distribution */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-600 text-gray-900 text-sm">Distribución de roles</h3>
              <button onClick={() => navigate('super-roles')} className="text-xs text-primary font-medium hover:underline cursor-pointer flex items-center gap-0.5">
                Gestionar <ChevronRightIcon size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {roleBreakdown.map(({ role, count, color, textColor, bgLight }) => (
                <div key={role}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{role}</span>
                    <span className={`text-sm font-semibold ${textColor}`}>{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all`}
                      style={{ width: `${(count / totalRoleUsers) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{Math.round((count / totalRoleUsers) * 100)}% del total</div>
                </div>
              ))}
            </div>
          </div>

          {/* Permission modules */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-600 text-gray-900 text-sm">Módulos de permisos</h3>
              <button onClick={() => navigate('super-roles')} className="text-xs text-primary font-medium hover:underline cursor-pointer flex items-center gap-0.5">
                Configurar <ChevronRightIcon size={12} />
              </button>
            </div>
            <div className="space-y-2">
              {modules.map(mod => (
                <div key={mod.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-success-50 flex items-center justify-center">
                      <CheckIcon size={12} className="text-success" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{mod.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{mod.perms} permisos</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All users table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-display font-600 text-gray-900 text-sm">Todos los usuarios del sistema</h3>
            <button onClick={() => navigate('admin-users')} className="text-xs text-primary font-medium hover:underline cursor-pointer flex items-center gap-0.5">
              Gestionar <ChevronRightIcon size={12} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Usuario</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rol</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Último acceso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${user.role === 'superadmin' ? 'bg-purple-100' : user.role === 'admin' ? 'bg-blue-100' : 'bg-primary-50'}`}>
                          <span className={`text-xs font-bold ${user.role === 'superadmin' ? 'text-purple-700' : user.role === 'admin' ? 'text-blue-700' : 'text-primary'}`}>
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        user.role === 'superadmin' ? 'bg-purple-50 text-purple-700' :
                        user.role === 'admin' ? 'bg-blue-50 text-blue-700' :
                        'bg-primary-50 text-primary'
                      }`}>
                        {user.role === 'superadmin' ? 'Superadmin' : user.role === 'admin' ? 'Admin' : 'Usuario'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-success' : 'bg-gray-300'}`} />
                        <span className={`text-xs font-medium ${user.status === 'active' ? 'text-success' : 'text-gray-400'}`}>
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-gray-400">{new Date(user.lastLogin).toLocaleDateString('es-CO')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System config shortcuts */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-display font-600 text-gray-900 text-sm mb-4">Configuración del sistema</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: 'Gestión de roles', desc: 'Configurar permisos por perfil', icon: ShieldIcon, action: () => navigate('super-roles'), color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Gestión de productos', desc: 'Administrar el catálogo completo', icon: PackageIcon, action: () => navigate('admin-products'), color: 'text-success', bg: 'bg-success-50' },
              { label: 'Gestión de usuarios', desc: 'Administrar todos los perfiles', icon: UsersIcon, action: () => navigate('admin-users'), color: 'text-primary', bg: 'bg-primary-50' },
            ].map(({ label, desc, icon: Icon, action, color, bg }) => (
              <button
                key={label}
                onClick={action}
                className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-gray-50 transition-all cursor-pointer text-left group"
              >
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon size={17} className={color} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">{label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
