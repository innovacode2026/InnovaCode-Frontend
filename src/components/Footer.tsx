import { AppContext } from '../types'

export default function PieDePagina({ navigate }: Pick<AppContext, 'navigate'>) {
  return (
    <footer style={{ background: '#0B0B14' }} className="text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Marca */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-800 text-xl"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)' }}
              >
                E
              </span>
              <span
                className="font-display font-800 text-[20px] leading-none"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                EVOX
              </span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed mb-3">
              Los mejores celulares y computadores con garantía oficial, soporte técnico y envío a todo el país.
            </p>
            <p className="text-[10px] text-white/25 font-medium tracking-wide uppercase">
              Desarrollado por InnovaCode · Ingeniería en Sistemas
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-display font-600 text-white text-sm mb-4">Tienda</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Inicio', page: 'landing' as const },
                { label: 'Catálogo', page: 'catalog' as const },
              ].map(item => (
                <li key={item.page}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {[
                { label: 'Celulares', id: 'celulares' },
                { label: 'Computadores', id: 'computadores' },
                { label: 'Tablets', id: 'tablets' },
                { label: 'Accesorios', id: 'accesorios' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate('catalog', undefined, item.id)}
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mi cuenta */}
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
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-display font-600 text-white text-sm mb-4">Ayuda</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Soporte técnico', id: 'soporte' },
                { label: 'Envíos y devoluciones', id: 'envios' },
                { label: 'Garantías', id: 'garantias' },
                { label: 'Preguntas frecuentes', id: 'faq' },
                { label: 'Términos de uso', id: 'terminos' },
                { label: 'Política de privacidad', id: 'privacidad' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate('ayuda', undefined, undefined, undefined, item.id)}
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © 2026 EVOX - La Tienda Digital. Desarrollado por InnovaCode. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/25">InnovaCode · Ingeniería en Sistemas · Prototipo</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
