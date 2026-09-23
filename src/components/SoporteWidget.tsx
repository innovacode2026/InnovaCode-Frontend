import { useState, useRef, useEffect } from 'react'
import { AppContext } from '../types'

interface Mensaje {
  de: 'bot' | 'yo'
  texto: string
}

const RESPUESTAS: Array<{ claves: string[]; texto: string }> = [
  {
    claves: ['envio', 'envío', 'llega', 'demora', 'domicilio'],
    texto:
      'Enviamos a todo el país. Gratis en compras superiores a $200.000 y el plazo es de 2 a 5 días hábiles según tu ciudad.',
  },
  {
    claves: ['devol', 'reembolso', 'devolver', 'cambio'],
    texto:
      'Tienes 30 días desde la entrega para devolver un producto en perfecto estado. El reembolso llega a tu medio de pago en máximo 5 días hábiles.',
  },
  {
    claves: ['garantia', 'garantía', 'falla', 'daño', 'roto'],
    texto:
      'Todos los productos tienen 12 meses de garantía oficial por defectos de fabricación. Escríbenos a soporte@evox.com con tu número de pedido.',
  },
  {
    claves: ['pedido', 'orden', 'compra', 'seguimiento', 'rastrear'],
    texto:
      'Puedes ver el estado de tus pedidos en Mis pedidos con tu sesión iniciada. Si tu pedido sigue pendiente, pronto pasará a preparación.',
  },
  {
    claves: ['pago', 'pagar', 'tarjeta', 'pse', 'precio'],
    texto: 'Aceptamos tarjeta, PSE y pago contra entrega en ciudades principales. Los precios incluyen IVA.',
  },
  {
    claves: ['cuenta', 'registro', 'contraseña', 'sesion', 'sesión', 'login'],
    texto:
      'Puedes crear tu cuenta desde Crear cuenta en el pie de página. Si olvidaste tu contraseña, escríbenos a soporte@evox.com.',
  },
  {
    claves: ['hola', 'buenas', 'buenos', 'ayuda', 'necesito'],
    texto:
      '¡Hola! Soy el asistente de EVOX. Pregúntame por envíos, devoluciones, garantías, pedidos o pagos.',
  },
]

const RESPUESTA_DEFECTO =
  'Gracias por tu mensaje. Un asesor te contactará a tu correo registrado. Mientras tanto puedes ver el Centro de ayuda con las preguntas frecuentes.'

const PREGUNTAS_RAPIDAS = ['¿Cuánto tarda el envío?', '¿Cómo devuelvo un producto?', '¿Qué cubre la garantía?']

