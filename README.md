# InnovaCode — E-Commerce Platform

Plataforma de comercio electrónico para productos de tecnología. Frontend scaffold listo para conectar a un backend Spring Boot.

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | UI |
| TypeScript | 5.7 | Tipos |
| Tailwind CSS | v4 | Estilos |
| Vite | 8 | Build / dev server |

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

## Estructura del Proyecto

```
src/
├── services/          ← Capa de acceso a datos (mocks por ahora, listos para swap a API real)
│   ├── api.ts         ← Cliente HTTP base
│   ├── auth.ts        ← Login, registro
│   ├── products.ts    ← CRUD productos
│   ├── categories.ts  ← Categorías
│   ├── users.ts       ← Gestión de usuarios
│   ├── comments.ts    ← Reseñas de productos
│   └── permissions.ts ← Matriz de permisos RBAC
│
├── hooks/             ← React hooks reutilizables
│   ├── useProducts.ts ← Fetch de productos con loading/error
│   └── useAuth.ts     ← Estado de autenticación
│
├── data/
│   └── mockData.ts    ← Data mock (productos, usuarios, permisos, categorías)
│
├── components/        ← Componentes reutilizables
│   ├── Icons.tsx      ← Iconos SVG
│   ├── Header.tsx     ← Navbar pública + selector de rol demo
│   ├── Footer.tsx     ← Footer
│   ├── AdminLayout.tsx← Layout admin/superadmin
│   └── ProductCard.tsx← Card de producto
│
├── pages/             ← Páginas de la app
│   ├── Landing.tsx
│   ├── Catalog.tsx
│   ├── ProductDetail.tsx
│   ├── Wishlist.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── AccessDenied.tsx
│   ├── admin/
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   └── Products.tsx
│   └── superadmin/
│       ├── Dashboard.tsx
│       └── Roles.tsx
│
├── types.ts           ← Tipos compartidos (Role, Page, AppContext)
├── App.tsx            ← Root component — routing por estado
├── main.tsx           ← Entry point
└── index.css          ← Theme + fonts + animaciones
```

## Roles

La app soporta 4 roles con route guards:

| Rol | Acceso |
|---|---|
| `guest` | Landing, catálogo, login, registro |
| `user` | + lista de deseos, calificaciones, comentarios |
| `admin` | + panel de control, gestión de usuarios y productos |
| `superadmin` | + dashboard extendido, gestión de permisos y roles |

## Integración con Backend

Los servicios en `src/services/` actualmente retornan datos mock. Para conectar al backend Spring Boot:

1. Configurar `VITE_API_URL` en `.env` apuntando a tu API
2. Reemplazar las implementaciones mock en cada servicio por llamadas `apiFetch`
3. Ejemplo:

```ts
// Antes (mock)
export async function getProducts(): Promise<Product[]> {
  return mockProducts
}

// Después (API real)
import { apiFetch } from './api'
export async function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>('/products')
}
```

## Roadmap

- [ ] Conexión a backend Spring Boot
- [ ] Autenticación real (Supabase Auth)
- [ ] React Router para navegación basada en URL
- [ ] Carrito de compras y checkout
- [ ] Gestión de imágenes con Supabase Storage

## Licencia

Privado — InnovaCode
