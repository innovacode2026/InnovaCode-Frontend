import { useState } from 'react'
import { Product } from '../data/mockData'
import { AppContext } from '../types'
import { HeartIcon, StarIcon } from './Icons'

interface ProductCardProps {
  product: Product
  ctx: AppContext
}

export default function ProductCard({ product, ctx }: ProductCardProps) {
  const { role, wishlist, toggleWishlist, navigate } = ctx
  const isSaved = wishlist.includes(product.id)
  const [popped, setPopped] = useState(false)

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (role === 'guest') { navigate('login'); return }
    toggleWishlist(product.id)
    setPopped(true)
    setTimeout(() => setPopped(false), 400)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        size={12}
        filled={i < Math.floor(rating)}
        className={i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}
      />
    ))
  }

  return (
    <div
      className="group bg-white rounded-2xl border border-border overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all duration-200"
      onClick={() => navigate('product', product.id)}
    >
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.status === 'inactive' && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">Retirado</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-xs font-medium px-2 py-1 rounded-full capitalize border border-border/50">
            {product.category}
          </span>
        </div>
        {role === 'user' && (
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isSaved
                ? 'bg-red-50 text-red-500 shadow-sm'
                : 'bg-white/80 backdrop-blur-sm text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50'
            } ${popped ? 'heart-pop' : ''}`}
          >
            <HeartIcon size={15} filled={isSaved} />
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-600 text-gray-900 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-1 mb-3">{product.shortDescription}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500 font-medium ml-0.5">{product.rating}</span>
            <span className="text-xs text-gray-300">·</span>
            <span className="text-xs text-gray-400">{product.reviewCount}</span>
          </div>
          <span className="font-display font-700 text-gray-900 text-sm">
            ${product.price.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  )
}
