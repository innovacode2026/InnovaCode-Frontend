import { useState } from 'react'
import { AppContext } from '../types'
import { getMensajeError } from '../api/client'
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, AlertIcon, CheckIcon } from '../components/Icons'

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
    <div className="min-h-screen flex">
      {/* Panel izquierdo — imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: '#050816' }}>
        {/* Imagen de fondo que ocupa todo el panel */}
        <img
          src="/register-banner.png"
          alt="Tecnología EVOX"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />

        {/* Overlay degradado sobre la imagen */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,8,22,0.55) 0%, rgba(5,8,22,0.2) 45%, rgba(5,8,22,0.75) 100%)' }} />

        {/* Logo arriba */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10 w-full">
          <button onClick={() => navigate('landing')} className="flex items-center gap-2.5 cursor-pointer self-start">
            <img src="/logo-evox.png" alt="EVOX" className="w-9 h-9 object-contain rounded-xl" />
            <span className="font-display font-800 text-2xl" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
          </button>

          {/* Texto inferior */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider" style={{ background: 'rgba(139,92,246,0.2)', color: '#C4B5FD', border: '1px solid rgba(139,92,246,0.35)', backdropFilter: 'blur(8px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              Nueva cuenta
            </div>
            <h2 className="font-display font-800 text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              Únete a{' '}
              <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
              Disfruta de una experiencia de compra más fácil y personalizada.
            </p>
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="w-full lg:w-1/2 flex flex-col" style={{ background: '#050816' }}>
        <div className="lg:hidden px-6 py-4" style={{ background: 'rgba(13,21,38,0.9)', borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
          <button onClick={() => navigate('landing')} className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)' }}>
              <span className="text-white font-display font-900 text-xs leading-none">e</span>
            </div>
            <span className="font-display font-800 text-[18px] leading-none block" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 py-10">
          <div className="w-full max-w-sm">
            <div className="rounded-2xl p-7" style={{ background: 'rgba(13,21,38,0.85)', border: '1px solid rgba(99,102,241,0.25)', backdropFilter: 'blur(20px)' }}>
            <div className="text-center mb-7">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                <UserIcon size={22} className="text-primary" />
              </div>
              <h1 className="font-display font-700 text-white text-xl">Crear cuenta</h1>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Regístrate en EVOX gratis</p>
            </div>

            {success ? (
              <div className="rounded-xl p-4 flex items-center gap-3 text-success" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <CheckIcon size={18} />
                <div>
                  <div className="font-semibold text-sm">¡Cuenta creada exitosamente!</div>
                  <div className="text-xs" style={{ color: 'rgba(16,185,129,0.7)' }}>Ya puedes iniciar sesión. Redirigiendo...</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {errors.form && (
                  <div className="rounded-xl p-3 flex items-start gap-2 text-danger text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <AlertIcon size={16} className="shrink-0 mt-0.5" />
                    {errors.form}
                  </div>
                )}

                {/* Nombres */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Nombre</label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={e => { setForm(f => ({ ...f, nombre: e.target.value })); setErrors(er => ({ ...er, nombre: '', form: '' })) }}
                      placeholder="Tu nombre"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/25"
                      style={{ background: 'rgba(5,8,22,0.6)', border: `1px solid ${errors.nombre ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.25)'}` }}
                    />
                  </div>
                  {errors.nombre && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.nombre}</p>}
                </div>

                {/* Apellido */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Apellido</label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="text"
                      value={form.apellido}
                      onChange={e => { setForm(f => ({ ...f, apellido: e.target.value })); setErrors(er => ({ ...er, apellido: '', form: '' })) }}
                      placeholder="Tu apellido"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/25"
                      style={{ background: 'rgba(5,8,22,0.6)', border: `1px solid ${errors.apellido ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.25)'}` }}
                    />
                  </div>
                  {errors.apellido && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.apellido}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Correo electrónico</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '', form: '' })) }}
                    placeholder="tu@correo.com"
                    className="w-full px-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/25"
                    style={{ background: 'rgba(5,8,22,0.6)', border: `1px solid ${errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.25)'}` }}
                  />
                  {errors.email && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Contraseña</label>
                  <div className="relative">
                    <LockIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: '', form: '' })) }}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/25"
                      style={{ background: 'rgba(5,8,22,0.6)', border: `1px solid ${errors.password ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.25)'}` }}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {showPass ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                    </button>
                  </div>
                  {strength && (
                    <div className="mt-2">
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className={`h-full ${strength.color} ${strength.width} rounded-full transition-all`} />
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Fortaleza: <span className="font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{strength.label}</span></p>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.password}</p>}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Confirmar contraseña</label>
                  <div className="relative">
                    <LockIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={form.confirm}
                      onChange={e => { setForm(f => ({ ...f, confirm: e.target.value })); setErrors(er => ({ ...er, confirm: '', form: '' })) }}
                      placeholder="Repite la contraseña"
                      className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/25"
                      style={{ background: 'rgba(5,8,22,0.6)', border: `1px solid ${errors.confirm ? 'rgba(239,68,68,0.5)' : form.confirm && form.confirm === form.password ? 'rgba(16,185,129,0.5)' : 'rgba(99,102,241,0.25)'}` }}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {showConfirm ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                    </button>
                    {form.confirm && form.confirm === form.password && (
                      <CheckIcon size={14} className="absolute right-9 top-1/2 -translate-y-1/2 text-success" />
                    )}
                  </div>
                  {errors.confirm && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.confirm}</p>}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.terms}
                      onChange={e => { setForm(f => ({ ...f, terms: e.target.checked })); setErrors(er => ({ ...er, terms: '', form: '' })) }}
                      className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer"
                    />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      Acepto los{' '}
                      <span className="text-primary font-medium cursor-pointer hover:underline">Términos de uso</span>
                      {' '}y la{' '}
                      <span className="text-primary font-medium cursor-pointer hover:underline">Política de privacidad</span>
                    </span>
                  </label>
                  {errors.terms && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.terms}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 text-white text-sm font-semibold rounded-xl disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', boxShadow: '0 0 25px rgba(139,92,246,0.35)' }}
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creando cuenta...</>
                  ) : 'Crear cuenta'}
                </button>
              </form>
            )}

            <div className="mt-5 text-center">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>¿Ya tienes cuenta? </span>
              <button onClick={() => navigate('login')} className="text-primary text-sm font-medium hover:underline cursor-pointer">
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