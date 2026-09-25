import { AppContext } from '../types'

export default function PieDePagina({ navigate }: Pick<AppContext, 'navigate'>) {
  const social = [
    {
      label: 'Facebook', href: '#',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    },
    {
      label: 'Instagram', href: '#',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    },
    {
      label: 'TikTok', href: '#',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>,
    },
    {
      label: 'YouTube', href: '#',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
    },
    {
      label: 'X', href: '#',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.84L2.25 2.25h6.988l4.254 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    },
  ]

  return (
    <footer className="text-white relative" style={{ background: '#060D1F', borderTop: '1px solid rgba(99,102,241,0.2)' }}>
      {/* Glow decorativo superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(79,127,255,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] gap-10 mb-10">

          {/* Brand */}
          <div>
            <button onClick={() => navigate('landing')} className="flex items-center gap-3 mb-4 cursor-pointer">
              <img src="/logo-evox.png" alt="EVOX" className="w-10 h-10 object-contain rounded-xl" />
              <span className="font-display font-800 text-[22px] leading-none" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
            </button>
            <p className="font-semibold text-[15px] leading-snug mb-2 text-white">
              Tecnología que te acompaña,<br />siempre.
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              En EVOX encuentras los mejores dispositivos electrónicos, con la calidad, garantía y el respaldo que necesitas.
            </p>
            <div className="flex items-center gap-2">
              {social.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"
                  style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.25)'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Tienda */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <h4 className="font-bold text-white text-sm">Tienda</h4>
            </div>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate('landing')}
                  className="flex items-center gap-1.5 text-sm transition-colors cursor-pointer group"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                >
                  Inicio
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" className="opacity-40 group-hover:opacity-80 transition-opacity"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </li>
              {[
                { label: 'Catálogo',     action: () => navigate('catalog') },
                { label: 'Celulares',    action: () => navigate('catalog', undefined, 'celulares') },
                { label: 'Computadores', action: () => navigate('catalog', undefined, 'computadores') },
                { label: 'Tablets',      action: () => navigate('catalog', undefined, 'tablets') },
                { label: 'Accesorios',   action: () => navigate('catalog', undefined, 'accesorios') },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-sm transition-colors cursor-pointer"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mi cuenta */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(79,127,255,0.15)', border: '1px solid rgba(79,127,255,0.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#4F7FFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h4 className="font-bold text-white text-sm">Mi cuenta</h4>
            </div>
            <ul className="space-y-2.5">
              {[
                { label: 'Iniciar sesión',  page: 'login'    as const },
                { label: 'Crear cuenta',    page: 'register' as const },
                { label: 'Lista de deseos', page: 'wishlist' as const },
                { label: 'Mis pedidos',     page: 'cart'     as const },
                { label: 'Rastrear pedido', page: 'cart'     as const },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm transition-colors cursor-pointer"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
              </div>
              <h4 className="font-bold text-white text-sm">Ayuda</h4>
            </div>
            <ul className="space-y-2.5">
              {[
                { label: 'Soporte técnico',        id: 'soporte' },
                { label: 'Envíos y devoluciones',  id: 'envios' },
                { label: 'Garantías',              id: 'garantias' },
                { label: 'Preguntas frecuentes',   id: 'faq' },
                { label: 'Términos de uso',        id: 'terminos' },
                { label: 'Política de privacidad', id: 'privacidad' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate('ayuda', undefined, undefined, undefined, item.id)}
                    className="text-sm transition-colors cursor-pointer"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(99,102,241,0.2)' }}>
              {[
                {
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
                  title: 'Envíos a todo el país',
                  sub: 'Rápidos y seguros',
                  accent: 'rgba(139,92,246,0.15)',
                },
                {
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                  title: 'Compra segura',
                  sub: 'Protegemos tus datos',
                  accent: 'rgba(79,127,255,0.15)',
                },
                {
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
                  title: 'Atención al cliente',
                  sub: '+57 300 123 4567',
                  accent: 'rgba(139,92,246,0.15)',
                },
              ].map(item => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.accent, border: '1px solid rgba(99,102,241,0.2)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white leading-tight">{item.title}</div>
                    <div className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap" style={{ borderTop: '1px solid rgba(99,102,241,0.15)' }}>
          <p className="text-xs text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 EVOX - La Tienda Digital. Todos los derechos reservados.
          </p>

          {/* Medios de pago */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-xs mr-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Medios de pago</span>
            {[
              { label: 'VISA',       bg: '#1A1F71', color: '#fff' },
              { label: 'MASTERCARD', bg: 'linear-gradient(90deg,#EB001B,#F79E1B)', color: '#fff' },
              { label: 'PayPal',     bg: '#003087', color: '#009CDE' },
              { label: 'Nequi',      bg: '#5F259F', color: '#fff' },
              { label: 'PSE',        bg: '#0B6B3A', color: '#fff' },
            ].map(pm => (
              <span
                key={pm.label}
                className="px-2.5 py-1 rounded text-[10px] font-bold tracking-tight"
                style={{ background: pm.bg, color: pm.color }}
              >
                {pm.label}
              </span>
            ))}
          </div>

          {/* Legal */}
          <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <button
              onClick={() => navigate('ayuda', undefined, undefined, undefined, 'privacidad')}
              className="transition-colors cursor-pointer hover:text-white"
            >
              Privacidad
            </button>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
            <button
              onClick={() => navigate('ayuda', undefined, undefined, undefined, 'terminos')}
              className="transition-colors cursor-pointer hover:text-white"
            >
              Términos y condiciones
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
