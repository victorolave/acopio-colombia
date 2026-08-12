# Candidatos de cobertura — tanda 2 del 12 de agosto de 2026

**Qué es este documento.** La continuación de `docs/candidatos-cobertura-2026-08-12.md`. **No repite aquella tanda: va a cerrar los leads que quedaron abiertos en su §7**, que es donde estaba el valor sin cobrar. Como la anterior, **no es una ingesta**: nada de lo que hay aquí está en `data/centers.ts` ni debe entrar sin revisión humana.

**Este documento no modifica ningún archivo existente.** En particular no toca `data/centers.ts`, `docs/sources.md` ni el documento de la tanda 1, que se están editando en paralelo.

**Fecha de la investigación:** 12 de agosto de 2026. Todas las fuentes se abrieron una por una. Donde no se pudo abrir, se dice y no se publica el dato. La regla se ganó el sueldo dos veces hoy: ver §7.

---

## 1. Resumen

| | |
|---|---|
| **Leads de §7 cerrados** | **5 de 9** (Rionegro, Montería, Pereira, Barranquilla institucional, Riohacha) |
| **Leads cerrados parcialmente** | **2** (Cúcuta, Ibagué): no se cerró lo que se buscaba, pero apareció algo mejor |
| **Leads que siguen abiertos** | **2 enteros** (Yopal, Atlántico) **+ los tres 403** |
| **Candidatos nuevos propuestos** | **16** |
| **Ascensos sobre centros YA en el seed** | **1** (`gobernacion-cundinamarca-plaza-de-la-paz`), más 4 mejoras de campo sin cambio de estado |
| **Municipios nuevos respecto a `data/centers.ts`** | **1** — Rionegro (Antioquia) |
| **Reparto por estado propuesto** | **4 `verified`** · **12 `reported`** |
| **Trampas esquivadas** | **3**, dos de ellas fabricadas por la propia herramienta de lectura (§7) |

### Cobertura ganada, por municipio

| Municipio | Puntos hoy en el seed | Con esta tanda | Con tanda 1 + tanda 2 |
|---|---|---|---|
| Montería | 1 | **4** | 6 |
| Pereira | 1 publicado (`tigresas-pereira-alpaca`) | **4** | 4 |
| Cúcuta | 1 | **3** | 3 |
| Barranquilla | 3 | **5** | 6 |
| Rionegro | 0 | 0 | **3, con sello** |
| Riohacha | 1 | **2** | 2 |
| Ibagué | 1 | **2** | 2 |
| Medellín | 21 | **22, con sello** | 22 |

### Lo más importante de la tanda

**1. El lead más barato era real y se cobró.** `rionegro.gov.co` sí tenía el artículo; lo que fallaba era la ruta. La portada del portal enlaza `/publicaciones/1389/...`, no `/galeria/23/noticias/`. **Los tres puntos de Rionegro pasan de `reported` a `verified`** con la Alcaldía publicando en su propio dominio, con direcciones, horario y una lista de artículos más completa que la del medio.

**2. Instagram sí se dejó leer hoy.** La tanda 1 y §3.d.4 de `docs/sources.md` daban la cuenta de Tigresas por ilegible sin sesión. Hoy respondió. De ahí salió un punto nuevo en Medellín **con canal propio, teléfono y horario** — el único `verified` de la red en esta tanda. **No sirvió para Montería ni Riohacha:** esas piezas no están entre las publicaciones que devuelve el perfil.

**3. Apareció una primaria que nadie había buscado.** `eldoradoradio.cundinamarca.gov.co` es un subdominio `.gov.co` de la propia Gobernación de Cundinamarca. Publica el punto de la Plazoleta de La Paz **con horario**, y eso convierte un `reported` del seed en candidato a `verified` y respalda con primaria un horario que §6.4 de la tanda 1 desaconsejaba tomar de Infobae. **La lección de método es que la tanda 1 buscó `cundinamarca.gov.co` y no buscó sus subdominios.**

**4. Los tres 403 siguen cerrados: cuarto día.** `barranquilla.gov.co`, `cartagena.gov.co` y `santamarta.gov.co` volvieron a devolver HTTP 403. Eso **no es prueba de ausencia** y no se usó como tal. `atlantico.gov.co` cambió de fallo —ya resuelve por DNS, ahora falla la cadena de certificado TLS— lo cual es progreso diagnóstico y nada más.

---

## 2. Leads cerrados

### 2.1 Lead §7.1 — Rionegro: **CERRADO**, y es el mejor resultado del día

**Cómo se cerró.** No por el buscador, sino navegando la portada. `https://www.rionegro.gov.co/` enlaza la noticia directamente; la ruta real es `/publicaciones/1389/`, no la sección `/galeria/23/noticias/` que la tanda 1 exploró y que sirve contenido de 2024.

