# Arquitectura del Frontend EVOX

Documento de referencia para entender cómo está construido y cómo funciona el frontend de la
plataforma de venta de productos electrónicos.

- **Stack:** React 19 · TypeScript 5.7 · Tailwind CSS v4 · Vite 8 · Axios 1.x · lucide-react
- **Package manager:** pnpm · **Puerto del dev server:** 8443
- **Conectado a:** backend Spring Boot en `http://localhost:8081/api/v1`

---

## 1. Estructura del proyecto

```
src/
├── api/       → Capa de acceso a datos (cliente axios + servicios por módulo)
├── hooks/     → useAuth.ts (sesión + JWT en localStorage)
├── data/      → Carga del catálogo con fallback a datos mock + mockData.ts
├── components/→ Componentes reutilizables (Header, Footer, ProductCard, AdminLayout, Icons)
├── pages/     → Páginas de la app (públicas + admin/)
├── types/     → types/api.ts (DTOs del contrato del backend) y types.ts (dominio + AppContext)
├── App.tsx    → Root component: navegación por estado, estado global y route guards
├── main.tsx   → Entry point
└── index.css  → Tema (Tailwind v4), fuentes y animaciones
```

El flujo de datos de una operación es siempre:

```
Página → Service (src/api) → Axios client (token JWT) → Backend
   ↑                                                        ↓
   └── estado global (App.tsx) ←────── respuesta (+ DTO tipado)
```

---

## 2. Navegación y estado global (`src/App.tsx`)

**No se usa React Router.** Toda la navegación es un `switch` de páginas por estado local:

- `page: Page` — la página actual (unión de 13 literales: `landing`, `catalog`, `product`,
  `wishlist`, `cart`, `orders`, `login`, `register`, `admin-dashboard`, `admin-users`,
  `admin-products`, `admin-product-form`, `access-denied`).
- `selectedProductId: string | null` — producto en vista de detalle.
- `navigate(newPage, productId?)` — cambia la página, opcionalmente fija el detalle y hace
  `scrollTo(0, 0)`. Se expone a todas las páginas vía el `AppContext`.

**Estado global** (todo vive en `App` y se reparte a las páginas como única prop `ctx`):
- `wishlist: string[]` — lista de deseos **en memoria** (no persiste).
- `products: ProductoVista[]` — catálogo cargado una sola vez al montar con `cargarCatalogo()`.
- `carrito: Carrito` — items y total, refrescado contra la API **solo si `role === 'CLIENTE'`**.
- Callbacks del carrito: `addToCart`, `removeFromCart`, `updateCartQty`, `crearPedido`
  (llaman al servicio y luego `refrescarCarrito()`).
- `handleLogin` / `handleLogout` — login refresca el carrito; logout limpia carrito + sesión.

**Route guard de admin:** si la página es `admin*` y el rol no es `ADMINISTRADOR`, se renderiza
`AccesoDenegado` en lugar de la página. Hay guards locales adicionales en `Cart` y `Wishlist`
(exigen `CLIENTE`).

> A pesar del nombre, `AppContext` es una **interfaz TypeScript** (el contrato de props que
> recibe cada página), no un `React.Context` — no hay `<Context.Provider>`.

---

## 3. Autenticación (`src/hooks/useAuth.ts`)

- **Persistencia en localStorage** con dos claves:
  - `evox_token` — el JWT (definida en `client.ts`).
  - `evox_usuario` — la sesión `UserSession { id, nombre, correo, rol }` en JSON.
- **Restauración de sesión:** al montar lee `evox_usuario` y valida que tenga `id` y `rol`;
  si está corrupto, se queda como `guest`.
- **`login(correo, password)`**: llama a `POST /auth/login`, construye la sesión desde
  `res.usuario`, la persiste y actualiza el estado.
- **`register(...)`**: llama a `POST /auth/register` y **no auto-loguea** (redirige a Login).
- **`logout()`**: elimina ambas claves y limpia la sesión.
- **Cierre de sesión automático:** escucha el evento de ventana `'evox:logout'`, que dispara
  el interceptor de axios ante un **401**. Así, token vencido = sesión expirada.
