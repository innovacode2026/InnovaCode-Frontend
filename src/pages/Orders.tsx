import { useState, useEffect } from 'react'
import { AppContext } from '../types'
import { obtenerPedidos, obtenerPedido } from '../api/pedidoService'
import type { PedidoResumen, PedidoDetalle, EstadoPedido } from '../types/api'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'
import { CheckIcon, ChevronRightIcon } from '../components/Icons'

const ESTADO_CONFIG: Record<EstadoPedido, { label: string; color: string; bg: string; paso: number }> = {
  PENDIENTE: { label: 'Pendiente',   color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  paso: 1 },
  PAGADO:    { label: 'Pagado',      color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', paso: 2 },
  ENVIADO:   { label: 'Enviado',     color: '#06B6D4', bg: 'rgba(6,182,212,0.12)',  paso: 3 },
  ENTREGADO: { label: 'Entregado',   color: '#10b981', bg: 'rgba(16,185,129,0.12)', paso: 4 },
}

const PASOS = ['Pedido recibido', 'Pago confirmado', 'En camino', 'Entregado']

function estimarEntrega(fecha: string, estado: EstadoPedido): string {
  const base = new Date(fecha)
  if (isNaN(base.getTime())) return ''
  const diasExtra: Record<EstadoPedido, number> = {
    PENDIENTE: 5,
    PAGADO: 3,
    ENVIADO: 1,
    ENTREGADO: 0,
  }
  if (estado === 'ENTREGADO') return 'Ya entregado'
  const entrega = new Date(base)
  entrega.setDate(entrega.getDate() + diasExtra[estado])
  return entrega.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })
}

function formatFecha(fecha: string): string {
  const d = new Date(fecha)
  if (isNaN(d.getTime())) return fecha
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
}

