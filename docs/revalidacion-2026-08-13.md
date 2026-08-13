# Revalidación del 13 de agosto de 2026 — día 4

Primera pasada cuyo objetivo NO fue ampliar cobertura sino **retirar lo que dejó de operar**. Hasta ahora cada revisión había sumado centros; esta se hizo para restar.

## Lo que esta revalidación ES y lo que NO ES

Es una revalidación **documental**: se rastreó cada bloque de centros contra la fuente primaria de su entidad responsable, buscando cierres, traslados, saturación y cambios de horario.

**No es una revalidación telefónica.** Confirma que la entidad sigue listando el punto en su canal propio; NO confirma que la bodega esté abierta ahora mismo. El propio El Tiempo lo dice en su guía nacional: *un punto puede llenarse o cerrar en cuestión de horas*. Ninguna página web se actualiza a esa velocidad.

Dicho de otro modo: esto sube la confianza de «lo dijeron hace tres días» a «lo siguen diciendo hoy». No la sube a «está abierto». Esa diferencia es la razón de que este documento termine con una lista de llamadas y no con una palmada en la espalda.

## 1. Cierres confirmados

### `parque-principal-itagui` → `inactive`

Único cierre que la revalidación pudo **probar**, no inferir.

La fuente original (Colombia.com) precisa que el punto operó *«el martes 11 y miércoles 12 de agosto, entre las 10:00 a. m. y las 5:00 p. m.»*, coordinado por el Consejo Municipal de Juventudes de Itagüí con la organización afro AfroDhamiri. Era una jornada de dos días, no un centro permanente. Terminó anteayer.

Ninguna fuente posterior lo relista. La guía nacional de El Tiempo, actualizada el 12 de agosto a las 07:55, **no lo menciona** pese a cubrir Antioquia en detalle.

Estaba publicándose hoy. Ver §5: el dato existía en el registro y el código no lo usó.

## 2. Reactivación pendiente de UNA llamada

### `banco-alimentos-pereira` — sigue `inactive`, pero ya no a ciegas

Se apagó el 10 de agosto porque ABACO informó que la sede de Pereira resultó afectada por el sismo y evaluaba una ubicación alterna. La nota decía «volver a consultar con ABACO».

La revalidación encontró la pista. El Tiempo (11 de agosto, 10:46) lista textualmente:

> «Banco de Alimentos de Pereira, transversal 5 No. 6-30, calle de las Aromas, La Badea, Dosquebradas.»

Y publica el WhatsApp de ABACO para donaciones en especie: **313 245 7978**.

**No se reactivó.** Ese mismo artículo se contradice a sí mismo: junto a la dirección mantiene que *«este punto también se encuentra afectado y está en evaluación un sitio alterno»*. No se puede saber si Dosquebradas ya es la sede alterna operando o si es la dirección administrativa de una operación todavía suspendida. Publicarlo sería exactamente el error contra el que advierte `DATOS.md`.

Un mensaje de WhatsApp lo resuelve. Es la reactivación más barata del seed.

## 3. Reconfirmados contra fuente posterior a su última verificación

Estos bloques siguen listados por su entidad responsable en una publicación **más reciente** que la última verificación registrada en el seed. No cambian de estado; cambia lo que sabemos de ellos.

| Bloque | Centros | Evidencia de reconfirmación |
|---|---:|---|
| Cruz Roja Bogotá | 4 | El Tiempo, act. 12 ago 07:55, lista cinco puntos activos: SAMU Sur, SAMU Norte, Centro de Salvamento Acuático, sede administrativa y bodega |
| Alcaldía de Bogotá | 5 | `bogota.gov.co` sigue publicando Tadeo Lozano, Usaquén, Unicentro, El Campín y Palacio de los Deportes |
| Alcaldía de Medellín | 10 | `medellin.gov.co`, act. 12 ago, mantiene los 10 puntos sin aviso de cierre ni fecha límite |
| Caribe | ~8 | El Tiempo Caribe: Barranquillita (24 h), Casa Abelardista, Coliseo Bernardo Caraballo, OGRICC Santa Marta, Iglesia Amor en Acción |
| Pereira (7 cafés) | 7 | Siguen en la guía nacional de El Tiempo actualizada el 12 de agosto |
| Cali | 1+ | Plazoleta Jairo Varela activa; se suma el Coliseo Miguel Calero |

**Punto importante sobre Bogotá.** La página de `bogota.gov.co` que sirve de fuente a nueve fichas hoy lista solo seis puntos, y tres de los que el seed le atribuye —SAMU Sur, Centro de Salvamento Acuático y bodega de la Cruz Roja— ya no aparecen en ella.

**Eso NO es un cierre.** El Tiempo, con corte posterior, los lista como activos con dirección. La entidad reorganizó su página, no cerró los puntos. Concluir «desapareció de la web, luego cerró» habría borrado tres centros operativos de la Cruz Roja en plena emergencia. La ausencia de evidencia no es evidencia de ausencia, y en este dominio confundirlas hace daño en las dos direcciones.

## 4. Hallazgos nuevos — cobertura que falta

