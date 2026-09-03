import { AppContext } from '../types'

export default function Footer({ navigate }: Pick<AppContext, 'navigate'>) {
  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="white" fillOpacity="0.9" />
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                  <path d="M2 17l10 5V12L2 7v10z" fill="white" fillOpacity="0.7" />
                </svg>
              </div>
              <div>
                <div className="font-display font-700 text-white text-sm leading-none">InnovaCode</div>
                <div className="text-[10px] text-white/50 font-medium tracking-wide uppercase mt-0.5">Ingeniería en Sistemas</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Plataforma de comercio electrónico profesional. Tecnología, confianza y simplicidad en un solo lugar.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-600 text-white text-sm mb-4">Navegación</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Inicio', page: 'landing' as const },
                { label: 'Catálogo', page: 'catalog' as const },
              ].map(item => (
                <li key={item.page}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm text-white/55 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-display font-600 text-white text-sm mb-4">Mi cuenta</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Iniciar sesión', page: 'login' as const },
                { label: 'Crear cuenta', page: 'register' as const },
                { label: 'Lista de deseos', page: 'wishlist' as const },
              ].map(item => (
                <li key={item.page}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm text-white/55 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-600 text-white text-sm mb-4">Información</h4>
            <ul className="space-y-2.5">
              {['Términos de uso', 'Política de privacidad', 'Soporte técnico', 'Acerca de InnovaCode'].map(label => (
                <li key={label}>
                  <span className="text-sm text-white/55 cursor-pointer hover:text-white transition-colors">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © 2025 InnovaCode – Ingeniería en Sistemas. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/35">Prototipo de alta fidelidad · Análisis y Desarrollo de Software</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
