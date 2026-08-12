# Versionado y releases

## Por qué existe este documento

Este proyecto usa **versionado semántico** (`MAJOR.MINOR.PATCH`). El problema de
SemVer aplicado a una aplicación web es que su definición estándar habla de
«romper a los consumidores», y aquí nadie hace `npm install acopio-colombia`.
Sin una traducción explícita al dominio, `v2.0.0` no significaría nada y los
números serían decoración.

Así que aquí queda escrito **qué promete este sitio**, porque eso es lo que la
versión mide.

## Release no es deploy

Cada push a `main` despliega solo en Vercel. Eso ya pasa 15 veces al día durante
la emergencia y **no** es un release.

Un release es un punto con nombre en esa línea continua. Sirve para tres cosas
concretas, ninguna de las cuales resuelve el deploy continuo:

1. **Trazabilidad del dato.** Cada centro ya lleva `last_verified_at` y su fuente
   en `docs/sources.md`. Lo que el release añade es la línea de tiempo agregada:
   «el 12 de agosto degradamos cuatro puntos de Bogotá y por qué». Cuando una
   entidad o un medio pregunte qué cambió y cuándo, la respuesta no debería ser
   «revisa el `git log`».
2. **Ancla de rollback.** Vercel permite revertir a cualquier deployment, pero el
   identificador es un hash. Un tag dice cuál era el último estado bueno.
3. **Señal de que esto se mantiene.** Un proyecto de emergencia sin historial
   visible de cambios se lee como abandonado a los tres días.

## Quién es el «consumidor» aquí

SemVer protege a alguien de una ruptura. En este proyecto ese alguien no es un
programa que importa un paquete: son **tres consumidores reales**.

| Consumidor | Qué consume | Qué lo rompe |
|---|---|---|
| Quien lee el sitio | El sello «Verificado» y la dirección | Que «verificado» pase a significar otra cosa sin avisar |
| Quien aporta datos | Los cinco estados y las reglas de `CONTRIBUTING.md` | Que cambien los criterios y su aporte deje de calificar |
| Quien forkea el repo | `data/centers.ts`, `supabase/migrations`, `seed.sql` | Que se renombre o elimine un campo |

## Las reglas

### MAJOR — cambia lo que el sitio promete

Se sube MAJOR cuando alguien que confiaba en algo ya publicado estaba, sin
saberlo, confiando en otra cosa.

- **Se ESTRECHA un criterio de verificación**: algo que estaba publicado como
  `verified` deja de calificar bajo el criterio nuevo. Quien leyó ese sello ayer
  leyó una promesa que hoy no se cumple.
- **Cambio incompatible del esquema de datos**: se renombra o elimina un campo de
  `data/centers.ts`, `lib/types.ts` o `supabase/migrations`. Hay gente leyendo el
  seed directamente.
- **Se rompe una de las garantías públicas** que el proyecto declara en
  `CONTRIBUTING.md` y en el README:
  - la lista funciona sin que cargue el mapa;
  - la ubicación del visitante no sale del dispositivo;
  - `pending` y `disputed` no aparecen en la interfaz pública;
  - el estado nunca se comunica solo con color;
  - no hay fricción entre una persona y una dirección.

### MINOR — capacidad nueva que no invalida nada anterior

- **Nuevos centros, nuevas ciudades, nuevas tandas de cobertura.** Más cobertura
  es más capacidad.
- **Se AMPLÍA un criterio de verificación**: más cosas califican que antes. Nada
  de lo ya publicado deja de ser cierto, así que nadie se rompe.
- Nueva vista, nuevo filtro, campo opcional nuevo.

### PATCH — corrección dentro del contrato

- **Aplicar un criterio existente a un caso concreto.** Degradar un centro a
  `reported` porque su fuente no está vigente NO es un cambio de criterio: es el
  criterio de siempre, aplicado. Eso es PATCH.
- Pin corregido, horario corregido, registro fantasma eliminado.
- Errores de interfaz, dependencias, CI, documentación.

### La distinción que más se falla

**Ampliar un criterio es MINOR. Estrecharlo es MAJOR.**

Cuando `feat(validacion): aceptar el canal propio de entidades no estatales`
amplió lo que cuenta como fuente válida, ningún centro ya publicado dejó de
calificar: solo entraron más. Eso es MINOR.

Si mañana se decidiera que una cuenta oficial de Instagram ya no basta para
`verified`, centros hoy publicados con sello dejarían de merecerlo. Todo el que
confió en ese sello confió en un criterio que cambió bajo sus pies. Eso es
MAJOR, y hay que decirlo fuerte en las notas del release.

## Qué NO determina la versión

- El número de deploys.
- El tamaño del diff.
- Que «se sienta» como una versión grande. Un rediseño visual completo que no
  toca ninguna garantía ni ningún criterio es MINOR, por mucho que se note.

## Cómo se corta un release

Dos caminos, ambos en `.github/workflows/release.yml`:

**Manual** — pestaña *Actions* → *Release* → *Run workflow*. Se elige `patch`,
`minor` o `major`, o se escribe una versión exacta. Es el camino normal.

**Corte diario de datos** — cada día a las 23:00 (hora de Colombia) el workflow
comprueba si hubo cambios en `data/`, `supabase/seed.sql` o `docs/sources.md`
desde el último release. Si los hubo, corta uno solo. El tipo de salto se deduce
de los commits convencionales: si hay algún `feat`, es MINOR; si no, PATCH.

**El corte automático nunca sube MAJOR.** Si detecta un commit marcado como
ruptura (`feat!:` o `BREAKING CHANGE:` en el cuerpo), se detiene y falla con un
aviso. Declarar que se rompió una promesa pública es una decisión humana y tiene
que escribirse a mano.

## Marcar una ruptura en un commit

```
feat(validacion)!: exigir comunicado propio para verified

BREAKING CHANGE: una cuenta oficial en redes ya no basta para `verified`.
Los 26 centros ascendidos en v1.5.0 con ese criterio bajan a `reported`
hasta que se encuentre la publicación original de la entidad.
```

El cuerpo del `BREAKING CHANGE` va tal cual a las notas del release. Escríbelo
pensando en quien confió en el sello, no en quien lee el código.
