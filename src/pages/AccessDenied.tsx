import { AppContext } from '../types'
import { LockIcon, HomeIcon, ChevronRightIcon } from '../components/Icons'

interface AccessDeniedProps extends AppContext {
  requiredRole?: string
}

export default function AccessDenied({ navigate, role, requiredRole }: AccessDeniedProps) {
  const roleLabels: Record<string, string> = {
    admin: 'Administrador',
    superadmin: 'Superadministrador',
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <div className="bg-white border-b border-border px-6 py-4">
        <button onClick={() => navigate('landing')} className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="white" fillOpacity="0.9" />
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
              <path d="M2 17l10 5V12L2 7v10z" fill="white" fillOpacity="0.7" />
            </svg>
          </div>
          <span className="font-display font-700 text-navy text-sm">InnovaCode</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in">
          {/* Error code */}
          <div className="font-display font-900 text-8xl text-gray-100 leading-none mb-6 select-none">403</div>

          <div className="w-16 h-16 rounded-2xl bg-danger-50 border border-danger-100 flex items-center justify-center mx-auto mb-5">
            <LockIcon size={28} className="text-danger" />
          </div>

          <h1 className="font-display font-700 text-gray-900 text-2xl mb-2">
            Acceso no autorizado
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            No tienes permisos para acceder a esta sección.
          </p>
          {requiredRole && (
            <p className="text-sm text-gray-400 mb-6">
              Esta área requiere perfil de{' '}
              <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                requiredRole === 'superadmin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
              }`}>
                {roleLabels[requiredRole] || requiredRole}
              </span>
            </p>
          )}

          {/* What you can access */}
          <div className="bg-white rounded-2xl border border-border p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Puedes acceder a:</p>
            <div className="space-y-2">
              {[
                { label: 'Catálogo de productos', page: 'catalog' as const },
                { label: 'Página principal', page: 'landing' as const },
                ...(role === 'guest' ? [
                  { label: 'Iniciar sesión', page: 'login' as const },
                  { label: 'Crear cuenta', page: 'register' as const },
                ] : [
                  { label: 'Lista de deseos', page: 'wishlist' as const },
                ]),
              ].map(item => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 hover:bg-primary-50 text-sm text-gray-700 hover:text-primary transition-colors cursor-pointer group"
                >
                  <span>{item.label}</span>
                  <ChevronRightIcon size={14} className="text-gray-300 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('landing')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer"
            >
              <HomeIcon size={16} />
              Ir al inicio
            </button>
            {role === 'guest' && (
              <button
                onClick={() => navigate('login')}
                className="px-5 py-2.5 bg-white border border-border text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Iniciar sesión
              </button>
            )}
          </div>

          <p className="text-xs text-gray-300 mt-6">
            Si crees que esto es un error, contacta al administrador del sistema.
          </p>
        </div>
      </div>
    </div>
  )
}
