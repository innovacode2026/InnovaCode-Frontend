import { useState, useEffect } from 'react'
import { AppContext } from '../types'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'
import { UserIcon, CheckIcon } from '../components/Icons'

const CIUDADES = [
  { nombre: 'Bogotá', costo: 0 },
  { nombre: 'Medellín', costo: 18000 },
  { nombre: 'Cali', costo: 18000 },
  { nombre: 'Barranquilla', costo: 18000 },
  { nombre: 'Cartagena', costo: 22000 },
  { nombre: 'Bucaramanga', costo: 22000 },
  { nombre: 'Pereira', costo: 20000 },
  { nombre: 'Manizales', costo: 20000 },
  { nombre: 'Ibagué', costo: 20000 },
  { nombre: 'Santa Marta', costo: 25000 },
  { nombre: 'Cúcuta', costo: 25000 },
  { nombre: 'Villavicencio', costo: 22000 },
  { nombre: 'Otra ciudad', costo: 28000 },
]

export interface DireccionDomicilio {
  ciudad: string
  barrio: string
  direccion: string
  referencia: string
}

export const calcularEnvio = (ciudad: string, total: number): number => {
  const c = CIUDADES.find(c => c.nombre === ciudad)
  if (!c) return 0
  if (c.nombre === 'Bogotá' && total >= 200000) return 0
  if (c.nombre === 'Bogotá') return 12000
  return c.costo
}

export const getDireccion = (userId: string): DireccionDomicilio | null => {
  try {
    const raw = localStorage.getItem(`evox_direccion_${userId}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function PaginaPerfil(ctx: AppContext) {
  const { role, user, navigate } = ctx

  const [form, setForm] = useState<DireccionDomicilio>({
    ciudad: '',
    barrio: '',
    direccion: '',
    referencia: '',
  })
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    if (!user) return
    const saved = getDireccion(user.id)
    if (saved) setForm(saved)
  }, [user?.id])

  if (role !== 'CLIENTE') {
    return (
      <div className="min-h-screen flex flex-col">
        <Encabezado {...ctx} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <UserIcon size={28} className="text-primary" />
            </div>
            <h2 className="font-display font-700 text-white text-xl mb-2">Mi perfil</h2>
            <p className="text-gray-400 text-sm mb-5">Inicia sesión para ver y editar tu perfil.</p>
            <button
              onClick={() => navigate('login')}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
        <PieDePagina navigate={navigate} />
      </div>
    )
  }

  const guardar = () => {
    if (!user) return
    localStorage.setItem(`evox_direccion_${user.id}`, JSON.stringify(form))
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  const costoPrevisualizacion = form.ciudad ? calcularEnvio(form.ciudad, 0) : null
  const inputClass = "w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none transition-all bg-white/5 border border-border focus:border-primary/50"

  return (
    <div className="min-h-screen flex flex-col">
      <Encabezado {...ctx} />

      <div className="flex-1 bg-background">
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <UserIcon size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="font-display font-700 text-2xl text-white">Mi perfil</h1>
                <p className="text-gray-400 text-sm mt-0.5">Gestiona tu información y dirección de entrega</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Datos de la cuenta */}
          <div className="bg-surface rounded-2xl border border-border p-5">
            <h3 className="font-display font-700 text-white text-base mb-4">Datos de la cuenta</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Nombre completo</label>
                <div className="px-3 py-2.5 rounded-xl text-sm text-white/60 bg-white/5 border border-border">
                  {user?.nombre}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Correo electrónico</label>
                <div className="px-3 py-2.5 rounded-xl text-sm text-white/60 bg-white/5 border border-border">
                  {user?.correo}
                </div>
              </div>
            </div>
          </div>

          {/* Dirección de domicilio */}
          <div className="bg-surface rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-700 text-white text-base">Dirección de domicilio</h3>
              {form.ciudad && costoPrevisualizacion !== null && (
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
                  {costoPrevisualizacion === 0
                    ? 'Envío gratis en pedidos +$200.000'
                    : `Envío: $${costoPrevisualizacion.toLocaleString('es-CO')}`}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Ciudad</label>
                <select
                  value={form.ciudad}
                  onChange={e => setForm(f => ({ ...f, ciudad: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-all border border-border focus:border-primary/50 cursor-pointer appearance-none"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <option value="" style={{ background: '#0D1526' }}>Selecciona tu ciudad</option>
                  {CIUDADES.map(c => (
                    <option key={c.nombre} value={c.nombre} style={{ background: '#0D1526' }}>
                      {c.nombre} — {c.nombre === 'Bogotá' ? 'Envío gratis +$200K' : `$${c.costo.toLocaleString('es-CO')}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Barrio / Localidad</label>
                  <input
                    type="text"
                    placeholder="Ej: Chapinero, Laureles..."
                    value={form.barrio}
                    onChange={e => setForm(f => ({ ...f, barrio: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Dirección</label>
                  <input
                    type="text"
                    placeholder="Ej: Cra 15 # 85-32 Apto 401"
                    value={form.direccion}
                    onChange={e => setForm(f => ({ ...f, direccion: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Referencia (opcional)</label>
                <input
                  type="text"
                  placeholder="Ej: Edificio azul, portería principal..."
                  value={form.referencia}
                  onChange={e => setForm(f => ({ ...f, referencia: e.target.value }))}
                  className={inputClass}
                />
              </div>

              {/* Resumen de costo de envío */}
              {form.ciudad && (
                <div className="rounded-xl p-3.5 text-sm" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <div className="font-semibold text-white/80 mb-1">Costo de envío a {form.ciudad}</div>
                  {form.ciudad === 'Bogotá' ? (
                    <div className="text-gray-400 text-xs space-y-0.5">
                      <div>Compras menores a $200.000 → <span className="text-white">$12.000</span></div>
                      <div>Compras mayores a $200.000 → <span className="text-success font-semibold">Gratis</span></div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs">
                      Costo fijo → <span className="text-white font-semibold">${costoPrevisualizacion!.toLocaleString('es-CO')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={guardar}
                disabled={!form.ciudad || !form.direccion}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F7FFF)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}
              >
                Guardar dirección
              </button>
              {guardado && (
                <span className="flex items-center gap-1.5 text-sm text-success font-medium">
                  <CheckIcon size={15} /> Dirección guardada
                </span>
              )}
            </div>
          </div>

        </div>
      </div>

      <PieDePagina navigate={navigate} />
    </div>
  )
}
