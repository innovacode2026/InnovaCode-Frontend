import { useState } from 'react'
import { AppContext } from '../types'
import { products, comments as initialComments } from '../data/mockData'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'
import { HeartIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon, MessageIcon, EditIcon, TrashIcon, CheckIcon } from '../components/Icons'

export default function DetalleProducto(ctx: AppContext) {
  const { selectedProductId, role, wishlist, toggleWishlist, navigate } = ctx
  const product = products.find(p => p.id === selectedProductId) || products[0]
  const isSaved = wishlist.includes(product.id)

  const [activeMedia, setActiveMedia] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0]?.hex ?? null
  )
  const media = [
    ...(product.video ? [{ type: 'video' as const, src: product.video }] : []),
    ...product.gallery.map(src => ({ type: 'image' as const, src })),
  ]
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(initialComments)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const submitComment = () => {
    if (!commentText.trim() || !userRating) return
    const newComment = {
      id: `c${Date.now()}`,
      userId: 'u1',
      userName: 'Tú',
      userInitials: 'TU',
      rating: userRating,
      text: commentText.trim(),
      date: new Date().toISOString().split('T')[0],
      isOwn: true,
    }
    setComments(prev => [...prev, newComment])
    setCommentText('')
    setUserRating(0)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const submitEdit = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, text: editText } : c))
    setEditingId(null)
    setEditText('')
  }

  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id))
    setDeleteConfirm(null)
  }

  const renderStars = (rating: number, interactive = false, size = 18) => {
    const active = interactive ? (hoverRating || userRating) : rating
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        disabled={!interactive}
        onMouseEnter={() => interactive && setHoverRating(i + 1)}
        onMouseLeave={() => interactive && setHoverRating(0)}
        onClick={() => interactive && setUserRating(i + 1)}
        className={`transition-transform ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
      >
        <StarIcon
          size={size}
          filled={i < active}
          className={i < active ? 'text-amber-400' : 'text-gray-200'}
        />
      </button>
    ))
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Encabezado {...ctx} />

      <div className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => navigate('landing')} className="hover:text-primary cursor-pointer transition-colors">Inicio</button>
            <ChevronRightIcon size={14} />
            <button onClick={() => navigate('catalog')} className="hover:text-primary cursor-pointer transition-colors">Catálogo</button>
            <ChevronRightIcon size={14} />
            <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Product info */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Carrusel de medios */}
              <div className="border-r border-border">
                <div className="relative aspect-[6/5] bg-gray-50 overflow-hidden rounded-tl-2xl">
                  {media[activeMedia]?.type === 'video' ? (
                    <video
                      key={media[activeMedia].src}
                      src={media[activeMedia].src}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={media[activeMedia]?.src}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                      style={{ transform: `scale(${activeMedia === 1 ? 1.05 : 1.12})`, transformOrigin: 'center' }}
                    />
                  )}
                  {media.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveMedia(i => Math.max(0, i - 1))}
                        disabled={activeMedia === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors cursor-pointer"
                      >
                        <ChevronLeftIcon size={16} />
                      </button>
                      <button
                        onClick={() => setActiveMedia(i => Math.min(media.length - 1, i + 1))}
                        disabled={activeMedia === media.length - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors cursor-pointer"
                      >
                        <ChevronRightIcon size={16} />
                      </button>
                    </>
                  )}
                </div>

                {/* Miniaturas */}
                {media.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {media.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveMedia(i)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 bg-gray-100 ${
                          activeMedia === i ? 'border-primary' : 'border-border hover:border-gray-300'
                        }`}
                      >
                        {item.type === 'video' ? (
                          <>
                            <video src={item.src} className="w-full h-full object-cover" muted />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                            </div>
                          </>
                        ) : (
                          <img src={item.src} alt="" className="w-full h-full object-cover" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="p-6 lg:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs text-gray-400 font-medium capitalize bg-gray-50 px-2 py-0.5 rounded-full border border-border">
                      {product.category}
                    </span>
                    <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      product.status === 'active' ? 'bg-success-50 text-success' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {product.status === 'active' ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                  {role === 'user' && (
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border cursor-pointer ${
                        isSaved
                          ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
                          : 'bg-white text-gray-500 border-border hover:border-red-200 hover:text-red-400'
                      }`}
                    >
                      <HeartIcon size={15} filled={isSaved} />
                      {isSaved ? 'Guardado' : 'Guardar'}
                    </button>
                  )}
                </div>

                <h1 className="font-display font-700 text-gray-900 text-xl sm:text-2xl leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-500 text-sm mb-4">{product.shortDescription}</p>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating, false, 15)}
                  </div>
                  <span className="font-semibold text-gray-800">{product.rating}</span>
                  <span className="text-gray-400 text-sm">{product.reviewCount} reseñas</span>
                </div>

                {product.colors && (
                  <div className="mb-5">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">
                      Color — <span className="text-gray-700 normal-case tracking-normal font-semibold">
                        {product.colors.find(c => c.hex === selectedColor)?.name}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.colors.map(color => (
                        <button
                          key={color.hex}
                          onClick={() => setSelectedColor(color.hex)}
                          title={color.name}
                          className="rounded-full cursor-pointer transition-all"
                          style={{
                            width: color.hex === '#A9B689' ? '2.75rem' : '2rem',
                            height: color.hex === '#A9B689' ? '2.75rem' : '2rem',
                            background: color.hex,
                            border: selectedColor === color.hex
                              ? '3px solid #2563EB'
                              : '2px solid #E2E8F0',
                            boxShadow: selectedColor === color.hex
                              ? '0 0 0 2px white, 0 0 0 4px #2563EB'
                              : 'none',
                            outline: 'none',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="font-display font-800 text-3xl text-gray-900 mb-5">
                  ${product.price.toLocaleString('es-CO')}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-5 bg-gray-50 rounded-xl p-4">
                  <div>
                    <span className="text-gray-400 text-xs block mb-0.5">Marca</span>
                    <span className="text-gray-800 font-medium">{product.brand}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block mb-0.5">SKU</span>
                    <span className="text-gray-800 font-medium font-mono text-xs">{product.sku}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block mb-0.5">Categoría</span>
                    <span className="text-gray-800 font-medium capitalize">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block mb-0.5">Agregado</span>
                    <span className="text-gray-800 font-medium">{new Date(product.createdAt).toLocaleDateString('es-CO')}</span>
                  </div>
                </div>

                {/* Features quick list */}
                <div className="flex-1">
                  <h3 className="font-display font-600 text-gray-700 text-xs uppercase tracking-wider mb-2">Características principales</h3>
                  <ul className="space-y-1.5">
                    {product.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckIcon size={13} className="text-success flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
            <div className="border-b border-border">
              <div className="flex">
                {([
                  { id: 'description', label: 'Descripción' },
                  { id: 'features', label: 'Especificaciones' },
                  { id: 'reviews', label: `Reseñas (${comments.length})` },
                ] as const).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3.5 text-sm font-medium transition-all border-b-2 cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              )}
              {activeTab === 'features' && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-success-50 flex items-center justify-center flex-shrink-0">
                        <CheckIcon size={12} className="text-success" />
                      </div>
                      <span className="text-sm text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Comments list */}
                  <div className="space-y-4">
                    {comments.map(comment => (
                      <div key={comment.id} className={`p-4 rounded-xl border ${comment.isOwn ? 'bg-primary-50 border-primary-100' : 'bg-gray-50 border-border'}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${comment.isOwn ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                              {comment.userInitials}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-gray-800 flex items-center gap-2">
                                {comment.userName}
                                {comment.isOwn && <span className="text-xs bg-primary-100 text-primary px-1.5 py-0.5 rounded font-medium">Tu reseña</span>}
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <StarIcon key={i} size={11} filled={i < comment.rating} className={i < comment.rating ? 'text-amber-400' : 'text-gray-200'} />
                                ))}
                                <span className="text-xs text-gray-400 ml-1">{new Date(comment.date).toLocaleDateString('es-CO')}</span>
                              </div>
                            </div>
                          </div>
                          {comment.isOwn && role === 'user' && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => { setEditingId(comment.id); setEditText(comment.text) }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors cursor-pointer"
                              >
                                <EditIcon size={13} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(comment.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-danger hover:bg-danger-50 transition-colors cursor-pointer"
                              >
                                <TrashIcon size={13} />
                              </button>
                            </div>
                          )}
                        </div>
                        {editingId === comment.id ? (
                          <div className="mt-3">
                            <textarea
                              value={editText}
                              onChange={e => setEditText(e.target.value)}
                              className="w-full text-sm border border-border rounded-lg p-3 focus:outline-none focus:border-primary resize-none"
                              rows={3}
                            />
                            <div className="flex gap-2 mt-2">
                              <button onClick={() => submitEdit(comment.id)} className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg cursor-pointer hover:bg-primary-hover">Guardar</button>
                              <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg cursor-pointer hover:bg-gray-200">Cancelar</button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{comment.text}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Write comment (user only) */}
                  {role === 'user' && (
                    <div className="border-t border-border pt-5">
                      <h3 className="font-display font-600 text-gray-900 text-sm mb-3 flex items-center gap-2">
                        <MessageIcon size={16} className="text-primary" />
                        Escribe una reseña
                      </h3>
                      {submitted ? (
                        <div className="bg-success-50 text-success border border-success-100 rounded-xl p-4 flex items-center gap-2 text-sm">
                          <CheckIcon size={16} />
                          ¡Tu reseña fue publicada exitosamente!
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-gray-500 font-medium block mb-1.5">Calificación</label>
                            <div className="flex items-center gap-1">
                              {renderStars(userRating, true, 22)}
                              {userRating > 0 && <span className="text-sm text-amber-600 font-medium ml-2">{userRating}/5</span>}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 font-medium block mb-1.5">Tu comentario</label>
                            <textarea
                              value={commentText}
                              onChange={e => setCommentText(e.target.value)}
                              placeholder="Comparte tu experiencia con este producto..."
                              rows={4}
                              className="w-full text-sm border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none placeholder:text-gray-400"
                            />
                          </div>
                          <button
                            onClick={submitComment}
                            disabled={!commentText.trim() || !userRating}
                            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Publicar reseña
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {role === 'guest' && (
                    <div className="border-t border-border pt-5">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-500 mb-3">Inicia sesión para calificar y comentar este producto.</p>
                        <button onClick={() => navigate('login')} className="text-sm text-primary font-medium hover:underline cursor-pointer">
                          Iniciar sesión →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <h2 className="font-display font-700 text-gray-900 text-lg mb-4">Productos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(p => (
                  <div
                    key={p.id}
                    onClick={() => navigate('product', p.id)}
                    className="bg-white rounded-xl border border-border p-3 flex gap-3 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                  >
                    <img src={p.image} alt={p.name} className="w-20 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-50" />
                    <div className="min-w-0">
                      <div className="font-display font-600 text-sm text-gray-800 line-clamp-2 leading-tight">{p.name}</div>
                      <div className="font-display font-700 text-primary text-sm mt-1">${p.price.toLocaleString('es-CO')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in">
            <h3 className="font-display font-700 text-gray-900 text-lg mb-2">¿Eliminar reseña?</h3>
            <p className="text-sm text-gray-500 mb-5">Esta acción no se puede deshacer. Tu reseña será eliminada permanentemente.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">Cancelar</button>
              <button onClick={() => deleteComment(deleteConfirm)} className="flex-1 py-2 bg-danger text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors cursor-pointer">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      <PieDePagina navigate={navigate} />
    </div>
  )
}
