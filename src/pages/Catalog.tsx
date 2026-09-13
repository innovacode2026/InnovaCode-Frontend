import { useState, useMemo } from 'react'
import { AppContext } from '../types'
import { products, categories } from '../data/mockData'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'
import TarjetaProducto from '../components/ProductCard'
import { SearchIcon, FilterIcon, SortIcon, XIcon, ChevronDownIcon } from '../components/Icons'

export default function Catalogo(ctx: AppContext) {
  const { navigate } = ctx
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [loading] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 15000000])

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDescription.toLowerCase().includes(search.toLowerCase()))
    if (selectedCategory) list = list.filter(p => p.category === selectedCategory)
    if (minRating > 0) list = list.filter(p => p.rating >= minRating)
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sortBy) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'rating': return list.sort((a, b) => b.rating - a.rating)
      case 'reviews': return list.sort((a, b) => b.reviewCount - a.reviewCount)
      default: return list.sort((a, b) => a.name.localeCompare(b.name))
    }
  }, [search, selectedCategory, sortBy, minRating, priceRange])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setMinRating(0)
    setPriceRange([0, 15000000])
    setSortBy('name')
  }

  const hasFilters = search || selectedCategory || minRating > 0 || sortBy !== 'name'

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="skeleton aspect-[4/3]" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-1/3 rounded mt-3" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Encabezado {...ctx} />

      <div className="flex-1">
        {/* Page header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h1 className="font-display font-700 text-2xl text-gray-900">Catálogo de productos</h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  {filtered.length} {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none pl-8 pr-8 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:border-primary text-gray-700 cursor-pointer"
                  >
                    <option value="name">Nombre A-Z</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                    <option value="rating">Mejor calificación</option>
                    <option value="reviews">Más reseñas</option>
                  </select>
                  <SortIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <ChevronDownIcon size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg bg-white text-gray-700 hover:border-primary transition-colors cursor-pointer"
                >
                  <FilterIcon size={14} />
                  Filtros
                  {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative mt-4">
              <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar en el catálogo..."
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all placeholder:text-gray-400"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <XIcon size={14} />
                </button>
              )}
            </div>

            {/* Active filters */}
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs text-gray-400">Filtros activos:</span>
                {selectedCategory && (
                  <span className="flex items-center gap-1 text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full border border-primary-100">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('')} className="cursor-pointer"><XIcon size={10} /></button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="flex items-center gap-1 text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100">
                    {minRating}+ estrellas
                    <button onClick={() => setMinRating(0)} className="cursor-pointer"><XIcon size={10} /></button>
                  </span>
                )}
                <button onClick={clearFilters} className="text-xs text-danger hover:underline cursor-pointer ml-1">
                  Limpiar todo
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar filters */}
            <aside className={`lg:block flex-shrink-0 w-56 ${showFilters ? 'block' : 'hidden'}`}>
              <div className="bg-white rounded-2xl border border-border p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-600 text-sm text-gray-900">Filtros</h3>
                  {hasFilters && (
                    <button onClick={clearFilters} className="text-xs text-danger hover:underline cursor-pointer">
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Categoría</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                        !selectedCategory ? 'bg-primary-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>Todas</span>
                      <span className="text-xs text-gray-400">{products.length}</span>
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
                        className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                          selectedCategory === cat.id ? 'bg-primary-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          {cat.name}
                        </span>
                        <span className="text-xs text-gray-400">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating filter */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Calificación mínima</h4>
                  <div className="space-y-1">
                    {[0, 3, 4, 4.5].map(r => (
                      <button
                        key={r}
                        onClick={() => setMinRating(r)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                          minRating === r ? 'bg-primary-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {r === 0 ? 'Todas' : `${r}+ ⭐`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Precio máximo</h4>
                  <input
                    type="range"
                    min={0}
                    max={15000000}
                    step={500000}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$0</span>
                    <span className="font-medium text-gray-700">${priceRange[1].toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products grid */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-display font-600 text-gray-900 text-xl mb-2">Sin resultados</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    No encontramos productos que coincidan con tu búsqueda. Intenta con otros términos o elimina algunos filtros.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map(product => (
                    <TarjetaProducto key={product.id} product={product} ctx={ctx} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PieDePagina navigate={navigate} />
    </div>
  )
}
