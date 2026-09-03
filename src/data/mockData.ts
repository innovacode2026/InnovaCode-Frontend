export interface Product {
  id: string
  name: string
  shortDescription: string
  description: string
  price: number
  category: string
  image: string
  gallery: string[]
  rating: number
  reviewCount: number
  features: string[]
  status: 'active' | 'inactive'
  createdAt: string
  brand: string
  sku: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userInitials: string
  rating: number
  text: string
  date: string
  isOwn: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin' | 'superadmin'
  status: 'active' | 'inactive'
  joinDate: string
  lastLogin: string
}

export interface Permission {
  id: string
  name: string
  description: string
  module: string
  userAccess: boolean
  adminAccess: boolean
  superAdminAccess: boolean
}

export const categories = [
  { id: 'electronics', name: 'Electrónica', icon: '🖥️', count: 48 },
  { id: 'software', name: 'Software', icon: '⚙️', count: 32 },
  { id: 'peripherals', name: 'Periféricos', icon: '🖱️', count: 27 },
  { id: 'networking', name: 'Redes', icon: '🌐', count: 19 },
  { id: 'storage', name: 'Almacenamiento', icon: '💾', count: 24 },
  { id: 'accessories', name: 'Accesorios', icon: '🔧', count: 15 },
]

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Monitor UltraWide 34" ProSeries',
    shortDescription: 'Monitor curvo ultrawide para máxima productividad profesional',
    description: 'El Monitor UltraWide ProSeries de 34 pulgadas redefine la experiencia de trabajo multitarea. Con resolución UWQHD de 3440×1440 píxeles, este monitor ofrece una claridad excepcional para diseño gráfico, desarrollo de software y análisis de datos. Su panel IPS garantiza colores precisos con ángulos de visión de 178°. La compatibilidad con HDR600 y la frecuencia de actualización de 144Hz lo hacen ideal tanto para trabajo profesional como para uso intensivo.',
    price: 1299.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a573d15e5c?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a573d15e5c?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1593640408182-31c228b59ec7?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.8,
    reviewCount: 124,
    features: ['Resolución UWQHD 3440×1440', 'Panel IPS 178°', 'HDR600', 'Frecuencia 144Hz', 'FreeSync Premium Pro', 'USB-C 90W Power Delivery', 'Altura y pivote ajustable'],
    status: 'active',
    createdAt: '2025-01-15',
    brand: 'ProView',
    sku: 'PV-UW34-2025',
  },
  {
    id: 'prod-2',
    name: 'Laptop Workstation ProBook X15',
    shortDescription: 'Portátil de alto rendimiento para ingeniería y desarrollo',
    description: 'La ProBook X15 es una estación de trabajo portátil diseñada para profesionales exigentes. Con procesador Intel Core Ultra 9 de 24 núcleos, 64GB de RAM DDR5 y GPU NVIDIA RTX 4080, es capaz de manejar cargas de trabajo intensivas como compilación de código, virtualización y modelado 3D. La pantalla OLED de 4K con 120Hz garantiza una experiencia visual sin igual.',
    price: 3499.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.9,
    reviewCount: 89,
    features: ['Intel Core Ultra 9 185H (24 núcleos)', '64GB DDR5 7200MHz', 'NVIDIA RTX 4080 12GB', 'SSD NVMe PCIe 5.0 2TB', 'Display 4K OLED 120Hz', 'Batería 99Wh', 'Thunderbolt 4 × 3'],
    status: 'active',
    createdAt: '2025-01-20',
    brand: 'TechForce',
    sku: 'TF-PBX15-U9',
  },
  {
    id: 'prod-3',
    name: 'Teclado Mecánico MX-Pro 87',
    shortDescription: 'Teclado TKL con switches Cherry MX Red e iluminación RGB',
    description: 'El MX-Pro 87 es un teclado mecánico tenkeyless con switches Cherry MX Red para una respuesta ultrarrápida y suave. Construido con carcasa de aluminio aeronáutico y keycaps PBT doubleshot resistentes a la decoloración. Ideal para programadores y power users que no aceptan compromisos en precisión y durabilidad.',
    price: 189.99,
    category: 'peripherals',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.7,
    reviewCount: 256,
    features: ['Switches Cherry MX Red', 'Iluminación RGB per-key', 'Cable USB-C desmontable', 'Keycaps PBT doubleshot', 'N-Key Rollover completo', 'Anti-ghosting total', 'Carcasa aluminio CNC'],
    status: 'active',
    createdAt: '2025-02-01',
    brand: 'KeyCraft',
    sku: 'KC-MXP87-RED',
  },
  {
    id: 'prod-4',
    name: 'Hub USB-C 12 en 1 ProConnect',
    shortDescription: 'Hub de conectividad total para laptops modernas',
    description: 'El ProConnect Hub 12-en-1 convierte un único puerto USB-C en un centro de conectividad completo. Con soporte para doble monitor 4K, carga rápida PD 100W y Ethernet Gigabit, es el compañero perfecto para la oficina o viajes. Compatible con macOS, Windows y Linux sin drivers adicionales.',
    price: 79.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.5,
    reviewCount: 312,
    features: ['2× HDMI 4K@60Hz', '3× USB-A 3.2 Gen2', '2× USB-C Data', 'SD + microSD UHS-II', 'Ethernet Gigabit RJ45', 'PD 100W passthrough', 'Jack audio 3.5mm combo'],
    status: 'active',
    createdAt: '2025-02-10',
    brand: 'ProConnect',
    sku: 'PC-HUB12-C',
  },
  {
    id: 'prod-5',
    name: 'NAS Server DataVault 8-Bay',
    shortDescription: 'Servidor NAS de 8 bahías para almacenamiento empresarial',
    description: 'El DataVault 8-Bay es un servidor NAS empresarial de alto rendimiento para PYMEs y equipos de desarrollo. Soporta configuraciones RAID 0/1/5/6/10 y viene con licencias de software de backup, virtualización y colaboración incluidas. Dual LAN 2.5GbE para máximo rendimiento.',
    price: 899.99,
    category: 'storage',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.6,
    reviewCount: 47,
    features: ['8 bahías 3.5"/2.5"', 'Intel Celeron J6413 Quad-Core', '8GB RAM ECC', 'RAID 0/1/5/6/10', 'Dual LAN 2.5GbE', '4× USB 3.2 Gen1', 'PCIe 3.0 slot expansión'],
    status: 'active',
    createdAt: '2025-02-15',
    brand: 'DataVault',
    sku: 'DV-NAS8BAY-E',
  },
  {
    id: 'prod-6',
    name: 'Router WiFi 7 AXE9600 TriBand',
    shortDescription: 'Router de alto rendimiento con WiFi 7 para oficinas',
    description: 'El AXE9600 ofrece conectividad WiFi 7 con velocidades combinadas de hasta 9600 Mbps. Con cobertura de hasta 400m² y soporte para 200+ dispositivos simultáneos gracias a Multi-Link Operation y OFDMA mejorado. Gestión centralizada vía app y soporte para VPN integrado.',
    price: 449.99,
    category: 'networking',
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.4,
    reviewCount: 78,
    features: ['WiFi 7 (802.11be)', 'TriBand 2.4/5/6 GHz', 'Hasta 9600 Mbps', '8× antenas externas', 'WAN 10 Gigabit SFP+', '4× LAN Gigabit', 'AI QoS adaptativo'],
    status: 'active',
    createdAt: '2025-03-01',
    brand: 'NetCore',
    sku: 'NC-AXE9600-TRI',
  },
  {
    id: 'prod-7',
    name: 'Webcam 4K ProStream PTZ',
    shortDescription: 'Cámara web profesional 4K con motorización PTZ',
    description: 'La ProStream PTZ es la cámara ideal para videoconferencias profesionales, streaming y educación remota. Con sensor Sony de 1/2.5", grabación 4K@30fps y sistema de autoencuadre por inteligencia artificial, siempre estarás perfectamente encuadrado sin importar tus movimientos.',
    price: 349.99,
    category: 'peripherals',
    image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.6,
    reviewCount: 93,
    features: ['Resolución 4K@30fps / 1080p@60fps', 'Sensor Sony 1/2.5"', 'PTZ motorizado 340°', 'Autoencuadre IA', 'Micrófono dual con ANC', 'Compatible Zoom/Teams/Meet', 'USB-C + HDMI salida'],
    status: 'active',
    createdAt: '2025-03-10',
    brand: 'StreamPro',
    sku: 'SP-WC4K-PTZ',
  },
  {
    id: 'prod-8',
    name: 'SSD Externo 4TB UltraSpeed NVMe',
    shortDescription: 'Almacenamiento portátil NVMe con 2000 MB/s de velocidad',
    description: 'El UltraSpeed SSD externo ofrece velocidades de lectura de hasta 2000 MB/s con interfaz USB 3.2 Gen 2×2. Perfecto para edición de video en campo y backup ultrarrápido. Diseño compacto, resistente a golpes IP55 y con cifrado AES-256 por hardware.',
    price: 219.99,
    category: 'storage',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.7,
    reviewCount: 187,
    features: ['4TB capacidad NVMe', 'PCIe 4.0 x4 interno', '2000 MB/s lectura', '1900 MB/s escritura', 'USB 3.2 Gen 2×2 (20Gbps)', 'Resistencia IP55', 'Cifrado AES-256 hardware'],
    status: 'active',
    createdAt: '2025-03-15',
    brand: 'SpeedDrive',
    sku: 'SD-EXT4TB-NVMe',
  },
  {
    id: 'prod-9',
    name: 'Auriculares ANC ProStudio X',
    shortDescription: 'Auriculares profesionales con cancelación activa de ruido',
    description: 'Los ProStudio X combinan calidad de audio de estudio con tecnología ANC avanzada de 5 micrófonos. Con drivers de 40mm y DAC ESS Sabre integrado, ofrecen una respuesta de frecuencia plana de 10Hz a 40kHz ideal para mixing, mastering y trabajo creativo profesional.',
    price: 299.99,
    category: 'peripherals',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.8,
    reviewCount: 342,
    features: ['ANC híbrido 5 micrófonos', 'Drivers 40mm custom', 'DAC ESS Sabre 32-bit', '30h batería (ANC activado)', 'Bluetooth 5.3 + aptX Lossless', 'Cable estudio incluido', 'Plegable para viaje'],
    status: 'active',
    createdAt: '2025-03-20',
    brand: 'SoundForge',
    sku: 'SF-ANCX-PRO',
  },
  {
    id: 'prod-10',
    name: 'Switch PoE+ Administrable 24 puertos',
    shortDescription: 'Switch empresarial con 24 puertos PoE+ y 4 uplinks SFP+',
    description: 'El Switch PoE+ Administrable de 24 puertos es la solución ideal para instalaciones empresariales con cámaras IP, teléfonos VoIP y puntos de acceso WiFi 6. Budget PoE de 400W total con priorización inteligente. Gestión via web, CLI y SNMP v3.',
    price: 679.99,
    category: 'networking',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.5,
    reviewCount: 36,
    features: ['24× PoE+ (802.3at) 30W/puerto', '4× SFP+ 10Gbps uplink', 'Budget PoE total 400W', 'VLAN, QoS, LACP, MSTP', 'Capacidad switching 128Gbps', 'IPv6 completo', 'SNMP v1/v2c/v3, RMON'],
    status: 'active',
    createdAt: '2025-04-01',
    brand: 'NetCore',
    sku: 'NC-SW24POE-ADM',
  },
  {
    id: 'prod-11',
    name: 'GPU RTX 5080 ProEdition 16GB',
    shortDescription: 'Tarjeta gráfica Blackwell para IA y renderizado profesional',
    description: 'La RTX 5080 ProEdition con arquitectura Blackwell ofrece 10,752 CUDA cores y 16GB GDDR7 en bus de 256 bits. Perfecta para desarrollo con IA, renderizado 3D en tiempo real y simulaciones científicas. DLSS 4 con Multi Frame Generation para rendimiento sin precedentes.',
    price: 2199.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.9,
    reviewCount: 64,
    features: ['10,752 CUDA Cores Blackwell', '16GB GDDR7 256-bit', 'DLSS 4 + Multi Frame Gen', 'Ray Tracing 4ª generación', 'PCIe 5.0 x16', 'TDP 320W', 'NVLink soporte dual-GPU'],
    status: 'active',
    createdAt: '2025-04-10',
    brand: 'NVIDIA',
    sku: 'NV-RTX5080-PE',
  },
  {
    id: 'prod-12',
    name: 'Kit RAM DDR5 64GB 7200MHz',
    shortDescription: 'Memoria de alto rendimiento para workstations de última generación',
    description: 'El kit DDR5 de 64GB (2×32GB) a 7200MHz con timing CL34 es ideal para workstations de edición de video, compilación masiva y virtualización intensiva. Compatible con plataformas Intel Core Ultra y AMD Ryzen 9000. Incluye perfil XMP 3.0 y EXPO para overclocking con un clic.',
    price: 389.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1592664474505-51c549a745f8?w=600&h=400&fit=crop&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1592664474505-51c549a745f8?w=600&h=400&fit=crop&auto=format',
    ],
    rating: 4.7,
    reviewCount: 128,
    features: ['64GB (2×32GB) DDR5', 'Velocidad 7200MHz CL34', 'Perfil XMP 3.0 + EXPO', 'RGB addressable sincronizable', 'Heat spreader aluminio brushed', 'Intel & AMD compatible', 'Garantía de por vida'],
    status: 'inactive',
    createdAt: '2025-04-15',
    brand: 'SpeedMem',
    sku: 'SM-DDR5-64-7200',
  },
]