La búsqueda de cierres devolvió, de rebote, centros activos que el seed no tiene. No se añadieron en esta pasada: entrarían como `reported` y merecen su propia revisión.

**Con fecha de operación explícita —los más urgentes, porque caducan solos:**

- **IDPYBA — Corferias, Bogotá.** Donaciones para animales afectados, **13 al 17 de agosto**. Alimento para mascotas, insumos veterinarios. Nace con fecha de cierre.
- **Cumbia House, Bogotá** (Calle 96 #13-40, iniciativa de Carlos Vives). **13 de agosto al 12 de septiembre**, de lunes a sábado. Alimentos no perecederos, agua, aseo.

**Sin fecha declarada:**

- **SAMU Norte (Cruz Roja, Bogotá)** — aparece en la lista de cinco de El Tiempo; el seed solo tiene SAMU Sur.
- **Sede Cruz Roja Barrios Unidos, Bogotá.**
- **Coliseo de Hockey Miguel Calero, Cali** — punto de atención en salud y acopio desde el 11 de agosto.
- **Hotel La Rivera, Pereira** (Calle 20 #3-58) — acopio y alojamiento.
- **Casa del padre de Francy, Dosquebradas**, barrio Los Molinos — cobijas, almohadas, aseo, alimentos.
- **Banco de Alimentos de Dosquebradas**, **Hemocentro del Café** (Manizales), **Banco de Alimentos de Bucaramanga**, **Centroabastos**, **Hospital Universitario del Valle**.

Santander merece una pasada propia: la prensa local habla de **nueve puntos** y el seed tiene cuatro.

**Horario que caduca hoy:** la Alcaldía de Bucaramanga recibe donaciones en el primer piso **martes, miércoles y jueves**, 8:00 a. m. – 6:00 p. m. Hoy es jueves: es el último día de la ventana semanal.

## 5. Lo que la revalidación destapó en el código

`parque-principal-itagui` tenía `endsAt: "2026-08-12"` desde el primer día. El dato estaba bien. **El código no lo miraba.**

`getPublicCenters()` (`lib/centers.ts`) filtra únicamente por `verification_status`. `hasEnded()` existe en `lib/format.ts` y se usa en un solo sitio: la ficha de detalle. Ni la consulta de origen ni la tarjeta la consultan.

Resultado: durante todo el 13 de agosto, un centro con fecha de cierre vencida se sirvió en lista, mapa y resultados de búsqueda. El aviso vivía en una página que quien escanea la lista no llega a abrir.

Marcarlo `inactive` a mano resuelve este caso y **ninguno de los siguientes**. Quedan dos centros más con `endsAt` (`gobernacion-cundinamarca-plaza-de-la-paz` y `empresa-licores-cundinamarca`, ambos 23 de agosto) que volverán a caer en la misma grieta, y los dos hallazgos nuevos de §4 nacen con fecha de caducidad. Es un filtro de una línea en el origen.

## 6. El bloque que la web no puede validar

Ocho centros de Medellín se publican como `reported` **sin `sourceUrl`**, por excepción aprobada:

`udea-afroudea` · `simon-coffee` · `remanence` · `bodega-guayaquiliando` · `libreria-rodante-delfos` · `fundacion-el-arte-de-los-suenos` · `la-razon` · `batallon-girardot`

Se buscaron uno por uno. **Rastro web: cero.** No aparecen en la guía nacional de El Tiempo, ni en El Colombiano, ni en el boletín de la Alcaldía de Medellín, ni en ningún agregador.

Esto no significa que no existan —son negocios pequeños e iniciativas de barrio, exactamente el tipo de punto que nadie cubre— pero sí significa algo operativo y duro: **ninguna búsqueda en internet los va a validar nunca.** No hay canal que consultar. Seis de los ocho tampoco tienen teléfono ni horario, así que quien los ve en la lista no puede confirmar sin ir.

Son el bloque de mayor riesgo del seed y el único que solo se resuelve yendo o llamando a quien los reportó.

## 7. Un dato que NO resistió la verificación

Un resumen de buscador afirmaba que la campaña «Colombia, un solo corazón» *«permanecerá activa hasta el 15 de septiembre»*. De ser cierto, sería un `endsAt` para los 31 centros de Tigresas de la Patria: casi un tercio del seed.

Se contrastó contra dos fuentes primarias —El Tiempo (11 ago) y Agencia PI (11 ago)—. **Ninguna de las dos menciona fecha de vigencia ni de cierre.**

Queda descartado como hecho y anotado como pista a confirmar. Se registra aquí en negativo a propósito: un `endsAt` inventado sobre 31 centros habría sido el error más caro que esta revalidación podía cometer, y venía servido con apariencia de dato.

## 8. Estado de la cobertura Tigresas

31 centros, todos `verified` contra la cuenta oficial de Instagram, todos con `lastVerifiedAt` del 10 de agosto. Es el bloque más grande y el menos reverificado.

La prensa habla de *«más de 30 puntos»*, pero **ningún medio publica la lista completa**: Infobae detalla 10, Agencia PI 10, El Tiempo enumera 9 ciudades y cierra con «otras ciudades más». El seed tiene 31 porque los sacó de la pieza gráfica original.

Consecuencia práctica: la cobertura del seed es **mejor** que la de cualquier medio, y por eso mismo nadie externo la va a revalidar. Solo la cuenta que la publicó puede decir qué sigue en pie.

## 9. Prioridad de llamadas

Ordenado por centros desbloqueados, no por facilidad.

| # | Contacto | Desbloquea | Qué preguntar |
|---|---|---:|---|
| 1 | Tigresas de la Patria (IG oficial) | **31** | Lista vigente y si hay fecha de cierre de campaña |
| 2 | ACSC / S.C.A.R.E. | **16** | Los 16 puntos siguen recibiendo; teléfonos ya están en el seed |
| 3 | Alcaldía de Medellín | 10 | Reconfirmado en web hoy; llamar solo si se quiere subir a telefónico |
| 4 | Los 8 de Medellín sin fuente | 8 | **Único camino posible.** Sin web que consultar |
| 5 | ABACO — WhatsApp 313 245 7978 | 1 (+1) | ¿La Badea recibe público? Reactiva Pereira y aclara Buenaventura |
| 6 | Alcaldía de Bucaramanga | 2 (+7) | Ventana martes-jueves; y la prensa habla de 9 puntos, el seed tiene 4 |

Las dos primeras llamadas cubren **47 de los 101 centros publicados**.

## Fuentes consultadas

- [Alcaldía de Bogotá — puntos de donación](https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia)
- [Alcaldía de Medellín — 10 puntos de donación](https://www.medellin.gov.co/es/sala-de-prensa/noticias/en-10-puntos-se-recibiran-las-donaciones-para-enviar-desde-medellin-a-las-comunidades-afectadas-por-el-sismo/)
- [El Tiempo — guía nacional de centros de acopio](https://www.eltiempo.com/colombia/otras-ciudades/ayudas-tras-terremoto-en-colombia-centros-de-acopio-bancos-de-sangre-bancos-de-alimentos-canales-oficiales-y-puntos-de-donaciones-en-el-pais-3577631) (act. 12 ago 07:55)
- [El Tiempo — mapa completo de centros de acopio](https://www.eltiempo.com/datos/este-es-el-mapa-completo-de-los-centros-de-acopio-habilitados-en-colombia-para-ayudar-a-los-damnificados-del-terremoto-de-magnitud-7-3577654) (act. 12 ago)
- [El Tiempo — puntos de acopio en la región Caribe](https://www.eltiempo.com/colombia/barranquilla/esta-en-la-region-caribe-y-no-sabe-donde-donar-estos-son-todos-los-puntos-de-acopio-habilitados-para-recaudar-ayudas-para-las-victimas-del-terremoto-3577588)
- [El Tiempo — ABACO activa corredor humanitario](https://www.eltiempo.com/vida/tendencias/asociacion-de-bancos-de-alimentos-de-colombia-activa-corredor-humanitario-como-es-posible-ayudar-3577580) (dirección de Dosquebradas y WhatsApp)
- [El Tiempo — «Colombia, un solo corazón»](https://www.eltiempo.com/politica/abelardo-de-la-espriella/colombia-un-solo-corazon-asi-puede-donar-a-la-campana-liderada-por-la-primera-dama-para-ayudar-a-los-damnificados-por-el-terremoto-3577595) (sin fecha de vigencia)
- [Agencia PI — «Un solo corazón»](https://www.agenciapi.co/noticia/regiones/un-solo-corazon-la-campana-para-ayudar-los-damnificados-por-el-sismo-cuentas-y-municipios-donde-donar) (sin fecha de vigencia)
- [Infobae — puntos de acopio de la primera dama](https://www.infobae.com/colombia/2026/08/11/tras-el-fuerte-terremoto-en-colombia-la-primera-dama-ana-lucia-pineda-anuncio-puntos-de-acopio-de-ayudas-humanitarias-un-solo-corazon/)
- [Infobae — cantantes movilizan ayuda](https://www.infobae.com/colombia/2026/08/13/donaciones-centros-de-acopio-y-reconstruccion-de-viviendas-cantantes-colombianos-movilizan-ayuda-y-solidaridad-para-los-afectados-por-el-terremoto/) (Cumbia House, Hotel La Rivera)
- [Colombia.com — centros de acopio habilitados](https://www.colombia.com/actualidad/noticias/centros-de-acopio-y-ayudas-humanitarias-habilitadas-en-colombia-tras-temblor-10-de-agosto-595512) (jornada de Itagüí)
- [Semana — bancos de alimentos activan ayuda](https://www.semana.com/nacion/articulo/bancos-de-alimentos-activan-ayuda-para-damnificados-por-el-terremoto-en-colombia-asi-puede-donar/202641/)
- [Vanguardia — punto de acopio de la Alcaldía de Bucaramanga](https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/asi-puede-ayudar-desde-bucaramanga-a-las-familias-afectadas-por-el-terremoto/)
