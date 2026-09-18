import { useState } from 'react'
import { AppContext } from '../types'
import { getMensajeError } from '../api/client'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'
import { CartIcon, ChevronRightIcon, TrashIcon, MinusIcon, PlusIcon, CheckIcon } from '../components/Icons'

export default function PaginaCarrito(ctx: AppContext) {
  const { role, carrito, products, navigate, updateCartQty, removeFromCart, crearPedido } = ctx
  const [busy, setBusy] = useState<string | null>(null)
  const [creando, setCreando] = useState(false)
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)

  if (role !== 'CLIENTE') {
    return (
      <div className="min-h-screen flex flex-col">
        <Encabezado {...ctx} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
              <CartIcon size={28} className="text-primary" />
            </div>
            <h2 className="font-display font-700 text-gray-900 text-xl mb-2">Tu carrito</h2>
            <p className="text-gray-500 text-sm mb-5">Inicia sesión para ver y gestionar tu carrito de compras.</p>
            <button onClick={() => navigate('login')} className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer">
              Iniciar sesión
            </button>
          </div>
        </div>
        <PieDePagina navigate={navigate} />
      </div>
    )
  }

  const imagenDe = (productoId: string) => products.find(p => p.id === productoId)?.image
  const stockDe = (productoId: string) => products.find(p => p.id === productoId)?.stock ?? 99

  const cambiarCantidad = async (productoId: string, cantidad: number) => {
    if (cantidad < 1) return
    setBusy(productoId)
    setMensaje(null)
    try {
      await updateCartQty(productoId, cantidad)
    } catch (err) {
      setMensaje({ tipo: 'error', texto: getMensajeError(err) })
    } finally {
      setBusy(null)
    }
  }

  const quitar = async (productoId: string) => {
    setBusy(productoId)
    setMensaje(null)
    try {
      await removeFromCart(productoId)
    } catch (err) {
      setMensaje({ tipo: 'error', texto: getMensajeError(err) })
    } finally {
      setBusy(null)
    }
  }

  const hacerPedido = async () => {
    setCreando(true)
    setMensaje(null)
    try {
      const res = await crearPedido()
      setMensaje({
        tipo: 'ok',
        texto: `¡Pedido ${res.id.slice(0, 8).toUpperCase()} creado con éxito!`,
      })
    } catch (err) {
      setMensaje({ tipo: 'error', texto: getMensajeError(err) })
    } finally {
      setCreando(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Encabezado {...ctx} />

      <div className="flex-1 bg-background">
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <CartIcon size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="font-display font-700 text-2xl text-gray-900">Carrito de compras</h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  {carrito.items.length === 0
                    ? 'Tu carrito está vacío'
                    : `${carrito.items.reduce((n, i) => n + i.cantidad, 0)} ${carrito.items.reduce((n, i) => n + i.cantidad, 0) === 1 ? 'artículo' : 'artículos'}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {mensaje && (
            <div className={`mb-5 rounded-xl p-4 flex items-center gap-2 text-sm border ${mensaje.tipo === 'ok' ? 'bg-success-50 text-success border-success-100' : 'bg-danger-50 text-danger border-danger-100'}`}>
              <CheckIcon size={16} />
              {mensaje.texto}
            </div>
          )}

          {carrito.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
                <CartIcon size={36} className="text-primary/50" />
              </div>
              <h3 className="font-display font-700 text-gray-900 text-xl mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-500 text-sm max-w-sm mb-6">
                Agrega productos al carrito y estarán listos para crear tu pedido.
              </p>
              <button
                onClick={() => navigate('catalog')}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Explorar catálogo <ChevronRightIcon size={16} />
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Items */}
              <div className="lg:col-span-2 space-y-3">
                {carrito.items.map(item => (
                  <div key={item.productoId} className="bg-white rounded-2xl border border-border p-4 flex gap-4">
                    <div
                      onClick={() => navigate('product', item.productoId)}
                      className="w-24 h-20 sm:w-28 sm:h-22 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={imagenDe(item.productoId)}
                        alt={item.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <button
                          onClick={() => navigate('product', item.productoId)}
                          className="font-display font-600 text-gray-900 text-sm leading-tight line-clamp-2 text-left hover:text-primary transition-colors cursor-pointer"
                        >
                          {item.nombre}
                        </button>
                        <button
                          onClick={() => quitar(item.productoId)}
                          disabled={busy === item.productoId}
                          className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-danger hover:bg-danger-50 transition-colors disabled:opacity-40 cursor-pointer"
                          title="Eliminar del carrito"
                        >
                          <TrashIcon size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-xl">
                          <button
                            onClick={() => cambiarCantidad(item.productoId, item.cantidad - 1)}
                            disabled={busy === item.productoId || item.cantidad <= 1}
                            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
                          >
                            <MinusIcon size={13} />
                          </button>
                          <span className="w-9 text-center font-semibold text-gray-800 text-sm">{item.cantidad}</span>
                          <button
                            onClick={() => cambiarCantidad(item.productoId, item.cantidad + 1)}
                            disabled={busy === item.productoId || item.cantidad >= stockDe(item.productoId)}
                            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
                          >
                            <PlusIcon size={13} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-gray-400">Subtotal</div>
                          <div className="font-display font-700 text-gray-900">
                            ${item.subtotal.toLocaleString('es-CO')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen */}
              <div>
                <div className="bg-white rounded-2xl border border-border p-5 sticky top-20">
                  <h3 className="font-display font-700 text-gray-900 text-lg mb-4">Resumen del pedido</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-gray-500">
                      <span>Artículos</span>
                      <span>{carrito.items.reduce((n, i) => n + i.cantidad, 0)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Envío</span>
                      <span className="text-success font-medium">Gratis</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-display font-700 text-gray-900 text-base">
                      <span>Total</span>
                      <span>${carrito.total.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                  <button
                    onClick={hacerPedido}
                    disabled={creando || carrito.items.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold transition-all cursor-pointer disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                  >
                    {creando ? 'Creando pedido...' : 'Crear pedido'}
                  </button>
                  {carrito.total >= 200000 && (
                    <p className="text-xs text-success mt-3 text-center">¡Envío gratis por compras superiores a $200.000!</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <PieDePagina navigate={navigate} />
    </div>
  )
}