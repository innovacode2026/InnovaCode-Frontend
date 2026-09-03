import { useState } from 'react'
import { AppContext } from '../../types'
import AdminLayout from '../../components/AdminLayout'
import { permissions as initialPermissions } from '../../data/mockData'
import { ShieldIcon, CheckIcon, XIcon, InfoIcon, AlertIcon } from '../../components/Icons'

export default function SuperRoles(ctx: AppContext) {
  const [perms, setPerms] = useState(initialPermissions)
  const [editModal, setEditModal] = useState<typeof perms[0] | null>(null)
  const [toast, setToast] = useState('')
  const [confirmModal, setConfirmModal] = useState<{ perm: typeof perms[0]; role: 'userAccess' | 'adminAccess' | 'superAdminAccess'; value: boolean } | null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const modules = [...new Set(perms.map(p => p.module))]

  const togglePerm = (id: string, role: 'userAccess' | 'adminAccess' | 'superAdminAccess', value: boolean) => {
    const perm = perms.find(p => p.id === id)!
    setConfirmModal({ perm, role, value })
  }

  const doToggle = () => {
    if (!confirmModal) return
    setPerms(prev => prev.map(p => p.id === confirmModal.perm.id ? { ...p, [confirmModal.role]: confirmModal.value } : p))
    const roleLabel = confirmModal.role === 'userAccess' ? 'Usuario' : confirmModal.role === 'adminAccess' ? 'Administrador' : 'Superadministrador'
    showToast(`Permiso actualizado: ${confirmModal.perm.name} → ${roleLabel}`)
    setConfirmModal(null)
  }

  const Switch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${checked ? 'bg-primary' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
    </button>
  )

  const roleColumns = [
    { key: 'userAccess' as const, label: 'Usuario', color: 'text-primary', bg: 'bg-primary-50' },
    { key: 'adminAccess' as const, label: 'Admin', color: 'text-blue-700', bg: 'bg-blue-50' },
    { key: 'superAdminAccess' as const, label: 'Superadmin', color: 'text-purple-700', bg: 'bg-purple-50' },
  ]

  return (
    <AdminLayout {...ctx} title="Roles y Permisos" subtitle="Configura los permisos de acceso por perfil">
      <div className="p-5 space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Perfil Usuario Final', permsCount: perms.filter(p => p.userAccess).length, color: 'text-primary', bg: 'bg-primary-50', border: 'border-primary-100' },
            { label: 'Perfil Administrador', permsCount: perms.filter(p => p.adminAccess).length, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
            { label: 'Perfil Superadmin', permsCount: perms.filter(p => p.superAdminAccess).length, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-100' },
          ].map(({ label, permsCount, color, bg, border }) => (
            <div key={label} className={`${bg} border ${border} rounded-2xl p-4 text-center`}>
              <div className={`font-display font-800 text-2xl ${color}`}>{permsCount}</div>
              <div className="text-xs text-gray-600 font-medium mt-1">{label}</div>
              <div className="text-xs text-gray-400">de {perms.length} permisos</div>
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 flex items-start gap-3">
          <InfoIcon size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">RF-13 — Control de Acceso:</span> Los toggles muestran los permisos activos por perfil. Los permisos marcados definen exactamente qué acciones puede realizar cada rol en el sistema. Los cambios son persistentes en esta sesión de prototipo.
          </div>
        </div>

        {/* Permissions matrix by module */}
        {modules.map(module => (
          <div key={module} className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border bg-gray-50/50 flex items-center gap-2">
              <ShieldIcon size={15} className="text-gray-400" />
              <h3 className="font-display font-600 text-gray-800 text-sm">{module}</h3>
              <span className="text-xs text-gray-400 ml-1">({perms.filter(p => p.module === module).length} permisos)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Permiso</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Descripción</th>
                    {roleColumns.map(col => (
                      <th key={col.key} className="px-4 py-3 text-center">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${col.bg} ${col.color}`}>{col.label}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {perms.filter(p => p.module === module).map(perm => (
                    <tr key={perm.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-medium text-gray-800">{perm.name}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <span className="text-xs text-gray-500">{perm.description}</span>
                      </td>
                      {roleColumns.map(col => (
                        <td key={col.key} className="px-4 py-3.5 text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={perm[col.key]}
                              onChange={(val) => togglePerm(perm.id, col.key, val)}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Role comparison legend */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-display font-600 text-gray-900 text-sm mb-4">Resumen de perfiles</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Usuario Final',
                color: 'text-primary',
                bg: 'bg-primary-50',
                border: 'border-primary-100',
                desc: 'Acceso a catálogo público, lista de deseos, calificaciones y comentarios propios.',
                badge: 'bg-primary text-white',
              },
              {
                label: 'Administrador',
                color: 'text-blue-700',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
                desc: 'Todo lo anterior más gestión de usuarios, creación y administración de productos.',
                badge: 'bg-blue-600 text-white',
              },
              {
                label: 'Superadministrador',
                color: 'text-purple-700',
                bg: 'bg-purple-50',
                border: 'border-purple-100',
                desc: 'Control total del sistema: usuarios, productos, roles, permisos y configuración global.',
                badge: 'bg-purple-600 text-white',
              },
            ].map(item => (
              <div key={item.label} className={`${item.bg} border ${item.border} rounded-xl p-4`}>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.badge} mb-2 inline-block`}>{item.label}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                <div className="mt-2.5 pt-2.5 border-t border-black/5">
                  <div className={`font-display font-700 text-lg ${item.color}`}>
                    {item.label === 'Usuario Final' ? perms.filter(p => p.userAccess).length :
                     item.label === 'Administrador' ? perms.filter(p => p.adminAccess).length :
                     perms.filter(p => p.superAdminAccess).length}
                  </div>
                  <div className="text-xs text-gray-400">permisos activos</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle confirm modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
              <ShieldIcon size={22} className="text-primary" />
            </div>
            <h3 className="font-display font-700 text-gray-900 text-lg mb-2">Confirmar cambio de permiso</h3>
            <p className="text-sm text-gray-500 mb-4">
              ¿{confirmModal.value ? 'Otorgar' : 'Revocar'} el permiso <strong>"{confirmModal.perm.name}"</strong> al perfil <strong>{confirmModal.role === 'userAccess' ? 'Usuario' : confirmModal.role === 'adminAccess' ? 'Administrador' : 'Superadministrador'}</strong>?
            </p>
            <div className="bg-warning-50 border border-warning-100 rounded-xl p-3 flex items-start gap-2 mb-5">
              <AlertIcon size={14} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-warning/80">Este cambio afectará inmediatamente a todos los usuarios con este perfil.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 cursor-pointer">Cancelar</button>
              <button onClick={doToggle} className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover cursor-pointer flex items-center justify-center gap-1.5">
                <CheckIcon size={14} /> Confirmar
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
    </AdminLayout>
  )
}
