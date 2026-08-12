# Historial de cambios

Qué cambió en el sitio y cuándo. Los cambios de **datos** van primero a
propósito: son los que pueden mandar a alguien a un lugar equivocado.

Las reglas de versionado de este proyecto están en
**[docs/versionado.md](docs/versionado.md)**. En resumen: MAJOR es que el sitio
dejó de cumplir algo que prometía, MINOR es cobertura o capacidad nueva, PATCH
es corregir dentro de lo prometido.

Cada push a `main` despliega. Un release no es un deploy: es un punto con nombre
en esa línea.

<!-- release-notes:inicio -->

## [1.5.0] — 2026-08-12

La jornada de mayor movimiento de datos hasta ahora: se amplió el criterio de
validación, se sustentaron 26 centros y se degradaron cuatro que ya no tenían
respaldo vigente.

### Datos

- Corregidos nueve pines que apuntaban al centroide de la vía en vez de a la
  dirección (`3ae749c`, [#13])
- 26 centros ascendidos a `verified` con fuente propia de la entidad, y 2
  centros nuevos dados de alta (`cf0caf0`)
- Eliminado un registro fantasma y corregido un pin que estaba a 11 km de su
  dirección real (`51a35df`)
- Nueva tanda de cobertura en las ciudades golpeadas: Pereira, Cali y Manizales
  (`99c3056`)
- Los CAFE se publican sin canasta inventada y la §4.6 queda auditable
  (`b806b5f`)
- Tres puntos del Valle ascendidos con su fuente propia (`924ff98`)
- Rionegro dado de alta, con aviso sobre la pasada de `geocode` (`f902af3`)
- **Cuatro puntos de Bogotá degradados a `reported`** por fuente no vigente
  (`728d7e9`). No es un cambio de criterio: es el criterio de siempre aplicado a
  fuentes que caducaron.

### Código

- Se acepta el **canal propio de entidades no estatales** como prueba de
  validación (`8fe6cab`). Amplía lo que califica como `verified`: ningún centro
  ya publicado deja de calificar, por eso es MINOR y no MAJOR.
- El contacto del propio centro se acepta como prueba de validación (`d210692`)
- La portada invita a registrar acopios mostrando la brecha de cobertura
  (`02c3779`)
- Los scripts escriben rutas de salida con `fileURLToPath`, que arreglaba la
  ejecución en Windows (`087672d`)

### Documentación

- Cifras públicas del seed puestas al día (`798ff92`)
- Registradas las dos tandas de investigación de cobertura (`12950fd`)

## [1.4.0] — 2026-08-11

Cobertura del 11 de agosto y el día en que el proyecto dejó de mentirse sobre
los horarios: en vez de callar lo que no se sabía, se empezó a decir.

### Datos

- Sabaneta y Buga añadidos a la cola de revisión (`fb31734`)
- Tanda del 11 de agosto y nueva lista de Bogotá (`18cbceb`)
- Cargados los 4 horarios que la investigación pudo sustentar (`42bf88f`)

### Código

- El sitio **dice cuándo no sabe el horario** en vez de callarlo (`16f2ccb`)
- La lista filtra por lo confirmable y deja de ordenar por accidente (`3c74377`)
- Al registrar, la dirección se ubica en el mapa sin quitarle a la persona la
  decisión final del pin (`ae304fa`)
- Cliente de Nominatim extraído a un módulo compartido (`8dc7ee4`)

### Mantenimiento

- **ESLint instalado de verdad** y corregido todo lo que encontró (`b4e6705`).
  El repositorio llevaba desde el primer commit con `"lint": "next lint"` sin
  ESLint en las dependencias: el comando fallaba, nadie lo corría y las reglas
  de React se dejaron de cumplir en silencio.
- Comprobado que la integración de despliegue quedó reconectada (`1f4d0ba`)

## [1.3.0] — 2026-08-10

Rediseño móvil. Es el release que dejó la lección más cara del proyecto.

### Código

- Rediseño móvil de la portada, la ficha y los filtros (`c0de8a8`)
- El seed deja de pisar las decisiones tomadas en el panel de moderación
  (`5f87b8d`)
- **Reparados los botones de ubicación y filtros de la hoja inferior**
  (`f2eed01`). Salieron muertos: el typecheck pasaba, el build pasaba y el HTML
  era correcto, pero un manejador de gestos se interponía entre el dedo y el
  botón. De aquí salieron las pruebas de interacción en navegador que hoy corren
  en CI.

## [1.2.0] — 2026-08-10

Primera incorporación masiva de una red externa.

### Datos

- 31 puntos de la red de las Tigresas de la Patria (`908673f`)
- La red completa marcada como `verified` tras confirmar fuente propia
  (`d0d72d6`)

### Mantenimiento

- Next 15.5.23 → 16.3.0 ([#6]), `@supabase/ssr` ([#3]), tailwind-merge
  2.6.1 → 3.6.0 ([#7])
- Subida a zod 4 y `@types/node` alineado con el runtime (`a38daea`)

## [1.1.0] — 2026-08-10

El proyecto se abre para recibir aportes.

### Mantenimiento

- Publicado como código abierto bajo licencia MIT (`8676ed2`)
- `CONTRIBUTING.md` con la norma de datos, plantillas de issue y de pull
  request, `SECURITY.md` y `CODE_OF_CONDUCT.md`
- CI en cada pull request y Dependabot agrupando las menores para no ahogar a un
  proyecto de un solo mantenedor
- Nota de datos separada del `LICENSE` para que GitHub detecte la licencia MIT
  (`f3a1f6b`)

## [1.0.0] — 2026-08-10

El sitio en pie, dos horas después del terremoto.

### Datos

- Seed nacional de centros de acopio consolidado (`7a82e6a`)

### Código

- Portada con mapa, lista por cercanía y filtros (`98beee1`)
- Ficha de centro y página de metodología (`d6c1779`)
- Formularios de registro de centros y de reporte de información incorrecta
  (`679b14c`)
- Panel de moderación con Supabase Auth (`c0bf62e`)
- Esquema Supabase con RLS y generador de seed (`93880e0`)
- Distancias Haversine, deep links a mapas, categorías y validación (`7e6856f`)
- Analítica con lista cerrada y tipada de eventos (`136516e`)
- Los centros públicos se leen con un cliente sin cookies (`b81003e`)

### Seguridad

- **`anon` ya no puede leer los datos de contacto de quien envía un centro**
  (`3dc689b`)

### Documentación

- README de operación y trazabilidad completa de fuentes (`93af32c`)

---

Los enlaces `#N` apuntan a los pull requests del repositorio.

[#3]: https://github.com/victorolave/acopio-colombia/pull/3
[#6]: https://github.com/victorolave/acopio-colombia/pull/6
[#7]: https://github.com/victorolave/acopio-colombia/pull/7
[#13]: https://github.com/victorolave/acopio-colombia/pull/13
[1.5.0]: https://github.com/victorolave/acopio-colombia/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/victorolave/acopio-colombia/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/victorolave/acopio-colombia/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/victorolave/acopio-colombia/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/victorolave/acopio-colombia/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/victorolave/acopio-colombia/releases/tag/v1.0.0
