import { useState } from 'react'
import { AppContext } from '../types'
import { getMensajeError } from '../api/client'
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon, AlertIcon, CheckIcon } from '../components/Icons'

export default function InicioSesion(ctx: AppContext) {
  const { navigate, login } = ctx
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Por favor completa todos los campos.'); return }
    if (!email.includes('@')) { setError('Ingresa un correo electrónico válido.'); return }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return }

    setLoading(true)
    try {
      const sesion = await login(email, password)
      setSuccess(true)
      setTimeout(() => {
        if (sesion.rol === 'ADMINISTRADOR') navigate('admin-dashboard')
        else navigate('landing')
      }, 800)
    } catch (err) {
      setError(getMensajeError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050816' }}>
      {/* Header minimal */}
      <div className="px-6 py-4" style={{ background: 'rgba(13,21,38,0.9)', borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
        <button onClick={() => navigate('landing')} className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)' }}>
            <span className="text-white font-display font-900 text-xs leading-none">e</span>
          </div>
          <div>
            <span className="font-display font-800 text-[18px] leading-none block" style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EVOX</span>
          </div>
        </button>
      </div>

      {/* Orbes de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(79,127,255,0.1) 0%, transparent 65%)', filter: 'blur(50px)' }} />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 py-10 relative" style={{ zIndex: 1 }}>
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="rounded-2xl p-7" style={{ background: 'rgba(13,21,38,0.85)', border: '1px solid rgba(99,102,241,0.25)', backdropFilter: 'blur(20px)' }}>
            <div className="text-center mb-7">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                <LockIcon size={22} className="text-primary" />
              </div>
              <h1 className="font-display font-700 text-white text-xl">Iniciar sesión</h1>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Ingresa a tu cuenta de EVOX</p>
            </div>

            {success ? (
              <div className="rounded-xl p-4 flex items-center gap-3 text-success" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <CheckIcon size={18} />
                <div>
                  <div className="font-semibold text-sm">¡Bienvenido de vuelta!</div>
                  <div className="text-xs" style={{ color: 'rgba(16,185,129,0.7)' }}>Redirigiendo...</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="rounded-xl p-3 flex items-start gap-2 text-danger text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <AlertIcon size={16} className="shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Correo electrónico</label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/25"
                      style={{
                        background: 'rgba(5,8,22,0.6)',
                        border: `1px solid ${error && !email ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.25)'}`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Contraseña</label>
                  <div className="relative">
                    <LockIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl focus:outline-none transition-all text-white placeholder:text-white/25"
                      style={{
                        background: 'rgba(5,8,22,0.6)',
                        border: `1px solid ${error && !password ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.25)'}`,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {showPass ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 text-white text-sm font-semibold rounded-xl disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', boxShadow: '0 0 25px rgba(139,92,246,0.35)', transition: 'all 0.2s' }}
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
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>¿No tienes cuenta? </span>
              <button onClick={() => navigate('register')} className="text-primary text-sm font-medium hover:underline cursor-pointer">
                Regístrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}