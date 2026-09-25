import { useEffect } from 'react'
import { AppContext } from '../types'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'

const SECCIONES = [
  {
    id: 'soporte',
    titulo: 'Soporte técnico',
    texto:
      '¿Tu producto presenta una falla? Escríbenos a soporte@evox.com o usa el chat de ayuda. Atendemos de lunes a sábado de 8:00 a. m. a 6:00 p. m. Ten a la mano el número de tu pedido para agilizar la atención.',
  },
  {
    id: 'envios',
    titulo: 'Envíos y devoluciones',
    texto:
      'Enviamos a todo el país. El envío es gratis en compras superiores a $200.000. Tienes 30 días calendario desde la entrega para devolver un producto en perfecto estado y con sus accesorios; el reembolso se realiza al medio de pago original en un máximo de 5 días hábiles.',
  },
  {
    id: 'garantias',
    titulo: 'Garantías',
    texto:
      'Todos los productos tienen garantía oficial de 12 meses por defectos de fabricación. La garantía no cubre daños por mal uso, golpes o humedad. Para reclamarla presenta tu factura o número de pedido.',
  },
  {
    id: 'faq',
    titulo: 'Preguntas frecuentes',
    texto:
      '¿Cómo creo una cuenta? Desde Crear cuenta en el pie de página. ¿Cómo sigo mi pedido? En Mis pedidos con tu sesión iniciada. ¿Puedo cambiar la cantidad en el carrito? Sí, con los botones + y − antes de crear el pedido. ¿Qué métodos de pago aceptan? Tarjeta, PSE y pago contra entrega en ciudades principales.',
  },
  {
    id: 'terminos',
    titulo: 'Términos de uso',
    texto:
      'Al usar EVOX aceptas comprar solo productos disponibles, brindar datos veraces y no hacer uso fraudulento de la plataforma. Los precios incluyen IVA y pueden cambiar sin previo aviso. Este es un prototipo académico de InnovaCode.',
  },
  {
    id: 'privacidad',
    titulo: 'Política de privacidad',
    texto:
      'Tus datos (nombre, correo y pedidos) se usan solo para operar tu cuenta y tus compras. No los compartimos con terceros con fines publicitarios. Puedes pedir la eliminación de tu cuenta escribiendo a privacidad@evox.com.',
  },
]

export default function PaginaAyuda(ctx: AppContext) {
  const { helpSection } = ctx

  useEffect(() => {
    if (helpSection) {
      document.getElementById(`ayuda-${helpSection}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [helpSection])

  return (
    <div className="min-h-screen flex flex-col">
      <Encabezado {...ctx} />
      <div className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display font-700 text-3xl text-white">Centro de ayuda</h1>
          <p className="text-gray-400 text-sm mt-1 mb-8">
            Soporte, envíos, garantías y políticas de EVOX.
          </p>
          <div className="space-y-4">
            {SECCIONES.map(s => (
              <section
                key={s.id}
                id={`ayuda-${s.id}`}
                className="bg-surface border border-border rounded-2xl p-6 scroll-mt-24"
              >
                <h2 className="font-display font-700 text-lg text-white mb-2">{s.titulo}</h2>
                <p className="text-sm text-gray-400 leading-relaxed">{s.texto}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <PieDePagina navigate={ctx.navigate} />
    </div>
  )
}
