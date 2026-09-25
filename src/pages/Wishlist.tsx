import { AppContext } from '../types'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'
import { HeartIcon, ChevronRightIcon, TrashIcon, StarIcon } from '../components/Icons'

export default function ListaDeseos(ctx: AppContext) {
  const { role, wishlist, toggleWishlist, navigate, products } = ctx
  const savedProducts = products.filter(p => wishlist.includes(p.id))

  if (role !== 'CLIENTE') {
    return (
      <div className="min-h-screen flex flex-col">
        <Encabezado {...ctx} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <HeartIcon size={28} className="text-primary" />
            </div>
            <h2 className="font-display font-700 text-white text-xl mb-2">Lista de deseos</h2>
            <p className="text-gray-400 text-sm mb-5">Inicia sesión para guardar tus productos favoritos.</p>
            <button onClick={() => navigate('login')} className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer">
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
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <HeartIcon size={20} filled className="text-red-400" />
              </div>
              <div>
                <h1 className="font-display font-700 text-2xl text-white">Lista de deseos</h1>
                <p className="text-gray-400 text-sm mt-0.5">
                  {savedProducts.length} {savedProducts.length === 1 ? 'producto guardado' : 'productos guardados'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {savedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-red-500/20 flex items-center justify-center mx-auto mb-5">
                <HeartIcon size={36} className="text-red-400/50" />
              </div>
              <h3 className="font-display font-700 text-white text-xl mb-2">Tu lista está vacía</h3>
              <p className="text-gray-400 text-sm max-w-sm mb-6">
                Guarda productos que te interesen para encontrarlos fácilmente más adelante.
              </p>
              <button
                onClick={() => navigate('catalog')}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Explorar catálogo <ChevronRightIcon size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-surface rounded-2xl border border-border p-4 flex gap-4 hover:border-primary/30 transition-all"
                >
                  <div
                    onClick={() => navigate('product', product.id)}
                    className="w-24 h-20 sm:w-32 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-white/5 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <button
                          onClick={() => navigate('product', product.id)}
                          className="font-display font-600 text-white text-sm sm:text-base leading-tight line-clamp-2 text-left hover:text-primary transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{product.shortDescription}</p>
                      </div>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="flex-shrink-0 p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Quitar de la lista"
                      >
                        <TrashIcon size={15} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon key={i} size={11} filled={i < Math.floor(product.rating)} className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-white/20'} />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-white/20">|</span>
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${product.status === 'active' ? 'bg-success/10 text-success' : 'bg-white/10 text-gray-400'}`}>
                        {product.status === 'active' ? 'Disponible' : 'No disponible'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-display font-700 text-lg text-white">
                        ${product.price.toLocaleString('es-CO')}
                      </span>
                      <button
                        onClick={() => navigate('product', product.id)}
                        className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline cursor-pointer"
                      >
                        Ver producto <ChevronRightIcon size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PieDePagina navigate={navigate} />
    </div>
  )
}