export const comments: Comment[] = [
  {
    id: 'c1',
    userId: 'u2',
    userName: 'Carlos Rodríguez',
    userInitials: 'CR',
    rating: 5,
    text: 'Excelente monitor. La calidad de imagen es impresionante y la configuración fue muy sencilla. Llevo 3 meses usándolo para diseño gráfico y no lo cambiaría por nada.',
    date: '2025-06-10',
    isOwn: false,
  },
  {
    id: 'c2',
    userId: 'u3',
    userName: 'María López',
    userInitials: 'ML',
    rating: 4,
    text: 'Muy buena relación calidad-precio. Los colores son muy precisos y el soporte es sólido. Lo único que mejoraría es el software de calibración que viene incluido.',
    date: '2025-06-15',
    isOwn: false,
  },
  {
    id: 'c3',
    userId: 'u1',
    userName: 'Tú',
    userInitials: 'TU',
    rating: 5,
    text: 'Increíble para desarrollo. El formato ultrawide cambia completamente el flujo de trabajo: tengo el IDE en un lado y la documentación en el otro sin perder resolución.',
    date: '2025-07-01',
    isOwn: true,
  },
]

export const users: User[] = [
  { id: 'u1', name: 'Ana García', email: 'ana.garcia@email.com', role: 'user', status: 'active', joinDate: '2024-08-15', lastLogin: '2025-07-20' },
  { id: 'u2', name: 'Carlos Rodríguez', email: 'carlos.rodriguez@email.com', role: 'user', status: 'active', joinDate: '2024-09-03', lastLogin: '2025-07-19' },
  { id: 'u3', name: 'María López', email: 'maria.lopez@email.com', role: 'user', status: 'active', joinDate: '2024-10-22', lastLogin: '2025-07-18' },
  { id: 'u4', name: 'Diego Fernández', email: 'diego.fernandez@email.com', role: 'user', status: 'inactive', joinDate: '2024-11-08', lastLogin: '2025-05-30' },
  { id: 'u5', name: 'Valentina Torres', email: 'v.torres@email.com', role: 'user', status: 'active', joinDate: '2025-01-14', lastLogin: '2025-07-21' },
  { id: 'u6', name: 'Sebastián Mora', email: 's.mora@email.com', role: 'user', status: 'active', joinDate: '2025-02-28', lastLogin: '2025-07-17' },
  { id: 'u7', name: 'Juan Pérez', email: 'juan.perez@innovacode.com', role: 'admin', status: 'active', joinDate: '2024-01-10', lastLogin: '2025-07-21' },
  { id: 'u8', name: 'Lucía Ramírez', email: 'lucia.ramirez@innovacode.com', role: 'admin', status: 'active', joinDate: '2024-03-01', lastLogin: '2025-07-20' },
  { id: 'u9', name: 'Sofía Chen', email: 'sofia.chen@innovacode.com', role: 'superadmin', status: 'active', joinDate: '2023-11-01', lastLogin: '2025-07-21' },
]

