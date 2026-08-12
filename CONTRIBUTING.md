# Cómo contribuir

Gracias por querer ayudar. Antes de nada, lo único que hay que entender de este proyecto:

> **Una dirección equivocada aquí no es un bug. Es una persona conduciendo dos horas con el carro lleno de agua hasta un lugar que no recibe nada, durante una emergencia.**

Todo lo demás sale de ahí.

---

## Hay dos tipos de aporte, y no se revisan igual

| | Aportes de **código** | Aportes de **datos** |
|---|---|---|
| Qué son | Interfaz, accesibilidad, rendimiento, corrección de errores | Agregar, corregir o desactivar centros de acopio |
| Criterio | ¿Funciona y se entiende? | ¿Es cierto, y quién lo respalda? |
| Quién puede | Cualquiera | Cualquiera, pero contra fuente primaria |

Si nunca has aportado a un proyecto de datos de emergencia, empieza por el código. Es más fácil deshacer un botón feo que una dirección falsa que ya circuló.

---

## Aportes de datos: la norma

### 1. La fuente manda, no el conocimiento personal

«Yo vivo ahí y sé que ese centro existe» **no es suficiente**. No porque no te creamos, sino porque quien lea el sitio no puede comprobarlo. Cada centro publicado muestra su fuente con un enlace: si no hay enlace, no hay publicación.

### 2. Los cinco estados y qué significan de verdad

| Estado | Cuándo se usa | ¿Sale en el sitio? |
|---|---|---|
| `verified` | La entidad responsable lo publicó **en su propio sitio o comunicado** | Sí, con sello «Verificado» |
| `reported` | Un medio confiable lo publica **citando a la entidad**, pero no encontraste la publicación original | Sí, con aviso «confirma antes de ir» |
| `pending` | Enviado por la comunidad, sin revisar | **No** |
| `disputed` | Fuentes que se contradicen, o duda razonable de que sea de esta emergencia | **No** |
| `inactive` | Cerró o dejó de recibir | **No** |

**El error más común es marcar `verified` algo que es `reported`.** Que Infobae, El Tiempo o Semana lo publiquen no lo hace verificado: lo hace reportado. `verified` significa que fuiste al sitio de la alcaldía, la gobernación o la Cruz Roja y lo leíste ahí.

En caso de duda, usa el estado **más bajo**. Un centro `reported` es útil. Un centro `verified` que resultó falso destruye la confianza en los otros 38.

### 3. No mezclar emergencias

Colombia tuvo una campaña de ayuda por los **sismos de Venezuela de junio de 2026**, apenas dos meses antes. Varias direcciones se reciclaron y circularon como si fueran de este terremoto. Dos de los centros de este repositorio están en `disputed` exactamente por eso.

Antes de agregar un centro, comprueba que la fuente sea **del 10 de agosto de 2026 o posterior**. La validación automática lo rechaza si no lo es, pero revísalo tú primero.

### 4. Un albergue no es un centro de acopio

Un albergue recibe **personas**. Un centro de acopio recibe **cosas**. Mandar donaciones a un albergue estorba a quien está durmiendo ahí. El Coliseo Mayor de Manizales aparece en varios agregadores: está excluido a propósito.

### 5. Coordenadas: es mejor decir «no sé» que inventar

La nomenclatura colombiana (carrera, calle, diagonal) no resuelve bien contra OpenStreetMap. En este proyecto solo 11 de 39 pines son exactos, y **eso se le dice al usuario**.

El campo `location_precision` tiene tres valores: `exact`, `approximate`, `municipality`. Si no estás seguro, usa el más bajo. Un pin optimista manda gente a la esquina equivocada; un pin honesto le dice que se guíe por la dirección escrita.

---

## Cómo agregar o corregir un centro

```bash
git clone https://github.com/victorolave/acopio-colombia.git
cd acopio-colombia
pnpm install
```

1. **Edita `data/centers.ts`.** Es la única fuente de verdad. No edites `supabase/seed.sql` ni `data/coordinates.json` a mano: se generan.

2. **Geocodifica y REVISA el resultado.**
   ```bash
   pnpm run geocode
   ```
   El script imprime a qué lugar resolvió cada dirección. Léelo. En la primera pasada de este proyecto, «Carrera 24 #73-38» (Barrios Unidos, Bogotá) cayó en **Ciudad Bolívar**, al otro lado de la ciudad.

3. **Valida.**
   ```bash
   pnpm run validate:seed
   ```
   Comprueba mecánicamente lo que no debería depender de la memoria de un revisor: fuentes anteriores al sismo, `verified` sin fuente institucional, coordenadas fuera de Colombia, duplicados, campos obligatorios.

4. **Regenera el seed.**
   ```bash
   pnpm run seed:build
   ```

5. **Documenta la fuente en `docs/sources.md`.** Si encontraste una contradicción entre fuentes, escríbela ahí aunque la hayas resuelto. La próxima persona necesita saber que ya lo revisaste.

6. **Abre el pull request** y llena la plantilla. La casilla del enlace de la fuente no es un trámite: es lo que se va a revisar.

---

## Aportes de código

```bash
pnpm run dev          # http://localhost:3000
pnpm run typecheck
pnpm run build
```

La app **funciona sin Supabase**: sin variables de entorno usa el seed estático en modo solo lectura. No necesitas credenciales para trabajar en la interfaz.

Antes de abrir el PR, comprueba que sigue cumpliendo lo que el proyecto promete:

- **La lista funciona sin el mapa.** MapLibre pesa ~200 kB y se carga aparte. Alguien en Quibdó con mala señal tiene que poder leer las direcciones aunque el mapa nunca cargue. No lo metas en el bundle inicial.
- **La ubicación del visitante no sale del dispositivo.** Vive en `useGeolocation`, en memoria. No la guardes, no la mandes al servidor, no la pongas en la URL, no la mandes a la analítica.
- **El estado nunca se comunica solo con color.** Verificado y reportado llevan icono y texto, por daltonismo y por lectores de pantalla.
- **Nada de `pending` ni `disputed` en la interfaz pública.** Si tocas consultas, revisa que sigan filtrando.
- **Analítica:** la lista de eventos en `lib/analytics.ts` está cerrada a propósito. Si necesitas uno nuevo, justifícalo en el PR.

---

## Qué NO buscamos

- Rediseños completos de la interfaz. Es deliberadamente sosa: fondo claro, alto contraste, botones grandes. No es una oportunidad de portafolio.
- Cambiar el stack. Next.js + Supabase + MapLibre se eligieron por velocidad de despliegue, no por gusto.
- Microservicios, GraphQL, colas, arquitectura hexagonal. Son 39 registros.
- Anuncios, rastreadores, muros de registro o cualquier cosa que ponga fricción entre una persona y una dirección.

---

## Reportar un problema

- **Un centro con información incorrecta** → usa la plantilla «Centro con información incorrecta». Es la más urgente de todas.
- **Un error de la aplicación** → plantilla de error.
- **Un fallo de seguridad** → **no abras un issue público**. Lee [SECURITY.md](SECURITY.md).

---

## Convenciones

Commits convencionales (`feat:`, `fix:`, `docs:`, `chore:`). Un PR, un tema. Si el mensaje del commit necesita un «y», probablemente son dos PRs.
