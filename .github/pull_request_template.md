# ¿Qué cambia?

<!-- En una o dos frases. -->

## Tipo de aporte

- [ ] Datos: agrego, corrijo o desactivo centros de acopio
- [ ] Código: interfaz, accesibilidad, rendimiento, corrección de errores
- [ ] Documentación

---

## Si cambias DATOS, completa esto

> Sin fuente comprobable no se puede publicar. No es desconfianza: es que quien lea el sitio tiene que poder verificarlo por su cuenta.

**Enlace de la fuente:**
<!-- https://... -->

**Fecha de publicación de la fuente:**
<!-- Debe ser 2026-08-10 o posterior. Antes de esa fecha corresponde a otra emergencia. -->

**Estado asignado y por qué:**
<!--
`verified`  → lo leíste en el sitio o comunicado propio de la entidad responsable
`reported`  → un medio confiable lo publica citando a la entidad
En caso de duda, el más bajo.
-->

- [ ] La fuente es del **10 de agosto de 2026 o posterior** y se refiere a este terremoto
- [ ] No es un albergue de personas, sino un centro que recibe donaciones
- [ ] Ejecuté `npm run geocode` y **revisé a qué lugar resolvió** cada dirección nueva
- [ ] `location_precision` refleja la realidad; ante la duda usé el valor más bajo
- [ ] Ejecuté `npm run validate:seed` y pasa
- [ ] Ejecuté `npm run seed:build` e incluí `supabase/seed.sql` en el commit
- [ ] Documenté la fuente en `docs/sources.md`

---

## Si cambias CÓDIGO, completa esto

- [ ] `npm run typecheck` y `npm run build` pasan
- [ ] La lista de centros sigue siendo utilizable **sin que cargue el mapa**
- [ ] No agregué MapLibre ni otras librerías pesadas al bundle inicial
- [ ] La ubicación del visitante sigue sin salir del navegador (ni al servidor, ni a la URL, ni a la analítica)
- [ ] Los estados de verificación siguen sin comunicarse solo con color
- [ ] Los centros `pending` y `disputed` siguen sin aparecer en la interfaz pública
- [ ] Lo probé en un ancho de pantalla de móvil

---

## Cómo lo probaste

<!-- Qué hiciste para comprobar que funciona. Capturas si tocaste la interfaz. -->
