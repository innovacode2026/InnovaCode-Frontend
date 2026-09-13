import { useState, useRef } from 'react'
import { Product } from '../data/mockData'
import { AppContext } from '../types'
import { HeartIcon, StarIcon } from './Icons'

interface TarjetaProductoProps {
  product: Product
  ctx: AppContext
}

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

export default function TarjetaProducto({ product, ctx }: TarjetaProductoProps) {
  const { role, wishlist, toggleWishlist, navigate } = ctx
  const isSaved = wishlist.includes(product.id)
  const [popped, setPopped] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate('product', product.id)
  }

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)', transition: 'box-shadow 0.22s ease, transform 0.22s ease' }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,92,246,0.15)'
        e.currentTarget.style.transform = 'translateY(-4px)'
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
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = product.videoStartTime ?? 0 }
      }}
      onClick={() => navigate('product', product.id)}
    >
      {/* Imagen / Video */}
      <div className="relative bg-gray-50 aspect-4/3">
        {product.video ? (
          <video
            ref={videoRef}
            src={product.video}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
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

        {/* Heart */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 transition-all cursor-pointer ${popped ? 'heart-pop' : ''} ${isSaved ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
        >
          <HeartIcon size={18} filled={isSaved} />
        </button>
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
          <button
            onClick={handleCart}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 cursor-pointer transition-opacity hover:opacity-90"
            style={{ background: '#2563EB' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1D4ED8')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2563EB')}
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