- **`role`**: `user?.rol ?? 'guest'` (el tipo `Role` añade el rol anónimo `'guest'`).

> El rol no se consulta a un endpoint `/me`: viene embebido en la respuesta de login y se
> persiste en `evox_usuario`. Cada request posterior lleva el Bearer token y el backend valida.

---

## 4. Cliente HTTP (`src/api/client.ts`)

- **baseURL:** `import.meta.env.VITE_API_URL ?? 'http://localhost:8081/api/v1'` (`.env`).
- **timeout:** 15 s · header por defecto `Content-Type: application/json`.
- **Interceptor de request:** lee `evox_token` de localStorage y, si existe, inyecta
  `Authorization: Bearer <token>` en cada petición.
- **Interceptor de respuesta:** ante un `401` elimina el token y despacha `new Event('evox:logout')`
  (que `useAuth` escucha para limpiar la sesión). Siempre rechaza la promesa.
- **Utilidades:**
  - `getMensajeError(err)` → extrae `err.response.data.mensaje` (formato `ApiError { codigo, mensaje }`),
    cae al `err.message` y por último a `"Error desconocido"`. Es la usada por todas las páginas
    para mostrar errores.
  - `isAxiosError(err)` → type-guard.

---

## 5. Servicios API (`src/api/*.ts`)

Todos usan el cliente compartido, anotan los DTOs como genéricos y **sin fallback interno**
(ese fallback vive solo en `data/catalogo.ts`). La gestión de errores la hacen las páginas.

| Archivo | Funciones | Endpoint |
|---|---|---|
| `authService.ts` | `registrar`, `iniciarSesion` | `POST /auth/register`, `POST /auth/login` |
| `productoService.ts` | `obtenerProductos` (filtros `categoria/buscar/pagina/limite`), `obtenerProducto`, `crearProducto`, `actualizarProducto`, `eliminarProducto` | `GET /productos`, `GET /productos/{id}`, `POST/PUT/DELETE /productos` (admin) |
| `categoriaService.ts` | `obtenerCategorias` | `GET /categorias` |
| `carritoService.ts` | `obtenerCarrito`, `agregarItem`, `actualizarItem`, `eliminarItem` | `GET /carrito`, `POST /carrito/items`, `PUT/DELETE /carrito/items/{productoId}` |
| `pedidoService.ts` | `crearPedido` (convierte el carrito en pedido y lo vacía), `obtenerPedidos`, `obtenerPedido` | `POST /pedidos`, `GET /pedidos`, `GET /pedidos/{id}` |
| `comentarioService.ts` | `crearComentario` (token), `obtenerComentarios` (público) | `POST` / `GET /productos/{productoId}/comentarios` |
| `usuarioService.ts` | `obtenerUsuarios` | `GET /perfiles` (panel admin) |

---

## 6. Catálogo con fallback a mock (`src/data/catalogo.ts`, `mockData.ts`)

- **`cargarCatalogo()`**: intenta `obtenerProductos({ limite: 100 })`; si la API responde,
  mapea a `ProductoVista`; si **falla o devuelve lista vacía, cae a los datos mock** de
  `mockData.ts` (asignando `stock: 10`). Así la UI siempre es navegable sin backend.
- **`cargarProducto(id)`**: si el id es un UUID válido intenta `GET /productos/{id}`; si falla
  o no es UUID, busca en el mock.
- **`desdeApi(...)`**: "enriquece" el producto de la API con riqueza visual del mock
  (descripciones, reseñas, colores, videos, features, marca, SKU), y normaliza la categoría.

> **Implicación:** el catálogo real del backend se "maquilla" con datos de respaldo cuando
> existe, y el mock sirve como catálogo completo cuando el backend no está disponible.

**`mockData.ts`**: 26+ productos hardcodeados con campos ricos (`Product`), 6 categorías con
ícono, paths de video locales en `/public`.

