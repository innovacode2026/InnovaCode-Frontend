import { useEffect, useState } from 'react'
import { AppContext } from '../../types'
import LayoutAdmin from '../../components/AdminLayout'
import { obtenerUsuarios } from '../../api/usuarioService'
import { getMensajeError } from '../../api/client'
import type { UsuarioAdmin } from '../../types/api'
import { SearchIcon, EyeIcon, AlertIcon, XIcon, RefreshIcon, UsersIcon } from '../../components/Icons'

const iniciales = (nombre: string) =>
  (nombre || '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

export default function UsuariosAdmin(ctx: AppContext) {
  const [users, setUsers] = useState<UsuarioAdmin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [viewUser, setViewUser] = useState<UsuarioAdmin | null>(null)

  const cargarUsuarios = async () => {
    setLoading(true)
    setError('')
    try {
      setUsers(await obtenerUsuarios())
    } catch (err) {
      setError(getMensajeError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarUsuarios() }, [])

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    const matchSearch = (u.nombreCompleto?.toLowerCase() ?? '').includes(q) || u.correo.toLowerCase().includes(q)
    const matchRole = !filterRole || u.rol === filterRole
    return matchSearch && matchRole
  })

  const roleBadge = (role: string) => {
    const map: Record<string, string> = {
      CLIENTE: 'bg-primary-50 text-primary',
      ADMINISTRADOR: 'bg-violet-50 text-violet-700',
    }
    const labels: Record<string, string> = { CLIENTE: 'Cliente', ADMINISTRADOR: 'Admin' }
    return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[role] ?? 'bg-gray-100 text-gray-600'}`}>{labels[role] ?? role}</span>
  }

  return (
    <LayoutAdmin {...ctx} title="Gestión de Usuarios" subtitle="Usuarios registrados en la base de datos">
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
            <button
              onClick={cargarUsuarios}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <RefreshIcon size={15} />
              Actualizar
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {filtered.length} de {users.length} usuarios
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-danger-50 border border-danger-100 rounded-2xl p-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-danger text-sm">
              <AlertIcon size={16} />
              No se pudo cargar los usuarios: {error}
            </div>
            <button onClick={cargarUsuarios} className="flex items-center gap-1.5 px-3 py-1.5 bg-danger text-white text-xs font-medium rounded-lg hover:opacity-90 cursor-pointer">
              <RefreshIcon size={13} />
              Reintentar
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {loading ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-gray-400">Cargando usuarios...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-gray-50/50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Usuario</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Correo</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rol</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Registro</th>
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
                                {iniciales(user.nombreCompleto ?? '')}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.nombreCompleto || '—'}</div>
                              <div className="text-xs text-gray-400 sm:hidden">{user.correo}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className="text-sm text-gray-600">{user.correo}</span>
                        </td>
                        <td className="px-5 py-3.5">{roleBadge(user.rol)}</td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="text-xs text-gray-500">
                            {user.fechaRegistro ? new Date(user.fechaRegistro).toLocaleDateString('es-CO') : '—'}
                          </span>
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && !error && (
                <div className="py-12 text-center">
                  <UsersIcon size={28} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm text-gray-500">No se encontraron usuarios con los filtros actuales.</p>
                </div>
              )}
            </>
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
                <span className="text-xl font-bold text-primary">{iniciales(viewUser.nombreCompleto ?? '')}</span>
              </div>
              <div>
                <div className="font-display font-700 text-gray-900 text-lg">{viewUser.nombreCompleto || '—'}</div>
                <div className="flex items-center gap-2 mt-1">{roleBadge(viewUser.rol)}</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Correo electrónico', value: viewUser.correo },
                { label: 'ID', value: viewUser.id },
                { label: 'Fecha de registro', value: viewUser.fechaRegistro ? new Date(viewUser.fechaRegistro).toLocaleDateString('es-CO', { dateStyle: 'long' }) : '—' },
              ].map(item => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-border last:border-0">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-800 break-all">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setViewUser(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 cursor-pointer">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  )
}