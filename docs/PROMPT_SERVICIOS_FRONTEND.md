# Prompt: generar los servicios del frontend (React + TypeScript)

Copia y pega este bloque completo como prompt (para un asistente de IA o para un dev que
trabaje con los services del frontend). Está pensado para **React + TypeScript + axios**,
pero los contratos JSON son el punto de referencia sin importar el framework.

---

```
Vas a generar la capa de servicios y tipos para el frontend React + TypeScript de una
tienda electrónica. La base URL de la API es http://localhost:8080/api/v1 y todos los ids
son UUID (string).

REQUISITOS:
1. Tipos TypeScript en src/types/api.ts que reflejen EXACTAMENTE los JSON de abajo.
2. Cliente axios en src/api/client.ts:
   - baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'
   - timeout, y un interceptador de request que agrega el header
     Authorization: Bearer <token> desde localStorage ('evox_token') si existe.
   - interceptador de respuesta que en 401 limpia el token y dispara un evento
     'evox:logout' (el componente raíz escucha para redirigir a /login).
3. Función getMensajeError(err) que extrae el mensaje backend: axios sabe que el error
   viene en { codigo: number, mensaje: string }.
4. Un archivo de servicio por módulo, todos con firmas tipadas y async:
   - src/api/authService.ts
   - src/api/productoService.ts
   - src/api/carritoService.ts
   - src/api/pedidoService.ts
   - src/api/comentarioService.ts
5. No implementes rutas ni componentes: SOLO servicios + tipos.

CONTRATO JSON DE LA API (fuente de verdad):

POST /auth/register  (público)
  req:  { nombre: string, apellido: string, correo: string, password: string }
  res 201: { id: string, nombreCompleto: string, correo: string, rol: 'CLIENTE' | 'ADMINISTRADOR' }
  error 409 si el correo ya existe.

POST /auth/login  (público)
  req:  { correo: string, password: string }
  res 200: { token: string, usuario: { id: string, nombre: string, rol: 'CLIENTE' | 'ADMINISTRADOR' } }
  error 401 credenciales incorrectas.

GET /productos?categoria=&buscar=&pagina=1&limite=10  (público)
  res 200: {
    pagina: number, total: number,
    productos: [{ id: string, nombre: string, descripcion: string|null,
                  precio: number, stock: number, imagen: string|null, categoria: string|null }]
  }

GET /productos/{id}  (público)
  res 200: objeto Producto igual que arriba.

POST /productos  (rol ADMINISTRADOR)
  req:  { nombre: string, descripcion?: string|null, precio: number, stock: number,
          imagen?: string|null, categoriaId?: string|null }
  res 201: { mensaje: string }
  error 400 si categoriaId no existe.

PUT /productos/{id}  (ADMINISTRADOR)
  req: misma forma que POST.
  res 200: { mensaje: string }

DELETE /productos/{id}  (ADMINISTRADOR)
  res 200: { mensaje: string }

GET /carrito  (token)
  res 200: { items: [{ productoId: string, nombre: string, precio: number,
                       cantidad: number, subtotal: number }], total: number }

POST /carrito/items  (token)
  req:  { productoId: string, cantidad: number }
  res 201: { mensaje: string, total: number }
  error 409 stock insuficiente.

PUT /carrito/items/{productoId}  (token)
  req:  { cantidad: number }
  res 200: { mensaje: string, subtotal: number, total: number }

DELETE /carrito/items/{productoId}  (token)
  res 200: { mensaje: string }

POST /pedidos  (token; convierte el carrito en pedido y lo vacía)
  req:  { nota?: string }
  res 201: { id: string, estado: 'PENDIENTE'|'PAGADO'|'ENVIADO'|'ENTREGADO',
             total: number, mensaje: string }
  error 400 carrito vacío; 409 stock insuficiente.

GET /pedidos  (token)
  res 200: [{ id: string, fecha: string /* ISO-8601 */, total: number, estado: ... }]

GET /pedidos/{id}  (token, dueño o admin)
  res 200: { id: string, estado: ..., total: number,
             items: [{ productoId: string, nombre: string, cantidad: number, precio: number }] }
  error 403 si no es dueño ni admin.

POST /productos/{productoId}/comentarios  (token)
  req:  { puntuacion: number /* 1-5 */, contenido: string }
  res 201: { id: string, usuario: string, puntuacion: number, contenido: string,
             fecha: string /* ISO-8601 */ }

GET /productos/{productoId}/comentarios  (público)
  res 200: listado igual que arriba.

Formato de error de TODOS los endpoints:
  { codigo: number, mensaje: string }
Estados útiles: 400 validación, 401 no autenticado, 403 sin permiso,
404 no encontrado, 409 conflicto (correo repetido / stock insuficiente).

ENTREGABLES: los 5 archivos de servicio, el cliente axios y el archivo de tipos.
Adjunta las interfaces exactas para cada JSON y usa genéricos de axios para tipar.
```

---

### Recordatorios para el equipo
- Variables de entorno del frontend: `VITE_API_URL` (si es Vite) o `NEXT_PUBLIC_API_URL` (Next.js).
- El token se guarda como `evox_token` en localStorage.
- `fecha` y `fecha_creacion` llegan como ISO-8601 con Z (`2026-09-16T16:00:00Z`); formatear en la UI con `Intl.DateTimeFormat`.
- Precios: números decimales; formatear moneda en la UI.