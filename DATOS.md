# Sobre los datos

El **código** de este repositorio se distribuye bajo la licencia [MIT](LICENSE).

Los **datos de centros de acopio** son otra cosa y conviene ser explícito, porque quien reutilice el proyecto necesita saber qué está tomando.

## Procedencia

Los datos provienen de fuentes públicas de terceros: alcaldías, gobernaciones, organismos de socorro y medios de comunicación colombianos. Cada centro cita su fuente con enlace, y la trazabilidad completa —incluidas las contradicciones que encontramos y cómo las resolvimos— está en [`docs/sources.md`](docs/sources.md).

Cada fuente conserva sus propios derechos sobre el contenido original. Este proyecto los recopila, coteja y estructura con fines humanitarios.

## Si vas a reutilizarlos

**Verifícalos antes de publicarlos.** Esto no es una fórmula legal defensiva: es la advertencia más importante del repositorio.

De los 70 centros publicados, **37** están confirmados en el canal propio de la entidad responsable. Los otros 33 provienen de medios que citan a la entidad, y están marcados como `reported` precisamente por eso. Además, **la mayoría de los pines del mapa no son exactos**: la nomenclatura colombiana no resuelve bien contra OpenStreetMap, y el campo `location_precision` lo declara centro por centro.

Un dato de emergencia envejece en horas. Un centro que existía el 10 de agosto puede haber cerrado, llenado su bodega o cambiado de necesidades. Publicar esta información sin revalidarla, o presentarla con más certeza de la que tiene, hace daño real: manda gente a conducir hasta lugares que ya no reciben nada.

## Si la adaptas a otra emergencia

El código sirve tal cual, pero **borra los datos y empieza de cero**. La estructura de `data/centers.ts`, el script de validación y los estados de verificación son lo reutilizable. Los centros concretos son de este terremoto y de ningún otro.

Presta atención especial a `scripts/validate-seed.ts`: la constante `EARTHQUAKE_DATE` es lo que impide arrastrar centros de campañas anteriores, que es el error más fácil de cometer y el más difícil de detectar después.
