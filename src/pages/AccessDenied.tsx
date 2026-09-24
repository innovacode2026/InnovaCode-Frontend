import { AppContext } from '../types'
import { LockIcon, HomeIcon, ChevronRightIcon } from '../components/Icons'

interface AccessDeniedProps extends AppContext {
  requiredRole?: string
}

export default function AccesoDenegado({ navigate, role, requiredRole }: AccessDeniedProps) {
  const roleLabels: Record<string, string> = {
    ADMINISTRADOR: 'Administrador',
    CLIENTE: 'Cliente',
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050816' }}>
      {/* Minimal header */}
      <div className="px-6 py-4" style={{ background: 'rgba(13,21,38,0.9)', borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
        <button onClick={() => navigate('landing')} className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)' }}>
            <span className="text-white font-display font-900 text-xs leading-none">e</span>
          </div>
          <span className="font-display font-800 text-[18px] leading-none" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in">
          {/* Error code */}
          <div className="font-display font-900 text-8xl leading-none mb-6 select-none" style={{ color: 'rgba(255,255,255,0.06)' }}>403</div>

          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <LockIcon size={28} className="text-danger" />
          </div>

          <h1 className="font-display font-700 text-white text-2xl mb-2">
            Acceso no autorizado
          </h1>
          <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
            No tienes permisos para acceder a esta sección.
          </p>
          {requiredRole && (
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Esta área requiere perfil de{' '}
              <span className="font-semibold px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(139,92,246,0.15)', color: '#C4B5FD', border: '1px solid rgba(139,92,246,0.3)' }}>
                {roleLabels[requiredRole] || requiredRole}
              </span>
            </p>
          )}

          {/* What you can access */}
          <div className="rounded-2xl p-4 mb-6 text-left" style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Puedes acceder a:</p>
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
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.color = '#C4B5FD' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                >
                  <span>{item.label}</span>
                  <ChevronRightIcon size={14} style={{ color: 'rgba(255,255,255,0.25)' }} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('landing')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', boxShadow: '0 0 25px rgba(139,92,246,0.35)' }}
            >
              <HomeIcon size={16} />
              Ir al inicio
            </button>
            {role === 'guest' && (
              <button
                onClick={() => navigate('login')}
                className="px-5 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,102,241,0.3)', color: 'rgba(255,255,255,0.7)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              >
                Iniciar sesión
              </button>
            )}
          </div>

          <p className="text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Si crees que esto es un error, contacta al administrador del sistema.
          </p>
        </div>
      </div>
    </div>
  )
}
