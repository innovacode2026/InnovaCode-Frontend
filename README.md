# EVOX — E-Commerce Platform

Plataforma de comercio electrónico para productos de tecnología. Frontend conectado a un backend Spring Boot (autenticación, catálogo, carrito y pedidos reales).

> 👉 **¿Eres tester y quieres montar el proyecto en local (backend + frontend)?**
> Sigue la guía paso a paso **`MANUAL_TESTER.md`** en el repositorio del backend
> (**Evox-Backend.innovacode → `docs/`**), incluye comandos para macOS y Windows.

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | UI |
| TypeScript | 5.7 | Tipos |
| Tailwind CSS | v4 | Estilos |
| Vite | 8 | Build / dev server |
| Axios | 1.x | Cliente HTTP |
| lucide-react | 1.x | Iconos |

## Getting Started

```bash
# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar dev server
pnpm dev
```

La app corre en `http://localhost:8443`.

### Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `VITE_API_URL` | Base URL de la API Spring Boot | `http://localhost:8081/api/v1` |

## Scripts

```bash
pnpm dev      # Dev server (puerto 8443)
pnpm build    # Build de producción
pnpm preview  # Previsualizar build de producción
pnpm format   # Formatear código (oxfmt)
```

## Estructura del Proyecto

```
src/
├── api/              ← Capa de acceso a datos (API real + fallback mock)
│   ├── client.ts     ← Cliente axios con interceptor de auth (JWT)
│   ├── authService.ts     ← Login, registro
│   ├── productoService.ts ← CRUD productos
│   ├── categoriaService.ts← Categorías
│   ├── carritoService.ts  ← Carrito de compras
│   ├── pedidoService.ts   ← Creación y consulta de pedidos
│   ├── comentarioService.ts ← Reseñas de productos
│   └── usuarioService.ts  ← Gestión de usuarios (panel admin)
│
├── hooks/            ← React hooks reutilizables
│   └── useAuth.ts    ← Estado de autenticación (sesión + JWT en localStorage)
│
├── data/
│   ├── catalogo.ts   ← Carga catálogo desde la API con fallback a mock
│   └── mockData.ts   ← Data mock de respaldo (productos, categorías)
│
├── components/       ← Componentes reutilizables
│   ├── Icons.tsx     ← Iconos SVG
│   ├── Header.tsx    ← Navbar pública + accesos
│   ├── Footer.tsx    ← Footer
│   ├── AdminLayout.tsx ← Layout del panel admin
│   └── ProductCard.tsx ← Card de producto
│
├── pages/            ← Páginas de la app
│   ├── Landing.tsx
│   ├── Catalog.tsx
│   ├── ProductDetail.tsx
│   ├── Wishlist.tsx
│   ├── Cart.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── AccessDenied.tsx
│   └── admin/
│       ├── Dashboard.tsx
│       ├── Users.tsx
│       └── Products.tsx
│
├── types/
│   └── api.ts        ← Tipos DTO de la API (Producto, Carrito, Pedido, etc.)
├── types.ts          ← Tipos de sesión, páginas y AppContext
├── App.tsx           ← Root component — routing por estado + route guards
├── main.tsx          ← Entry point
└── index.css         ← Theme + fonts + animaciones
```

## Roles

La app soporta 3 roles con route guards:

| Rol | Acceso |
|---|---|
<<<<<<< Updated upstream
| `guest` | Landing, catálogo, login, registro |
| `user` | + lista de deseos, calificaciones, comentarios |
| `admin` | + panel de control, gestión de usuarios y productos |

=======
| `guest` | Landing, catálogo, detalle, login, registro |
| `CLIENTE` | + lista de deseos, carrito, checkout, comentarios |
| `ADMINISTRADOR` | + panel de control, gestión de usuarios y productos |

## Autenticación

- Login y registro contra la API real (`/auth/login`, `/auth/register`).
- El JWT se guarda en `localStorage` y se inyecta como `Authorization: Bearer <token>` en cada request (interceptor en `src/api/client.ts`).
- Si la API responde `401`, el token se limpia y la sesión expira automáticamente.
>>>>>>> Stashed changes

## Integración con Backend

El frontend está conectado a la API Spring Boot. El catálogo (`src/data/catalogo.ts`) intenta cargar productos desde `/productos` y, si el backend no está disponible, cae a los datos mock para que la UI siga navegable.

Configurar `VITE_API_URL` en `.env` apuntando a tu API (ver variable arriba). Todos los servicios viven en `src/api/` y usan el cliente compartido.

## Roadmap

- [ ] React Router para navegación basada en URL (hoy en estado)
- [ ] Gestión de imágenes y videos con Supabase Storage
- [ ] Historial y detalle de pedidos en la cuenta del cliente
- [ ] Reactivar/retirar productos desde la API (hoy local)
- [ ] Estados de pedido (PENDIENTE, PAGADO, ENVIADO, ENTREGADO)

## Licencia

Privado — InnovaCode