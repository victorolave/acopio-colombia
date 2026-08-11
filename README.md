# Acopio Colombia

[![CI](https://github.com/victorolave/acopio-colombia/actions/workflows/ci.yml/badge.svg)](https://github.com/victorolave/acopio-colombia/actions/workflows/ci.yml)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-0e5c4a)](LICENSE)
[![Aportes bienvenidos](https://img.shields.io/badge/aportes-bienvenidos-0e5c4a)](CONTRIBUTING.md)

**→ https://emergency-rosy.vercel.app**

Sitio nacional para encontrar **centros de acopio cercanos** tras el terremoto de magnitud 7,4 del **10 de agosto de 2026** (epicentro: San José del Palmar, Chocó).

Responde en segundos a una sola pregunta: **¿dónde puedo llevar ayuda cerca de mí?**

- 39 centros publicados en 21 departamentos
- Cada centro muestra **qué recibe, cuándo se verificó y cuál es la fuente**
- Nada se publica automáticamente: los envíos de la comunidad quedan `pending` hasta revisión

---

## Principio de diseño

> Nunca publicar como verificado algo que no lo está.

Cinco estados: `verified`, `reported`, `pending`, `disputed`, `inactive`. **Solo `verified` y `reported` son visibles**, y se distinguen claramente en la interfaz. La trazabilidad completa está en [`docs/sources.md`](docs/sources.md).

Además, la precisión del pin es **un dato explícito** (`exact` / `approximate` / `municipality`), no una suposición: las direcciones colombianas no siempre resuelven bien contra OpenStreetMap y el usuario merece saberlo. Cuando el pin es aproximado, el botón «Cómo llegar» envía a Google Maps la **dirección en texto** en lugar de las coordenadas.

---

## Stack

| Capa | Tecnología | Por qué |
|---|---|---|
| App | Next.js 15 (App Router) + TypeScript | Una sola aplicación, sin backend aparte |
| Estilos | Tailwind CSS v4 | Sin build extra de diseño |
| Datos | Supabase (Postgres + Auth + Storage + RLS) | Tres servicios administrados en uno |
| Mapas | MapLibre GL JS + OpenFreeMap | Sin API key, sin cuenta, sin costo |
| Deploy | Vercel | Despliegue automático desde GitHub |

Sin PostGIS: las distancias se calculan con **Haversine en el cliente** sobre unas decenas de puntos (`lib/distance.ts`).

---

## Setup

```bash
npm install
cp env.example .env.local
npm run dev
```

Abre <http://localhost:3000>.

> **La app arranca sin Supabase.** Si no configuras las variables, sirve el seed nacional estático de `data/centers.ts` en modo solo lectura. Esto permite desplegar en minutos; el registro de centros y los reportes requieren Supabase.

---

## Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | No¹ | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No¹ | Clave pública (anon) |
| `SUPABASE_SERVICE_ROLE_KEY` | No¹ | **Solo servidor.** Nunca con prefijo `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_MAP_STYLE_URL` | No | Estilo del mapa. Por defecto OpenFreeMap Liberty |
| `NEXT_PUBLIC_SITE_URL` | Sí en producción | Para metadata, OpenGraph y sitemap |

¹ Sin ellas la app funciona en modo solo lectura con el seed estático.

---

## Supabase

1. Crea un proyecto en <https://supabase.com>.
2. **SQL Editor** → ejecuta `supabase/migrations/0001_init.sql`. Crea tablas, tipos, índices, triggers, políticas RLS y el bucket privado `center-evidence`.
3. **SQL Editor** → ejecuta `supabase/seed.sql` (idempotente: hace upsert por `slug`).
4. Crea tu usuario administrador en **Authentication → Users** y regístralo:

```sql
insert into public.admin_users (user_id, email)
values ('<uuid-del-usuario>', 'admin@ejemplo.com');
```

### Modelo de seguridad

- El público solo puede **leer** centros con estado `verified` o `reported`.
- **No existe** política de `INSERT` para usuarios anónimos. Los envíos entran por route handlers del servidor (`/api/submissions`, `/api/reports`) con la service role key, tras validación con Zod, honeypot y rate limiting.
- Los administradores tienen CRUD completo, controlado por la función `is_admin()`.
- **RLS filtra filas, no columnas.** Por eso la migración revoca el `SELECT` de tabla al rol `anon` y le concede solo la lista blanca de columnas públicas. Sin eso, cualquiera con la anon key podía pedir `select=*` a PostgREST y leer el correo y el teléfono de quien envió un centro. Verificado: `select=*` como anónimo devuelve `42501 permission denied`.
- **Registro público de cuentas desactivado** (`Authentication → Sign In / Providers → Allow new users to sign up` en OFF). De lo contrario cualquiera podría crearse una cuenta, pasar al rol `authenticated` y leer las columnas de moderación. Verificado: `/auth/v1/signup` devuelve `422 signup_disabled`.

---

## Seed

El seed **no se edita a mano**. La fuente de verdad es `data/centers.ts`.

```bash
npx tsx scripts/geocode.ts   # geocodifica (Nominatim, 1 req/s) → data/coordinates.json
npm run seed:build           # genera supabase/seed.sql
```

`scripts/geocode.ts` cachea resultados, aplica consultas curadas por centro, clasifica la precisión de forma conservadora y permite correcciones manuales documentadas. **Revisa siempre la salida antes de publicar.**

---

## Cómo agregar centros

**Desde la comunidad:** cualquiera usa `/registrar`. Entra como `pending` y no aparece hasta que un administrador lo apruebe.

**Desde el equipo (seed):**
1. Agrega el registro en `data/centers.ts` con su `sourceName`, `sourceUrl`, `sourcePublishedAt` y `verificationStatus`.
2. `npx tsx scripts/geocode.ts` y revisa la precisión asignada.
3. `npm run seed:build` y ejecuta el SQL resultante.
4. Documenta la fuente en `docs/sources.md`.

---

## Cómo verificar centros

En `/admin`:

1. Entra con tu cuenta de administrador.
2. Revisa la pestaña **Pendientes**. Abre el enlace de validación que envió la persona.
3. Si la fuente es una autoridad, organismo de socorro u organización responsable → **Aprobar y verificar**.
4. Si es un medio confiable que cita a la entidad → **Publicar como reportado**.
5. Si hay contradicción o no se puede confirmar → **Rechazar / marcar en disputa** (no se publica).
6. Si cerró → **Marcar inactivo**.

Verificar o editar un centro actualiza automáticamente `last_verified_at` y registra qué administrador lo hizo (`verified_by`). Los reportes de la comunidad llegan a `/admin/reportes` y **nunca modifican el centro automáticamente**.

---

## Deploy

```bash
npm i -g vercel
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod
```

O conecta el repositorio en <https://vercel.com/new> y define las variables en **Settings → Environment Variables**. Cada push a `main` despliega solo.

---

## Rendimiento y accesibilidad

Pensado para conexiones malas durante una emergencia:

- La **lista funciona sin el mapa**. MapLibre (~200 kB) se carga aparte y nunca bloquea el contenido.
- Server Components por defecto; JavaScript de cliente solo donde hace falta.
- First Load JS: 120 kB en la portada, 124 kB en la ficha de un centro.
- HTML semántico, navegación por teclado, foco visible, objetivos táctiles de 44 px, `aria-label` en mapas y estados nunca comunicados solo por color.

## Privacidad

La ubicación del visitante vive **únicamente en memoria** (`components/centers/use-geolocation.ts`). No se guarda, no se envía al servidor y no entra en analítica.

## Analítica

Vercel Analytics (`@vercel/analytics`), sin cookies y sin huella digital del dispositivo. Envuelto en `components/analytics.tsx` con un `beforeSend` que **recorta la URL a la ruta y descarta la cadena de consulta**: hoy los filtros viven en el estado de React, pero si alguien los mueve a query params en el futuro, la búsqueda del visitante no empezaría a viajar a la analítica sin que nadie lo note.

Los eventos son una **lista cerrada y tipada** en `lib/analytics.ts` — `view_center`, `click_directions`, `click_whatsapp`, `submit_center`, `report_center` — y la única propiedad permitida es el `slug` del centro, que es información pública. Cualquier evento fuera de esa lista falla en compilación.

---

## Estructura

```
app/            rutas: portada, /centros/[slug], /registrar, /metodologia, /admin, /api
components/     map/ · centers/ · filters/ · forms/ · ui/
lib/            distance · maps · items · format · validation · rate-limit · supabase/
data/           centers.ts (fuente de verdad) + coordinates.json (geocodificado)
scripts/        geocode.ts · build-seed.ts
supabase/       migrations/0001_init.sql · seed.sql
docs/           sources.md (trazabilidad completa)
```

---

## Contribuir

Los aportes son bienvenidos. Lee **[CONTRIBUTING.md](CONTRIBUTING.md)** antes de empezar: en este proyecto los aportes de **datos** se revisan con un criterio más estricto que los de **código**, porque una dirección equivocada aquí manda a alguien a conducir dos horas hasta un lugar que no recibe nada.

Lo más útil que puedes hacer ahora mismo: tomar uno de los 33 centros `reported` y confirmarlo contra el sitio propio de la entidad. La lista priorizada está en [`docs/sources.md`](docs/sources.md) §7.

Las reglas de verificación no son solo documentación: están **como código** en `scripts/validate-seed.ts` y corren en CI en cada pull request. Rechazan automáticamente fuentes anteriores al terremoto, `verified` sin fuente institucional, coordenadas fuera de Colombia y duplicados.

```bash
npm run validate:seed
```

- [Código de conducta](CODE_OF_CONDUCT.md)
- [Política de seguridad](SECURITY.md) — los fallos de seguridad **no** van en issues públicos

## Licencia

Código bajo [MIT](LICENSE) — © 2026 Victor Olave ([@victorolave](https://github.com/victorolave)).

Los **datos** son otra cosa: ver [DATOS.md](DATOS.md). Resumen — provienen de fuentes públicas de terceros citadas en [`docs/sources.md`](docs/sources.md), solo 6 de 39 centros están confirmados contra el sitio propio de la entidad, y 28 de 39 pines no son exactos. Si reutilizas este proyecto, **verifica los datos antes de publicarlos**.

## Estado y pendientes

Ver la sección **«Datos que deben validarse manualmente»** en [`docs/sources.md`](docs/sources.md). Lo más relevante:

- Solo 6 centros están confirmados contra el sitio propio de la entidad; 33 provienen de medios que la citan.
- 28 pines no son exactos y están marcados como tal en la interfaz.
- 2 registros quedaron en disputa y **no se publican**.