---

## 7. Tipos TypeScript (`src/types.ts`, `src/types/api.ts`)

- **`types.ts`** — dominio de la app:
  - `Role = 'guest' | 'CLIENTE' | 'ADMINISTRADOR'`.
  - `UserSession`, `UsuarioRegistrado`, `Page` (13 páginas), `Cart`/`CartItem`.
  - `AppContext` — contrato completo del contexto: estado (`role`, `page`, `selectedProductId`,
    `wishlist`, `products`, `carrito`, `cartCount`, `userName`, `user`) y acciones (`login`,
    `register`, `logout`, `navigate`, `toggleWishlist`, `addToCart`, `removeFromCart`,
    `updateCartQty`, `crearPedido`, `refrescarCarrito`).
- **`types/api.ts`** — DTOs del contrato del backend (espejos de `docs/CONTRATO_API.md`):
  enums `EstadoPedido` y `Rol`, `ApiError`, `MensajeResponse`, `Login/RegisterRequest` +
  respuestas, `Producto`/`ProductoInput`/`ProductoQueryParams`/`PaginaProductos`,
  `Carrito` + requests/responses, `Pedido` (resumen, detalle, creación), `Comentario`,
  `UsuarioAdmin`, `Categoria`.

---

## 8. Componentes (`src/components/`)

| Componente | Función |
|---|---|
| `Icons.tsx` | Factory `icon(path)` de iconos SVG propios (búsqueda, wishlist, carrito, admin, etc.); complementa a `lucide-react`. |
| `Header.tsx` (`Encabezado`) | Navbar sticky. Navegación, búsqueda (navega a `catalog`), badge de sesión por rol, íconos condicionados por rol (carrito/wishlist), menú desplegable con "Panel de control" solo para ADMIN y "Cerrar sesión". |
| `Footer.tsx` | Footer de 4 columnas con navegación por `navigate`. |
| `ProductCard.tsx` | Card de producto: **reproduce video en hover**, botón de carrito deshabilitado si no es vendible (`esSellable`), descuentos "fake" según rating, toggle de wishlist (guest → login), navega al detalle. |
| `AdminLayout.tsx` | Layout del panel admin: sidebar navy con logo, usuario y navegación agrupada (Dashboard / Gestión: Usuarios, Productos); responsive con overlay móvil. |

---

## 9. Páginas (`src/pages/`)

**Públicas:**
- **`Landing.tsx`** — Hero, ticker de marcas (marquee), stats "fake", grid de categorías,
  **Productos destacados** (primeros 4) y **Recién llegados** (siguientes 4), CTA de registro.
- **`Catalog.tsx`** — Catálogo con **filtros y ordenación 100% client-side** sobre `products`
  del contexto: búsqueda, categoría, rating mínimo, rango de precio, orden; chips de filtros
  y estado vacío. No consulta la API por página.
- **`ProductDetail.tsx`** — Detalle: carga el producto (desde contexto o `cargarProducto`),
  **comentarios** reales de la API, galería video/imagen con miniaturas, selector de color y
  cantidad (tope = stock), agregar al carrito (solo CLIENTE y sellable), tabs
  Descripción/Especificaciones/Reseñas con **formulario de reseña** (puntuación 1–5 +
  texto), relacionados de la misma categoría.
- **`Wishlist.tsx`** — Guard de CLIENTE. Lista `products` filtrados por la `wishlist` en
  memoria; quitar/ver/navegar; empty state al catálogo.
- **`Cart.tsx`** — Guard de CLIENTE. Items con cambio de cantidad y quitar; resumen (envío
  "Gratis", total); **checkout** → `crearPedido()` sin nota, muestra id del pedido truncado.
- **`Login.tsx`** — Formulario con validación client-side; tras logueo redirige **por rol**
  (ADMIN → `admin-dashboard`, si no → `landing`).
- **`Register.tsx`** — Doble panel con validación (email con `@`, password ≥ 8, confirmación,
  términos) y medidor de fortaleza; tras éxito redirige a Login.