| | |
|---|---|
| **URL abierta** | [`https://rionegro.gov.co/publicaciones/1389/rionegro-se-suma-a-colombiaselevanta-para-apoyar-a-las-familias-afectadas-por-el-sismo/`](https://rionegro.gov.co/publicaciones/1389/rionegro-se-suma-a-colombiaselevanta-para-apoyar-a-las-familias-afectadas-por-el-sismo/) |
| **Leída** | 12 de agosto de 2026 |
| **Fecha visible en la página** | Publicación 12/08/2026 00:00:00 · Modificación 12/08/2026 09:47 a. m. |
| **Dominio** | `.gov.co` → entra por `OFFICIAL_SITES` en `scripts/validate-seed.ts` |

**Qué dice literalmente.** Titular: «Rionegro se suma a #ColombiaSeLevanta para apoyar a las familias afectadas por el sismo». Cuerpo: «Desde la estrategia Creesiendo, liderada por Mónica Gutiérrez, primera dama del Municipio de Rionegro, en articulación con el Concejo Municipal de Rionegro, la Corporación Presentes y la Gobernación de Antioquia, se invita a toda la ciudadanía a sumarse a la iniciativa #ColombiaSeLevanta».

Los tres puntos, tal cual:

- «Coliseo Iván Ramiro Córdoba, carrera 52 # 41-61.»
- «Casa CincoPasitos, carrera 50 # 51-19.»
- «Antiguo Colegio San Antonio, Oficina de Desarrollo Económico.»

Horario: «La recepción de donaciones se realizará de 7:30 a. m. a 4:30 p. m.»

Rechazo: «No se recibirán medicamentos que requieran prescripción médica.»

**Tres cosas que la primaria aporta y el medio no tenía.**

1. **La canasta completa, en tres bloques.** Alimentos no perecederos, elementos de aseo y primera necesidad, y elementos médicos y de primeros auxilios. La lista es notablemente más larga que la que publicó DiariOriente.
2. **Rionegro sí recibe ropa** —«ropa en buen estado organizada por tallas»— a diferencia de la campaña de Medellín, que la rechaza expresamente. Dos municipios vecinos con reglas opuestas: si se copia la canasta de uno al otro, se manda gente con ropa a una puerta que no la acepta.
3. **También recibe «elementos básicos para mascotas»**.

**Discrepancia menor que se conserva sin resolver.** La primaria escribe «Antiguo Colegio San Antonio». DiariOriente escribió «Antiguo Colegio San Antonio **de Pereira**» — San Antonio de Pereira es un corregimiento de Rionegro, y ese añadido es información geográfica útil que la primaria no tiene. **Se conserva el nombre de la primaria y se anota la referencia del medio en las notas**, sin mezclarlas en el campo `address`.

**Salvedad de evento, dicha en voz alta.** El artículo dice «el sismo que ha generado emergencias en diferentes zonas del país» y **no repite la fecha del terremoto**. Lo que ata el evento es (a) la fecha de publicación visible, 12/08/2026, posterior al sismo, y (b) que el mismo portal publicó el 10/08/2026 «Último reporte desde el Puesto de Mando Unificado del CMC de la Alcaldía de Rionegro por la emergencia ocasionada por el sismo». Es suficiente, pero conviene que quede escrito que la atadura es contextual y no literal.

---

### 2.2 Lead §7.5 — Montería: **CERRADO como `reported`, no como `verified`**

**Lo que se buscaba** era la pieza gráfica de Tigresas en canal propio. **No apareció.** El perfil de Instagram se dejó leer hoy (§2.4) pero **no contiene ninguna publicación sobre Montería**: se preguntó de forma explícita y la respuesta sobre el HTML fue que las cadenas «Montería» y «Coquivacoa» **no aparecen**.

Lo que sí se consiguió son **dos fuentes independientes, abiertas una por una, que coinciden en las tres direcciones**:

| Fuente | URL abierta | Fecha | Qué aporta |
|---|---|---|---|
| El Tiempo — Caribe | [`.../esta-en-la-region-caribe-y-no-sabe-donde-donar-...-3577588`](https://www.eltiempo.com/colombia/barranquilla/esta-en-la-region-caribe-y-no-sabe-donde-donar-estos-son-todos-los-puntos-de-acopio-habilitados-para-recaudar-ayudas-para-las-victimas-del-terremoto-3577588) | 11 ago 2026 12:01, act. 23:05 | **La atribución.** Bajo el encabezado «Montería lidera campaña departamental»: «A esta iniciativa se suman **tres puntos habilitados por Tigresas de la Patria** en la capital cordobesa» |
| Chicanoticias (Montería) | [`https://www.chicanoticias.com/2026/08/10/monteria-habilita-puntos-acopio/`](https://www.chicanoticias.com/2026/08/10/monteria-habilita-puntos-acopio/) | 10 ago 2026 | **El detalle.** Las mismas tres direcciones, más el número de apartamento del punto Norte y los nombres de las responsables |

Direcciones coincidentes en ambas:

| Punto | Dirección |
|---|---|
| Centro de Solidaridad | Calle 69 # 3-89, barrio El Recreo |
| Punto de Solidaridad Norte | Carrera 1A # 62-41 — **«Edificio Río, apartamento 1502»** (solo Chicanoticias) |
| Punto de Solidaridad Centro | Calle 69 # 1C-92 |

**Por qué `reported` y no `verified`.** El Tiempo es un medio citando a la entidad; Chicanoticias reproduce **una captura de WhatsApp**, no un canal institucional. La definición de `verified` del proyecto exige canal propio, y no lo hay. Es exactamente el mismo listón que se aplicó a los 31 puntos de §3.b, que sí lo tenían.

**Lo que Chicanoticias añade y no se carga.** Nombra responsables por punto —Carolina Correa en dos, Erika Castillo en el tercero— pero **no publica teléfonos**. `phone: null`. La tentación de rellenar con el número general de la campaña existe y se rechazó, por la regla 2.

**Un detalle que el revisor debe ver antes de publicar.** El punto Norte es **un apartamento en un edificio residencial** (Edificio Río, apto. 1502). Es coherente con el resto de la red de Tigresas —varios de los 31 puntos del seed son casas particulares— pero un pin sobre un apartamento en un piso 15 tiene un límite físico de precisión que la ficha debería reconocer.

---

### 2.3 Lead §7.6 — Riohacha: **CERRADO**, apareció quién lo opera

La tanda 1 lo dejó fuera con la razón correcta: **un centro de acopio sin entidad responsable no es publicable**. Hoy la entidad aparece, y el hallazgo tiene una historia que conviene contar porque es una trampa esquivada (§7.1).

**Fuente que lo resuelve:** [El Tiempo — «'Colombia, un solo corazón': así puede donar a la campaña liderada por la primera dama…»](https://www.eltiempo.com/politica/abelardo-de-la-espriella/colombia-un-solo-corazon-asi-puede-donar-a-la-campana-liderada-por-la-primera-dama-para-ayudar-a-los-damnificados-por-el-terremoto-3577595), **11 de agosto de 2026 11:27, act. 12:00**. Abierta el 12 de agosto.

Ese artículo publica **el listado de la campaña completa**, ciudad por ciudad. Riohacha aparece dentro de él: «Riohacha (Terrazas de Coquivacoa, Casa 15, barrio Coquivacoa).»

**Lo que convierte esa lista en evidencia y no en otra mención suelta:** se cotejó contra `data/centers.ts` y **coincide punto por punto con los registros de Tigresas que ya están en el seed**, con la nomenclatura exacta —Valledupar «Carrera 23 # 4-116, MZ A, Casa 14, Conjunto Residencial Callejas», Chía «Carrera 9 # 12-41, diagonal al CAM», Bucaramanga «Calle 54 # 21A-07, barrio La Concordia», Bogotá GAULA «Carrera 47 # 94-68» y CODABAS «Carrera 7 # 180-75»—. **La lista ES la red de Tigresas.** Que Riohacha esté dentro de ella es lo que permite atribuirle operador.

**Sigue como `reported`, no `verified`.** La atribución viene de un medio, no del canal propio, y el artículo **no rotula la línea de Riohacha con el nombre de la organización**: la atribución es por pertenencia a la lista. Es más débil que la de Montería, donde la frase nombra a Tigresas de forma expresa. Se dice aquí para que el revisor pueda discrepar con conocimiento.

---

### 2.4 Instagram de Tigresas — se dejó leer, y de ahí salió un punto nuevo en Medellín

`docs/sources.md` §3.d.4 registra Instagram como «contenido no legible sin sesión», incluida la cuenta en lista blanca. **Hoy respondió.** Se comprobó de forma adversarial: se preguntó primero si la página era un muro de inicio de sesión y qué cadenas literales contenía el HTML, antes de creerse nada.

**URL abierta:** [`https://www.instagram.com/tigresasdelapatriaoficial/`](https://www.instagram.com/tigresasdelapatriaoficial/) · leída el 12 de agosto de 2026 · cuenta **en la lista blanca `OFFICIAL_ACCOUNTS`** de `scripts/validate-seed.ts`.

**Publicación «ACOPIO TIGRESAS ANTIOQUIA», fechada el 12 de agosto de 2026.** Texto literal recuperado del HTML:

> «ACOPIO TIGRESAS ANTIOQUIA — DEFENSORES DE LA PATRIA — TIGRESAS MOVIÉNDOSE CON CORAZÓN — PUNTO DE CENTRO DE ACOPIO — NOMBRE DEL CENTRO DE ACOPIO: LA 80 — NÚMERO DE CO: +57 322 6531804 — DIRECCIÓN: Cra 80 #49a-39 frente de los Verdes de 80 — HORARIOS DE ATENCIÓN: 8:00 a.m. 8:00 p.m. — PERSONA RESPONSABLE DE RECIBIR DONACIONES: Esperanza Martínez, Liliana Zapata — ¿QUÉ PUEDES DONAR? Alimentos NO PERECEDEROS, Alimentos para mascotas, Artículos de Aseo, Pañales, pañitos, Leche de fórmula, Mantas, sábanas, Colchonetas, colchones, Linternas, Botiquines de primeros auxilios»

**Es la entidad responsable publicando en su propio canal, con teléfono y horario propios del punto.** Sería el **primer registro del proyecto con teléfono obtenido de canal propio en esta serie de tandas** — el hallazgo 1 de §10 de `docs/sources.md` cuenta 0 de 27 y la tanda 1 cerró 0 de 28.

**Tres salvedades que hay que leer antes de sellarlo.**

1. **La pieza no nombra el evento.** Se preguntó de forma explícita y la respuesta fue que no menciona terremoto ni sismo. Lo que ata el evento es la fecha —12 de agosto, dos días después— y la identidad de la campaña, que El Heraldo y El Tiempo documentan como «Colombia un solo corazón — Tigresas de la Patria / Tigresas Moviéndose con Corazón» por este terremoto. **Es exactamente el tipo de atadura contextual que §3.b advirtió**, porque esta red arrastra la campaña por Venezuela de junio de 2026. La fecha es lo único que discrimina, y discrimina bien.
2. **La pieza no publica municipio**, solo departamento («ANTIOQUIA»). El municipio **no se dedujo**: lo publica El Tiempo en el artículo de la campaña — «Medellín (Cra. 80 # 49A-39, frente a Los Verdes de la 80)» — y ese es el campo que se declara con esa fuente, no con la pieza.
3. **El `sourceUrl` es el perfil, no un enlace permanente.** No se localizó permalink `/p/` ni `/reel/`. El perfil pasa la lista blanca (`url.startsWith`), pero **§4.8 de `docs/sources.md` ya enseñó que citar una URL no es citar un contenido**: dentro de unos días esa publicación habrá bajado en el muro y el enlace no probará nada. Conviene capturar el permalink o un snapshot antes de publicar.

**Riesgo de colisión de pin.** `bodega-guayaquiliando-medellin` ya está en el seed en «Avenida 80 #52-88». El punto nuevo está en la Carrera 80 #49A-39. Son direcciones distintas de la misma vía, a pocas cuadras. **Revisar la geometría de los dos juntos** para que no queden apilados ni intercambiados.

---

### 2.5 Lead §7.9 — Pereira: **CERRADO en lo decisivo. Sí reciben.**

Esta era la pregunta que §3.b de `docs/sources.md` obliga a hacer en la zona golpeada, y tiene respuesta literal.

**Fuente A —** [El Tiempo, «Ayudas tras terremoto en Colombia: centros de acopio, bancos de sangre y alimentos…»](https://www.eltiempo.com/colombia/otras-ciudades/como-ayudar-tras-terremoto-de-7-4-en-colombia-estos-son-los-centros-de-acopio-bancos-de-sangre-y-alimentos-canales-oficiales-y-puntos-de-donacion-3577631), **11 ago 2026 14:05, act. 12 ago 07:55**. Abierta el 12 de agosto. Texto literal:

> «En la mañana de este martes, la **Alcaldía de Pereira** puso a disposición varios **puntos de acopio** para todas las personas que **quieran llevar donaciones**. De acuerdo con la Alcaldía, los interesados pueden donar ropa para niños y adultos de todas las edades "en perfecto estado", así como recipientes desechables para la comida, elementos de aseo personal, cobijas, colchonetas y alimentos para perros y gatos.»

**«Puso a disposición… para todas las personas que quieran llevar donaciones» resuelve la duda: RECIBEN.** No son puntos donde solo se reparte.

**Fuente B —** [El Tiempo, «Este es el mapa completo de los centros de acopio habilitados en Colombia…»](https://www.eltiempo.com/datos/este-es-el-mapa-completo-de-los-centros-de-acopio-habilitados-en-colombia-para-ayudar-a-los-damnificados-del-terremoto-de-magnitud-7-3577654), **11 ago 2026 15:29, act. 12 ago 10:14**. Abierta el 12 de agosto. Texto literal:

> «En Risaralda, Pereira, se habilitaron siete Centros de Atención (CAFE): Consota, Perla del Otún, El Remanso, Kennedy, Ormaza (calle 3 bis #5-38), San Nicolás (carrera 14 bis #28-38) y Comuna del Café (carrera 3 con calle 59 A).»

**Solo se proponen TRES de los siete, y esto es lo importante de este apartado.** La fuente abierta publica nomenclatura para **tres**: Ormaza, San Nicolás y Comuna del Café. De los otros cuatro publica **solo el nombre**.

Circulan por ahí direcciones para esos cuatro —«Mz 7 y Mz 8 Villa Consota, Cuba», «diagonal a la iglesia de los 2.500 lotes», «avenida principal del barrio El Remanso, al lado del centro de salud», «parque principal de Kennedy»—. **Esas direcciones no están en ninguna fuente que yo haya abierto: vienen de resúmenes automáticos de buscador.** Por la regla 1 del proyecto, **no se publican**. Van a §6 como lead, con la anotación de que hay que abrir la fuente que las contenga antes de usarlas. Este proyecto lleva cuatro datos fabricados documentados por esa vía exacta.

**Dos particularidades de la canasta de Pereira que la ficha debe llevar.**

- **Pereira SÍ recibe ropa**, con una condición literal: «en perfecto estado». Es lo contrario de la campaña de Medellín y de la de Manizales, que la rechazan.
- Pide **«recipientes desechables para la comida»**, que no aparece en ninguna otra canasta del seed. Es señal de que estos puntos alimentan a damnificados locales, no solo acopian para enviar fuera — coherente con que Pereira sea una de las cuatro ciudades más golpeadas.

**No hay horario publicado.** `scheduleText: null` en los tres.

**`pereira.gov.co` no sirvió.** El dominio responde, pero su portada solo muestra un banner «Líneas de emergencia atención terremoto» sin puntos de acopio, la ruta `/publicaciones/` devuelve **404**, y una búsqueda restringida al dominio no devuelve nada de esta emergencia. La primaria de los CAFE **no se localizó**; por eso los tres van `reported`.

---

### 2.6 Lead §7.7 — Barranquilla institucional: **CERRADO**, y aparecieron dos puntos, no uno

Se persiguieron los dos institucionales del grupo, como pedía el encargo. Los siete comerciales se dejaron como están.

**Fuente —** [El Heraldo, «Arquidiócesis de Barranquilla activa ayuda para damnificados por el sismo»](https://www.elheraldo.co/sociedad/2026/08/11/arquidiocesis-de-barranquilla-activa-ayuda-para-damnificados-por-el-sismo/), **11 de agosto de 2026**. Abierta el 12 de agosto.

Es una **nota dedicada**, no una línea en un listado, y eso importa: identifica al operador (Secretariado de Pastoral Social Cáritas Barranquilla), el evento con precisión —«el sismo de magnitud 7,4 del 10 de agosto con epicentro en San José del Palmar, Chocó»—, la articulación con el **Corredor Humanitario de ABACO**, la canasta desglosada y un horario común.

**Dos puntos, y el segundo la tanda 1 no lo tenía:**

| Punto | Dirección | Horario |
|---|---|---|
| **Secretariado de Pastoral Social Cáritas Barranquilla** | Carrera 44 # 53-78, barrio Boston | Lunes a viernes, 8:00 a. m. – 4:00 p. m. |
| Banco Arquidiocesano de Alimentos | Calle 53C # 31-121, **barrio Lucero** | Lunes a viernes, 8:00 a. m. – 4:00 p. m. |

El de Pastoral Social **no estaba en la lista de nueve de El Heraldo** que la tanda 1 revisó. El barrio del Banco de Alimentos («Lucero») tampoco constaba.

**Siguen `reported`, no `verified`.** El Heraldo es un medio citando a la entidad. Un canal propio de la Arquidiócesis o de Cáritas Barranquilla no se localizó, y aunque se localizara, **su dominio no está en `OFFICIAL_SITES`**: ascenderlos exigiría una entrada nueva en la lista blanca, que es una decisión humana y consciente, no algo que este documento pueda dar por hecho.

**Los dos puntos de Uninorte: NO se proponen.** El artículo de El Heraldo del 12 de agosto los vuelve a mencionar, pero sigue sin haber publicación de la universidad en su propio canal, `uninorte.edu.co` no está en la lista blanca, y las ubicaciones publicadas —«Bienestar Organizacional, bloque A piso 3» y «Centro para el Desarrollo, Liderazgo y Participación, Coliseo piso 2»— **son ubicaciones dentro de un campus, no direcciones**. Dos pines apilados sobre el centroide de Uninorte con la información más pobre del seed. Se quedan como lead.

---

### 2.7 Lead §7.3 — Cúcuta: **lo que se buscaba NO se cerró; apareció algo mejor**

**El Banco de Alimentos de Cúcuta sigue sin fuente abierta.** `areacucuta.com` volvió a devolver **HTTP 403** al acceso directo. No se localizó canal propio del Banco de Alimentos de Cúcuta. La dirección que circula —calle 2AN #1-26, barrio Pescadero, detrás del SENA— **sigue procediendo de un resumen de buscador y sigue sin publicarse**. Se comprobó además que el artículo nacional de El Tiempo, abierto entero, **no menciona Cúcuta ni ese banco**.

**Pero Cúcuta deja de tener un solo punto igualmente.**

**Fuente —** [La Opinión (Cúcuta), «¿Quiere ayudar a los damnificados por el terremoto? Estos son los puntos de acopio en Cúcuta»](https://laopinion.co/cucuta/quiere-ayudar-los-damnificados-por-el-terremoto-estos-son-los-puntos-de-acopio-en-cucuta), **martes 11 de agosto de 2026**. Abierta y transcrita el 12 de agosto.

Abre nombrando el evento sin ambigüedad: «El terremoto que sacudió al país el lunes 10 de agosto, con una magnitud de 7,4 y epicentro en Chocó». Dos puntos publicables:

| Punto | Operador | Dirección | Horario | Teléfono |
|---|---|---|---|---|
| **Biblioteca Pública Julio Pérez Ferrero** | La propia biblioteca | Avenida 1 # 12-35, sector La Playa | **`null`** — la fuente solo dice «horario extendido» | `null` |
| **Moiras** | Organización Moiras | Calle 0BN # 4E-102, quinta Bosch | Lunes a sábado, 8:30 a. m. – 7:00 p. m. | 301 444 0459 |

**Sobre el «horario extendido» de la biblioteca.** Es literalmente lo que dice la fuente y **no es un horario**. Convertirlo en «8:00 a. m. – 8:00 p. m.» sería inventarlo. Va `null` y la nota lo dice.

**Sobre el teléfono de Moiras, que es una excepción y hay que justificarla.** El proyecto decidió no cargar números generales de entidad porque implican «llama a este centro», que es falso cuando la entidad tiene doce puntos. Aquí la frase de la fuente es «Para resolver dudas sobre **esta campaña** está disponible el número 301 444 0459» y **Moiras tiene un único punto**: llamar a ese número es literalmente la forma de confirmar antes de ir. Se carga, y se marca para que el revisor pueda quitarlo si considera que el precedente no conviene.

**Lo que NO se propuso de esa fuente, y por qué.** La **Diócesis de Cúcuta** anunció recolección en **sus 110 parroquias el domingo 16 de agosto**. No se propone: son 110 ubicaciones sin una sola dirección publicada y una jornada de un día. Modelarlo como centro de acopio produciría un pin falso sobre el centroide de la ciudad con vigencia de 24 horas. La **Cruz Roja** aparece solo con canales económicos, que por §8 de `docs/sources.md` no se modelan como centros.

**Dato de restricción reutilizable:** la Diócesis «aclaró que **no se deben donar ropa ni medicamentos**». Es de la jornada parroquial, no de los dos puntos propuestos, y **no se trasladó** a sus fichas.

---

### 2.8 Lead §7.8 — Ibagué: **no hay segunda tanda de la Alcaldía; hay otra cosa**

Se buscó de forma dirigida una campaña nueva de la Alcaldía de Ibagué después del vencimiento de las 2:00 p. m. del martes 11. **No se encontró ninguna.** Los cuatro puntos —CC La Estación, Castiagro, CC Multicentro y CC Acqua— siguen sin reapertura anunciada y **no se proponen**.

Lo que sí apareció, en el artículo de campaña de El Tiempo ya citado (3577595, abierto el 12 de agosto), es un punto de la red de Tigresas que **no está en el seed**:

> «Ibagué (Centro Comercial Plazas del Bosque Avenida Ambalá 69-80)»

Ibagué pasa de 1 a 2 puntos, y el que gana es el que **sí tiene dirección con nomenclatura** — el que ya tenía, `banco-arquidiocesano-alimentos-ibague`, arrastra desde §7.3 de `docs/sources.md` el problema de la dirección incompleta.

---

### 2.9 Lead §7.10 — los tres 403: **siguen cerrados, cuarto día**

| Dominio | Resultado el 12 de agosto (tanda 2) | Qué se sigue perdiendo |
|---|---|---|
| `barranquilla.gov.co` | **HTTP 403** | La primaria de Barranquillita |
| `cartagena.gov.co` | **HTTP 403** | La primaria del Coliseo Bernardo Caraballo |
| `santamarta.gov.co` | **HTTP 403** | La primaria de la Ogricc |

**No es prueba de ausencia** y no se usó como tal. Los tres centros siguen `reported` y con la evidencia circunstancial que ya tenían.

### 2.10 Lead §7.2 — Atlántico: **no cerrado, pero el fallo cambió y eso es información**

`atlantico.gov.co` **ya no da `ENOTFOUND`**. El DNS resuelve, el buscador tiene indexadas páginas actuales del dominio, y el acceso directo falla ahora con **`unable to verify the first certificate`**: la cadena de certificado TLS del sitio no valida. Se probaron `https://www.atlantico.gov.co/`, `https://atlantico.gov.co/` y `https://www.atlantico.gov.co/index.php/noticias`, las tres con el mismo fallo.

**No es lo mismo que antes.** La tanda 1 no podía descartar que el dominio hubiera desaparecido; hoy consta que está en pie y publicando. Lo que falta es un cliente que tolere esa cadena de certificado.

**Lo que sí avanzó del punto del Atlántico** está en §3.4: dos datos nuevos de El Heraldo sobre la Galería de la Plaza de la Paz.

### 2.11 Lead §7.4 — Yopal: **no cerrado**

No se localizaron las direcciones de los cinco puntos religiosos ni publicación en un dominio propio de la Alcaldía de Yopal o de la Diócesis. La recomendación de §2.7 de la tanda 1 —publicar solo `alcaldia-yopal` y dejar los otros cinco como leads— **se mantiene íntegra**.

---

## 3. Ascensos y correcciones sobre centros que YA están en `data/centers.ts`

> **Esta sección vale más que cualquier centro nuevo**: son puntos ya publicados que ganan sello o ganan un campo. Y por eso mismo se aplica la regla de §5.3 de `docs/sources.md`: **antes de proponer un ascenso hay que mirar la geometría del pin**, porque promover un centro cuyo mapa apunta a kilómetros es peor que dejarlo en `reported`. Se hizo, y se reporta abajo.

### 3.1 ⭐ `gobernacion-cundinamarca-plaza-de-la-paz` — **`reported` → `verified`**

**Cómo apareció.** La tanda 1 buscó en `cundinamarca.gov.co` y no encontró la publicación. **No buscó en los subdominios.** `eldoradoradio.cundinamarca.gov.co` es la emisora institucional de la Gobernación de Cundinamarca, **en el dominio propio de la entidad**, y ahí sí está.

| Campo | Valor propuesto |
|---|---|
| `sourceName` | `Gobernación de Cundinamarca — El Dorado Radio 99.5 FM (emisora institucional)` |
| `sourceUrl` | `https://eldoradoradio.cundinamarca.gov.co/noticias/cundinamarca-habilita-punto-de-recepcion-de-ayudas-para-familias-afectadas-por-el-sismo/` |
| `sourcePublishedAt` | `2026-08-11` |
| `verificationStatus` | `reported` → **`verified`** |

**Qué dice literalmente.** Fecha visible: «agosto 11, 2026». Evento: «el sismo ocurrido el pasado **10 de agosto** en varios departamentos del país». Cuerpo: «La Gobernación de Cundinamarca, en articulación con el Ministerio del Interior, habilitó un punto de recepción de ayudas humanitarias», en «la **Plazoleta de La Paz de la Gobernación de Cundinamarca**», desde el 11 de agosto, «entre las **8:00 a. m. y las 5:00 p. m.**», con destino a «Risaralda, Chocó, Valle del Cauca, Quindío y Caldas». Artículos: «alimentos no perecederos, agua potable, productos de higiene y aseo personal, elementos de limpieza, medicamentos e insumos básicos para atención y cuidado, y **ropa nueva**».

**Beneficio colateral: resuelve una advertencia de la tanda 1.** §6.4 de aquel documento anotó el horario «8:00 a. m. – 5:00 p. m.» desde Infobae y advirtió, con razón, que no debía entrar sin segunda fuente. **Ahora tiene primaria en el dominio de la propia entidad y coincide exactamente.** Se propone cargar `scheduleText: "8:00 a. m. – 5:00 p. m."`.

**Lo que NO se propone tocar, también por §6.4.** Infobae daba además la dirección «Calle 26 No. 51-53, sector CAN». **La primaria no publica nomenclatura**, solo «Plazoleta de La Paz de la Gobernación de Cundinamarca». Mover el `address` con el dato de un agregador movería un pin sin respaldo primario, que es justo lo que §6.4 desaconsejaba. **Se deja como está.**

**Revisión de geometría, obligatoria antes del ascenso (§5.3).**

```
lat 4.640803 · lon -74.096969 · precision "exact"
displayName: "Gobernación de Cundinamarca, Avenida Calle 26, Salitre Oriental,
              Localidad Teusaquillo, Bogotá, Distrito Capital, 111321, Colombia"
```

**Veredicto: coherente, con una reserva.** El pin cae sobre un POI llamado exactamente como la entidad, en Teusaquillo / Salitre Oriental, que es el sector del CAN donde está la sede — y eso concuerda tanto con la primaria («la Gobernación») como con la referencia de Infobae («sector CAN»). No hay error de kilómetros como el de `acsc-bogota`.

La reserva es doble y hay que decirla: **(a)** la etiqueta `exact` descansa sobre una coincidencia de POI con nombre propio, que es literalmente el modo de fallo que produjo los errores de Santa Marta y de Librería Delfos; **(b)** el punto de acopio no es el edificio sino **la plazoleta exterior**. Están en el mismo predio, así que el desplazamiento es de decenas de metros, no de kilómetros. **Recomendación: ascender, y de paso comprobar el pin contra imagen satelital**, que es barato y cierra la reserva.

**Reserva editorial que decide un humano, no este documento.** ¿Cuenta la emisora institucional de una gobernación como «canal propio de la entidad»? Mecánicamente sí: es su dominio y `scripts/validate-seed.ts` lo acepta por la regla `.gov.co`. Editorialmente es un matiz — es un medio, propiedad de la entidad. **No es el caso de Prensa Libre Casanare**, que la tanda 1 rechazó con razón por ser un medio privado republicando boletines en su propio dominio; aquí el dominio es de la Gobernación. Aun así, si el proyecto quiere sostener una lectura estricta de «canal propio», **este es el registro que hay que revisar primero**.

**Señal negativa que conviene registrar, sin actuar sobre ella.** La publicación de la Gobernación lista **un solo punto**. **No menciona la Empresa de Licores de Cundinamarca en Cota**, que está en el seed como `empresa-licores-cundinamarca` (`reported`, vía El Espectador). Tampoco menciona Soacha. Es el mismo patrón del Batallón Girardot en §3.d.2: la primaria confirma unos y calla sobre otro. **Ausencia no es cierre** y no se propone bajarlo, pero queda anotado.

### 3.2 Mejoras de campo sobre centros existentes, **sin cambio de estado**

Datos que aparecieron al perseguir otras ciudades. **Este documento no los aplica**; se registran para que alguien decida.

| Slug en el seed | Campo | Dato encontrado | Fuente abierta el 12 ago | ¿Recomendado? |
|---|---|---|---|---|
| `gobernacion-cundinamarca-plaza-de-la-paz` | `scheduleText` | 8:00 a. m. – 5:00 p. m. | El Dorado Radio (primaria, §3.1) | **Sí** — ahora tiene primaria |
| `gobernacion-cundinamarca-plaza-de-la-paz` | `acceptedItems` | Añade «ropa nueva», «medicamentos», «elementos de limpieza» | El Dorado Radio (primaria) | **Sí, con cuidado** — «ropa **nueva**» es una condición, no un artículo; publicar «ropa» a secas invita a llevar usada |
| `centro-acopio-barranquillita` | — | Reconfirma «carrera 43 No. 6-120, Barranquillita, 24 horas» | El Tiempo Caribe (3577588) | Sin cambio: refuerza, no asciende |
| `coliseo-bernardo-caraballo-cartagena` | `scheduleText` | 8:00 a. m. – 5:00 p. m. | El Tiempo Caribe (3577588), **abierto y leído por mí** | **No todavía** — es el mismo agregador que ya citaba §6.4 de la tanda 1, no una segunda fuente independiente |
| `ogricc-santa-marta` | `scheduleText` | 8:30 a. m. – 5:30 p. m. | El Tiempo Caribe (3577588), abierto | **No todavía** — mismo motivo |

> La diferencia entre las dos últimas filas y la primera es la que importa: el horario de Cundinamarca subió de nivel porque apareció **la entidad publicándolo**; los de Cartagena y Santa Marta siguen apoyados en **un solo agregador**, por más que esta vez lo haya abierto y transcrito yo en lugar de fiarme del resumen. Abrir la fuente mejora la certeza de que el medio dice eso; no mejora la autoridad del medio.

### 3.3 Lo que se buscó como ascenso y **no dio nada**

| Slug | Primaria buscada | Resultado |
|---|---|---|
| `parque-principal-itagui` | `itagui.gov.co` | Responde, pero una búsqueda restringida al dominio no devuelve nada de esta emergencia. Lo que sí publica en estas fechas son las fiestas del municipio, del 8 al 17 de agosto |
| `empresa-licores-cundinamarca` | `cundinamarca.gov.co` y subdominios | La primaria hallada **no lo menciona** (§3.1) |
| `centro-acopio-barranquillita` · `coliseo-bernardo-caraballo-cartagena` · `ogricc-santa-marta` | dominios distritales | **HTTP 403**, cuarto día |
| `tigresas-casanare` (`disputed`) | listado de la campaña en El Tiempo (3577595) | **La «Calle 12 #21-44» de Yopal NO aparece** en el listado de la red, que sí reproduce con exactitud el resto de puntos del seed. Es una señal débilmente negativa, insuficiente para descartar. **La llamada al +57 310 310 4757 sigue siendo la única vía** |

### 3.4 Datos nuevos para candidatos de la **tanda 1** (no del seed)

No son ascensos del seed, pero afectan a fichas que están esperando revisión:

- **`punto-acopio-gobernacion-atlantico` gana una dirección.** [El Heraldo, «'Colombia un solo corazón'…»](https://www.elheraldo.co/colombia/2026/08/11/un-solo-corazon-por-colombia-asi-puede-donar-y-brindar-ayuda-a-los-afectados-por-el-terremoto/), 11 de agosto, abierto el 12: «Galería Plaza de la Paz, ubicada en **la calle 53, entre carrera 45 y 46**». La tanda 1 solo tenía «Galería de la Plaza de la Paz».
- **El horario del Atlántico, medio resuelto y no lo suficiente.** [El Heraldo del 12 de agosto](https://www.elheraldo.co/atlantico/2026/08/12/colombia-se-une-para-ayudar-a-los-damnificados-por-el-terremoto/), abierto: «de **6:00 a. m. a 6:00 p. m.**». Van dos artículos con 6-6 contra uno con «a partir de las 8:00». **Recomendación: seguir con `null`.** Son tres piezas del mismo medio y lo más probable es que las dos coincidentes reproduzcan el mismo listado; eso es una fuente contándose a sí misma, no dos fuentes. La discrepancia que documentó la tanda 1 sigue sin resolverse por vía independiente.

---

## 4. Candidatos nuevos

**16 candidatos.** Cada ficha declara qué campo salió de qué fuente. Ninguno trae coordenadas.

### 4.1 Rionegro (Antioquia) — 3, los 3 `verified` · municipio nuevo en el seed

Sustituyen a los tres candidatos homónimos de la tanda 1, que iban `reported` con DiariOriente. **Mismos slugs**: son los mismos puntos con la fuente correcta. Direcciones, horario, canasta y rechazo, todos de la primaria (§2.1). `phone: null`, `endsAt: null`: la primaria no los publica.

### 4.2 Montería (Córdoba) — 3, `reported`

Direcciones de dos fuentes independientes coincidentes; atribución a Tigresas de la Patria por El Tiempo. Sin horario y sin teléfono en ninguna de las dos (§2.2). Canasta: la que publica Chicanoticias para el conjunto de los puntos, **no desglosada por punto**.

### 4.3 Riohacha (La Guajira) — 1, `reported`

Operador atribuido por pertenencia al listado de la campaña (§2.3). Sin horario, sin teléfono. Canasta: la general de la red de Tigresas que ya usa el seed.

### 4.4 Medellín (Antioquia) — 1, `verified`

Único `verified` por canal propio de esta tanda. **Teléfono y horario salen de la pieza de Instagram; el municipio sale de El Tiempo; los artículos de la pieza** (§2.4).

### 4.5 Ibagué (Tolima) — 1, `reported`

Del listado de la campaña en El Tiempo (§2.8). Sin horario, sin teléfono.

### 4.6 Cúcuta (Norte de Santander) — 2, `reported`

De La Opinión, abierta y transcrita (§2.7). El de Moiras trae teléfono y horario; el de la biblioteca, ninguno de los dos.

### 4.7 Barranquilla (Atlántico) — 2, `reported`

De la nota dedicada de El Heraldo (§2.6). Los dos con horario. Canasta desglosada, que es raro en este proyecto.

### 4.8 Pereira (Risaralda) — 3, `reported`

**Solo los tres con nomenclatura publicada.** Sin horario. Canasta de El Tiempo, con la condición literal «en perfecto estado» sobre la ropa (§2.5).

---

## 5. Bloque `SeedCenter[]` listo para revisión

> **Léelo antes de pegarlo.** Todo va con `latitude: null` y `longitude: null` a propósito: la geocodificación es un paso aparte con revisión manual una por una. El modo de fallo más peligroso del proyecto es un pin equivocado con etiqueta de alta confianza, y ya ocurrió tres veces.
>
> **Un solo registro trae teléfono de canal propio** (`tigresas-medellin-la-80`) y uno más trae el número de una campaña de un solo punto (`moiras-cucuta`). Los otros catorce van con `phone: null`, por la misma razón de siempre.

```ts
import type { SeedCenter } from "../data/centers";

/** Tanda 2 de cobertura del 12 de agosto de 2026. Revisión humana pendiente. */
const VERIFIED_AT_TANDA2 = "2026-08-12T22:00:00-05:00";

// --- Rionegro: canasta publicada por la Alcaldía en su propio dominio --------
// La lista es de la CAMPAÑA, no de cada punto: la primaria no la desglosa.
// OJO: incluye ROPA, a diferencia de la campaña de Medellín, que la rechaza.
const RIONEGRO_ITEMS = [
  "Agua potable",
  "Bebidas de hidratación",
  "Arroz",
  "Aceite",
  "Pasta",
  "Lentejas",
  "Fríjol",
  "Garbanzo",
  "Arveja",
  "Alimentos enlatados",
  "Harina de maíz y trigo",
  "Panela",
  "Chocolate",
  "Avena",
  "Coladas",
  "Cereales",
  "Galletas",
  "Leche en polvo",
  "Leche UHT",
  "Alimentos listos para el consumo",
  "Alimentos infantiles",
  "Jabón",
  "Champú",
  "Cepillos dentales",
  "Crema dental",
  "Toallas higiénicas",
  "Papel higiénico",
  "Pañales para bebé y adulto",
  "Toallitas húmedas",
  "Crema antipañalitis",
  "Toallas",
  "Colchonetas",
  "Mantas",
  "Cobijas",
  "Sábanas limpias",
  "Ropa en buen estado organizada por tallas",
  "Linternas",
  "Baterías",
  "Guantes",
  "Tapabocas",
  "Elementos básicos para mascotas",
  "Guantes desechables",
  "Agua estéril",
  "Suero fisiológico",
  "Gasas",
  "Algodón",
  "Alcohol",
  "Soluciones antisépticas",
  "Botiquines de primeros auxilios",
  "Analgésicos de venta libre",
  "Termómetros",
];

const RIONEGRO_SOURCE = {
  sourceName:
    "Alcaldía de Rionegro — «Rionegro se suma a #ColombiaSeLevanta para apoyar a las familias afectadas por el sismo» (publicación propia)",
  sourceUrl:
    "https://rionegro.gov.co/publicaciones/1389/rionegro-se-suma-a-colombiaselevanta-para-apoyar-a-las-familias-afectadas-por-el-sismo/",
  sourcePublishedAt: "2026-08-12",
};

const RIONEGRO_NOTA =
  "VERIFICADO EN CANAL PROPIO el 12 de agosto de 2026: la Alcaldía de Rionegro publica este punto en su propio dominio, con dirección y horario, dentro de la iniciativa #ColombiaSeLevanta liderada por la estrategia Creesiendo (primera dama municipal Mónica Gutiérrez), en articulación con el Concejo Municipal, la Corporación Presentes y la Gobernación de Antioquia. SALVEDAD DE EVENTO: el artículo dice «el sismo que ha generado emergencias en diferentes zonas del país» y NO repite la fecha del terremoto; lo que ata el evento es la fecha de publicación visible (12/08/2026) y que el mismo portal publicó el 10/08/2026 el reporte del Puesto de Mando Unificado «por la emergencia ocasionada por el sismo». La lista de artículos es de la campaña completa, no de este punto. LA FUENTE NO PUBLICA TELÉFONO. ATENCIÓN AL MODELAR: Rionegro SÍ recibe ropa en buen estado, a diferencia de la campaña de Medellín, que la rechaza expresamente.";

// --- Tigresas: canasta general de la red, ya usada en el seed ----------------
const TIGRESAS_ITEMS = [
  "Agua potable",
  "Alimentos no perecederos",
  "Elementos de aseo personal",
  "Sábanas",
  "Colchonetas",
  "Cobijas",
  "Ropa",
  "Artículos para bebés",
  "Linternas",
  "Baterías",
  "Guantes",
  "Tapabocas",
  "Botiquines",
  "Alimentos para mascotas",
];

const TIGRESAS_MONTERIA_SOURCE = {
  sourceName:
    "Tigresas de la Patria — red «Colombia, un solo corazón», vía El Tiempo",
  sourceUrl:
    "https://www.eltiempo.com/colombia/barranquilla/esta-en-la-region-caribe-y-no-sabe-donde-donar-estos-son-todos-los-puntos-de-acopio-habilitados-para-recaudar-ayudas-para-las-victimas-del-terremoto-3577588",
  sourcePublishedAt: "2026-08-11",
};

const TIGRESAS_MONTERIA_NOTA =
  "DOS FUENTES INDEPENDIENTES COINCIDEN EN LA DIRECCIÓN, abiertas una por una el 12 de agosto de 2026: El Tiempo (11 ago), que bajo el encabezado «Montería lidera campaña departamental» dice literalmente «A esta iniciativa se suman tres puntos habilitados por Tigresas de la Patria en la capital cordobesa»; y Chicanoticias, medio de Montería (10 ago), que publica las mismas tres direcciones. NO ES «verified»: El Tiempo es un medio citando a la entidad y Chicanoticias reproduce una captura de WhatsApp; NO se localizó la pieza en el canal propio de Tigresas. Se comprobó de forma explícita que el perfil de Instagram de la red, leído el 12 de agosto, NO contiene ninguna publicación sobre Montería. NINGUNA de las dos fuentes publica horario ni teléfono: Chicanoticias nombra a las responsables de recibir donaciones pero no da números. La lista de artículos es la general del conjunto de puntos, no de este en particular. ADVERTENCIA DE RECICLAJE: esta red arrastra la campaña por los sismos de Venezuela de junio de 2026; lo que discrimina aquí es la fecha de ambas fuentes y que las dos nombran este terremoto. Confirma antes de llevar cargas grandes.";

const EL_HERALDO_ARQUIDIOCESIS = {
  sourceName:
    "Secretariado de Pastoral Social Cáritas Barranquilla / Arquidiócesis de Barranquilla, vía El Heraldo",
  sourceUrl:
    "https://www.elheraldo.co/sociedad/2026/08/11/arquidiocesis-de-barranquilla-activa-ayuda-para-damnificados-por-el-sismo/",
  sourcePublishedAt: "2026-08-11",
};

const ARQUIDIOCESIS_ITEMS = [
  "Agua",
  "Arroz",
  "Aceite",
  "Pasta",
  "Lentejas",
  "Fríjoles",
  "Garbanzos",
  "Arvejas",
  "Enlatados",
  "Harina",
  "Panela",
  "Chocolate",
  "Frutos secos",
  "Avena",
  "Leche en polvo",
  "Leche UHT",
  "Jabón",
  "Champú",
  "Cepillos dentales",
  "Crema dental",
  "Toallas higiénicas",
  "Papel higiénico",
  "Toallitas húmedas",
  "Crema antipañalitis",
  "Pañales",
];

const PEREIRA_ITEMS = [
  "Ropa para niños y adultos en perfecto estado",
  "Recipientes desechables para la comida",
  "Elementos de aseo personal",
  "Cobijas",
  "Colchonetas",
  "Alimentos para perros y gatos",
];

const PEREIRA_SOURCE = {
  sourceName: "Alcaldía de Pereira, vía El Tiempo",
  sourceUrl:
    "https://www.eltiempo.com/datos/este-es-el-mapa-completo-de-los-centros-de-acopio-habilitados-en-colombia-para-ayudar-a-los-damnificados-del-terremoto-de-magnitud-7-3577654",
  sourcePublishedAt: "2026-08-11",
};

const PEREIRA_NOTA =
  "RECIBE DONACIONES, comprobado el 12 de agosto de 2026: El Tiempo (11 ago, act. 12 ago) dice literalmente que «la Alcaldía de Pereira puso a disposición varios puntos de acopio para todas las personas que quieran llevar donaciones». Esa frase resuelve la distinción que §3.b de docs/sources.md obliga a hacer en la zona golpeada: NO es un punto donde solo se reparte. La Alcaldía habilitó SIETE CAFE; solo se proponen los tres para los que la fuente abierta publica nomenclatura. LA FUENTE NO PUBLICA HORARIO NI TELÉFONO. ATENCIÓN AL MODELAR: Pereira SÍ recibe ropa, con la condición literal «en perfecto estado», al revés que Medellín y Manizales; y pide «recipientes desechables para la comida», que no aparece en ninguna otra canasta del seed y sugiere que estos puntos alimentan a damnificados locales. NO se localizó primaria: pereira.gov.co responde pero su ruta /publicaciones/ devuelve 404 y no publica los CAFE.";

export const CANDIDATOS_TANDA2: SeedCenter[] = [
  // === RIONEGRO (Antioquia) — 3, verified, municipio nuevo ==================
  {
    slug: "coliseo-ivan-ramiro-cordoba-rionegro",
    name: "Coliseo Iván Ramiro Córdoba",
    organization:
      "Alcaldía de Rionegro — estrategia Creesiendo, campaña #ColombiaSeLevanta",
    type: "general",
    department: "Antioquia",
    municipality: "Rionegro",
    address: "Carrera 52 #41-61",
    geocodeQuery: "Carrera 52 # 41-61, Rionegro, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: RIONEGRO_ITEMS,
    urgentNeeds: ["Alimentos no perecederos", "Agua potable", "Colchonetas"],
    rejectedItems: [
      "Medicamentos que requieran prescripción médica",
      "Productos vencidos",
      "Alimentos perecederos",
    ],
    scheduleText: "7:30 a. m. – 4:30 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...RIONEGRO_SOURCE,
    verificationStatus: "verified",
    verificationNotes: RIONEGRO_NOTA,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
  {
    slug: "casa-cincopasitos-rionegro",
    name: "Casa CincoPasitos",
    organization:
      "Alcaldía de Rionegro — estrategia Creesiendo, campaña #ColombiaSeLevanta",
    type: "general",
    department: "Antioquia",
    municipality: "Rionegro",
    address: "Carrera 50 #51-19",
    geocodeQuery: "Carrera 50 # 51-19, Rionegro, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: RIONEGRO_ITEMS,
    urgentNeeds: ["Alimentos no perecederos", "Agua potable", "Colchonetas"],
    rejectedItems: [
      "Medicamentos que requieran prescripción médica",
      "Productos vencidos",
      "Alimentos perecederos",
    ],
    scheduleText: "7:30 a. m. – 4:30 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...RIONEGRO_SOURCE,
    verificationStatus: "verified",
    verificationNotes: RIONEGRO_NOTA,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
  {
    // EL MÁS DÉBIL DE LOS TRES: la primaria no publica nomenclatura, solo el
    // nombre del inmueble y la oficina. Si el revisor recorta Rionegro, es este.
    slug: "antiguo-colegio-san-antonio-rionegro",
    name: "Antiguo Colegio San Antonio — Oficina de Desarrollo Económico",
    organization:
      "Alcaldía de Rionegro — estrategia Creesiendo, campaña #ColombiaSeLevanta",
    type: "general",
    department: "Antioquia",
    municipality: "Rionegro",
    address: "Antiguo Colegio San Antonio, Oficina de Desarrollo Económico",
    geocodeQuery: "San Antonio de Pereira, Rionegro, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: RIONEGRO_ITEMS,
    urgentNeeds: ["Alimentos no perecederos", "Agua potable", "Colchonetas"],
    rejectedItems: [
      "Medicamentos que requieran prescripción médica",
      "Productos vencidos",
      "Alimentos perecederos",
    ],
    scheduleText: "7:30 a. m. – 4:30 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...RIONEGRO_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${RIONEGRO_NOTA} LA PRIMARIA NO PUBLICA NOMENCLATURA para este punto: escribe «Antiguo Colegio San Antonio, Oficina de Desarrollo Económico». DiariOriente (11 ago) lo llama «Antiguo Colegio San Antonio DE PEREIRA», que es un corregimiento de Rionegro y es la única pista geográfica disponible; se usó SOLO en «geocodeQuery», no en el nombre ni en la dirección, porque la primaria no lo dice. Su pin no puede ser mejor que «approximate». Si el revisor considera que no basta como dirección publicable, ESTE es el que hay que dejar fuera.`,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },

  // === MONTERÍA (Córdoba) — 3, reported =====================================
  {
    slug: "tigresas-monteria-centro-solidaridad",
    name: "Centro de Solidaridad — Montería",
    organization: "Tigresas de la Patria",
    type: "general",
    department: "Córdoba",
    municipality: "Montería",
    address: "Calle 69 #3-89, barrio El Recreo",
    geocodeQuery: "Calle 69 # 3-89, Montería, Córdoba, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: TIGRESAS_ITEMS,
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...TIGRESAS_MONTERIA_SOURCE,
    verificationStatus: "reported",
    verificationNotes: TIGRESAS_MONTERIA_NOTA,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
  {
    slug: "tigresas-monteria-norte",
    name: "Punto de Solidaridad Norte — Montería",
    organization: "Tigresas de la Patria",
    type: "general",
    department: "Córdoba",
    municipality: "Montería",
    address: "Carrera 1A #62-41, Edificio Río, apartamento 1502",
    geocodeQuery: "Carrera 1A # 62-41, Montería, Córdoba, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: TIGRESAS_ITEMS,
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...TIGRESAS_MONTERIA_SOURCE,
    verificationStatus: "reported",
    verificationNotes: `${TIGRESAS_MONTERIA_NOTA} ES UN APARTAMENTO EN UN EDIFICIO RESIDENCIAL: el número de apartamento (Edificio Río, apto. 1502) solo lo publica Chicanoticias. Un pin sobre un piso 15 tiene un límite físico de precisión que la ficha debe reconocer; llama antes de ir.`,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
  {
    slug: "tigresas-monteria-centro",
    name: "Punto de Solidaridad Centro — Montería",
    organization: "Tigresas de la Patria",
    type: "general",
    department: "Córdoba",
    municipality: "Montería",
    address: "Calle 69 #1C-92",
    geocodeQuery: "Calle 69 # 1C-92, Montería, Córdoba, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: TIGRESAS_ITEMS,
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...TIGRESAS_MONTERIA_SOURCE,
    verificationStatus: "reported",
    verificationNotes: `${TIGRESAS_MONTERIA_NOTA} OJO A LA GEOMETRÍA: comparte vía con «tigresas-monteria-centro-solidaridad» (Calle 69 #3-89). Son dos direcciones distintas de la misma calle y deben quedar separadas en el mapa.`,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },

  // === RIOHACHA (La Guajira) — 1, reported ==================================
  {
    slug: "tigresas-riohacha-coquivacoa",
    name: "Punto de Solidaridad Coquivacoa — Riohacha",
    organization: "Tigresas de la Patria",
    type: "general",
    department: "La Guajira",
    municipality: "Riohacha",
    address: "Terrazas de Coquivacoa, casa 15, barrio Coquivacoa",
    geocodeQuery: "Barrio Coquivacoa, Riohacha, La Guajira, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: TIGRESAS_ITEMS,
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Tigresas de la Patria — campaña «Colombia, un solo corazón», vía El Tiempo",
    sourceUrl:
      "https://www.eltiempo.com/politica/abelardo-de-la-espriella/colombia-un-solo-corazon-asi-puede-donar-a-la-campana-liderada-por-la-primera-dama-para-ayudar-a-los-damnificados-por-el-terremoto-3577595",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "LA TANDA 1 LO DEJÓ FUERA CON RAZÓN, porque un centro sin entidad responsable no es publicable. La entidad aparece así, y conviene que quede escrito porque la atribución es INDIRECTA: El Tiempo (11 ago, abierto el 12 de agosto de 2026) publica el listado completo de la campaña «Colombia, un solo corazón» liderada por la primera dama, y Riohacha figura dentro de él —«Riohacha (Terrazas de Coquivacoa, Casa 15, barrio Coquivacoa)»— pero la línea NO lleva rótulo de organización. Lo que convierte esa lista en evidencia es que se cotejó contra data/centers.ts y coincide punto por punto, con nomenclatura exacta, con los registros de Tigresas que ya están en el seed (Valledupar, Chía, Bucaramanga, GAULA y CODABAS en Bogotá): la lista ES la red. Es una atribución POR PERTENENCIA, más débil que la de Montería, donde la frase nombra a Tigresas de forma expresa. Un revisor puede discrepar y dejarlo fuera. NO HAY HORARIO NI TELÉFONO. Se comprobó explícitamente que el perfil de Instagram de la red, leído el 12 de agosto, NO contiene la cadena «Coquivacoa». La lista de artículos es la general de la red, no de este punto. Confirma antes de ir.",
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },

  // === MEDELLÍN (Antioquia) — 1, verified por canal propio ==================
  {
    slug: "tigresas-medellin-la-80",
    name: "Centro de Acopio La 80 — Tigresas Antioquia",
    organization: "Tigresas de la Patria — Tigresas Moviéndose con Corazón",
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Carrera 80 #49A-39, frente a Los Verdes de la 80",
    geocodeQuery: "Carrera 80 # 49A-39, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Alimentos para mascotas",
      "Artículos de aseo",
      "Pañales",
      "Pañitos húmedos",
      "Leche de fórmula",
      "Mantas",
      "Sábanas",
      "Colchonetas",
      "Colchones",
      "Linternas",
      "Botiquines de primeros auxilios",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Colchonetas", "Leche de fórmula"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 8:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: "+57 322 6531804",
    whatsapp: null,
    email: null,
    sourceName:
      "Tigresas de la Patria — pieza «ACOPIO TIGRESAS ANTIOQUIA» publicada en su cuenta oficial",
    sourceUrl: "https://www.instagram.com/tigresasdelapatriaoficial/",
    sourcePublishedAt: "2026-08-12",
    verificationStatus: "verified",
    verificationNotes:
      "VERIFICADO EN CANAL PROPIO el 12 de agosto de 2026: la cuenta oficial de Tigresas de la Patria, que está en la lista blanca OFFICIAL_ACCOUNTS de scripts/validate-seed.ts, publica la pieza «ACOPIO TIGRESAS ANTIOQUIA» fechada el 12 de agosto con nombre del punto («LA 80»), dirección, teléfono, horario, responsables (Esperanza Martínez y Liliana Zapata) y lista de artículos. Instagram NO era legible en las tandas anteriores (§3.d.4 de docs/sources.md); hoy sí lo fue, y se comprobó de forma adversarial que no era un muro de login antes de dar nada por bueno. TRES SALVEDADES: (1) LA PIEZA NO NOMBRA EL EVENTO —se preguntó de forma explícita— y lo que ata el terremoto es la fecha, 12 de agosto, más la identidad de la campaña «Colombia, un solo corazón»; esta red arrastra la campaña por los sismos de Venezuela de junio de 2026, así que la fecha es lo único que discrimina. (2) LA PIEZA NO PUBLICA MUNICIPIO, solo «ANTIOQUIA»; el municipio NO se dedujo: lo publica El Tiempo el 11 de agosto —«Medellín (Cra. 80 # 49A-39, frente a Los Verdes de la 80)»— y ese es el respaldo del campo. (3) EL sourceUrl ES EL PERFIL, NO UN PERMALINK: no se localizó enlace /p/ ni /reel/. §4.8 de docs/sources.md ya enseñó que citar una URL no es citar un contenido; esa publicación bajará en el muro y el enlace dejará de probarla. CAPTURAR PERMALINK O SNAPSHOT ANTES DE PUBLICAR. RIESGO DE PIN: «bodega-guayaquiliando-medellin» ya está en el seed en la Avenida 80 #52-88, a pocas cuadras. Revisar la geometría de los dos juntos para que no queden apilados ni intercambiados. Es además el primer registro de estas tandas con TELÉFONO obtenido de canal propio.",
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },

  // === IBAGUÉ (Tolima) — 1, reported ========================================
  {
    slug: "tigresas-ibague-plazas-del-bosque",
    name: "Centro Comercial Plazas del Bosque — Punto de Solidaridad",
    organization: "Tigresas de la Patria",
    type: "general",
    department: "Tolima",
    municipality: "Ibagué",
    address: "Centro Comercial Plazas del Bosque, Avenida Ambalá 69-80",
    geocodeQuery:
      "Centro Comercial Plazas del Bosque, Ibagué, Tolima, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: TIGRESAS_ITEMS,
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Tigresas de la Patria — campaña «Colombia, un solo corazón», vía El Tiempo",
    sourceUrl:
      "https://www.eltiempo.com/politica/abelardo-de-la-espriella/colombia-un-solo-corazon-asi-puede-donar-a-la-campana-liderada-por-la-primera-dama-para-ayudar-a-los-damnificados-por-el-terremoto-3577595",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "SEGUNDO PUNTO DE IBAGUÉ, y el primero con dirección con nomenclatura: el que ya tenía el seed (banco-arquidiocesano-alimentos-ibague) arrastra desde §7.3 de docs/sources.md el problema de la dirección incompleta. Sale del listado de la campaña «Colombia, un solo corazón» que El Tiempo publicó el 11 de agosto, abierto el 12 de agosto de 2026: «Ibagué (Centro Comercial Plazas del Bosque Avenida Ambalá 69-80)». Ese listado coincide punto por punto con los registros de Tigresas que ya están en el seed, lo que sostiene la atribución. NO ES «verified»: es un medio citando a la red, y el perfil de Instagram de Tigresas —leído el 12 de agosto— no contiene esta pieza. LA FUENTE NO PUBLICA HORARIO NI TELÉFONO. NO CONFUNDIR con los cuatro puntos de la Alcaldía de Ibagué (CC La Estación, Castiagro, CC Multicentro y CC Acqua), que vencieron a las 2:00 p. m. del martes 11 de agosto y NO se proponen. Confirma antes de ir.",
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },

  // === CÚCUTA (Norte de Santander) — 2, reported ============================
  {
    slug: "biblioteca-julio-perez-ferrero-cucuta",
    name: "Biblioteca Pública Julio Pérez Ferrero",
    organization: "Biblioteca Pública Julio Pérez Ferrero",
    type: "general",
    department: "Norte de Santander",
    municipality: "Cúcuta",
    address: "Avenida 1 #12-35, sector La Playa",
    geocodeQuery:
      "Biblioteca Pública Julio Pérez Ferrero, Cúcuta, Norte de Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Insumos para primeros auxilios",
      "Artículos de baño y aseo personal",
      "Carpas",
      "Linternas",
      "Pilas",
      "Cobijas",
      "Impermeables",
      "Colchonetas",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Colchonetas", "Carpas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Biblioteca Pública Julio Pérez Ferrero, vía La Opinión (Cúcuta)",
    sourceUrl:
      "https://laopinion.co/cucuta/quiere-ayudar-los-damnificados-por-el-terremoto-estos-son-los-puntos-de-acopio-en-cucuta",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "SEGUNDO PUNTO DE CÚCUTA, que es Tier 1 y llevaba tres días con uno solo. La Opinión (11 ago), abierta y transcrita el 12 de agosto de 2026, nombra el evento sin ambigüedad: «El terremoto que sacudió al país el lunes 10 de agosto, con una magnitud de 7,4 y epicentro en Chocó». HORARIO DELIBERADAMENTE VACÍO: la fuente dice literalmente que «la recepción de ayudas se realiza en horario extendido», y eso NO ES UN HORARIO. Convertirlo en cifras sería inventarlo. La fuente tampoco publica teléfono. NO se localizó canal propio de la biblioteca. OJO: la misma fuente informa que la Diócesis de Cúcuta recogerá ayudas en sus 110 parroquias el domingo 16 de agosto y que allí NO se deben donar ropa ni medicamentos; esa restricción es de la jornada parroquial y NO se trasladó a esta ficha. Confirma antes de ir.",
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
  {
    slug: "moiras-cucuta",
    name: "Punto de acopio Moiras",
    organization: "Moiras",
    type: "general",
    department: "Norte de Santander",
    municipality: "Cúcuta",
    address: "Calle 0BN #4E-102, quinta Bosch",
    geocodeQuery: "Calle 0BN # 4E-102, Cúcuta, Norte de Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Pañales",
      "Fórmula láctea",
      "Pañitos húmedos",
      "Cremas para bebé",
      "Atún",
      "Agua",
      "Arroz",
      "Pasta",
      "Lentejas",
      "Enlatados",
      "Panela",
      "Chocolate",
      "Avena",
      "Coladas",
      "Frutos secos",
      "Carpas",
      "Toldos",
      "Sábanas",
      "Linternas",
      "Pilas",
      "Elementos de higiene personal",
      "Gasas",
      "Vendas",
      "Esparadrapo",
      "Tapabocas",
      "Guantes",
    ],
    urgentNeeds: ["Fórmula láctea", "Pañales", "Carpas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "Lunes a sábado, 8:30 a. m. – 7:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: "+57 301 444 0459",
    whatsapp: null,
    email: null,
    sourceName: "Organización Moiras, vía La Opinión (Cúcuta)",
    sourceUrl:
      "https://laopinion.co/cucuta/quiere-ayudar-los-damnificados-por-el-terremoto-estos-son-los-puntos-de-acopio-en-cucuta",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "TERCER PUNTO DE CÚCUTA. La Opinión (11 ago), abierta y transcrita el 12 de agosto de 2026, publica dirección, horario y canasta desglosada. EXCEPCIÓN DECLARADA SOBRE EL TELÉFONO: el proyecto decidió NO cargar números generales de entidad porque implican «llama a este centro», que es falso cuando la entidad tiene varios puntos. Aquí la fuente dice «Para resolver dudas sobre esta campaña está disponible el número 301 444 0459» y Moiras tiene UN ÚNICO punto, así que llamar a ese número ES la forma de confirmar antes de ir. Se carga a propósito y se marca: si el revisor considera que el precedente no conviene, este es el campo que hay que quitar. NO se localizó canal propio de Moiras; la organización está nombrada pero no descrita en la fuente. Confirma antes de ir.",
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },

  // === BARRANQUILLA (Atlántico) — 2, reported ===============================
  {
    slug: "pastoral-social-caritas-barranquilla",
    name: "Secretariado de Pastoral Social Cáritas Barranquilla",
    organization:
      "Arquidiócesis de Barranquilla — Secretariado de Pastoral Social Cáritas",
    type: "general",
    department: "Atlántico",
    municipality: "Barranquilla",
    address: "Carrera 44 #53-78, barrio Boston",
    geocodeQuery: "Carrera 44 # 53-78, Barranquilla, Atlántico, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: ARQUIDIOCESIS_ITEMS,
    urgentNeeds: ["Agua", "Arroz", "Aceite", "Pañales"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "Lunes a viernes, 8:00 a. m. – 4:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...EL_HERALDO_ARQUIDIOCESIS,
    verificationStatus: "reported",
    verificationNotes:
      "PUNTO QUE LA TANDA 1 NO TENÍA: no está en la lista de nueve puntos de El Heraldo que aquella revisó, sino en una NOTA DEDICADA del mismo medio (11 ago), abierta el 12 de agosto de 2026. Esa nota identifica el evento con precisión —«el sismo de magnitud 7,4 del 10 de agosto con epicentro en San José del Palmar, Chocó»—, nombra al operador y publica la canasta desglosada y el horario, que es raro en este proyecto. La institución está articulada al Corredor Humanitario de ABACO y clasifica lo recibido para enviarlo a Bancos de Alimentos de las zonas afectadas. NO ES «verified»: El Heraldo es un medio citando a la entidad. Aunque apareciera la publicación propia de la Arquidiócesis o de Cáritas Barranquilla, su dominio NO está en OFFICIAL_SITES de scripts/validate-seed.ts: ascenderlo exigiría una entrada nueva en la lista blanca, que es una decisión humana y consciente. LA FUENTE NO PUBLICA TELÉFONO. Confirma antes de ir.",
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
  {
    slug: "banco-arquidiocesano-alimentos-barranquilla",
    name: "Banco Arquidiocesano de Alimentos de Barranquilla",
    organization:
      "Arquidiócesis de Barranquilla — Secretariado de Pastoral Social Cáritas",
    type: "food",
    department: "Atlántico",
    municipality: "Barranquilla",
    address: "Calle 53C #31-121, barrio Lucero",
    geocodeQuery: "Calle 53C # 31-121, Barranquilla, Atlántico, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: ARQUIDIOCESIS_ITEMS,
    urgentNeeds: ["Arroz", "Aceite", "Enlatados", "Leche en polvo"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "Lunes a viernes, 8:00 a. m. – 4:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...EL_HERALDO_ARQUIDIOCESIS,
    verificationStatus: "reported",
    verificationNotes:
      "Es uno de los dos puntos institucionales que la tanda 1 dejó como lead en su §7.7. La nota dedicada de El Heraldo (11 ago), abierta el 12 de agosto de 2026, aporta el BARRIO («Lucero») y el HORARIO, que la lista de nueve puntos no traía, e identifica el evento como «el sismo de magnitud 7,4 del 10 de agosto con epicentro en San José del Palmar, Chocó». Articulado al Corredor Humanitario de ABACO. NO ES «verified» por la misma razón que el punto de Pastoral Social: medio citando a la entidad, y el dominio de la Arquidiócesis no está en OFFICIAL_SITES. LA FUENTE NO PUBLICA TELÉFONO. NO CONFUNDIR con «fubam-banco-arquidiocesano-alimentos-medellin», que es otra ciudad y otra arquidiócesis. Confirma antes de ir.",
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },

  // === PEREIRA (Risaralda) — 3, reported ====================================
  // Solo los tres CAFE para los que la fuente ABIERTA publica nomenclatura.
  // Los otros cuatro (Consota, Perla del Otún, El Remanso, Kennedy) NO se
  // proponen: sus direcciones solo aparecen en resúmenes de buscador. Ver §6.
  {
    slug: "cafe-ormaza-pereira",
    name: "CAFE Ormaza",
    organization: "Alcaldía de Pereira",
    type: "general",
    department: "Risaralda",
    municipality: "Pereira",
    address: "Calle 3 bis #5-38, Avenida del Río",
    geocodeQuery: "Calle 3 bis # 5-38, Pereira, Risaralda, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: PEREIRA_ITEMS,
    urgentNeeds: ["Colchonetas", "Cobijas", "Elementos de aseo personal"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...PEREIRA_SOURCE,
    verificationStatus: "reported",
    verificationNotes: PEREIRA_NOTA,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
  {
    slug: "cafe-san-nicolas-pereira",
    name: "CAFE San Nicolás",
    organization: "Alcaldía de Pereira",
    type: "general",
    department: "Risaralda",
    municipality: "Pereira",
    address: "Carrera 14 bis #28-38",
    geocodeQuery: "Carrera 14 bis # 28-38, Pereira, Risaralda, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: PEREIRA_ITEMS,
    urgentNeeds: ["Colchonetas", "Cobijas", "Elementos de aseo personal"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...PEREIRA_SOURCE,
    verificationStatus: "reported",
    verificationNotes: PEREIRA_NOTA,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
  {
    slug: "cafe-comuna-del-cafe-pereira",
    name: "CAFE Comuna del Café",
    organization: "Alcaldía de Pereira",
    type: "general",
    department: "Risaralda",
    municipality: "Pereira",
    address: "Carrera 3 con calle 59A, sector Parque Industrial",
    geocodeQuery: "Carrera 3 con Calle 59A, Pereira, Risaralda, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: PEREIRA_ITEMS,
    urgentNeeds: ["Colchonetas", "Cobijas", "Elementos de aseo personal"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...PEREIRA_SOURCE,
    verificationStatus: "reported",
    verificationNotes: `${PEREIRA_NOTA} LA DIRECCIÓN ES UN CRUCE DE VÍAS, no un número de puerta: el pin será aproximado.`,
    lastVerifiedAt: VERIFIED_AT_TANDA2,
  },
];
```

---

## 6. Leads que siguen abiertos

Ordenados por relación esfuerzo/valor. Los que vienen de la tanda 1 conservan su numeración original entre paréntesis.

1. **Las cuatro direcciones que faltan de Pereira** (§7.9 tanda 1, parcialmente cerrado). Faltan Consota, Perla del Otún, El Remanso y Kennedy. **Qué falta exactamente:** abrir una fuente que las publique. Circulan referencias por resumen de buscador —«Mz 7 y Mz 8 Villa Consota, Cuba»; «diagonal a la iglesia de los 2.500 lotes»; «avenida principal del barrio El Remanso, al lado del centro de salud»; «parque principal de Kennedy»— que **no se han podido abrir en ninguna fuente y por eso no se publican**. `cambiocolombia.com`, que parecía tenerlas, devolvió **403**. Es el lead más valioso que queda: Pereira es Tier 1 y son cuatro pines de una sola lectura.

2. **La primaria de los CAFE en `pereira.gov.co`.** El dominio responde; la ruta `/publicaciones/` devuelve **404** y una búsqueda restringida al dominio no devuelve nada de esta emergencia. **Qué falta:** navegar el portal a mano, como se hizo con Rionegro — ahí el problema fue exactamente el mismo y la noticia sí existía. Cerraría los siete CAFE y los ascendería a `verified` de golpe.

3. **El permalink de la pieza de Instagram de Tigresas Antioquia** (§2.4). **Qué falta:** el enlace `/p/` o `/reel/` de la publicación, o un snapshot. Sin él, el `sourceUrl` es un perfil que dejará de probar el dato en cuanto la publicación baje en el muro — el fallo que §4.8 de `docs/sources.md` documentó con `bogota.gov.co`.

4. **Las piezas de Tigresas para Montería y Riohacha** (§7.5 y §7.6 tanda 1, cerrados como `reported`). El perfil se dejó leer hoy y **no las contiene**. **Qué falta:** las piezas concretas —quizá en publicaciones más antiguas del perfil, en historias destacadas, o en la cuenta de «Tigresas Moviéndose con Corazón» si existe por separado—. Si aparecen, cuatro registros pasan de `reported` a `verified` sin trabajo adicional.

5. **`atlantico.gov.co`** (§7.2 tanda 1). Ya no es un problema de DNS sino de **cadena de certificado TLS**. **Qué falta:** un cliente que tolere esa cadena, o la caché de un tercero. El punto de la Gobernación en la Galería de la Plaza de la Paz sigue esperando su primaria; hoy solo ganó una dirección de agregador (§3.4).

6. **El Banco de Alimentos de Cúcuta** (§7.3 tanda 1). `areacucuta.com` devolvió **403 otra vez**. No se localizó canal propio. La dirección que circula —calle 2AN #1-26, barrio Pescadero, detrás del SENA— **sigue sin publicarse** por la regla 1. Se comprobó además que ni El Tiempo ni La Opinión lo mencionan, lo cual es una señal débil de que quizá el punto solo lo cubrió `areacucuta.com`.

7. **Las direcciones de los cinco puntos religiosos de Yopal** (§7.4 tanda 1). Sin avance. **Qué falta:** llamada a la Alcaldía o a la Diócesis, o la pieza gráfica. Se mantiene la recomendación de la tanda 1: publicar solo `alcaldia-yopal`.

8. **Los tres 403 institucionales** (§7.10 tanda 1): `barranquilla.gov.co`, `cartagena.gov.co`, `santamarta.gov.co`. Cuarto día. **Qué falta:** otra red o un cliente distinto. **No son prueba de ausencia.**

9. **Uninorte y sus dos puntos** (§7.7 tanda 1, parcialmente cerrado). **Qué falta:** dos cosas a la vez, y hay que decirlas juntas — (a) la publicación propia de la universidad y (b) una entrada nueva en `OFFICIAL_SITES` para `uninorte.edu.co`, que es decisión humana; y (c) direcciones de verdad, porque «bloque A piso 3» y «Coliseo piso 2» son ubicaciones dentro de un campus y producirían dos pines apilados.

10. **`tigresas-casanare`, todavía `disputed`.** El listado de la campaña de El Tiempo, que reproduce con exactitud el resto de la red, **no incluye la «Calle 12 #21-44» de Yopal**. Es señal débilmente negativa e insuficiente. **La llamada al +57 310 310 4757 sigue siendo la única vía.**

11. **Segunda tanda de la Alcaldía de Ibagué.** Buscada de forma dirigida, **no existe** hasta donde alcanzó la búsqueda. Los cuatro puntos vencidos siguen sin reapertura anunciada.

---

## 7. Trampas esquivadas

Tres. **Dos de ellas no venían de la fuente sino de la herramienta que la lee**, y ese es el hallazgo de método de esta tanda.

### 7.1 Una atribución fabricada por el propio lector de páginas ⚠️

**La más grave, porque casi publica un centro con operador inventado.**

Al abrir por primera vez el artículo de El Tiempo sobre el Caribe, la respuesta incluyó, para Riohacha:

> «Fue habilitado un centro de recepción en Terrazas de Coquivacoa, casa 15, barrio Coquivacoa» **(operado por Tigresas de la Patria)**

El paréntesis **no está en el artículo**. Saltó la alarma porque **contradecía a la tanda 1**, que había leído esa misma fuente y anotado expresamente que no decía quién lo operaba. Se volvió a preguntar sobre la misma página, esta vez exigiendo la frase completa palabra por palabra y una respuesta explícita si no había entidad. Resultado:

> Frase literal: «Por su parte, en Riohacha fue habilitado un centro de recepción en Terrazas de Coquivacoa, casa 15, barrio Coquivacoa.»
> «No aparece ninguna entidad operadora… El texto no atribuye este punto a "Tigresas de la Patria" ni a ninguna otra organización.»

**La tanda 1 tenía razón y la herramienta mentía.** El operador se acabó estableciendo por otra vía —pertenencia al listado de la campaña, §2.3— y la ficha lo dice así, con su debilidad declarada.

**Lección, y es nueva.** El proyecto ya sabía que **los resúmenes de buscador fabrican datos**: lleva cuatro documentados. Esto es un escalón peor: **la herramienta que abre la página también fabrica**, rellenando huecos con lo que parece coherente. «Abrir la fuente» no basta si uno acepta la primera lectura. **Lo que funcionó fue pedir la cita textual y ofrecer explícitamente la salida «no aparece»**, y lo que disparó la sospecha fue que la lectura contradijera a la tanda anterior. Vale la pena convertirlo en método: cuando una lectura contradiga lo que ya está documentado, **la hipótesis por defecto debe ser que el lector se equivoca, no que el registro anterior estaba mal**.

### 7.2 La misma fabricación, en Instagram, esquivada de forma preventiva

Escarmentado por lo anterior, el perfil de Tigresas **no se leyó de forma ingenua**. La primera pregunta fue si la página era un muro de inicio de sesión y qué cadenas literales contenía el HTML, ofreciendo la respuesta «NO aparece en el HTML» como opción válida.

Esa comprobación es la que da valor al hallazgo de §2.4: confirmó que «Cra 80 #49a-39», «ACOPIO TIGRESAS ANTIOQUIA» y «+57 322 6531804» **sí están** en el HTML, y —igual de importante— que «Montería» y «Coquivacoa» **no están**. Sin esa segunda mitad, la tentación de dar Montería por verificado en canal propio habría sido grande, porque era justo lo que se estaba buscando.

**Una ausencia comprobada vale tanto como una presencia comprobada**, y cuesta lo mismo preguntarla.

### 7.3 Reciclaje en dominio `.gov.co`, otra vez, y en el mismo sitio del que salió un ascenso

Al buscar la primaria de Cundinamarca aparece, en el **mismo dominio institucional** del que salió el ascenso de §3.1, la publicación **«Cundinamarca enviará más de seis toneladas de ayudas a Venezuela»**. Es la campaña por los sismos de Venezuela de **junio de 2026**: la misma entidad, el mismo dominio, el mismo tipo de contenido, otro desastre.

Es la cuarta vez que el proyecto documenta este patrón en un `.gov.co` y confirma, palabra por palabra, la nota de método de §8 de la tanda 1: **empezar por la primaria no reduce la necesidad de leer la fecha y el evento, la aumenta**, porque el resto de señales de calidad dejan de discriminar. Lo único que separó el artículo bueno del malo fue leer «el sismo ocurrido el pasado 10 de agosto» en uno y «Venezuela» en el otro.

**Un cuarto caso quedó a medias y se anota por honestidad:** `cundinamarca.gov.co` publica además «Cundinamarca se une en solidaridad con el Chocó: campaña de recolección de donaciones para familias damnificadas». Chocó es el epicentro de este terremoto, así que lo más probable es que sea de esta emergencia — **pero la página devolvió HTTP 402 y no se pudo abrir, así que no se usó para nada**. Si alguien la abre, puede que aporte más puntos de Cundinamarca.

---

## 8. Nota de método

La tanda 1 aprendió que conviene empezar por el canal propio. Esta tanda añade dos cosas.

**La primera es que los fallos de acceso hay que reintentarlos con la lista en la mano, porque no son estables.** En tres días, el mismo conjunto de dominios ha dado ENOTFOUND, 403, 404, error de certificado y respuesta normal, sin patrón. `cali.gov.co` no resolvía el día 2 y el día 3 dio cuatro puntos con sello. Instagram era ilegible en dos tandas y hoy dio un teléfono de canal propio. `atlantico.gov.co` pasó de no existir a existir con el certificado roto. **Lo caro no es reintentar: es dar por inexistente lo que solo estaba cerrado.** Y el corolario incómodo: también significa que lo que hoy se leyó puede no leerse mañana, que es el argumento del snapshot que §4.8 lleva pidiendo desde el día 2.

**La segunda es más incómoda y hay que dejarla escrita.** Este proyecto construyó su disciplina alrededor de una regla: *no cites desde el resumen de un buscador, abre la fuente*. Esa regla sigue siendo correcta y hoy volvió a pagar. Pero hoy también quedó claro que **es insuficiente**: la herramienta que abre la página puede inventar tanto como el resumen que la resume, y lo hace de la forma más peligrosa posible — rellenando el hueco exacto que uno estaba buscando, con el dato que uno esperaba encontrar. El paréntesis «(operado por Tigresas de la Patria)» de §7.1 apareció **precisamente** en el campo que faltaba para poder publicar Riohacha.

La defensa que funcionó no fue leer más, fue **preguntar de forma que la mentira sea costosa**: exigir la cita textual, acotar la pregunta a una cadena concreta, y ofrecer explícitamente la salida «no aparece». Y sobre todo, **tratar la contradicción con el registro anterior como una alarma y no como una novedad**. La tanda 1 había escrito que El Tiempo no decía quién operaba el punto de Riohacha; sin esa frase escrita, no habría habido con qué chocar.

Es la misma lección que §4.8 sacó de `bogota.gov.co`, girada noventa grados: allí el peligro era confiar en que una URL sigue diciendo lo que decía; aquí, confiar en que lo que nos dicen que dice es lo que dice.
