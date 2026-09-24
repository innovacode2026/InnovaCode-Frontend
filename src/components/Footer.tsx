import { useState } from 'react'
import { AppContext } from '../types'

export default function PieDePagina({ navigate }: Pick<AppContext, 'navigate'>) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

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
    <>
      {/* Newsletter banner */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #060D1F 0%, #0d1533 50%, #1a0c35 100%)', borderTop: '1px solid rgba(99,102,241,0.2)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(139,92,246,0.15) 0%, transparent 65%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Products decoration */}
            <div className="hidden lg:flex items-end gap-2 shrink-0 -mb-10">
              <div className="w-28 h-20 rounded-2xl flex items-center justify-center text-4xl rotate-[-4deg]" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}>💻</div>
              <div className="w-20 h-24 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'rgba(79,127,255,0.12)', border: '1px solid rgba(79,127,255,0.25)' }}>🎧</div>
              <div className="w-16 h-28 rounded-2xl flex items-center justify-center text-2xl rotate-[3deg]" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}>📱</div>
              <div className="w-14 h-16 rounded-2xl flex items-center justify-center text-2xl rotate-[-2deg]" style={{ background: 'rgba(79,127,255,0.1)', border: '1px solid rgba(79,127,255,0.2)' }}>🎧</div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#C4B5FD' }}>Suscríbete a nuestra tienda</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                Mantente al día con las<br />
                <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>mejores ofertas y novedades</span>
              </h2>
              <p className="text-sm max-w-sm mx-auto lg:mx-0" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Recibe promociones exclusivas, nuevos lanzamientos y más directo en tu correo.
              </p>
            </div>

            {/* Form */}
            <div className="w-full lg:w-auto lg:min-w-[380px] shrink-0">
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-2xl px-5 py-4" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm font-semibold text-success">¡Te has suscrito exitosamente!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div className="flex gap-2 mb-2">
                    <div className="flex-1 relative">
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white outline-none transition-all"
                        style={{ background: 'rgba(5,8,22,0.6)', border: '1px solid rgba(99,102,241,0.3)', color: 'white' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)' }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 h-11 text-white text-sm font-semibold rounded-xl transition-all hover:opacity-90 active:scale-95 shrink-0 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', boxShadow: '0 0 20px rgba(139,92,246,0.35)' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Suscribirme
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Tus datos están seguros con nosotros.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <footer style={{ background: '#0B1629' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] gap-10 mb-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #4F7FFF)' }}
                >
                  <span className="text-white font-bold text-sm tracking-tight">EX</span>
                </div>
                <span className="font-bold text-[22px] text-white leading-none tracking-tight">EVOX</span>
              </div>
              <p className="text-white font-semibold text-[15px] leading-snug mb-2">
                Tecnología que te acompaña,<br />siempre.
              </p>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                En EVOX encuentras los mejores dispositivos electrónicos, con la calidad, garantía y el respaldo que necesitas.
              </p>
              <div className="flex items-center gap-2">
                {social.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Tienda */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <h4 className="font-bold text-white text-sm">Tienda</h4>
              </div>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => navigate('landing')}
                    className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors cursor-pointer group"
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
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                </div>
                <h4 className="font-bold text-white text-sm">Ayuda</h4>
              </div>
              <ul className="space-y-2.5">
                {[
                  { label: 'Soporte técnico',       id: 'soporte' },
                  { label: 'Envíos y devoluciones', id: 'envios' },
                  { label: 'Garantías',             id: 'garantias' },
                  { label: 'Preguntas frecuentes',  id: 'faq' },
                  { label: 'Términos de uso',       id: 'terminos' },
                  { label: 'Política de privacidad',id: 'privacidad' },
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

            {/* Services card */}
            <div>
              <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
                {[
                  {
                    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
                    title: 'Envíos a todo el país',
                    sub: 'Rápidos y seguros',
                  },
                  {
                    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                    title: 'Compra segura',
                    sub: 'Protegemos tus datos',
                  },
                  {
                    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
                    title: 'Atención al cliente',
                    sub: '+57 300 123 4567',
                  },
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.2)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight">{item.title}</div>
                      <div className="text-xs text-white/45 leading-tight">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-xs text-white/30 text-center sm:text-left">
              © 2026 EVOX - La Tienda Digital. Todos los derechos reservados.
            </p>

            {/* Payment methods */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-white/30 mr-1">Medios de pago</span>
              <span className="h-px w-3 bg-white/15 hidden sm:block" />
              {[
                { label: 'VISA',       bg: '#1A1F71', color: '#fff',    fw: 'bold' },
                { label: 'MASTERCARD', bg: '#EB001B', color: '#fff',    fw: 'bold', style: { background: 'linear-gradient(90deg,#EB001B 0%,#F79E1B 100%)' } },
                { label: 'PayPal',     bg: '#003087', color: '#009CDE', fw: '600' },
                { label: 'Nequi',      bg: '#5F259F', color: '#fff',    fw: 'bold' },
                { label: 'PSE',        bg: '#0B6B3A', color: '#fff',    fw: 'bold' },
              ].map(pm => (
                <span
                  key={pm.label}
                  className="px-2.5 py-1 rounded text-[10px] font-bold tracking-tight"
                  style={{ background: (pm as any).style?.background ?? pm.bg, color: pm.color, fontWeight: pm.fw }}
                >
                  {pm.label}
                </span>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-3 text-xs text-white/30">
              <button
                onClick={() => navigate('ayuda', undefined, undefined, undefined, 'privacidad')}
                className="hover:text-white/70 transition-colors cursor-pointer"
              >
                Privacidad
              </button>
              <span className="text-white/15">|</span>
              <button
                onClick={() => navigate('ayuda', undefined, undefined, undefined, 'terminos')}
                className="hover:text-white/70 transition-colors cursor-pointer"
              >
                Términos y condiciones
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
