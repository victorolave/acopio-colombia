# Revalidación del 14 de agosto de 2026 — día 5, primera pasada con navegador

**Estado: aplicado.** El barrido se hizo en modo solo lectura y este documento recogió la evidencia; los cambios se aplicaron después, con el visto bueno del mantenedor. El resumen de lo que entró está en §5.

**El seed pasó de 111 a 128 registros, y de 101 a 118 publicables.**

## Qué hace distinta a esta pasada

Las cuatro revalidaciones anteriores se hicieron con `WebFetch`. Esta se hizo con un **navegador real (Brave) con sesión iniciada**, y eso desbloquea exactamente lo que `sources.md` §3.d.4 había dejado escrito como límite de herramienta:

> «Contenido no legible sin sesión — Instagram, incluida la cuenta en lista blanca de Tigresas»

El bloque de Tigresas —**el más grande del seed y el menos reverificado**, 30 centros con `lastVerifiedAt` del 10 de agosto— nunca se había podido releer. Ahora sí.

---

## 1. Tigresas de la Patria — la lista viva apareció

**Fuente:** historia destacada **«📍Puntos»** de [@tigresasmoviendoseconcorazon](https://www.instagram.com/tigresasmoviendoseconcorazon/), cuenta de campaña de la iniciativa (`Nonprofit organization`, liderada por Ana Lucía Pineda). Highlight ID `18091890611417732`.

Es la «Red Nacional de Puntos de Solidaridad» publicada **departamento por departamento**, y es exactamente lo que `revalidacion-2026-08-13.md` §8 decía que hacía falta:

> «Solo la cuenta que la publicó puede decir qué sigue en pie.»

### La destacada se actualiza en capas

Las diapositivas traen antigüedad distinta, y eso importa:

| Antigüedad | Fecha aprox. | Departamentos |
|---|---|---|
| `3d` | 11 ago | Antioquia, Arauca, Atlántico, Bogotá, Bolívar, Caquetá, Casanare, Chocó, Cundinamarca, Huila, Magdalena, Meta, Nariño, N. de Santander, Putumayo, Santander, Sucre, Tolima, Valle, EE.UU. |
| `2d` | 12 ago | **Córdoba** |
| `1d` | 13 ago | **Boyacá**, **Risaralda** |

**La campaña se está expandiendo, no cerrando.** Tres departamentos entraron después de la publicación original.

### 1.1 Resultado del cotejo — 33 registros del seed contra 45 puntos vivos

**28 de 33 reconfirmados** contra la fuente propia, con corte posterior a su `lastVerifiedAt`.

Reconfirmados: los 2 de Arauca · Barranquilla · los 4 de Bogotá · los 3 de Cartagena · Florencia · Casanare · Quibdó · los 3 de Cundinamarca · los 2 de Neiva · Santa Marta · Acacías y Granada · Pasto · Mocoa · Pereira-Alpaca · Bucaramanga · Sincelejo · Ibagué · Yumbo.

### 1.2 ⚠️ El Cesar desapareció entero — 5 centros `verified` sin respaldo

| Slug | Municipio | Estado actual |
|---|---|---|
| `tigresas-valledupar` | Valledupar | `verified` |
| `tigresas-pailitas` | Pailitas | `verified` |
| `tigresas-san-diego-cesar` | San Diego | `verified` |
| `tigresas-el-copey` | El Copey | `verified` |
| `tigresas-bosconia` | Bosconia | `verified` |

**El departamento del Cesar no aparece en ninguna diapositiva de la destacada.** No hay sección CESAR. No es que falten puntos sueltos: falta el departamento completo.

**Esto NO es prueba de cierre**, y el precedente de `sources.md` §4.8 es explícito al respecto: tres puntos de Cruz Roja desaparecieron de `bogota.gov.co` y seguían operando. La entidad reorganiza su publicación, no necesariamente su operación.

**Pero sí es pérdida del respaldo del sello.** `verified` significa «la entidad responsable lo publica en su propio canal», y hoy la entidad no los publica.

**Propuesta:** degradar los 5 a `reported`, conservándolos publicados con el aviso «confirma antes de ir». Es literalmente el método que §4.8 dejó escrito: *«bajar el nivel de confianza al que la evidencia sostiene hoy»*. No ocultar, no mantener el sello.

> Contexto que refuerza la cautela: `sources.md` §3.b registra que **San Diego aparecía duplicado en dos piezas gráficas distintas**. El Cesar entró al seed por piezas específicas que esta destacada simplemente puede no haber recogido.

### 1.3 🆕 17 puntos activos que el seed no tiene

Todos publicados por la cuenta de campaña, ninguno con fecha de cierre.

**Antioquia — 3 puntos, y es cobertura nueva de la red en la ciudad más grande**

| Punto | Dirección | Contacto | Horario |
|---|---|---|---|
| **La 80**, Medellín | Cra. 80 #49A-39, frente a Los Verdes de la 80 | 322 653 1804 | 8:00 a. m. – 8:00 p. m. |
| **Medellín Sur** | Centro de acopio de la Central Mayorista de Antioquia | 320 691 5374 | 8:00 a. m. – 5:00 p. m. |
| **Terminal del Sur** | Local 015, C.C. Terminal del Sur | — | — |

La 80 es el punto **mejor evidenciado de toda esta pasada**: aparece en el post fijado del 12 de agosto ([`Db8Y8VihK9w`](https://www.instagram.com/p/Db8Y8VihK9w/), con pieza gráfica, canasta completa y responsables Esperanza Martínez / Liliana Zapata) **y se repite en dos publicaciones posteriores** de la cuenta oficial. Terminal del Sur viene del reel `Db_eOEbhZxy`: «Hoy abrimos un nuevo punto de acopio en la Terminal del Sur».

> **Aviso de calidad sobre la pieza de La 80:** la imagen **no dice la ciudad**. Un comentario público en el propio post lo señala («No dice la ciudad»). Que sea Medellín se establece por el texto de la publicación hermana: «Desde Medellín seguimos trabajando para recibir, organizar y hacer llegar ayudas humanitarias». Es atadura contextual, igual que la de Rionegro en §3.f — conviene que quede escrito.

**Resto del país — 14 puntos**

| Departamento | Punto | Dirección | Contacto |
|---|---|---|---|
| Bogotá D.C. | Park Way | Av. Kr 24 39-29 (encargada Olga Mayorga) | 310 267 7601 |
| Boyacá | Defensores de la Patria Boyacá, Tunja | Carrera 12 #21-45, Local 3 | 314 442 0954 · 320 959 7400 |
| Boyacá | Tunja — Bodega 2 | Cra. 2 #58-79 (resp. Faustino García) | 322 859 4727 |
| Caquetá | Super Mío Ciudadela, Florencia | Cra. 30B #22-42, La Ciudadela | 317 887 1620 |
| Casanare | Villanueva — Hotel Versalles Tigresa | Calle 11 #16-35 (resp. Lucenith Gross) | 318 544 4431 |
| Córdoba | Centro de Solidaridad, Montería | Calle 69 #3-86, barrio El Recreo | — |
| Córdoba | Punto de Solidaridad Norte, Montería | Cra. 1A #62-41, Edificio Río, apto. 1502 | — |
| Córdoba | Punto de Solidaridad Norte, Montería | Calle 69 #1C-92 | — |
| Meta | Villavicencio | Carrera 31 #41A-50, contiguo U. Gran Colombia | 310 734 2742 |
| N. de Santander | Cúcuta — Portal Boconó | Conjunto Portal Boconó, Local 2, anillo vial antes de Postobón | 312 339 2032 |
| N. de Santander | Cúcuta — Zona Industrial | Calle 17N #4-50 | WA 312 339 3032 · 320 656 8404 |
| Risaralda | **Mercasa Pereira** (marcado «NUEVO PUNTO» en la pieza) | Av. del Sur (Calle 100 #100-89), Bodega ZP-01-02 L6 | 313 550 9707 |
| Tolima | Ibagué — C.C. Plazas del Bosque | Avenida Ambalá 69-80 | 321 840 2089 |
| Tolima | Ibagué — Casa Loma | Calle 116 #48-49, barrio San Francisco de Aparco | 320 884 1094 |

**Córdoba y Boyacá son departamentos nuevos para el seed.** Villavicencio completa el Meta, que ya tenía Acacías y Granada.

### 1.4 Datos que enriquecen fichas ya publicadas

Todos resuelven avisos que `validate-seed.ts` viene emitiendo.

| Centro | Dato nuevo | Aviso que resuelve |
|---|---|---|
| `tigresas-bogota-122-plaza` | Horario: **Recepción 24 horas** | `sin-horario-ni-contacto` |
| `tigresas-barranquilla-casa-abelardista` | 9:00 a. m. – 5:00 p. m.; responsable Fela Córdoba; 2º tel. 304 234 450 | — |
| `tigresas-santa-marta-amor-en-accion` | Dirección **Calle 30 #6-69** confirmada por la fuente; tel. 317 300 3459; resp. Licet Peñaranda; 8-12 y 14-18 | Insumo para corregir el pin que cayó en **Bonda** (§3.b) |
| `tigresas-pereira-alpaca` | **«Complejo Bodeguero Alpaca, Bodega 01»** — la nomenclatura que faltaba; «vía pavimentada» | La dirección rural sin nomenclatura de §3.b |
| `tigresas-quibdo` | Tigresa encargada **Minerva Palacio**, 310 805 0535 | — |
| `banco-arquidiocesano-alimentos-ibague` | 8-12 y 14:30-17; resp. Catherine Bustamante Carrión | Precisión `municipality` (§5.2) |
| `tigresas-chia` | 8:00 a. m. – 7:00 p. m. | — |
| `tigresas-acacias`, `tigresas-granada-meta` | 8-12 y 14-18 | — |
| `tigresas-pasto` | L-V 9:30-12:30 y 14:30-18:00; sáb. 10:00-13:00 | — |

**Confirmación operativa de Quibdó:** un reel del 14 de agosto muestra entrega de una silla de ruedas en Quibdó y menciona «nuestra capitana Minerva». El punto no solo está listado: está operando.

### 1.5 ⚠️ Dos teléfonos aparecen en dos departamentos a la vez

Los números **310 310 4757** y **322 403 4030** figuran **simultáneamente** en la ficha de Casanare y en la de Pereira.

Es el patrón que `sources.md` §3.d.5 registró como cuarta trampa —*«un resumen automático de búsqueda fabricó un teléfono, atribuyendo el mismo número a dos entidades distintas»*— salvo que aquí **está en la fuente oficial misma**, no en un resumen.

Lectura más probable: son números de **coordinación nacional**, no del punto físico. Publicarlos como teléfono del centro mandaría a la gente a llamar a alguien que no está en la bodega.

**Propuesta:** no incorporarlos como `phone` de ninguno de los dos puntos sin confirmar.

### 1.6 El `disputed` de Casanare sigue sin resolverse

`sources.md` §3.b lo dejó así:

> «Casanare — «Calle 12 #21-44», sin municipio. **`disputed`, no publicado.** Casanare tiene 19 municipios […] Se asume Yopal, pero sin confirmar.»

La destacada **repite la misma dirección sin municipio**. Añade un segundo teléfono (322 403 4030 — ver §1.5) y un punto hermano en **Villanueva**, pero **no dice el municipio del primero**. El registro se queda en `disputed` con razón.

### 1.7 Vigencia de la campaña — sigue sin fecha de cierre

`revalidacion-2026-08-13.md` §7 descartó un «hasta el 15 de septiembre» que circulaba en resúmenes de buscador. **Esta pasada lo confirma en negativo:** ninguna de las ~24 diapositivas de la destacada, ni el post fijado, ni ninguna publicación del 10 al 14 de agosto menciona fecha de vigencia o de cierre.

La única fecha de operación explícita hallada en toda la red:

> **Atlanta, Georgia (EE. UU.)** — «Recepción de donaciones: **Martes 11 y miércoles 12**, 11:00 a. m. a 8:00 p. m.»

Ya caducó, y está fuera de Colombia, así que no afecta al seed. Los tres puntos de EE. UU. (Doral, Atlanta, Deblex Hub Miami) siguen correctamente **excluidos** por la regla de §3.b: el esquema restringe las coordenadas al territorio nacional.

### 1.8 Lo que esta reverificación NO prueba

Sigue valiendo la advertencia de `revalidacion-2026-08-13.md`: esto sube la confianza de «lo dijeron el 10» a «lo siguen diciendo el 13», **no** a «está abierto ahora». La destacada es una pieza gráfica, no un parte operativo. La llamada telefónica sigue pendiente y sigue siendo la única vía que confirma recepción efectiva.

---

## 2. 🔴 Los 8 de Medellín: §6 se equivocaba, y el precio ya se está pagando

`revalidacion-2026-08-13.md` §6 cerró así el bloque de ocho centros publicados sin `sourceUrl`:

> «Se buscaron uno por uno. **Rastro web: cero.** […] **ninguna búsqueda en internet los va a validar nunca.** No hay canal que consultar.»

**Esa conclusión era correcta para la herramienta de entonces y es falsa hoy.** Con una sesión de Instagram, **cinco de los ocho aparecen en el primer intento**:

| Slug del seed | Cuenta | Estado real |
|---|---|---|
| `bodega-guayaquiliando-medellin` | [@guayaquiliando](https://www.instagram.com/guayaquiliando/) (445 K seguidores) | **Activo — y se mudó** |
| `libreria-rodante-delfos-medellin` | [@libreriadelfos1](https://www.instagram.com/libreriadelfos1/) | **Activo — y se mudó** |
| `udea-afroudea-medellin` | [@afroudea](https://www.instagram.com/afroudea/) | **Hoy es su último día** |
| `fundacion-el-arte-de-los-suenos-medellin` | [@elartedelossuenos](https://www.instagram.com/elartedelossuenos/) (91,5 K) | Activo, foco en distribución |
| `simon-coffee-medellin` | [@simoncoffeemedellin](https://www.instagram.com/simoncoffeemedellin/) | **Sin ninguna mención de acopio** |

No localizados: `remanence-medellin` (aunque **@remanence.co existe** — aparece etiquetado por El Arte de los Sueños), `la-razon-medellin`, `batallon-girardot-medellin`.

> **Lección de método.** «No hay fuente» significó otra vez «no di con ella» — el mismo patrón de §3.d.4, §3.e y §3.f, ahora por cuarta vez. La diferencia es que aquí la conclusión se había escrito como definitiva («nunca»). **Un límite de herramienta no es un hecho del mundo.** Conviene fechar las conclusiones negativas y anotar con qué herramienta se sacaron.

### 2.1 🚨 `bodega-guayaquiliando-medellin` — el seed manda gente a una bodega cerrada

**Lo que el seed publica hoy:** `address: "Avenida 80 #52-88"`

**Lo que la cuenta publicó el 12 de agosto a las 16:22 UTC** ([post `Db8k6QDxYux`](https://www.instagram.com/p/Db8k6QDxYux/)):

> «**NUEVA UBICACIÓN DE RECOLECCIÓN** 🚨‼️
> **Ya no podemos recibir NADA en la que estábamos** así que POR FAVOR DIFUNDIR
> 📍 Carrera 81 # 33 aa - 08
> (PONEN 7 mesas en waze es la bodega del lado)
> Cerca de la iglesia Santa Gema, **de 10 a 8 pm**»

Son dos direcciones distintas y separadas por ~2 km. **Llevamos dos días publicando la vieja**, sobre un punto cuya propia cuenta pidió expresamente difundir el cambio.

Esto es, literalmente, el daño que `DATOS.md` describe:

> «manda gente a conducir hasta lugares que ya no reciben nada»

**El punto está vivo:** el [post `DcCvlmtRFZU`](https://www.instagram.com/p/DcCvlmtRFZU/), del **14 de agosto a las 20:53 hora Colombia**, documenta la entrega de donaciones en Quimbaya (Quindío). La operación lleva **120 toneladas en 3 días** y ha despachado camiones a Manizales, Cali, Pereira, Buenaventura y Quimbaya.

**Cambios propuestos** (los cuatro, sobre un centro que hoy no tiene ni enlace ni horario):

| Campo | Valor actual | Valor según la fuente |
|---|---|---|
| `address` | `Avenida 80 #52-88` | `Carrera 81 #33AA-08, al lado del restaurante 7 Mesas, cerca de la iglesia de Santa Gema` |
| `scheduleText` | `null` | `10:00 a. m. – 8:00 p. m.` |
| `sourceUrl` | `null` (excepción `SIN_ENLACE_APROBADOS`) | el post del 12 de agosto → **sale de la lista de excepciones** |
| `urgentNeeds` | `["Alimentos no perecederos"]` | cajas de cartón, alimentos no perecederos, aseo personal, comida para bebés, insumos médicos |

> **Discrepancia menor anotada, no resuelta.** Un post anterior del mismo día ([`Db_M82tPj1g`](https://www.instagram.com/p/Db_M82tPj1g/)) da «Carrera 81 **33aa-39**» y el del cambio da «**33aa-08**». Ambos citan la misma referencia (7 Mesas / iglesia de Santa Gema), así que es la misma cuadra. Se propone **33AA-08** por ser el del anuncio de traslado, pero conviene confirmarlo.

### 2.2 🚨 `udea-afroudea-medellin` — HOY es el último día

[Post `DcBuTjXRUTq`](https://www.instagram.com/p/DcBuTjXRUTq/), **14 de agosto de 2026, 16:21 UTC** (11:21 a. m. hora Colombia), publicado por @afroudea:

> «🚨 **Último día de recolección de ayudas en la @udea.** Necesitamos el mayor apoyo. Se requieren de manera urgente **utensilios de cocina, medicamentos, colchonetas, materiales para la construcción**. Estaremos todo el día en el **Bloque 9**.»

**Dos consecuencias, y ninguna es menor.**

**(a) Es un `endsAt` real, publicado por la entidad, y vence hoy.** El seed no lo tiene. Sin él, mañana 15 de agosto el centro se sigue sirviendo en lista, mapa y búsqueda — el mismo fallo exacto que §5 documentó con `parque-principal-itagui`.

**(b) Publicamos lo contrario de lo que el centro pide.** La ficha usa `MEDELLIN_DIA2_RECHAZADOS`, la canasta de la campaña de la Alcaldía, que **rechaza medicamentos**. AfroUdeA los pide «de manera urgente». Es el mismo error que §3.d.3 detectó con Belisario:

> «La ficha usaba la canasta genérica de la campaña de Medellín, que rechaza medicamentos y ropa. La empresa dice que sí los recibe. **Publicábamos lo contrario de lo que el centro hace.**»

Segunda vez que la canasta heredada contradice al centro. La causa es estructural: **una constante compartida no puede describir puntos con reglas propias.**

> **Ambigüedad que conviene declarar.** En los comentarios del post, dos personas preguntan si el cierre es definitivo —«último día POR AHORA si?», «¿van a seguir recibiendo más mañana y los siguientes días cierto?»— y **la cuenta no responde en el hilo visible**. El anuncio de la entidad es explícito; su permanencia, no. Si se marca `endsAt: 2026-08-14`, la nota de la ficha debería decir que puede reabrir.

### 2.3 `libreria-rodante-delfos-medellin` — también se mudó, y el pin apunta al barrio equivocado

[@libreriadelfos1](https://www.instagram.com/libreriadelfos1/) publica:

> «🪔 ¡Ahora tenemos **nueva sede en el barrio Los Colores** de Medellín! (**Carrera 79 # 52A-34**).»
> «🚪 ¡Abrimos nuestras puertas para recibirles **jueves, viernes y sábados**!»

`sources.md` §3.c dejó registrado el forcejeo con el pin de este centro:

> «Primero cayó en el centroide de Medellín; al forzar «Calle 79, Laureles» enganchó un POI llamado «Ginger Cocina» […] **Se le quitó la vía y se ancló al barrio Laureles**, aceptando precisión baja.»

**El pin está anclado a Laureles y la sede está en Los Colores.** Son barrios distintos. Y ahora existe nomenclatura exacta —Carrera 79 #52A-34— que es justo lo que faltaba para dejar de aceptar precisión baja.

La cuenta sigue recibiendo y despachando: canaliza donaciones hacia el Chocó junto a la Red de Derechos Humanos del Pacífico, con registro en Quibdó.

**Propuesto:** `address` → `Carrera 79 #52A-34, barrio Los Colores`; `scheduleText` → `Jueves, viernes y sábados`; `sourceUrl` → el perfil; regeocodificar **solo este slug**.

### 2.4 `simon-coffee-medellin` — señal negativa, no prueba de cierre

La cuenta [@simoncoffeemedellin](https://www.instagram.com/simoncoffeemedellin/) está activa y publica con regularidad. En sus **12 publicaciones más recientes no hay una sola mención de acopio, donaciones ni terremoto**: café de especialidad, matcha, una nominación a los 100 mejores coffee shops de Suramérica.

La bio confirma la ubicación que el seed deduce (`📍El Poblado-Medellín`, y el seed geocodifica a El Poblado), así que el pin no está en discusión.

**Esto NO prueba que no reciba donaciones** —un negocio pequeño puede recibirlas sin publicarlo—, pero es una señal en contra: los otros cuatro del bloque **sí** lo publican, y con insistencia. Es el único de los cinco localizables cuya propia cuenta guarda silencio sobre el acopio.

**Propuesto:** mantenerlo publicado como `reported`, y anotarlo como **la primera llamada del bloque de Medellín**. Ya no es «no hay canal que consultar»: hay canal, y no dice nada.

---

## 3. Resto de fuentes reverificadas

### 3.1 `bogota.gov.co` — cuarta composición en cinco días, y un ascenso

La página vuelve a cambiar. Hoy lista **seis** puntos:

| # | Punto | Estado en el seed |
|---|---|---|
| 1 | Universidad Jorge Tadeo Lozano — Cra. 4 #22-61 | `verified` ✅ |
| 2 | Calle 161A #7F-55, Usaquén | `verified` ✅ |
| 3 | C.C. Unicentro — Cra. 15 #124-30 | `verified` ✅ |
| 4 | Estadio El Campín — Av. NQS/Cra. 30 entre calles 53B Bis y 57 | `verified` ✅ |
| 5 | Sede administrativa Cruz Roja — Cra. 24 #73-38, 24 horas | `verified` ✅ |
| 6 | **Palacio de los Deportes — Calle 63 #59A-06** | **`reported`** ⬆️ |

Histórico de la misma URL, sin que cambie nunca la fecha visible: **6 → 4 → 5 → 6** puntos en cinco días.

**Ascenso propuesto: `palacio-de-los-deportes-bogota` de `reported` a `verified`.** Fue degradado el 12 de agosto (§4.8) precisamente porque esta página dejó de mencionarlo. Hoy vuelve a mencionarlo, con dirección exacta, horario propio (8:00 a. m. – 8:00 p. m.) y un destino declarado: **donaciones para Chocó**. La condición que motivó la degradación desapareció.

**Sin cambio:** `samu-sur-cruz-roja-bogota`, `centro-salvamento-acuatico-cruz-roja-bogota` y `bodega-cruz-roja-bogota` **siguen sin aparecer** en la fuente. Se quedan en `reported`, que es donde §4.8 los dejó y sigue siendo lo que la evidencia sostiene.

**Horarios confirmados:** 8:00 a. m. – 9:00 p. m., lunes a domingo; Cruz Roja 24 horas; Palacio de los Deportes 8:00 a. m. – 8:00 p. m.

### 3.2 `medellin.gov.co` — 10 de 10, sin cambios

El boletín sigue publicado y lista los mismos diez puntos: FUBAM, Fundación Saciar, los cuatro parques biblioteca, Biblioteca Pública El Poblado, Terminal del Norte (local 9840), Universidad EAFIT y el hall de la Alcaldía. **Ningún aviso de cierre ni fecha límite.**

Se mantiene la restricción de canasta: «No se reciben medicamentos, ropa, productos vencidos ni alimentos perecederos.»

Dato menor nuevo: EAFIT precisa **«placa cubierta»**. El **Batallón Girardot sigue sin aparecer**, igual que en §3.d.2.

### 3.3 ACSC (16 centros) — fuente viva, contenido ilegible

El comunicado del 10 de agosto **sigue publicado y no ha sido retirado**. La ACSC publicó dos boletines posteriores —«Convocatoria al Talento Humano en Salud» (11 ago) y «Gracias al Talento Humano en Salud» (12 ago)— y **ninguno anuncia cierre del acopio**.

Pero se confirma la trampa de §3.d.1: **los tres son PDF escaneados sin capa de texto.** No se pudo releer la lista de las 16 sedes.

**Veredicto honesto:** los 16 conservan su respaldo (la fuente sigue en pie, la entidad sigue activa, nadie anunció cierre), pero **no ganaron reconfirmación positiva**. Siguen siendo la **llamada #2 en prioridad**, exactamente como los dejó la revalidación anterior.

### 3.4 Los 7 cafés de Pereira — fuente congelada el 10 de agosto

El artículo de El Diario sigue publicado y lista los siete (El Remanso, Kennedy, Ormaza, San Nicolás, Comuna del Café, más Consota y Perla del Otún). **Pero su `article:modified_time` es `2026-08-10T13:56:27-05:00`: nunca se actualizó.**

No es reconfirmación: es la misma foto del día 1. Estos siete siguen sin horario, sin teléfono y sin lista de artículos, y ahora sabemos que **su fuente no va a resolverlo**.

### 3.5 El Tiempo — el agregador nacional se congeló

La guía nacional sigue en **«Actualizado: 12.08.2026 07:55»**, idéntica a la que usó la revalidación de ayer. **No se ha tocado en dos días.**

Importa porque §3 de la revalidación del 13 apoyó buena parte de sus reconfirmaciones (Cruz Roja Bogotá, Caribe, los cafés de Pereira) en esta fuente. **Ya no aporta frescura**: cualquier reconfirmación contra ella tiene corte del 12 de agosto, no de hoy.

---

## 4. Lo que esta pasada NO pudo hacer

### 4.1 Tres dominios bloqueados por permisos de la extensión

`barranquilla.gov.co`, `cartagena.gov.co` y `santamarta.gov.co` —los tres que devolvían **HTTP 403** a `WebFetch` desde el día 3 (§3.d.4)— **no se pudieron probar**: la extensión del navegador respondió *«Navigation to this domain is not allowed»*.

**No es el mismo obstáculo que antes.** Antes era el servidor rechazando; ahora es una lista de permisos local. Habilitar esos tres dominios en la extensión es un clic, y desbloquearía la comprobación de `centro-acopio-barranquillita`, `coliseo-bernardo-caraballo-cartagena` y `ogricc-santa-marta` — los tres casos que §3.d.4 marcó como «evidencia circunstancial fuerte que aun así no se ascendió».

Queda pendiente y es barato.

### 4.2 Lo de siempre: esto no es una llamada

Sigue valiendo la advertencia que abre `revalidacion-2026-08-13.md`. Una pieza gráfica de Instagram del 13 de agosto dice que el punto **estaba listado** el 13 de agosto. No dice que la bodega esté abierta ahora. Las dos excepciones de esta pasada son los centros cuya cuenta publica actividad **hoy** (Guayaquiliando, AfroUdeA), y son precisamente los dos que trajeron malas noticias.

---

## 4.bis Fechas y ventanas de recepción — auditoría aparte

Las secciones anteriores validan fechas de **cierre** (`endsAt`). Esta valida las **ventanas de recepción**: horarios y días. Son cosas distintas y la segunda faltaba.

### 4.bis.1 El estado real del dato: 25 de 101

| Situación | Centros | Qué ve quien mira la tarjeta |
|---|---:|---|
| Horario real publicado | **25** | Las horas |
| `scheduleText` en `null` | **57** | «Horario sin publicar · llama antes» o «Sin horario ni teléfono» |
| «Consultar antes de asistir» y variantes | **19** | Igual que el anterior (`classifySchedule` → `ask`) |

**Solo uno de cada cuatro centros publicados dice cuándo recibe.** Es el hueco de dato más grande del seed, más grande que el de coordenadas exactas (28 de 93 según §5).

### 4.bis.2 Cotejo contra las fuentes: cero contradicciones

Se compararon 16 horarios recogidos hoy contra lo que el seed publica:

- **10 rellenan un `null`** — `tigresas-bogota-122-plaza` (24 horas), `tigresas-chia`, `tigresas-acacias`, `tigresas-granada-meta`, `tigresas-pasto`, `tigresas-santa-marta-amor-en-accion`, `tigresas-pereira-alpaca`, `palacio-de-los-deportes-bogota`, `bodega-guayaquiliando-medellin`, `libreria-rodante-delfos-medellin`
- **1 coincide exactamente** — `tigresas-barranquilla-casa-abelardista` (9:00 a. m. – 5:00 p. m.)
- **2 difieren solo en redacción** — `estadio-el-campin-bogota` («horario continuo») y `sede-administrativa-cruz-roja-bogota` («Abierto 24 horas»). Misma información.
- **1 dice «no sabemos» cuando sí se sabe** — `banco-arquidiocesano-alimentos-ibague` tiene `"Consultar antes de asistir"`, pero la red de Tigresas **sí publica horario**: 8:00 – 12:00 m. y 2:30 – 5:00 p. m. Lo estamos degradando sin motivo.

**Ningún horario publicado contradice a su fuente.** Aplicar los 10 rellenos subiría la cobertura de 25 a 35 de 101.

### 4.bis.3 Hoy, viernes 14: ningún centro publicado está cerrado por su día

**15 de los 25** horarios declaran día de la semana. Revisados uno por uno contra hoy:

| Ventana | Centros | ¿Viernes? |
|---|---:|---|
| Lunes a domingo | 6 | Sí |
| Lunes a sábado | 5 (los 4 parques biblioteca + Biblioteca El Poblado) | Sí |
| Lunes a viernes | 3 (EAFIT, Envigado, AfroUdeA) | Sí |
| Días alternos | 1 | **Media jornada** |

El único matiz es **`fundacion-el-arte-de-los-suenos-medellin`**: «Lunes, miércoles y viernes 8:30 a. m. – **12:00 m.**; martes y jueves 8:30 a. m. – 4:00 p. m.». Los viernes cierra a mediodía, cuatro horas antes que martes y jueves. La tarjeta muestra la cadena entera sin señalar cuál mitad aplica hoy.

### 4.bis.4 🐛 El código no entiende días de la semana

`classifySchedule()` (`lib/schedule.ts`) clasifica como `"hours"` **cualquier** texto que no empiece por «consultar/confirmar/preguntar/verificar», y `tripAdvisory()` le asigna `level: "ok"` — el estado verde— sin mirar qué día es.

Comprobado simulando **domingo 16 de agosto, 10:00 a. m.**:

```
universidad-eafit-medellin
   clasificado: "hours"   nivel: "ok"
   la tarjeta muestra: "Lunes a viernes, 7:00 a. m. – 6:00 p. m."

gestion-del-riesgo-envigado
   clasificado: "hours"   nivel: "ok"
   la tarjeta muestra: "Lunes a viernes, 7:00 a. m. – 5:00 p. m."
```

Ese domingo es **pasado mañana**. Tres centros van a mostrarse en verde estando cerrados.

**Es la misma familia de fallo que §5:** el dato es correcto, el código no lo interpreta. Aquí es incluso más engañoso, porque el texto correcto y el semáforo contradictorio están **en la misma tarjeta**: quien lee «ok» en verde no vuelve a leer la letra.

**Corrección propuesta, deliberadamente conservadora:**

No calcular «abierto/cerrado» —parsear días en español es frágil y un falso negativo **oculta un centro abierto**, que es el daño que este proyecto evita por encima de todo—. En vez de eso:

1. Añadir `hasWeekdayRestriction(text)`: detecta que el horario declara días.
2. Cuando los declare y **hoy no esté claramente dentro**, bajar de `ok` a `caution` con «según el horario publicado, hoy no recibe — confirma antes de ir».
3. Si el texto no se puede interpretar con confianza, **dejarlo como está**. Nunca ocultar de la lista, nunca degradar por duda.

Es aditivo: solo puede añadir cautela, nunca esconder un punto.

**No se implementó en esta pasada.** Meter un intérprete de días en español a un sitio de emergencia sin que lo pidieras excede lo acordado, y el diseño merece tu visto bueno antes que mi criterio.

---

## 5. Cambios aplicados

Ordenados por daño que evitan.

| # | Centro | Cambio | Por qué |
|---|---|---|---|
| 1 | `bodega-guayaquiliando-medellin` | Dirección → `Carrera 81 #33AA-08`; horario 10:00–20:00; `sourceUrl`; canasta urgente | **Publicábamos una bodega que anunció que no recibe nada** |
| 2 | `udea-afroudea-medellin` | `endsAt: "2026-08-14"`; canasta propia que **acepta medicamentos**; `sourceUrl` | Hoy es su último día; y publicábamos lo contrario de lo que pide |
| 3 | `libreria-rodante-delfos-medellin` | Dirección → `Carrera 79 #52A-34, Los Colores`; horario J-V-S; `sourceUrl`; pin nuevo | Pin en Laureles, sede en Los Colores |
| 4 | Los 5 del **Cesar** | `verified` → `reported` | La fuente propia ya no los lista (§1.2) |
| 5 | `palacio-de-los-deportes-bogota` | `reported` → `verified` + horario | Volvió a la fuente propia (§3.1) |
| 6 | **17 puntos nuevos** de Tigresas | Alta como `verified`, geocodificados y revisados | Fuente propia, sin fecha de cierre (§1.3) |
| 7 | 9 fichas de Tigresas | Horarios, responsables, direcciones | Resuelven avisos del validador (§1.4) |
| 8 | `simon-coffee-medellin` | Nota de señal negativa; marcado como primera llamada | Su cuenta calla sobre el acopio (§2.4) |
| 9 | `banco-arquidiocesano-alimentos-ibague` | `"Consultar antes de asistir"` → horario real | Decíamos «no sabemos» y la fuente sí lo publica (§4.bis.2) |

**Resultado:** 111 → **128 registros**, 101 → **118 publicables** (82 `verified`, 36 `reported`). `npm run validate:seed` pasa.

### 5.1 Cambios de código que entraron con esto

**`lib/centers.ts` — el filtro de `ends_at` que §5 de la revalidación anterior dejó pendiente.** `getPublicCenters()` filtraba solo por `verification_status`; ahora un centro vencido sale de lista, mapa y búsqueda por sí solo. Se filtra en memoria en las dos rutas (Supabase y seed estático) en vez de duplicar la regla de fechas en SQL, para que no discrepen en el borde del día.

Comprobado contra el seed real:

```
2026-08-14 22:00 → 118/118
2026-08-15 00:30 → 117/118   FUERA: udea-afroudea-medellin
2026-08-24 09:00 → 115/118   FUERA: gobernacion-cundinamarca-plaza-de-la-paz,
                                    empresa-licores-cundinamarca, udea-afroudea-medellin
```

AfroUdeA se retira solo a medianoche. Nadie tiene que acordarse.

`getCenterBySlug()` **no** filtra, a propósito: quien llega por un enlace guardado merece leer «este punto cerró», no un 404.

**`scripts/geocode.ts` — `--only` y `--missing`.** La pasada completa reescribía las 128 entradas. `MANUAL_OVERRIDES` ya protege los pines afinados a mano, así que el aviso de `sources.md` §3.g quedó obsoleto, pero la revisión visual seguía siendo inviable: revisar 17 líneas se hace, revisar 128 no, y una revisión que no se hace es una revisión que miente.

**`scripts/validate-seed.ts`** — se añadió `@tigresasmoviendoseconcorazon` a la lista blanca (segunda cuenta de la misma organización ya admitida) y salieron tres slugs de `SIN_ENLACE_APROBADOS`.

### 5.2 La revisión visual de los pines encontró cuatro errores

Los 17 puntos nuevos se geocodificaron y se revisaron uno por uno, como exige el proyecto. **Cuatro no pasaron:**

| Centro | Primer resultado | Corregido a |
|---|---|---|
| `tigresas-cucuta-zona-industrial` | Centroide del municipio, **~20 km al norte** del casco urbano | Calle 17A N, Comuna 6 — dentro del perímetro urbano |
| `tigresas-bogota-park-way` | Centroide de Bogotá | Park Way, Teusaquillo — y **degradado a `approximate`** |
| `tigresas-villavicencio` | Centroide del municipio | Carrera 31, El Porvenir |
| `tigresas-monteria-norte-calle-69` | **Coordenada idéntica** a la del Centro de Solidaridad | Carrera 1C, El Recreo |

El de Cúcuta repite exactamente el fallo que §5.3 documentó con `acsc-cucuta`: el centroide administrativo del municipio incluye zona rural y cae lejísimos del casco urbano. Es la segunda vez, y ya hay dos centros en Cúcuta que lo sufrieron.

El de Park Way merece nota aparte: Nominatim devolvió el **polígono de la UPZ** con nombre propio y el clasificador lo selló `exact`. Es el modo de fallo de §5.4 —pin con más confianza que la evidencia—, el mismo de la iglesia de Santa Marta y de Delfos. **Tercera vez.** El área es correcta, pero el número de la casa no está corroborado: se bajó a `approximate` a mano.

Y el de Montería es el problema de Cartagena otra vez: dos puntos distintos resolviendo al mismo tramo de la Calle 69, apilados en el mapa.

### 5.3 Lo que NO se aplicó

- **El intérprete de días de la semana** (§4.bis.4). Tres centros van a mostrarse en verde el domingo estando cerrados, y el arreglo propuesto está diseñado pero no escrito: parsear días en español es frágil y un falso negativo oculta un centro abierto. Pendiente de decisión.
- **Los 10 rellenos de horario de §4.bis.2** entraron solo en parte: los 9 de Tigresas y el de Ibagué. Guayaquiliando y Delfos también ganaron horario por otra vía.
- **Los tres dominios bloqueados** (§4.1) siguen sin comprobar: hace falta habilitarlos en la extensión del navegador.

---

## Fuentes consultadas en esta pasada

- [@tigresasmoviendoseconcorazon — historia destacada «📍Puntos»](https://www.instagram.com/stories/highlights/18091890611417732/) — Red Nacional de Puntos de Solidaridad, capas del 11, 12 y 13 de agosto
- [@tigresasdelapatriaoficial — post fijado «COLOMBIA MOVIÉNDOSE CON CORAZÓN»](https://www.instagram.com/p/Db8Y8VihK9w/) — 12 ago 2026, 14:55 UTC, punto La 80
- [@tigresasdelapatriaoficial — reel Terminal del Sur](https://www.instagram.com/reel/Db_eOEbhZxy/)
- [@tigresasdelapatriaoficial — perfil](https://www.instagram.com/tigresasdelapatriaoficial/) — 838 publicaciones, actividad continua al 14 de agosto
- [@guayaquiliando](https://www.instagram.com/guayaquiliando/) — traslado del punto ([`Db8k6QDxYux`](https://www.instagram.com/p/Db8k6QDxYux/), 12 ago 16:22 UTC) y actividad del 14 ago ([`DcCvlmtRFZU`](https://www.instagram.com/p/DcCvlmtRFZU/))
- [@afroudea](https://www.instagram.com/afroudea/) — [«Último día de recolección»](https://www.instagram.com/p/DcBuTjXRUTq/), 14 ago 16:21 UTC
- [@libreriadelfos1](https://www.instagram.com/libreriadelfos1/) — nueva sede en Los Colores
- [@elartedelossuenos](https://www.instagram.com/elartedelossuenos/) · [@simoncoffeemedellin](https://www.instagram.com/simoncoffeemedellin/)
- [Alcaldía Mayor de Bogotá — puntos de donación](https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia) — releída el 14 ago: seis puntos
- [Alcaldía de Medellín — 10 puntos](https://www.medellin.gov.co/es/sala-de-prensa/noticias/en-10-puntos-se-recibiran-las-donaciones-para-enviar-desde-medellin-a-las-comunidades-afectadas-por-el-sismo/) — sin cambios
- [ACSC — comunicado del 10 de agosto](https://sociedadescientificas.com/solidaridad-con-victimas-del-terremoto-agosto-10/) y [listado de comunicados](https://sociedadescientificas.com/noticias-y-boletines-2/) — vigentes, PDF ilegible
- [El Diario (Pereira)](https://www.eldiario.com.co/actualidad/pereira-declara-calamidad-publica-y-establece-toque-de-queda-en-tres-sectores/) — sin actualizar desde el 10 ago 13:56
- [El Tiempo — guía nacional](https://www.eltiempo.com/colombia/otras-ciudades/como-ayudar-tras-terremoto-de-7-4-en-colombia-estos-son-los-centros-de-acopio-bancos-de-sangre-y-alimentos-canales-oficiales-y-puntos-de-donacion-3577631) — congelada en 12 ago 07:55
