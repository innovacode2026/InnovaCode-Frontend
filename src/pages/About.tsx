import { AppContext } from '../types'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'
import { ShieldIcon, StarIcon, UsersIcon, PackageIcon, ChevronRightIcon } from '../components/Icons'

const diferenciadores = [
  {
    icon: ShieldIcon,
    title: 'Compra segura',
    desc: 'Protegemos tus datos y ofrecemos procesos de compra confiables en todo momento.',
    color: 'text-violet-400',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
  },
  {
    icon: PackageIcon,
    title: 'Envíos a todo el país',
    desc: 'Recibe tus productos de forma rápida y segura sin importar dónde estés.',
    color: 'text-cyan-400',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    icon: StarIcon,
    title: 'Productos seleccionados',
    desc: 'Tecnología de marcas reconocidas, elegida pensando en calidad, funcionalidad y diseño.',
    color: 'text-amber-400',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    icon: UsersIcon,
    title: 'Soporte especializado',
    desc: 'Te ayudamos a elegir el producto adecuado y resolvemos tus dudas en cada paso.',
    color: 'text-emerald-400',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
]

export default function QuienesSomos(ctx: AppContext) {
  const { navigate } = ctx

  return (
    <div className="min-h-screen flex flex-col">
      <Encabezado {...ctx} />

      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ background: '#050816', minHeight: '52vh' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute pointer-events-none" style={{ top: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 65%)', filter: 'blur(50px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', color: '#8B5CF6' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            QUIÉNES SOMOS
          </div>
          <h1 className="font-display font-700 text-white leading-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Tecnología que{' '}
            <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              impulsa tu mundo
            </span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            En <span className="text-white/80 font-semibold">EVOX</span> conectamos personas con productos tecnológicos pensados para su día a día — fácil, seguro y accesible.
          </p>
          <button
            onClick={() => navigate('catalog')}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl text-white cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', boxShadow: '0 0 28px rgba(139,92,246,0.35)' }}
          >
            Ver catálogo <ChevronRightIcon size={16} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(6,182,212,0.3), transparent)' }} />
      </section>

      {/* Quiénes somos */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Nuestra historia</span>
              <h2 className="font-display font-700 text-gray-900 text-3xl sm:text-4xl leading-tight mb-6">
                Una tienda creada para acercarte a la tecnología
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                <strong className="text-gray-800">EVOX</strong> es una tienda especializada en tecnología y electrónica, creada para acercarte a los productos que forman parte de tu día a día. Nuestro catálogo reúne celulares, laptops, audífonos, smartwatches y accesorios, seleccionados pensando en calidad, funcionalidad y diseño.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Nos enfocamos en ofrecer una experiencia de compra sencilla, atención cercana y productos con garantía, para que puedas adquirir tecnología con total confianza y sin complicaciones.
              </p>
              <div className="flex flex-wrap gap-6">
                {[{ val: '165+', label: 'Productos' }, { val: '2.4K+', label: 'Clientes' }, { val: '6', label: 'Categorías' }].map(s => (
                  <div key={s.val}>
                    <div className="font-display font-800 text-2xl text-primary">{s.val}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden p-8" style={{ background: 'linear-gradient(135deg, #0B0B14 0%, #1a0533 100%)' }}>
                <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.2) 0%, transparent 60%)' }} />
                <div className="relative space-y-4">
                  {['Celulares & Smartphones', 'Laptops & Computadores', 'Audífonos & Audio', 'Smartwatches', 'Consolas & Gaming', 'Accesorios Tech'].map((cat, i) => (
                    <div key={cat} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.15)', animationDelay: `${i * 0.1}s` }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: i % 2 === 0 ? '#8B5CF6' : '#06B6D4' }} />
                      <span className="text-white/70 text-sm font-medium">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lo que nos diferencia */}
      <section className="py-20" style={{ background: '#F8F7FF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Por qué elegirnos</span>
            <h2 className="font-display font-700 text-gray-900 text-3xl sm:text-4xl">Lo que nos diferencia</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {diferenciadores.map(({ icon: Icon, title, desc, color, bg, border }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: bg, border: `1px solid ${border}` }}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-display font-700 text-gray-900 text-base mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #0B0B14 0%, #1a0533 100%)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-5" style={{ background: 'rgba(139,92,246,0.15)', color: '#C4B5FD', border: '1px solid rgba(139,92,246,0.3)' }}>
                MISIÓN
              </div>
              <h3 className="font-display font-700 text-white text-2xl mb-4 leading-tight">
                Hacer que la tecnología sea{' '}
                <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  más accesible
                </span>
              </h3>
              <p className="text-white/50 leading-relaxed">
                Ofrecer productos tecnológicos de calidad junto con una experiencia de compra sencilla, transparente y confiable, para que cada persona pueda acceder a la tecnología que necesita.
              </p>
            </div>

            {/* Visión */}
            <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #050816 0%, #0c1a2e 100%)', border: '1px solid rgba(6,182,212,0.2)' }}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-5" style={{ background: 'rgba(6,182,212,0.12)', color: '#67E8F9', border: '1px solid rgba(6,182,212,0.3)' }}>
                VISIÓN
              </div>
              <h3 className="font-display font-700 text-white text-2xl mb-4 leading-tight">
                Ser la tienda tecnológica{' '}
                <span style={{ background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  referente del país
                </span>
              </h3>
              <p className="text-white/50 leading-relaxed">
                Convertirnos en la plataforma de tecnología preferida en Colombia, reconocida por variedad, innovación, servicio al cliente y la confianza que brindamos a cada usuario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="font-display font-700 text-gray-900 text-2xl sm:text-3xl mb-3">
            ¿Listo para explorar{' '}
            <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              EVOX
            </span>
            ?
          </h2>
          <p className="text-gray-500 text-base mb-7 max-w-md mx-auto">
            Descubre nuestro catálogo completo y encuentra la tecnología que necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('catalog')}
              className="px-6 py-3 text-white font-semibold rounded-xl cursor-pointer shadow-sm"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
            >
              Ver catálogo
            </button>
            <button
              onClick={() => navigate('register')}
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-border hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Crear cuenta gratis
            </button>
          </div>
        </div>
      </section>

      <PieDePagina navigate={navigate} />
    </div>
  )
}
