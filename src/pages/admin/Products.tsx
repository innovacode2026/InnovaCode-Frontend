import { useState } from 'react'
import { AppContext } from '../../types'
import AdminLayout from '../../components/AdminLayout'
import { products as initialProducts, categories } from '../../data/mockData'
import { SearchIcon, PlusIcon, EditIcon, EyeIcon, TrashIcon, CheckIcon, AlertIcon, XIcon, UploadIcon } from '../../components/Icons'
import { StarIcon } from '../../components/Icons'

export default function AdminProducts(ctx: AppContext) {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [modal, setModal] = useState<'create' | 'edit' | 'view' | 'retire' | null>(null)
  const [selected, setSelected] = useState<typeof products[0] | null>(null)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState<{ name: string; shortDescription: string; price: string; category: string; status: 'active' | 'inactive' }>({ name: '', shortDescription: '', price: '', category: '', status: 'active' })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
    const matchCat = !filterCategory || p.category === filterCategory
    const matchStatus = !filterStatus || p.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  const openCreate = () => {
    setForm({ name: '', shortDescription: '', price: '', category: '', status: 'active' })
    setFormErrors({})
    setModal('create')
  }

  const openEdit = (p: typeof products[0]) => {
    setSelected(p)
    setForm({ name: p.name, shortDescription: p.shortDescription, price: String(p.price), category: p.category, status: p.status })
    setFormErrors({})
    setModal('edit')
  }

  const validateForm = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido.'
    if (!form.shortDescription.trim()) e.shortDescription = 'La descripción es requerida.'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Ingresa un precio válido.'
    if (!form.category) e.category = 'Selecciona una categoría.'
    return e
  }

  const saveProduct = () => {
    const errs = validateForm()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return

    if (modal === 'create') {
      const newProduct = {
        id: `prod-${Date.now()}`,
        name: form.name,
        shortDescription: form.shortDescription,
        description: form.shortDescription,
        price: Number(form.price),
        category: form.category,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format',
        gallery: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format'],
        rating: 0,
        reviewCount: 0,
        features: [],
        status: form.status,
        createdAt: new Date().toISOString().split('T')[0],
        brand: 'InnovaCode',
        sku: `IC-${Date.now()}`,
      }
      setProducts(prev => [newProduct, ...prev])
      showToast('Producto creado exitosamente.')
    } else if (modal === 'edit' && selected) {
      setProducts(prev => prev.map(p =>
        p.id === selected.id
          ? { ...p, name: form.name, shortDescription: form.shortDescription, price: Number(form.price), category: form.category, status: form.status }
          : p
      ))
      showToast('Producto actualizado exitosamente.')
    }
    setModal(null)
    setSelected(null)
  }

  const retireProduct = () => {
    if (!selected) return
    setProducts(prev => prev.map(p => p.id === selected.id ? { ...p, status: 'inactive' } : p))
    showToast(`Producto "${selected.name}" retirado del catálogo.`)
    setModal(null)
    setSelected(null)
  }

  const FormField = ({ label, field, type = 'text', placeholder = '' }: { label: string; field: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={(form as any)[field]}
        onChange={e => { setForm(f => ({ ...f, [field]: e.target.value })); setFormErrors(er => ({ ...er, [field]: '' })) }}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${formErrors[field] ? 'border-danger bg-danger-50' : 'border-border'}`}
      />
      {formErrors[field] && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{formErrors[field]}</p>}
    </div>
  )

  return (
    <AdminLayout {...ctx} title="Gestión de Productos" subtitle="Crea, edita y administra el catálogo">
      <div className="p-5 space-y-4">
        {/* Filters & actions */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <SearchIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
              />
            </div>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-3 py-2 text-sm border border-border rounded-xl focus:outline-none focus:border-primary bg-white text-gray-700 cursor-pointer">
              <option value="">Todas las categorías</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 text-sm border border-border rounded-xl focus:outline-none focus:border-primary bg-white text-gray-700 cursor-pointer">
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Retirados</option>
            </select>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-hover transition-colors cursor-pointer whitespace-nowrap"
            >
              <PlusIcon size={15} />
              Nuevo producto
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">{filtered.length} de {products.length} productos</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Producto</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Categoría</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Calificación</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Precio</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-10 h-8 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-48">{product.name}</div>
                          <div className="text-xs text-gray-400 font-mono">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className="text-xs text-gray-600 capitalize bg-gray-50 px-2 py-0.5 rounded-full border border-border">{product.category}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <StarIcon size={13} filled className="text-amber-400" />
                        <span className="text-sm text-gray-700 font-medium">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-display font-600 text-sm text-gray-800">${product.price.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.status === 'active' ? 'bg-success-50 text-success' : 'bg-gray-100 text-gray-500'}`}>
                        {product.status === 'active' ? 'Activo' : 'Retirado'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setSelected(product); setModal('view') }} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 cursor-pointer transition-colors" title="Ver">
                          <EyeIcon size={14} />
                        </button>
                        <button onClick={() => openEdit(product)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 cursor-pointer transition-colors" title="Editar">
                          <EditIcon size={14} />
                        </button>
                        {product.status === 'active' && (
                          <button onClick={() => { setSelected(product); setModal('retire') }} className="p-1.5 rounded-lg text-gray-400 hover:text-danger hover:bg-danger-50 cursor-pointer transition-colors" title="Retirar">
                            <TrashIcon size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-3xl mb-2">📦</div>
              <p className="text-sm text-gray-500">No se encontraron productos.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit modal */}
      {(modal === 'create' || modal === 'edit') && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-700 text-gray-900 text-lg">
                {modal === 'create' ? 'Crear producto' : 'Editar producto'}
              </h3>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"><XIcon size={16} /></button>
            </div>

            <div className="space-y-4">
              <FormField label="Nombre del producto *" field="name" placeholder="Ej: Monitor UltraWide 34 pulgadas" />
              <FormField label="Descripción corta *" field="shortDescription" placeholder="Descripción breve del producto" />
              <FormField label="Precio (USD) *" field="price" type="number" placeholder="0.00" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoría *</label>
                <select
                  value={form.category}
                  onChange={e => { setForm(f => ({ ...f, category: e.target.value })); setFormErrors(er => ({ ...er, category: '' })) }}
                  className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer ${formErrors.category ? 'border-danger bg-danger-50' : 'border-border'}`}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {formErrors.category && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertIcon size={11} />{formErrors.category}</p>}
              </div>

              {/* Image upload placeholder */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Imagen del producto</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/40 hover:bg-primary-50/30 transition-all cursor-pointer">
                  <UploadIcon size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Arrastra una imagen o <span className="text-primary font-medium">haz clic aquí</span></p>
                  <p className="text-xs text-gray-300 mt-1">PNG, JPG, WEBP — máx. 5MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado</label>
                <div className="flex gap-3">
                  {(['active', 'inactive'] as const).map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={s}
                        checked={form.status === s}
                        onChange={e => setForm(f => ({ ...f, status: e.target.value as 'active' | 'inactive' }))}
                        className="accent-primary cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">{s === 'active' ? 'Activo' : 'Inactivo'}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 cursor-pointer">Cancelar</button>
              <button onClick={saveProduct} className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover cursor-pointer flex items-center justify-center gap-2">
                <CheckIcon size={15} />
                {modal === 'create' ? 'Crear producto' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View modal */}
      {modal === 'view' && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-700 text-gray-900 text-lg">Detalle del producto</h3>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"><XIcon size={16} /></button>
            </div>
            <img src={selected.image} alt={selected.name} className="w-full h-40 object-cover rounded-xl mb-4 bg-gray-50" />
            <h4 className="font-display font-700 text-gray-900 text-base mb-1">{selected.name}</h4>
            <p className="text-sm text-gray-500 mb-3">{selected.shortDescription}</p>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              {[
                ['SKU', selected.sku],
                ['Marca', selected.brand],
                ['Categoría', selected.category],
                ['Precio', `$${selected.price.toLocaleString()}`],
                ['Calificación', `${selected.rating} ★ (${selected.reviewCount} reseñas)`],
                ['Estado', selected.status === 'active' ? 'Activo' : 'Retirado'],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-400">{k}</div>
                  <div className="font-medium text-gray-800 text-xs mt-0.5">{v}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 cursor-pointer">Cerrar</button>
              <button onClick={() => openEdit(selected)} className="flex-1 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-hover cursor-pointer">Editar</button>
            </div>
          </div>
        </div>
      )}

      {/* Retire confirm modal */}
      {modal === 'retire' && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-danger-50 flex items-center justify-center mb-4">
              <AlertIcon size={22} className="text-danger" />
            </div>
            <h3 className="font-display font-700 text-gray-900 text-lg mb-2">Retirar producto</h3>
            <p className="text-sm text-gray-500 mb-1">¿Confirmas que deseas retirar del catálogo:</p>
            <p className="text-sm font-semibold text-gray-800 mb-5">{selected.name}</p>
            <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3 mb-5">
              El producto dejará de ser visible para los usuarios. Podrás reactivarlo posteriormente desde la gestión de productos.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 cursor-pointer">Cancelar</button>
              <button onClick={retireProduct} className="flex-1 py-2.5 bg-danger text-white text-sm font-semibold rounded-xl hover:opacity-90 cursor-pointer">Retirar</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in z-50">
          <CheckIcon size={15} className="text-success" />
          {toast}
        </div>
      )}
    </AdminLayout>
  )
}
