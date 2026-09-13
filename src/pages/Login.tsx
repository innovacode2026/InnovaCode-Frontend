import { useState } from 'react'
import { AppContext } from '../types'
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon, AlertIcon, CheckIcon } from '../components/Icons'

export default function InicioSesion(ctx: AppContext) {
  const { navigate, setRole } = ctx
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const demoAccounts = [
    { label: 'Usuario final', email: 'ana.garcia@email.com', role: 'user' as const, hint: 'Ana García' },
    { label: 'Administrador', email: 'juan.perez@innovacode.com', role: 'admin' as const, hint: 'Juan Pérez' },
    { label: 'Superadministrador', email: 'sofia.chen@innovacode.com', role: 'superadmin' as const, hint: 'Sofía Chen' },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Por favor completa todos los campos.'); return }
    if (!email.includes('@')) { setError('Ingresa un correo electrónico válido.'); return }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const account = demoAccounts.find(a => a.email === email)
      const role = account ? account.role : 'user'
      setSuccess(true)
      setRole(role)
      setTimeout(() => {
        if (role === 'admin') navigate('admin-dashboard')
        else if (role === 'superadmin') navigate('super-dashboard')
        else navigate('landing')
      }, 1000)
    }, 1500)
  }

  const handleDemo = (role: 'user' | 'admin' | 'superadmin', email: string) => {
    setEmail(email)
    setPassword('demo123')
    setError('')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header minimal */}
      <div className="bg-white border-b border-border px-6 py-4">
        <button onClick={() => navigate('landing')} className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)' }}>
            <span className="text-white font-display font-900 text-xs leading-none">e</span>
          </div>
          <div>
            <span className="font-display font-900 text-[15px] leading-none block" style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
          </div>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-7">
            <div className="text-center mb-7">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                <LockIcon size={22} className="text-primary" />
              </div>
              <h1 className="font-display font-700 text-gray-900 text-xl">Iniciar sesión</h1>
              <p className="text-gray-500 text-sm mt-1">Ingresa a tu cuenta de EVOX</p>
            </div>

            {success ? (
              <div className="bg-success-50 border border-success-100 rounded-xl p-4 flex items-center gap-3 text-success">
                <CheckIcon size={18} />
                <div>
                  <div className="font-semibold text-sm">¡Bienvenido de vuelta!</div>
                  <div className="text-xs text-success/70">Redirigiendo...</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-danger-50 border border-danger-100 rounded-xl p-3 flex items-start gap-2 text-danger text-sm">
                    <AlertIcon size={16} className="flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico</label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 ${
                        error && !email ? 'border-danger bg-danger-50' : 'border-border focus:border-primary'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
                  <div className="relative">
                    <LockIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 ${
                        error && !password ? 'border-danger bg-danger-50' : 'border-border focus:border-primary'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPass ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verificando...
                    </>
                  ) : 'Iniciar sesión'}
                </button>
              </form>
            )}

            <div className="mt-5 text-center">
              <span className="text-gray-400 text-sm">¿No tienes cuenta? </span>
              <button onClick={() => navigate('register')} className="text-primary text-sm font-medium hover:underline cursor-pointer">
                Regístrate
              </button>
            </div>
          </div>

          {/* Demo accounts */}
          <div className="mt-5 bg-white rounded-2xl border border-border p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Accesos de demostración</p>
            <div className="space-y-2">
              {demoAccounts.map(account => (
                <button
                  key={account.role}
                  onClick={() => handleDemo(account.role, account.email)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary-50 transition-all cursor-pointer text-left group"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">{account.hint}</div>
                    <div className="text-xs text-gray-400">{account.email}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    account.role === 'superadmin' ? 'bg-purple-50 text-purple-600' :
                    account.role === 'admin' ? 'bg-blue-50 text-blue-600' :
                    'bg-primary-50 text-primary'
                  }`}>
                    {account.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-300 mt-3 text-center">Contraseña: <span className="font-mono text-gray-400">demo123</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