function BarraProgreso({ estado }: { estado: EstadoPedido }) {
  const pasoActual = ESTADO_CONFIG[estado].paso
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-3.5 h-0.5" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div
          className="absolute left-0 top-3.5 h-0.5 transition-all duration-500"
          style={{
            width: `${((pasoActual - 1) / 3) * 100}%`,
            background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
          }}
        />
        {PASOS.map((paso, i) => {
          const completado = i + 1 <= pasoActual
          return (
            <div key={paso} className="flex flex-col items-center gap-1.5 z-10">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={
                  completado
                    ? { background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', color: '#fff' }
                    : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }
                }
              >
                {completado ? <CheckIcon size={13} /> : i + 1}
              </div>
              <span className="text-[10px] text-center leading-tight hidden sm:block"
                style={{ color: completado ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)', maxWidth: 60 }}>
                {paso}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TarjetaPedido({ pedido, onExpand, expanded, detalle, cargandoDetalle }: {
  pedido: PedidoResumen
  onExpand: (id: string) => void
  expanded: boolean
  detalle: PedidoDetalle | null
  cargandoDetalle: boolean
}) {
  const cfg = ESTADO_CONFIG[pedido.estado]
  const entrega = estimarEntrega(pedido.fecha, pedido.estado)

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      {/* Cabecera */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-700 text-white text-sm">
                Pedido #{pedido.id.slice(0, 8).toUpperCase()}
              </span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ color: cfg.color, background: cfg.bg }}
              >
                {cfg.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{formatFecha(pedido.fecha)}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display font-700 text-white">${pedido.total.toLocaleString('es-CO')}</div>
            <button
              onClick={() => onExpand(pedido.id)}
              className="flex items-center gap-1 text-xs text-primary hover:underline mt-0.5 cursor-pointer"
            >
              {expanded ? 'Ocultar' : 'Ver detalle'}
              <ChevronRightIcon size={11} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Entrega estimada */}
        {entrega && (
          <div className="flex items-center gap-2 text-xs mb-1"
            style={{ color: pedido.estado === 'ENTREGADO' ? '#10b981' : '#a78bfa' }}>
            <span>{pedido.estado === 'ENTREGADO' ? '✓ Entregado' : `Entrega estimada: ${entrega}`}</span>
          </div>
        )}

        <BarraProgreso estado={pedido.estado} />
      </div>

      {/* Detalle desplegable */}
      {expanded && (
        <div className="border-t border-border px-4 sm:px-5 py-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
          {cargandoDetalle ? (
            <div className="text-xs text-gray-500 py-2">Cargando productos...</div>
          ) : detalle ? (
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-gray-400 mb-2">Productos del pedido</p>
              {detalle.items.map(item => (
                <div key={item.productoId} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa' }}>
                      {item.cantidad}
                    </span>
                    <span className="text-white/70 truncate">{item.nombre}</span>
                  </div>
                  <span className="text-white shrink-0 ml-3">
                    ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between text-sm font-semibold text-white">
                <span>Total</span>
                <span>${detalle.total.toLocaleString('es-CO')}</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-500 py-2">No se pudo cargar el detalle.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default function PaginaPedidos(ctx: AppContext) {
  const { role, navigate } = ctx
  const [pedidos, setPedidos] = useState<PedidoResumen[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [detalles, setDetalles] = useState<Record<string, PedidoDetalle>>({})
  const [cargandoDetalle, setCargandoDetalle] = useState<string | null>(null)

  useEffect(() => {
    if (role !== 'CLIENTE') { setCargando(false); return }
    obtenerPedidos()
      .then(data => setPedidos(data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())))
      .catch(() => setError('No se pudieron cargar los pedidos.'))
      .finally(() => setCargando(false))
  }, [role])

  const toggleDetalle = async (id: string) => {
    if (expandido === id) { setExpandido(null); return }
    setExpandido(id)
    if (detalles[id]) return
    setCargandoDetalle(id)
    try {
      const d = await obtenerPedido(id)
      setDetalles(prev => ({ ...prev, [id]: d }))
    } catch { /* se muestra error inline */ }
    finally { setCargandoDetalle(null) }
  }

  if (role !== 'CLIENTE') {
    return (
      <div className="min-h-screen flex flex-col">
        <Encabezado {...ctx} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <h2 className="font-display font-700 text-white text-xl mb-2">Mis pedidos</h2>
            <p className="text-gray-400 text-sm mb-5">Inicia sesión para ver tu historial de pedidos.</p>
            <button onClick={() => navigate('login')}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer">
              Iniciar sesión
            </button>
          </div>
        </div>
        <PieDePagina navigate={navigate} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Encabezado {...ctx} />

      <div className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 12h6M9 16h4" />
                </svg>
              </div>
              <div>
                <h1 className="font-display font-700 text-2xl text-white">Mis pedidos</h1>
                <p className="text-gray-400 text-sm mt-0.5">
                  {cargando ? 'Cargando...' : `${pedidos.length} ${pedidos.length === 1 ? 'pedido' : 'pedidos'}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cargando ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-surface rounded-2xl border border-border h-40 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-gray-400 mb-4">{error}</p>
              <button onClick={() => window.location.reload()}
                className="text-primary text-sm hover:underline cursor-pointer">Reintentar</button>
            </div>
          ) : pedidos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto mb-5">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <h3 className="font-display font-700 text-white text-xl mb-2">Aún no tienes pedidos</h3>
              <p className="text-gray-400 text-sm max-w-sm mb-6">
                Cuando crees un pedido desde el carrito, aparecerá aquí con su estado y tiempo de entrega.
              </p>
              <button onClick={() => navigate('catalog')}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer">
                Explorar catálogo <ChevronRightIcon size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {pedidos.map(pedido => (
                <TarjetaPedido
                  key={pedido.id}
                  pedido={pedido}
                  onExpand={toggleDetalle}
                  expanded={expandido === pedido.id}
                  detalle={detalles[pedido.id] ?? null}
                  cargandoDetalle={cargandoDetalle === pedido.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <PieDePagina navigate={navigate} />
    </div>
  )
}
