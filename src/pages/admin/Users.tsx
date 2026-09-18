import { useState } from 'react'
import { AppContext } from '../../types'
import LayoutAdmin from '../../components/AdminLayout'
import { users as initialUsers } from '../../data/mockData'
import { SearchIcon, EyeIcon, AlertIcon, CheckIcon, XIcon } from '../../components/Icons'

export default function UsuariosAdmin(ctx: AppContext) {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [viewUser, setViewUser] = useState<typeof users[0] | null>(null)
  const [toggleConfirm, setToggleConfirm] = useState<typeof users[0] | null>(null)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = !filterRole || u.role === filterRole
    const matchStatus = !filterStatus || u.status === filterStatus
    return matchSearch && matchRole && matchStatus
  })

  const doToggle = () => {
    if (!toggleConfirm) return
    setUsers(prev => prev.map(u =>
      u.id === toggleConfirm.id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ))
    showToast(`Usuario ${toggleConfirm.name} ${toggleConfirm.status === 'active' ? 'desactivado' : 'activado'}.`)
    setToggleConfirm(null)
  }

  const roleBadge = (role: string) => {
    const map: Record<string, string> = {
      CLIENTE: 'bg-primary-50 text-primary',
      ADMINISTRADOR: 'bg-violet-50 text-violet-700',
    }
    const labels: Record<string, string> = { CLIENTE: 'Cliente', ADMINISTRADOR: 'Admin' }
    return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[role]}`}>{labels[role]}</span>
  }

  return (
    <LayoutAdmin {...ctx} title="Gestión de Usuarios" subtitle="Consulta y administra los usuarios registrados">
      <div className="p-5 space-y-4">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <SearchIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nombre o correo..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
              />
            </div>
            <select
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-xl focus:outline-none focus:border-primary bg-white text-gray-700 cursor-pointer"
            >
              <option value="">Todos los roles</option>
              <option value="CLIENTE">Cliente</option>
              <option value="ADMINISTRADOR">Administrador</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-xl focus:outline-none focus:border-primary bg-white text-gray-700 cursor-pointer"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {filtered.length} de {users.length} usuarios
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Usuario</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Correo</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rol</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Registro</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-400 sm:hidden">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className="text-sm text-gray-600">{user.email}</span>
                    </td>
                    <td className="px-5 py-3.5">{roleBadge(user.role)}</td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-gray-500">{new Date(user.joinDate).toLocaleDateString('es-CO')}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-success' : 'bg-gray-300'}`} />
                        <span className={`text-xs font-medium ${user.status === 'active' ? 'text-success' : 'text-gray-400'}`}>
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewUser(user)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors cursor-pointer"
                          title="Ver detalle"
                        >
                          <EyeIcon size={14} />
                        </button>
                        <button
                          onClick={() => setToggleConfirm(user)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                            user.status === 'active'
                              ? 'bg-warning-50 text-warning hover:bg-warning-100'
                              : 'bg-success-50 text-success hover:bg-success-100'
                          }`}
                          title={user.status === 'active' ? 'Desactivar' : 'Activar'}
                        >
                          {user.status === 'active' ? 'Desactivar' : 'Activar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-3xl mb-2">🔍</div>
              <p className="text-sm text-gray-500">No se encontraron usuarios con los filtros actuales.</p>
            </div>
          )}
        </div>
      </div>

      {/* View user modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-700 text-gray-900 text-lg">Detalle del usuario</h3>
              <button onClick={() => setViewUser(null)} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"><XIcon size={16} /></button>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">{viewUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
              </div>
              <div>
                <div className="font-display font-700 text-gray-900 text-lg">{viewUser.name}</div>
                <div className="flex items-center gap-2 mt-1">{roleBadge(viewUser.role)}</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Correo electrónico', value: viewUser.email },
                { label: 'Estado', value: viewUser.status === 'active' ? 'Activo' : 'Inactivo' },
                { label: 'Fecha de registro', value: new Date(viewUser.joinDate).toLocaleDateString('es-CO', { dateStyle: 'long' }) },
                { label: 'Último acceso', value: new Date(viewUser.lastLogin).toLocaleDateString('es-CO', { dateStyle: 'long' }) },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setViewUser(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 cursor-pointer">Cerrar</button>
              <button
                onClick={() => { setToggleConfirm(viewUser); setViewUser(null) }}
                className={`flex-1 py-2 text-sm font-medium rounded-xl cursor-pointer ${viewUser.status === 'active' ? 'bg-warning-50 text-warning hover:bg-warning-100' : 'bg-success-50 text-success hover:bg-success-100'}`}
              >
                {viewUser.status === 'active' ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle confirm modal */}
      {toggleConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-warning-50 flex items-center justify-center mb-4">
              <AlertIcon size={22} className="text-warning" />
            </div>
            <h3 className="font-display font-700 text-gray-900 text-lg mb-2">
              {toggleConfirm.status === 'active' ? 'Desactivar usuario' : 'Activar usuario'}
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              ¿Confirmas que deseas {toggleConfirm.status === 'active' ? 'desactivar' : 'activar'} la cuenta de <strong>{toggleConfirm.name}</strong>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setToggleConfirm(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 cursor-pointer">Cancelar</button>
              <button onClick={doToggle} className={`flex-1 py-2 text-sm font-semibold rounded-xl cursor-pointer text-white ${toggleConfirm.status === 'active' ? 'bg-warning hover:opacity-90' : 'bg-success hover:opacity-90'}`}>
                {toggleConfirm.status === 'active' ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in z-50">
          <CheckIcon size={15} className="text-success" />
          {toast}
        </div>
      )}
    </LayoutAdmin>
  )
}