- **`AccessDenied.tsx`** — Pantalla 403 con rol requerido y acciones según el rol actual.

**Admin (envueltas en `AdminLayout`, protegidas por el guard de `App`):**
- **`admin/Dashboard.tsx`** — Stats (productos activos del **mock**, usuarios de `/perfiles`,
  reseñas "—", categorías del mock), acciones rápidas, listas de productos recientes (mock) y
  usuarios recientes (API), estado del sistema hardcodeado.
- **`admin/Users.tsx`** — Lista de usuarios real (`GET /perfiles`) con filtros y tabla;
  modal de detalle (sin edición/eliminación).
- **`admin/Products.tsx`** — CRUD **híbrido**: el listado y el estado vienen del **mock
  local**. **Crear** persiste en la API (`POST /productos`) e inserta el producto localmente;
  **editar y retirar son locales** (no llaman PUT/DELETE). Categorías desde la API con fallback
  silencioso.

> **Patrón a recordar:** el módulo admin de productos mezcla API real (creación, categorías)
> con datos y acciones locales (listado, edición, retirada). Coincide con el roadmap del README.

---

## 10. Configuración y tema

- **`vite.config.ts`** — Plugins React + Tailwind v4 (`@tailwindcss/vite`, sin
  `tailwind.config`, configuración CSS-first). Alias `@` → `./src`. Dev/preview en
  `0.0.0.0:8443` (`strictPort`). **Sin proxy** (el frontend llama directo a `VITE_API_URL`;
  el CORS lo resuelve el backend).
- **`.env`** — `VITE_API_URL` (default `http://localhost:8081/api/v1`).
- **`index.css`** — Tema Tailwind v4 con `@theme`: paleta `primary` (violeta), `accent` (cyan),
  `navy`, `success/warning/danger`, `surface/background/border`; fuentes **Outfit** (display) e
  **Inter** (body); animaciones custom (`fadeIn`, `slideIn`, `skeleton`, `heartPop`, `float`,
  `glow`, `marqueeScroll`).
- **`tsconfig.json`** — `strict: true`, `target ES2020`, `moduleResolution: bundler`, alias `@/*`,
  `jsx: react-jsx`, `noEmit` (compila Vite).

**Scripts:** `pnpm dev` · `pnpm build` · `pnpm preview` · `pnpm format` (oxfmt).

---

## 11. Decisiones de diseño a recordar

1. **Navegación por estado, sin router** — `App.tsx` hace un `switch(page)`; el roadmap
   contempla migrar a React Router.
2. **"AppContext" por props** — no se usa React Context ni store; `App` construye el objeto
   y se pasa como única prop a cada página.
3. **Doble modelo de producto** — `Producto` (API) vs `Product` (mock enriquecido), unificados
   en `ProductoVista` por `catalogo.ts`.
4. **Fallback a mock** — catálogo y detalle toleran la ausencia del backend; el resto de
   servicios fallan mostrando el mensaje al usuario.
5. **Sesión por localStorage** — JWT y datos de sesión persistidos; cualquier `401` global
   limpia el token y expira la sesión automáticamente (evento `evox:logout`).
6. **Roles** — `guest`, `CLIENTE`, `ADMINISTRADOR` con guards centrales (admin en `App`) y
   locales (carrito/wishlist exigen CLIENTE).
7. **Admin de productos híbrido** — crear persiste en API; editar/retirar son locales; el
   listado viene del mock y no de la API.
8. **UI siempre navegable** — la integración al backend es "best effort": cuando la API cae,
   la vista se sostiene con datos mock.

---

## 12. Próximos pasos (pendientes, según README)
- React Router para navegación por URL.
- Gestión de imágenes y videos con Supabase Storage.
- Historial y detalle de pedidos en la cuenta del cliente.
- Reactivar/retirar productos desde la API (hoy local).
- Estados de pedido (PENDIENTE, PAGADO, ENVIADO, ENTREGADO).