export const permissions: Permission[] = [
  { id: 'p1', name: 'Registrarse', description: 'Crear una cuenta nueva en la plataforma', module: 'Autenticación', userAccess: true, adminAccess: true, superAdminAccess: true },
  { id: 'p2', name: 'Iniciar sesión', description: 'Autenticarse en el sistema', module: 'Autenticación', userAccess: true, adminAccess: true, superAdminAccess: true },
  { id: 'p3', name: 'Ver catálogo', description: 'Consultar productos disponibles', module: 'Productos', userAccess: true, adminAccess: true, superAdminAccess: true },
  { id: 'p4', name: 'Buscar productos', description: 'Filtrar y ordenar el catálogo', module: 'Productos', userAccess: true, adminAccess: true, superAdminAccess: true },
  { id: 'p5', name: 'Ver detalle de producto', description: 'Acceder a la información completa', module: 'Productos', userAccess: true, adminAccess: true, superAdminAccess: true },
  { id: 'p6', name: 'Lista de deseos', description: 'Guardar y gestionar productos favoritos', module: 'Usuario', userAccess: true, adminAccess: false, superAdminAccess: false },
  { id: 'p7', name: 'Calificar productos', description: 'Dar puntuación a un producto', module: 'Usuario', userAccess: true, adminAccess: false, superAdminAccess: false },
  { id: 'p8', name: 'Publicar comentarios', description: 'Escribir reseñas sobre productos', module: 'Usuario', userAccess: true, adminAccess: false, superAdminAccess: false },
  { id: 'p9', name: 'Editar/eliminar propios comentarios', description: 'Gestionar comentarios propios', module: 'Usuario', userAccess: true, adminAccess: false, superAdminAccess: false },
  { id: 'p10', name: 'Ver usuarios', description: 'Consultar lista de usuarios registrados', module: 'Administración', userAccess: false, adminAccess: true, superAdminAccess: true },
  { id: 'p11', name: 'Administrar usuarios', description: 'Activar, desactivar y modificar usuarios', module: 'Administración', userAccess: false, adminAccess: true, superAdminAccess: true },
  { id: 'p12', name: 'Crear productos', description: 'Añadir nuevos productos al catálogo', module: 'Administración', userAccess: false, adminAccess: true, superAdminAccess: true },
  { id: 'p13', name: 'Actualizar productos', description: 'Modificar información de productos', module: 'Administración', userAccess: false, adminAccess: true, superAdminAccess: true },
  { id: 'p14', name: 'Retirar productos', description: 'Retirar productos del catálogo activo', module: 'Administración', userAccess: false, adminAccess: true, superAdminAccess: true },
  { id: 'p15', name: 'Gestionar roles', description: 'Asignar y modificar roles de usuario', module: 'Super Administración', userAccess: false, adminAccess: false, superAdminAccess: true },
  { id: 'p16', name: 'Gestionar permisos', description: 'Configurar permisos del sistema', module: 'Super Administración', userAccess: false, adminAccess: false, superAdminAccess: true },
  { id: 'p17', name: 'Configuración del sistema', description: 'Parámetros globales de la plataforma', module: 'Super Administración', userAccess: false, adminAccess: false, superAdminAccess: true },
]