export default function WidgetSoporte(ctx: AppContext) {
  const { role } = ctx
  const [abierto, setAbierto] = useState(false)
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { de: 'bot', texto: '¡Hola! Soy el asistente de EVOX. ¿En qué te ayudo hoy?' },
  ])
  const [texto, setTexto] = useState('')
  const [escribiendo, setEscribiendo] = useState(false)
  const finRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<AudioContext | null>(null)

  const sonarAviso = () => {
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return
      audioRef.current ??= new Ctx()
      const ctx = audioRef.current
      if (ctx.state === 'suspended') void ctx.resume()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(660, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12)
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
      osc.start()
      osc.stop(ctx.currentTime + 0.26)
    } catch {
      /* sin audio disponible: el chat sigue funcionando */
    }
  }

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, escribiendo, abierto])

  const responder = (pregunta: string) => {
    const q = pregunta.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    const hallada = RESPUESTAS.find(r => r.claves.some(c => q.includes(c)))
    if (hallada) return hallada.texto
    if (role === 'guest') {
      return 'Gracias por tu mensaje. Para darte seguimiento personalizado inicia sesión o crea tu cuenta abajo. También puedes ver el Centro de ayuda.'
    }
    return RESPUESTA_DEFECTO
  }

  const enviar = (contenido?: string) => {
    const pregunta = (contenido ?? texto).trim()
    if (!pregunta || escribiendo) return
    setMensajes(prev => [...prev, { de: 'yo', texto: pregunta }])
    setTexto('')
    setEscribiendo(true)
    setTimeout(() => {
      setMensajes(prev => [...prev, { de: 'bot', texto: responder(pregunta) }])
      setEscribiendo(false)
      sonarAviso()
    }, 700)
  }

  return (
    <>
      <style>{`
        @keyframes evox-burbuja-entrada {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes evox-pulso-anillo {
          0% { box-shadow: 0 12px 32px rgba(139,92,246,0.45), 0 0 0 0 rgba(139,92,246,0.5); }
          70% { box-shadow: 0 12px 32px rgba(139,92,246,0.45), 0 0 0 14px rgba(139,92,246,0); }
          100% { box-shadow: 0 12px 32px rgba(139,92,246,0.45), 0 0 0 0 rgba(139,92,246,0); }
        }
        @keyframes evox-panel-entrada {
          0% { transform: translateY(24px) scale(0.96); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes evox-mensaje-entrada {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      {/* Burbuja flotante */}
      {!abierto && (
        <button
          onClick={() => setAbierto(true)}
          title="Soporte técnico"
          className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', animation: 'evox-burbuja-entrada 0.45s cubic-bezier(0.34,1.56,0.64,1), evox-pulso-anillo 2.4s ease-out 0.6s infinite' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
        </button>
      )}

      {/* Panel de chat */}
      {abierto && (
        <div
          className="fixed bottom-6 right-6 z-[60] w-[330px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl overflow-hidden flex flex-col"
          style={{ boxShadow: '0 24px 64px rgba(11,11,20,0.3)', height: '480px', maxHeight: '70vh', animation: 'evox-panel-entrada 0.28s cubic-bezier(0.34,1.3,0.64,1)' }}
        >
          {/* Encabezado */}
          <div className="px-4 py-3.5 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)' }}>
            <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-800 text-lg flex-shrink-0">
              E
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-white font-semibold text-sm">Soporte EVOX</span>
              <span className="flex items-center gap-1.5 text-white/80 text-xs">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" /> En línea
              </span>
            </span>
            <button onClick={() => setAbierto(false)} className="text-white/80 hover:text-white text-xl leading-none cursor-pointer" title="Cerrar">
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-2.5 bg-[#F6F5FB]">
            {mensajes.map((m, i) => (
              <div key={i} className="flex" style={{ justifyContent: m.de === 'yo' ? 'flex-end' : 'flex-start', animation: 'evox-mensaje-entrada 0.25s ease-out' }}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${
                    m.de === 'yo'
                      ? 'text-white rounded-br-md'
                      : 'bg-white text-gray-700 border border-border rounded-bl-md shadow-sm'
                  }`}
                  style={m.de === 'yo' ? { background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' } : undefined}
                >
                  {m.texto}
                </div>
              </div>
            ))}
            {escribiendo && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-2xl rounded-bl-md shadow-sm px-3.5 py-2.5 flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={finRef} />
          </div>

          {/* Preguntas rápidas */}
          <div className="px-3 pt-2 pb-1 flex gap-1.5 overflow-x-auto bg-[#F6F5FB]">
            {PREGUNTAS_RAPIDAS.map(p => (
              <button
                key={p}
                onClick={() => enviar(p)}
                className="flex-shrink-0 text-[11px] font-medium text-primary border border-primary/30 rounded-full px-2.5 py-1 hover:bg-primary-50 cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Entrada o invitación a entrar */}
          {role === 'guest' ? (
            <div className="p-3 bg-white border-t border-border">
              <p className="text-xs text-gray-500 text-center mb-2">
                Inicia sesión o crea tu cuenta para chatear con soporte.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setAbierto(false)
                    ctx.navigate('login')
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-white rounded-full cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => {
                    setAbierto(false)
                    ctx.navigate('register')
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-primary border border-primary/40 rounded-full hover:bg-primary-50 cursor-pointer"
                >
                  Crear cuenta
                </button>
              </div>
            </div>
          ) : (
          <form
            onSubmit={e => {
              e.preventDefault()
              enviar()
            }}
            className="p-2.5 bg-white border-t border-border flex items-center gap-2"
          >
            <input
              type="text"
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder="Escribe tu duda..."
              className="flex-1 min-w-0 text-sm bg-gray-50 border border-border rounded-full px-3.5 py-2 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)' }}
              title="Enviar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          )}

          <button
            onClick={() => {
              setAbierto(false)
              ctx.navigate('ayuda')
            }}
            className="py-1.5 text-[11px] font-medium text-gray-400 hover:text-primary cursor-pointer"
          >
            Ver Centro de ayuda completo
          </button>
        </div>
      )}
    </>
  )
}
