import { useState } from 'react'
import { AppContext } from '../types'
import { products, categories } from '../data/mockData'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { SearchIcon, ChevronRightIcon, TrendUpIcon, PackageIcon, UsersIcon, StarIcon } from '../components/Icons'

export default function Landing(ctx: AppContext) {
  const { navigate } = ctx
  const [searchQuery, setSearchQuery] = useState('')

  const featured = products.filter(p => p.status === 'active').slice(0, 4)
  const recent = products.filter(p => p.status === 'active').slice(4, 8)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('catalog')
  }

  const stats = [
    { label: 'Productos disponibles', value: '165+', icon: PackageIcon, color: 'text-primary' },
    { label: 'Usuarios activos', value: '2.4K+', icon: UsersIcon, color: 'text-success' },
    { label: 'Calificaciones', value: '12K+', icon: StarIcon, color: 'text-amber-500' },
    { label: 'Categorías', value: '6', icon: TrendUpIcon, color: 'text-purple-500' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header {...ctx} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-primary opacity-90" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Plataforma activa · 165 productos disponibles
            </div>
            <h1 className="font-display font-800 text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
              Tecnología que impulsa{' '}
              <span className="text-primary-200">tu proyecto</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-xl">
              Descubre el catálogo completo de productos tecnológicos de InnovaCode. Componentes, periféricos, redes y más — todo en un solo lugar.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar monitores, laptops, redes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-sm bg-white rounded-xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-lg cursor-pointer whitespace-nowrap"
              >
                Buscar
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-white/40 text-xs">Populares:</span>
              {['Monitor UltraWide', 'Laptop Workstation', 'Switch PoE+', 'SSD NVMe'].map(term => (
                <button
                  key={term}
                  onClick={() => navigate('catalog')}
                  className="text-xs text-white/60 hover:text-white bg-white/8 hover:bg-white/15 px-2.5 py-1 rounded-full transition-all cursor-pointer border border-white/10"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating product preview cards */}
        <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 opacity-80">
          <div className="grid grid-cols-2 gap-3 w-72 rotate-3">
            {products.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/20"
                style={{ transform: `translateY(${i % 2 === 1 ? '12px' : '0'})` }}
              >
                <img src={p.image} alt="" className="w-full aspect-video object-cover rounded-lg mb-2 opacity-90" />
                <div className="text-white text-[10px] font-semibold truncate">{p.name.split(' ').slice(0, 3).join(' ')}</div>
                <div className="text-white/50 text-[9px]">${p.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <div className={`font-display font-800 text-xl ${color}`}>{value}</div>
                  <div className="text-xs text-gray-500 leading-tight">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="font-display font-700 text-gray-900 text-2xl">Explora por categoría</h2>
            <p className="text-gray-500 text-sm mt-1">Encuentra lo que necesitas en nuestras 6 categorías</p>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline cursor-pointer"
          >
            Ver catálogo <ChevronRightIcon size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate('catalog')}
              className="group bg-white border border-border rounded-2xl p-4 flex flex-col items-center gap-2.5 hover:border-primary/30 hover:bg-primary-50 hover:shadow-sm transition-all cursor-pointer"
            >
              <span className="text-3xl">{cat.icon}</span>
              <div className="text-center">
                <div className="font-display font-600 text-gray-800 text-sm group-hover:text-primary transition-colors">{cat.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{cat.count} productos</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="font-display font-700 text-gray-900 text-2xl">Productos destacados</h2>
              <p className="text-gray-500 text-sm mt-1">Los más valorados por nuestra comunidad</p>
            </div>
            <button
              onClick={() => navigate('catalog')}
              className="flex items-center gap-1 text-sm text-primary font-medium hover:underline cursor-pointer"
            >
              Ver todos <ChevronRightIcon size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} ctx={ctx} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="font-display font-700 text-gray-900 text-2xl">Agregados recientemente</h2>
            <p className="text-gray-500 text-sm mt-1">Novedades en nuestro catálogo tecnológico</p>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className="flex items-center gap-1 text-sm text-primary font-medium hover:underline cursor-pointer"
          >
            Ver todos <ChevronRightIcon size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recent.map(product => (
            <ProductCard key={product.id} product={product} ctx={ctx} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="font-display font-700 text-navy text-2xl sm:text-3xl mb-3">
            Únete a InnovaCode hoy
          </h2>
          <p className="text-gray-500 text-base mb-7 max-w-md mx-auto">
            Crea tu cuenta gratuita, guarda tus productos favoritos y califica los que ya usas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('register')}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
            >
              Crear cuenta gratuita
            </button>
            <button
              onClick={() => navigate('catalog')}
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-border hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Explorar catálogo
            </button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}
