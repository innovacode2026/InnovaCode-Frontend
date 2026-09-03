import { useState } from 'react'
import { AppContext } from '../types'
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, AlertIcon, CheckIcon } from '../components/Icons'

export default function Register(ctx: AppContext) {
  const { navigate, setRole } = ctx
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido.'
    if (!form.email.includes('@')) e.email = 'Ingresa un correo electrónico válido.'
    if (form.password.length < 8) e.password = 'La contraseña debe tener al menos 8 caracteres.'
    if (form.password !== form.confirm) e.confirm = 'Las contraseñas no coinciden.'
    if (!form.terms) e.terms = 'Debes aceptar los términos para continuar.'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setRole('user')
      setTimeout(() => navigate('landing'), 1500)
    }, 1500)
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
    <div className="min-h-screen bg-background flex flex-col">
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

      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-7">
            <div className="text-center mb-7">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                <UserIcon size={22} className="text-primary" />
              </div>
              <h1 className="font-display font-700 text-gray-900 text-xl">Crear cuenta</h1>
              <p className="text-gray-500 text-sm mt-1">Regístrate en InnovaCode gratis</p>
            </div>

            {success ? (
              <div className="bg-success-50 border border-success-100 rounded-xl p-4 flex items-center gap-3 text-success">
                <CheckIcon size={18} />
                <div>
                  <div className="font-semibold text-sm">¡Cuenta creada exitosamente!</div>
                  <div className="text-xs text-success/70">Bienvenido a InnovaCode. Redirigiendo...</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre completo</label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
                      placeholder="Tu nombre completo"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 ${errors.name ? 'border-danger bg-danger-50' : 'border-border focus:border-primary'}`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
                    placeholder="tu@correo.com"
                    className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 ${errors.email ? 'border-danger bg-danger-50' : 'border-border focus:border-primary'}`}
                  />
                  {errors.email && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
                  <div className="relative">
                    <LockIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: '' })) }}
                      placeholder="Mínimo 8 caracteres"
                      className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 ${errors.password ? 'border-danger bg-danger-50' : 'border-border focus:border-primary'}`}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      {showPass ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                    </button>
                  </div>
                  {strength && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${strength.color} ${strength.width} rounded-full transition-all`} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Fortaleza: <span className="font-medium text-gray-600">{strength.label}</span></p>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{errors.password}</p>}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar contraseña</label>
                  <div className="relative">
                    <LockIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={form.confirm}
                      onChange={e => { setForm(f => ({ ...f, confirm: e.target.value })); setErrors(er => ({ ...er, confirm: '' })) }}
                      placeholder="Repite la contraseña"
                      className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 ${errors.confirm ? 'border-danger bg-danger-50' : form.confirm && form.confirm === form.password ? 'border-success bg-success-50' : 'border-border focus:border-primary'}`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
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
                      onChange={e => { setForm(f => ({ ...f, terms: e.target.checked })); setErrors(er => ({ ...er, terms: '' })) }}
                      className="mt-0.5 w-4 h-4 rounded border-border accent-primary cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">
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
                  className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creando cuenta...</>
                  ) : 'Crear cuenta'}
                </button>
              </form>
            )}

            <div className="mt-5 text-center">
              <span className="text-gray-400 text-sm">¿Ya tienes cuenta? </span>
              <button onClick={() => navigate('login')} className="text-primary text-sm font-medium hover:underline cursor-pointer">
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
