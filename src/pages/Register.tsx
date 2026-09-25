import { useState } from 'react'
import { AppContext } from '../types'
import { getMensajeError } from '../api/client'
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, AlertIcon, CheckIcon, ShieldIcon } from '../components/Icons'

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)
const CreditCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
)
const HeadphonesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
)
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const features = [
  { icon: TruckIcon, label: 'Envíos seguros', sub: 'A todo el país', color: '#4F7FFF' },
  { icon: ShieldIcon, label: 'Compra confiable', sub: 'Tus datos protegidos', color: '#8B5CF6' },
  { icon: CreditCardIcon, label: 'Pagos seguros', sub: 'Múltiples métodos', color: '#06B6D4' },
  { icon: HeadphonesIcon, label: 'Soporte 24/7', sub: 'Siempre contigo', color: '#8B5CF6' },
]

export default function Registro(ctx: AppContext) {
  const { navigate, register } = ctx
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', confirm: '', terms: false })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido.'
    if (!form.apellido.trim()) e.apellido = 'El apellido es requerido.'
    if (!form.email.includes('@')) e.email = 'Ingresa un correo electrónico válido.'
    if (form.password.length < 8) e.password = 'La contraseña debe tener al menos 8 caracteres.'
    if (form.password !== form.confirm) e.confirm = 'Las contraseñas no coinciden.'
    if (!form.terms) e.terms = 'Debes aceptar los términos para continuar.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    try {
      await register(form.nombre.trim(), form.apellido.trim(), form.email, form.password)
      setSuccess(true)
      setTimeout(() => navigate('login'), 1500)
    } catch (err) {
      setErrors({ form: getMensajeError(err) })
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = () => {
    const p = form.password
    if (!p) return null
    if (p.length < 6) return { label: 'Muy débil', color: 'bg-danger', width: 'w-1/4' }
    if (p.length < 8) return { label: 'Débil', color: 'bg-warning', width: 'w-2/4' }
    if (p.length < 12) return { label: 'Buena', color: 'bg-success', width: 'w-3/4' }
    return { label: 'Excelente', color: 'bg-success', width: 'w-full' }
  }
  const strength = passwordStrength()

  return (
    <div className="min-h-screen flex" style={{ background: '#050816' }}>

      {/* ── Panel izquierdo — contenido ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ background: 'linear-gradient(135deg, #050816 0%, #080E20 60%, #0B1629 100%)' }}>

        {/* Glows decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(79,127,255,0.18) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', transform: 'translate(20%, 20%)' }} />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[2px] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,127,255,0.4), rgba(139,92,246,0.4), transparent)', transform: 'translate(-50%, -50%) rotate(-20deg)', filter: 'blur(1px)' }} />

        {/* Logo */}
        <button onClick={() => navigate('landing')} className="flex items-center gap-2.5 cursor-pointer self-start relative z-10">
          <img src="/logo-evox.png" alt="EVOX" className="w-9 h-9 object-contain rounded-xl" />
          <span className="font-display font-800 text-2xl" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
        </button>

        {/* Contenido central */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider self-start" style={{ background: 'rgba(79,127,255,0.15)', color: '#93C5FD', border: '1px solid rgba(79,127,255,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F7FFF] animate-pulse" />
            Crea tu cuenta gratis
          </div>

          {/* Heading */}
          <h1 className="font-display font-800 text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)' }}>
            Tu mundo tecnológico<br />
            comienza{' '}
            <span style={{ background: 'linear-gradient(135deg, #4F7FFF, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>aquí</span>
          </h1>

          {/* Descripción */}
          <p className="text-sm leading-relaxed mb-10 max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Accede a las mejores marcas, productos innovadores y una experiencia de compra segura y confiable.
          </p>

          {/* Features 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `rgba(${color === '#4F7FFF' ? '79,127,255' : color === '#06B6D4' ? '6,182,212' : '139,92,246'},0.15)`, border: `1px solid rgba(${color === '#4F7FFF' ? '79,127,255' : color === '#06B6D4' ? '6,182,212' : '139,92,246'},0.25)`, color }}>
                  <Icon />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white leading-tight">{label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Texto decorativo inferior */}
        <div className="relative z-10">
          <p className="font-display italic text-2xl font-700" style={{ background: 'linear-gradient(135deg, rgba(79,127,255,0.7), rgba(139,92,246,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Tecnología<br />en tus manos
          </p>
        </div>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="w-full lg:w-1/2 flex flex-col" style={{ background: '#050816' }}>

        {/* Mobile logo */}
        <div className="lg:hidden px-6 py-4" style={{ borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
          <button onClick={() => navigate('landing')} className="flex items-center gap-2 cursor-pointer">
            <img src="/logo-evox.png" alt="EVOX" className="w-7 h-7 object-contain rounded-lg" />
            <span className="font-display font-800 text-lg" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 py-8">
          <div className="w-full max-w-sm">
            <div className="rounded-2xl p-7" style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid rgba(99,102,241,0.25)', backdropFilter: 'blur(20px)' }}>

              {/* Header del card */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                  <UserIcon size={22} className="text-primary" />
                </div>
                <h1 className="font-display font-700 text-white text-xl">
                  Crear{' '}
                  <span style={{ background: 'linear-gradient(135deg, #4F7FFF, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>cuenta</span>
                </h1>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Regístrate en EVOX gratis y comienza tu experiencia.</p>
              </div>

              {success ? (
                <div className="rounded-xl p-4 flex items-center gap-3 text-success" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <CheckIcon size={18} />
                  <div>
                    <div className="font-semibold text-sm">¡Cuenta creada exitosamente!</div>
                    <div className="text-xs" style={{ color: 'rgba(16,185,129,0.7)' }}>Redirigiendo al inicio de sesión...</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                  {errors.form && (
                    <div className="rounded-xl p-3 flex items-start gap-2 text-danger text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                      <AlertIcon size={16} className="shrink-0 mt-0.5" />
                      {errors.form}
                    </div>
                  )}

                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>Nombre</label>
                    <div className="relative">
                      <UserIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.25)' }} />
                      <input
                        type="text"
                        value={form.nombre}
                        onChange={e => { setForm(f => ({ ...f, nombre: e.target.value })); setErrors(er => ({ ...er, nombre: '', form: '' })) }}
                        placeholder="Tu nombre"
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/20"
                        style={{ background: 'rgba(5,8,22,0.7)', border: `1px solid ${errors.nombre ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.2)'}` }}
                      />
                    </div>
                    {errors.nombre && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.nombre}</p>}
                  </div>

                  {/* Apellido */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>Apellido</label>
                    <div className="relative">
                      <UserIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.25)' }} />
                      <input
                        type="text"
                        value={form.apellido}
                        onChange={e => { setForm(f => ({ ...f, apellido: e.target.value })); setErrors(er => ({ ...er, apellido: '', form: '' })) }}
                        placeholder="Tu apellido"
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/20"
                        style={{ background: 'rgba(5,8,22,0.7)', border: `1px solid ${errors.apellido ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.2)'}` }}
                      />
                    </div>
                    {errors.apellido && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.apellido}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>Correo electrónico</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.25)' }}><MailIcon /></span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '', form: '' })) }}
                        placeholder="tu@correo.com"
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/20"
                        style={{ background: 'rgba(5,8,22,0.7)', border: `1px solid ${errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.2)'}` }}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.email}</p>}
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>Contraseña</label>
                    <div className="relative">
                      <LockIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.25)' }} />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={form.password}
                        onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: '', form: '' })) }}
                        placeholder="Mínimo 8 caracteres"
                        className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/20"
                        style={{ background: 'rgba(5,8,22,0.7)', border: `1px solid ${errors.password ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.2)'}` }}
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {showPass ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
                      </button>
                    </div>
                    {strength && (
                      <div className="mt-1.5">
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <div className={`h-full ${strength.color} ${strength.width} rounded-full transition-all`} />
                        </div>
                        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Fortaleza: <span style={{ color: 'rgba(255,255,255,0.55)' }}>{strength.label}</span></p>
                      </div>
                    )}
                    {errors.password && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.password}</p>}
                  </div>

                  {/* Confirmar contraseña */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>Confirmar contraseña</label>
                    <div className="relative">
                      <LockIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.25)' }} />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirm}
                        onChange={e => { setForm(f => ({ ...f, confirm: e.target.value })); setErrors(er => ({ ...er, confirm: '', form: '' })) }}
                        placeholder="Repite la contraseña"
                        className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/20"
                        style={{ background: 'rgba(5,8,22,0.7)', border: `1px solid ${errors.confirm ? 'rgba(239,68,68,0.5)' : form.confirm && form.confirm === form.password ? 'rgba(16,185,129,0.5)' : 'rgba(99,102,241,0.2)'}` }}
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {showConfirm ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
                      </button>
                      {form.confirm && form.confirm === form.password && (
                        <CheckIcon size={13} className="absolute right-9 top-1/2 -translate-y-1/2 text-success" />
                      )}
                    </div>
                    {errors.confirm && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.confirm}</p>}
                  </div>

                  {/* Términos */}
                  <div>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.terms}
                        onChange={e => { setForm(f => ({ ...f, terms: e.target.checked })); setErrors(er => ({ ...er, terms: '', form: '' })) }}
                        className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer"
                      />
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        Acepto los{' '}
                        <span className="text-primary font-medium cursor-pointer hover:underline">Términos de uso</span>
                        {' '}y la{' '}
                        <span style={{ color: '#4F7FFF' }} className="font-medium cursor-pointer hover:underline">Política de privacidad</span>
                      </span>
                    </label>
                    {errors.terms && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.terms}</p>}
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 text-white text-sm font-semibold rounded-xl disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 mt-1"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', boxShadow: '0 0 25px rgba(79,127,255,0.3)' }}
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creando cuenta...</>
                    ) : (
                      <><UserIcon size={15} />Crear cuenta <ArrowRightIcon /></>
                    )}
                  </button>
                </form>
              )}

              {/* Social login */}
              {!success && (
                <>
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>o regístrate con</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Google */}
                    <button className="flex items-center justify-center py-2 rounded-xl transition-colors cursor-pointer" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </button>
                    {/* Apple */}
                    <button className="flex items-center justify-center py-2 rounded-xl transition-colors cursor-pointer" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                      </svg>
                    </button>
                    {/* Microsoft */}
                    <button className="flex items-center justify-center py-2 rounded-xl transition-colors cursor-pointer" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/><path fill="#FFB900" d="M13 13h10v10H13z"/>
                      </svg>
                    </button>
                  </div>
                </>
              )}

              {/* Link a login */}
              <div className="mt-4 text-center">
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>¿Ya tienes una cuenta? </span>
                <button onClick={() => navigate('login')} className="text-xs font-medium cursor-pointer hover:underline" style={{ color: '#4F7FFF' }}>
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
