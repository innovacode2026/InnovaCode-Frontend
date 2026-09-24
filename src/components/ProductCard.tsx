import { useState, useRef } from 'react'
import { ProductoVista, esSellable } from '../data/catalogo'
import { AppContext } from '../types'
import { getMensajeError } from '../api/client'
import { HeartIcon, StarIcon, CartIcon, CheckIcon } from './Icons'

interface TarjetaProductoProps {
  product: ProductoVista
  ctx: AppContext
}

export default function TarjetaProducto({ product, ctx }: TarjetaProductoProps) {
  const { role, wishlist, toggleWishlist, navigate, addToCart } = ctx
  const isSaved = wishlist.includes(product.id)
  const sellable = product.stock > 0 && product.status === 'active'
  const [popped, setPopped] = useState(false)
  const [added, setAdded] = useState(false)
  const [cartMsg, setCartMsg] = useState('')
  const [videoError, setVideoError] = useState(false)
  const [corazonVisible, setCorazonVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const corazonTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showDiscount = product.status === 'active' && product.rating >= 4.7
  const discountPct = showDiscount ? (product.rating >= 4.9 ? 15 : 10) : 0
  const originalPrice = showDiscount ? Math.round(product.price / (1 - discountPct / 100)) : 0

  const badge = showDiscount
    ? discountPct >= 15
      ? { label: `-${discountPct}%`, bg: '#4F46E5', text: '#fff' }
      : { label: 'En oferta', bg: '#2563EB', text: '#fff' }
    : product.rating >= 4.8
      ? { label: 'Más vendido', bg: '#2563EB', text: '#fff' }
      : { label: 'Nuevo', bg: '#2563EB', text: '#fff' }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (role === 'guest') { navigate('login'); return }
    toggleWishlist(product.id)
    setPopped(true)
    setTimeout(() => setPopped(false), 400)
  }

  const handleCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (role === 'guest') { navigate('login'); return }
    if (!sellable) return
    setCartMsg('')
    try {
      await addToCart(product.id, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } catch (err) {
      setCartMsg(getMensajeError(err))
      setTimeout(() => setCartMsg(''), 2500)
    }
  }

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        willChange: 'transform',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 24px 48px rgba(139,92,246,0.22), 0 8px 20px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-8px)'
        if (corazonTimerRef.current) clearTimeout(corazonTimerRef.current)
        corazonTimerRef.current = setTimeout(() => setCorazonVisible(true), 5000)
        if (videoRef.current) {
          videoRef.current.currentTime = product.videoStartTime ?? 0
          videoRef.current.play()
          videoTimerRef.current = setTimeout(() => {
            if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = product.videoStartTime ?? 0 }
          }, (product.videoDuration ?? 30) * 1000)
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)'
        e.currentTarget.style.transform = 'translateY(0)'
        if (videoTimerRef.current) clearTimeout(videoTimerRef.current)
        if (corazonTimerRef.current) clearTimeout(corazonTimerRef.current)
        setCorazonVisible(false)
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = product.videoStartTime ?? 0 }
      }}
      onClick={() => navigate('product', product.id)}
    >
      {/* Imagen / Video */}
      <div className="relative bg-gray-50 aspect-4/3">
        {product.video && !videoError ? (
          <video
            ref={videoRef}
            src={product.video}
            poster={product.image}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
          />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={e => {
              const img = e.currentTarget
              if (!img.src.includes('photo-1496181133206')) {
                img.src =
                  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format'
              }
            }}
          />
        )}
        {product.status === 'inactive' && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">No disponible</span>
          </div>
        )}

        {/* Badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: badge.bg, color: badge.text }}
        >
          {badge.label}
        </span>

        {/* Corazón grande al centro tras 5s sobre el producto */}
        {corazonVisible && (
          <button
            onClick={handleWishlist}
            title={isSaved ? 'Quitar de deseos' : 'Guardar en deseos'}
            className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/95 shadow-xl flex items-center justify-center transition-all cursor-pointer ${popped ? 'heart-pop' : ''} ${isSaved ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
            style={{ animation: 'evox-corazon-entrada 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}
          >
            <style>{`@keyframes evox-corazon-entrada { 0% { transform: scale(0.4); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`}</style>
            <HeartIcon size={32} filled={isSaved} />
          </button>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-display font-700 text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Estrellas */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              size={13}
              filled={i < Math.floor(product.rating)}
              className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Precio + carrito */}
        <div className="flex items-end justify-between gap-2">
          <div>
            {showDiscount && (
              <p className="text-xs text-gray-400 line-through leading-none mb-0.5">
                $ {originalPrice.toLocaleString('es-CO')}
              </p>
            )}
            <p className="font-display font-800 text-xl leading-none" style={{ color: '#2563EB' }}>
              $ {product.price.toLocaleString('es-CO')}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={handleCart}
              title={!sellable ? 'Sin inventario disponible' : 'Agregar al carrito'}
              disabled={!sellable}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#2563EB' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1D4ED8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#2563EB')}
            >
              {added ? <CheckIcon size={18} /> : <CartIcon size={18} />}
            </button>
            {cartMsg && (
              <span className="text-[10px] text-danger font-medium text-right max-w-[9rem] leading-tight">
                {cartMsg}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
