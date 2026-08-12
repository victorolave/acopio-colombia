# Candidatos de cobertura — tanda del 12 de agosto de 2026

**Qué es este documento.** Una tanda de investigación web dirigida a las ciudades donde el mapa tiene poca o ninguna cobertura. **No es una ingesta.** Nada de lo que hay aquí está en `data/centers.ts`, ni debe entrar sin revisión humana. El bloque de TypeScript del §3 está escrito para que alguien lo lea línea por línea antes de pegarlo, no para pegarse solo.

**Fecha de la investigación:** 12 de agosto de 2026. Todas las fuentes se abrieron una por una; ninguna afirmación de este documento procede del resumen automático de un buscador. Donde no se pudo abrir la fuente, se dice y no se publica el dato.

---

## 1. Resumen

| | |
|---|---|
| **Candidatos propuestos** | **28** en el bloque `SeedCenter[]` |
| **Municipios nuevos en el archivo** | **3** — Soledad (Atlántico), Floridablanca (Santander), Rionegro (Antioquia) |
| **Municipio nuevo en el mapa** | **1** — Yopal. Ya existe en `data/centers.ts` como `tigresas-casanare`, pero está `disputed` y **no se publica**, así que hoy no hay ni un pin allí |
| **Departamento nuevo en el mapa** | **1** — **Casanare**: mismo caso, aparece en el archivo pero **sin ningún centro publicado** |
| **Reparto por estado propuesto** | **4 `verified`** · **24 `reported`** |
| **Candidatos descartados a propósito** | 14 (§4 y §5): direcciones sin entidad, campañas ya vencidas y puntos privados sin contacto |

### Etiqueta de verificabilidad

Además del `verificationStatus` propuesto, cada candidato lleva una etiqueta que dice **hasta dónde llegó la comprobación**:

| Etiqueta | Significado | Cuántos |
|---|---|---|
| `verified` | La entidad responsable lo publica en su propio canal y **ese canal se abrió y se leyó**. | 4 |
| `verificable` | Se sabe cuál es la primaria y dónde está, pero no se pudo abrir (403 / DNS / sesión). Es un ascenso a un clic. | 3 |
| `no-verificable` | Solo hay medios citando a la entidad; no se localizó canal propio. Va como `reported` y se dice. | 21 |

### Lo más importante de la tanda

**El obstáculo del 12 de agosto era, en parte, de herramienta — y §3.d.4 tenía razón en pedir que se reintentara.** Dos dominios que el día anterior no respondían ahora sí lo hacen:

- **`cali.gov.co` responde.** Tiene un «Repositorio Oficial de Información — Terremoto de Cali» con **cuatro puntos de acopio y sus direcciones**. Cali pasa de 3 puntos a 7, y de 0 a 4 con sello propio.
- **`valledelcauca.gov.co` responde.** La Gobernación del Valle publicó su campaña «El Valle Somos Todos» con los tres puntos que hoy están en el seed como `reported` citando a El País. **Es la primaria que faltaba** (ver §6.1).

**Los tres que seguían cerrados siguen cerrados:** `barranquilla.gov.co`, `cartagena.gov.co` y `santamarta.gov.co` devolvieron HTTP 403 otra vez. Eso **no es prueba de ausencia** y no se usó como tal.

---

## 2. Candidatos

Cada ficha declara **qué campo salió de qué fuente**. Cuando dos fuentes discrepan, se dice y no se elige en silencio.

### 2.1 Cali (Valle del Cauca) — 4 candidatos, los 4 `verified`

**Fuente primaria A:** [cali.gov.co — «Terremoto de Cali | Repositorio Oficial de Información»](https://www.cali.gov.co/gobierno/publicaciones/193607/terremoto-de-cali-repositorio-oficial-de-informacion/), publicado/actualizado el **11 de agosto de 2026**. Leído por mí el **12 de agosto de 2026**. Bajo el encabezado «Puntos de acopio» lista literalmente cinco entradas con dirección: Plazoleta Jairo Varela (Av. 2 Nte. # 10 Nte. - 1 Granada), Escuela Nacional del Deporte (Cll. 9 # 34-01 Eucarístico), Parque de la caña (Cra. 8 # 39 - 01), Ciudadela Petronio Álvarez (Complejo deportivo Alberto Galindo) y Casa del Valle / Bogotá (Diagonal 34 # 550).

**Fuente primaria B:** [cali.gov.co — «Solidaridad caleña se toma el centro de acopio de la Plazoleta Jairo Varela»](https://www.cali.gov.co/boletines/publicaciones/193608/solidaridad-calena-se-toma-el-centro-de-acopio-de-la-plazoleta-jairo-varela/), boletín del **11 de agosto de 2026**. De aquí sale la **canasta de artículos de la campaña** (agua, víveres, colchonetas, sábanas, cobijas, sándwiches, dulces, Electrolit, alcohol, gasas, vendas, tapabocas, guantes, picas, palas, barretones, cascos, linternas, bolsas, baños móviles, ropa) y el dato de que la Escuela Nacional del Deporte opera como centro alterno.

**Fuente primaria C:** [valledelcauca.gov.co — «Campaña 'El Valle Somos Todos'»](https://valledelcauca.gov.co/publicaciones/90172/campana-el-valle-somos-todos-estos-son-los-elementos-que-se-pueden-donar-para-los-damnificados-por-el-sismo), **11 de agosto de 2026, 14:13** (modificado 14:27). Publica los tres puntos de la Gobernación con dirección exacta y su lista de artículos.

| Campo | `escuela-nacional-deporte-cali` | `parque-de-la-cana-cali` | `ciudadela-petronio-alvarez-cali` | `parqueadero-gobernacion-valle-cali` |
|---|---|---|---|---|
| Nombre | Escuela Nacional del Deporte | Parque de la Caña | Ciudadela Petronio Álvarez — Complejo Deportivo Alberto Galindo | Parqueadero de la Gobernación del Valle del Cauca |
| Organización | Alcaldía de Santiago de Cali | Alcaldía de Santiago de Cali | Alcaldía de Santiago de Cali | Gobernación del Valle del Cauca |
| Dirección | Cll. 9 # 34-01 (fuente A) | Cra. 8 # 39-01 (fuente A) | **Sin nomenclatura** (fuente A) | Carrera 6 con calle 10 (fuente C) |
| Barrio | «Eucarístico» según fuente A; **«San Fernando» según El País** ⚠️ | — | — | — |
| Horario | `null` — ninguna fuente oficial lo publica | `null` | `null` | `null` |
| Teléfono | `null` | `null` | `null` | `null` |
| Estado propuesto | `verified` | `verified` | `verified` | `verified` |
| Etiqueta | `verified` | `verified` | `verified` | `verified` |

**Discrepancia de barrio que NO se resolvió.** El repositorio oficial ubica la Escuela Nacional del Deporte en «Eucarístico»; [El País (Cali), 11 de agosto, 18:02](https://www.elpais.com.co/cali/asi-funciona-el-centro-de-ayudas-en-la-escuela-nacional-del-deporte-voluntarios-organizan-donaciones-para-los-afectados-1103.html) dice «barrio San Fernando». Son barrios contiguos y la Calle 9 #34-01 es la misma en ambas. **Se conserva la dirección; el barrio no se publica.** Que la nomenclatura coincida entre dos fuentes independientes es la señal fuerte; el barrio es ruido.

**Horario: dos datos rechazados a propósito.**

1. El resumen automático del buscador afirmó que la Escuela Nacional del Deporte «opera de 8:00 a. m. a 6:00 p. m. diariamente». **Ese horario no aparece en ninguna de las tres fuentes que abrí.** En el repositorio oficial, el «8:00 a. m. a 6:00 p. m.» pertenece a los **puntos de donación de sangre**, que son otra cosa. Es exactamente el patrón del hallazgo 2 de §10: un horario correcto atribuido al centro equivocado.
2. El País dice que esa noche el centro recibiría «hasta las 12 de la madrugada». Es la crónica de **una noche concreta**, no un horario de operación. Cargarlo mandaría gente a medianoche del día siguiente. `scheduleText: null`.

**Artículos de la Ciudadela Petronio Álvarez.** El repositorio no publica dirección con nomenclatura para este punto. Se propone con la referencia tal cual la publica la fuente. Si el revisor considera que «Complejo deportivo Alberto Galindo» no basta como dirección publicable, **este es el candidato que hay que dejar fuera**; es el más débil de los cuatro.

---

### 2.2 Barranquilla y Soledad (Atlántico) — 3 candidatos

**Fuente:** [El Heraldo — «Estos son los centros de acopio en Barranquilla…»](https://www.elheraldo.co/atlantico/2026/08/11/estos-son-los-centros-de-acopio-en-barranquilla-en-los-que-puede-realizar-sus-donaciones-a-los-afectados-por-el-terremoto/), **11 de agosto de 2026**, y [El Heraldo — «Gobernación del Atlántico habilita punto de acopio…»](https://www.elheraldo.co/atlantico/2026/08/11/gobernacion-del-atlantico-habilita-punto-de-acopio-para-recibir-ayudas-destinadas-a-afectados-por-el-sismo/), **11 de agosto de 2026**. Ambas abiertas el 12 de agosto.

| Campo | `punto-acopio-gobernacion-atlantico` | `iub-campus-soledad` | `bomberos-voluntarios-soledad` |
|---|---|---|---|
| Nombre | Galería de la Plaza de la Paz | Institución Universitaria de Barranquilla — Campus Soledad | Cuerpo de Bomberos Voluntarios de Soledad |
| Organización | Gobernación del Atlántico — Secretaría del Interior | Institución Universitaria de Barranquilla (IUB) | Cuerpo de Bomberos Voluntarios de Soledad |
| Municipio | Barranquilla | **Soledad** (nuevo) | **Soledad** (nuevo) |
| Dirección | Galería de la Plaza de la Paz | Calle 18 No. 39-100 | Granabastos, calle 63 No. 1-300 |
| Horario | **`null` — ver discrepancia** ⚠️ | 8:00 a. m. – 6:00 p. m. | `null` |
| Estado propuesto | `reported` | `reported` | `reported` |
| Etiqueta | **`verificable`** | `no-verificable` | `no-verificable` |

**Discrepancia de horario que obliga a dejarlo en `null`.** Los dos artículos de El Heraldo, **del mismo día y del mismo medio**, dicen cosas distintas sobre el punto de la Gobernación: el listado dice «6:00 a. m. a 6:00 p. m.» y la nota dedicada dice «a partir de las 8:00 de la mañana». No hay forma de saber cuál es. **Un horario inventado es peor que ninguno**, así que va `null` y la ficha pide confirmar. Anotarlo aquí es el punto: alguien que solo hubiera leído uno de los dos artículos habría publicado un horario con toda confianza.

**Por qué la Gobernación del Atlántico es `verificable` y no `verified`.** La entidad es identificable, el vocero está nombrado (subsecretario Nelson Oquendo) y el gobernador Eduardo Verano aparece citado. La primaria sería `atlantico.gov.co`. **No se pudo abrir:** el dominio devolvió `ENOTFOUND` al acceso directo y el buscador solo tiene indexado contenido de 2014-2022 de ese sitio. Reintentar desde otra red.

---

### 2.3 Bucaramanga y Floridablanca (Santander) — 8 candidatos

**Fuente:** [Vanguardia — «Terremoto en Colombia: nueve puntos donde puede realizar donaciones en Bucaramanga»](https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/), **11 de agosto de 2026**, abierta el 12 de agosto. El artículo publica **horario general de 8:00 a. m. a 5:00 p. m.** para el conjunto.

De los nueve puntos, **uno ya está en el seed** (`uis-arbol-ceiba-bucaramanga`). Los otros ocho son candidatos:

| Slug propuesto | Nombre | Organización | Municipio | Dirección publicada |
|---|---|---|---|---|
| `banco-alimentos-quinta-etapa-bucaramanga` | Centro Comercial Quinta Etapa | Banco de Alimentos de Bucaramanga | Bucaramanga | Primer piso, Cabecera |
| `centroabastos-cruz-roja-bucaramanga` | Centroabastos — auditorio | Cruz Roja Colombiana | Bucaramanga | Vía a Chimitá, auditorio de Centroabastos |
| `alcaldia-bucaramanga` | Alcaldía de Bucaramanga — primer piso | Alcaldía de Bucaramanga | Bucaramanga | Primer piso de las instalaciones de la Alcaldía |
| `gobernacion-santander-bucaramanga` | Gobernación de Santander | Gobernación de Santander | Bucaramanga | Centro de Bucaramanga ⚠️ |
| `idesan-bucaramanga` | Idesan — sede Sotomayor | Gobernación de Santander | Bucaramanga | Calle 48 #27A-48, Sotomayor |
| `loteria-de-santander-bucaramanga` | Lotería de Santander | Lotería de Santander | Bucaramanga | Calle 36 con carrera 21, centro |
| `banco-alimentos-bucaramanga` | Banco de Alimentos de Bucaramanga | Banco de Alimentos de Bucaramanga | Bucaramanga | Carrera 20 #11-46, barrio San Francisco |
| `gestion-del-riesgo-floridablanca` | Oficina de Gestión del Riesgo de Floridablanca | Alcaldía de Floridablanca | **Floridablanca** (nuevo) | Sede de la Oficina de Gestión del Riesgo ⚠️ |

**Particularidad de Centroabastos:** Vanguardia precisa que **solo opera martes, jueves y sábado**. Va en `scheduleText` junto al horario, porque un punto que abre tres días a la semana y se publica como si abriera todos es una trampa.

**Dos direcciones flojas, marcadas ⚠️.** «Centro de Bucaramanga» (Gobernación) y «Sede de la Oficina de Gestión del Riesgo» (Floridablanca) no son nomenclatura: son referencias. Cumplen la regla `publico-sin-direccion` del validador por poco, y **geocodificarán como mucho a nivel de municipio**. Si se publican, la precisión honesta es `municipality`. Floridablanca es el único punto del área metropolitana fuera de Bucaramanga, así que dejarlo fuera cuesta un municipio entero: es una decisión editorial, no técnica.

**Corrección a un resumen de búsqueda.** El resumen automático afirmó que había puntos «en Bucaramanga, Floridablanca **y Girón**». Al abrir el artículo, **ninguno de los nueve puntos está en Girón**. Girón y Piedecuesta siguen en cero.

**Etiqueta:** los ocho son `no-verificable`. Se buscó en `bucaramanga.gov.co`, `santander.gov.co` y `floridablanca.gov.co` y no hay publicación de esta emergencia; lo que sí hay en `floridablanca.gov.co` es una donatón **por las familias afectadas de Santander y Córdoba**, que es otra emergencia (§5, trampa 3).

---

### 2.4 Rionegro (Antioquia) — 3 candidatos, municipio nuevo

**Fuente:** [DiariOriente — «Rionegro habilita tres puntos para recibir ayudas destinadas a familias afectadas por el sismo»](https://diarioriente.com/altiplano/rionegro/rionegro-habili.html), **11 de agosto de 2026**, abierta el 12 de agosto. Cita textualmente a la entidad: «La Alcaldía de Rionegro señaló que estos son los únicos puntos autorizados oficialmente para la recolección de donaciones en el municipio».

| Slug propuesto | Nombre | Dirección | Horario |
|---|---|---|---|
| `coliseo-ivan-ramiro-cordoba-rionegro` | Coliseo Iván Ramiro Córdoba | Carrera 52 #41-61 | 7:30 a. m. – 4:30 p. m. |
| `casa-cincopasitos-rionegro` | Casa CincoPasitos | Carrera 50 #51-19 | 7:30 a. m. – 4:30 p. m. |
| `antiguo-colegio-san-antonio-rionegro` | Antiguo Colegio San Antonio de Pereira — Oficina de Desarrollo Económico | Antiguo Colegio San Antonio de Pereira, Oficina de Desarrollo Económico ⚠️ | 7:30 a. m. – 4:30 p. m. |

**Organización:** la iniciativa la lidera la estrategia **Creesiendo**, encabezada por la primera dama municipal Mónica Gutiérrez, en articulación con el Concejo Municipal, la **Corporación Presentes** y la **Gobernación de Antioquia**, dentro de la campaña **#ColombiaSeLevanta**. La Corporación Presentes es la misma aliada que ya aparece en los puntos de Medellín del seed, lo que da coherencia al conjunto.

**Rechazo explícito publicado:** «medicamentos que requieran fórmula o prescripción médica». Es una restricción concreta de esta campaña y va en `rejectedItems`.

**Etiqueta: `verificable`.** `rionegro.gov.co` **responde**, y su portada lista una noticia titulada «Rionegro se suma a #ColombiaSeLevanta para apoyar a las familias afectadas por el sismo» — pero **no conseguí la URL del artículo**: la sección `/galeria/23/noticias/` sirve contenido de 2024 y el buscador no la tiene indexada. La primaria existe, está en el sitio y está a un clic de quien pueda navegar el portal. **Es el mejor lead abierto de esta tanda** (§7.1).

`mioriente.com`, que publicó la misma información, devolvió 403.

---

### 2.5 Manizales (Caldas) — 2 candidatos

**Fuente:** [La Patria — «Llueven ayudas en Manizales tras terremoto…»](https://www.lapatria.com/manizales/llueven-ayudas-en-manizales-tras-terremoto-comunidad-se-mueve-para-donar-conozca-puntos), **11 de agosto de 2026**, abierta el 12 de agosto.

> **Se comprobó la fecha a propósito.** §10, hallazgo 3, documenta que una página de La Patria mostró fecha de plantilla de 2026 sobre contenido real de **junio de 2020**. Por eso lo primero que se verificó aquí fue la fecha y el evento: el artículo habla del terremoto de magnitud 7,4 del 10 de agosto de 2026 y de la respuesta de la ciudad en las horas siguientes. Es de esta emergencia.

| Slug propuesto | Nombre | Dirección | Horario | Particularidad |
|---|---|---|---|---|
| `coliseo-mayor-manizales` | Coliseo Mayor Jorge Arango Uribe | Unidad Deportiva Palogrande | 8:00 a. m. – 6:00 p. m. | **Solo recibe alimento para mascotas** |
| `coliseo-menor-manizales` | Coliseo Menor Ramón Marín Vargas | Unidad Deportiva Palogrande | 8:00 a. m. – 6:00 p. m. | Alimentos secos, aseo, cobijas, bebés |

**Los dos rechazan ropa**, y la razón que publica la fuente es que la comunidad ya donó suficiente. Va en `rejectedItems`.

**Esto matiza §4.6 y hay que decirlo.** El seed excluyó deliberadamente el Coliseo Mayor porque las notas del día 1 lo describían como **albergue**, no como centro de acopio, y publicarlo habría mandado donaciones a un sitio que no las recibía. **Esa decisión era correcta el 10 de agosto.** Dos días después el mismo inmueble sí recibe, pero **únicamente alimento para mascotas**. Si se publica sin esa restricción en la ficha, se reproduce el daño que §4.6 quería evitar, solo que al revés: gente llegando con arroz a un sitio que solo acepta concentrado. La restricción **no es un detalle de la ficha, es el dato principal del registro**.

**Etiqueta: `no-verificable`.** `centrodeinformacion.manizales.gov.co` responde y tiene cobertura del sismo (balance de fallecidos, visita del vicepresidente), **pero no publica los puntos de acopio**. Lo que sí publica sobre acopio corresponde a la campaña «Montería nos necesita, Manizales responde», que es **otra emergencia** (inundaciones en Montería). Ver §5, trampa 2.

---

### 2.6 Montería (Córdoba) — 2 candidatos

Montería es hoy un caso de **reciclaje espeso**: los mismos dos recintos han servido en al menos tres campañas distintas. Se comprobó una por una.

**Fuente A:** [El Heraldo — «Gobernación de Córdoba habilita punto de acopio para apoyar a familias afectadas por el sismo»](https://www.elheraldo.co/colombia/2026/08/11/gobernacion-de-cordoba-habilita-punto-de-acopio-para-apoyar-a-familias-afectadas-por-el-sismo/), **11 de agosto de 2026**. Dice expresamente que la motivación es «el sismo registrado en el país la mañana del lunes 10 de agosto».

**Fuente B:** [El Heraldo — «Alcaldía de Montería activa recepción de ayudas humanitarias para familias afectadas en el país»](https://www.elheraldo.co/colombia/2026/08/11/alcaldia-de-monteria-activa-recepcion-de-ayudas-humanitarias-para-familias-afectadas-en-el-pais/), **11 de agosto de 2026**. El alcalde Hugo Kerguelén García: «hoy, cuando otras ciudades de Colombia atraviesan momentos de dolor… Montería quiere devolver ese abrazo».

| Slug propuesto | Nombre | Organización | Dirección | Horario |
|---|---|---|---|---|
| `coliseo-happy-lora-monteria` | Coliseo Miguel 'Happy' Lora | Gobernación de Córdoba — campaña «Córdoba se solidariza» | Coliseo Miguel 'Happy' Lora, Montería ⚠️ | 8:00 a. m. – 12:30 p. m. y 2:00 p. m. – 7:00 p. m. |
| `estadio-18-de-junio-monteria` | Estadio de Béisbol 18 de Junio | Alcaldía de Montería, con Pastoral Social | Estadio de Béisbol 18 de Junio, Montería ⚠️ | `null` |

**Contradicción entre dos entidades públicas, sin resolver.** La Alcaldía llama al Estadio 18 de Junio «**único** centro de recepción» el mismo día en que la Gobernación abre el Coliseo Happy Lora. No es una contradicción de hecho —son dos administraciones distintas, cada una con su recinto— pero **la palabra «único» de la Alcaldía es falsa a nivel de ciudad** y conviene que la ficha no la reproduzca.

**Trampas de reciclaje comprobadas en estos dos recintos** (detalle en §5): los dos aparecen en una campaña de junio de 2026 **por Venezuela**, y el Estadio 18 de Junio tiene una publicación en `monteria.gov.co` que lo declara «nuevo y único punto oficial de acopio»… **por inundaciones**, no por el terremoto. Ambos candidatos se sostienen **solo** sobre los dos artículos de El Heraldo del 11 de agosto, que sí nombran este sismo. Por eso van `reported` y no más arriba.

**Etiqueta: `no-verificable`.** Ni `cordoba.gov.co` ni `monteria.gov.co` tienen publicación propia de esta emergencia; lo que tienen es de las inundaciones anteriores.

---

### 2.7 Yopal (Casanare) — 6 candidatos, **departamento nuevo**

**Fuente:** [Prensa Libre Casanare — «Alcaldía y Diócesis mediante campaña 'Yopal abraza a Colombia' instan a la solidaridad con las familias afectadas por el terremoto»](https://prensalibrecasanare.com/yopal/alcaldiayopal/57709-alcaldna-y-diucesis-mediante-campasa-yopal-abraza-a-colombia-instan-a-la-solidaridad-con-las-familias-afectadas-por-el-terremoto.html), **12 de agosto de 2026**, abierta el 12 de agosto.

Campaña **«Yopal abraza a Colombia»**, de la **Alcaldía de Yopal** y la **Diócesis de Yopal**. Recepción declarada **del miércoles 12 al martes 18 de agosto de 2026** — es de los pocos registros del proyecto con `endsAt` conocido.

| Slug propuesto | Nombre | Referencia publicada |
|---|---|---|
| `alcaldia-yopal` | Alcaldía de Yopal | Entrada por el Parque de La Herradura |
| `banco-alimentos-diocesis-yopal` | Banco de Alimentos de la Diócesis de Yopal | Banco de Alimentos de la Diócesis de Yopal ⚠️ |
| `catedral-san-jose-yopal` | Catedral San José | Catedral San José ⚠️ |
| `parroquia-san-miguel-arcangel-yopal` | Parroquia San Miguel Arcángel | Parroquia San Miguel Arcángel ⚠️ |
| `parroquia-maria-auxiliadora-yopal` | Parroquia María Auxiliadora | Parroquia María Auxiliadora ⚠️ |
| `parroquia-san-antonio-de-padua-yopal` | Parroquia San Antonio de Padua | Parroquia San Antonio de Padua ⚠️ |

**El problema de estos seis, dicho sin adornos: la fuente no publica ni una sola dirección con nomenclatura.** Publica nombres de instituciones. Eso pasa la regla `publico-sin-direccion` del validador por la letra, no por el espíritu, y **los seis pines van a caer en el centroide del municipio** salvo que alguien consiga las direcciones. Con seis registros en la misma ciudad y sin dirección, el resultado previsible es **seis pines apilados** — el problema que ya hubo que corregir en Cartagena (§3.b) y en Unicentro (§3.c).

**Recomendación explícita:** si no se consiguen direcciones antes de publicar, **publicar solo `alcaldia-yopal`** —que además es el único con una referencia geográfica utilizable, el Parque de La Herradura— y dejar los otros cinco como leads. Abrir Casanare con un punto sólido vale más que abrirlo con seis pines encima del mismo cruce.

**Sobre el `disputed` de Casanare que había que resolver.** Esta campaña **no lo resuelve**. `tigresas-casanare` es un punto de otra red, en «Calle 12 #21-44», teléfono +57 310 310 4757. Ninguna fuente encontrada hoy lo menciona, ni confirma ni desmiente el municipio. **Sigue `disputed`.** Ver §7.2.

**Etiqueta: `no-verificable`.** No se localizó publicación en un dominio propio de la Alcaldía de Yopal ni de la Diócesis. Prensa Libre Casanare es un medio regional que republica boletines de la Alcaldía (la propia ruta de la URL es `/yopal/alcaldiayopal/`), pero **eso lo hace un medio citando a la entidad, no la entidad**.

---

## 3. Bloque `SeedCenter[]` listo para revisión

> **Léelo antes de pegarlo.** Todo va con `latitude: null` y `longitude: null` a propósito: la geocodificación es un paso aparte con revisión manual una por una (§5 de `docs/sources.md`). El modo de fallo más peligroso del proyecto es un pin equivocado con etiqueta de alta confianza, y ya ocurrió tres veces.
>
> Ninguno de estos 28 registros trae teléfono, porque **ninguna fuente publicó un teléfono del punto**. Es el mismo resultado del hallazgo 1 de §10: 0 de 27 entonces, 0 de 28 ahora. Los números generales de las entidades existen y **no se cargaron**, por la razón que el proyecto ya decidió: implicarían «llama a este centro», que es falso.

```ts
import type { SeedCenter } from "../data/centers";

/** Tanda de cobertura del 12 de agosto de 2026. Revisión humana pendiente. */
const VERIFIED_AT_COBERTURA = "2026-08-12T18:00:00-05:00";

// --- Cali: canasta publicada por la Alcaldía en su boletín del 11 de agosto ---
// La lista es de la CAMPAÑA, no de cada punto. Ninguna fuente detalla artículos
// punto por punto. Mismo criterio que se aplicó a Medellín en §3.d.2.
const CALI_ITEMS = [
  "Agua potable",
  "Arroz",
  "Lentejas",
  "Panela",
  "Aceite",
  "Alimentos preparados tipo sándwich",
  "Bebidas de hidratación",
  "Colchonetas",
  "Sábanas",
  "Cobijas",
  "Alcohol",
  "Gasas",
  "Vendas",
  "Tapabocas",
  "Guantes de construcción",
  "Gafas de protección",
  "Cascos de seguridad",
  "Picas",
  "Palas",
  "Barretones",
  "Linternas",
  "Bolsas resistentes",
  "Ropa para adultos y niños",
];

const CALI_SOURCE = {
  sourceName:
    "Alcaldía de Santiago de Cali — «Terremoto de Cali | Repositorio Oficial de Información»",
  sourceUrl:
    "https://www.cali.gov.co/gobierno/publicaciones/193607/terremoto-de-cali-repositorio-oficial-de-informacion/",
  sourcePublishedAt: "2026-08-11",
};

const CALI_NOTES =
  "VERIFICADO EN CANAL PROPIO el 12 de agosto de 2026: el repositorio oficial de la Alcaldía de Santiago de Cali lista este punto bajo el encabezado «Puntos de acopio», con su dirección. NINGUNA fuente oficial publica horario para los puntos de acopio de Cali: el «8:00 a. m. a 6:00 p. m.» que aparece en el repositorio corresponde a los PUNTOS DE DONACIÓN DE SANGRE, que son otra cosa, y no se trasladó aquí. La lista de artículos es de la campaña completa (boletín del 11 de agosto), no de este punto en particular. Confirma antes de llevar cargas grandes.";

export const CANDIDATOS_2026_08_12: SeedCenter[] = [
  // === CALI (Valle del Cauca) — 4, verified ==================================
  {
    slug: "escuela-nacional-deporte-cali",
    name: "Escuela Nacional del Deporte",
    organization: "Alcaldía de Santiago de Cali",
    type: "general",
    department: "Valle del Cauca",
    municipality: "Cali",
    address: "Calle 9 #34-01",
    geocodeQuery: "Calle 9 # 34-01, Cali, Valle del Cauca, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CALI_ITEMS,
    urgentNeeds: [
      "Ropa interior nueva",
      "Pañales y pañitos para bebé",
      "Alimento para mascotas",
      "Cascos y guantes de construcción",
    ],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...CALI_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${CALI_NOTES} Los «urgentNeeds» salen de El País (Cali) del 11 de agosto, que reporta lo que el punto más necesitaba esa tarde. DISCREPANCIA DE BARRIO NO RESUELTA: el repositorio oficial dice «Eucarístico» y El País dice «San Fernando»; la nomenclatura coincide en ambas, así que se conserva la dirección y no se publica el barrio. El País menciona que esa noche se recibiría «hasta las 12 de la madrugada»: es la crónica de una noche concreta, NO un horario de operación, y por eso no se cargó.`,
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "parque-de-la-cana-cali",
    name: "Parque de la Caña",
    organization: "Alcaldía de Santiago de Cali",
    type: "general",
    department: "Valle del Cauca",
    municipality: "Cali",
    address: "Carrera 8 #39-01",
    geocodeQuery: "Carrera 8 # 39-01, Cali, Valle del Cauca, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CALI_ITEMS,
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...CALI_SOURCE,
    verificationStatus: "verified",
    verificationNotes: CALI_NOTES,
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    // CANDIDATO MÁS DÉBIL DE LOS CUATRO DE CALI: la fuente no publica
    // nomenclatura, solo el nombre del complejo. Si el revisor considera que no
    // basta como dirección publicable, ESTE es el que hay que dejar fuera.
    slug: "ciudadela-petronio-alvarez-cali",
    name: "Ciudadela Petronio Álvarez — Complejo Deportivo Alberto Galindo",
    organization: "Alcaldía de Santiago de Cali",
    type: "general",
    department: "Valle del Cauca",
    municipality: "Cali",
    address: "Ciudadela Petronio Álvarez, Complejo Deportivo Alberto Galindo",
    geocodeQuery: "Complejo Deportivo Alberto Galindo, Cali, Valle del Cauca, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CALI_ITEMS,
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...CALI_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${CALI_NOTES} LA FUENTE NO PUBLICA DIRECCIÓN CON NOMENCLATURA para este punto: solo el nombre del complejo deportivo. La precisión honesta de su pin es «approximate» en el mejor caso.`,
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "parqueadero-gobernacion-valle-cali",
    name: "Parqueadero de la Gobernación del Valle del Cauca",
    organization: "Gobernación del Valle del Cauca",
    type: "general",
    department: "Valle del Cauca",
    municipality: "Cali",
    address: "Carrera 6 con calle 10",
    geocodeQuery: "Carrera 6 con Calle 10, Cali, Valle del Cauca, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Colchonetas",
      "Mantas",
      "Carpas",
      "Kits de aseo",
      "Papel higiénico",
      "Tapabocas",
      "Guantes",
      "Gafas de protección",
      "Palas",
      "Bolsas resistentes para residuos",
      "Toallas",
      "Linternas",
      "Cascos de protección",
      "Alimento para perros y gatos",
    ],
    urgentNeeds: ["Carpas", "Colchonetas", "Linternas", "Cascos de protección"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Gobernación del Valle del Cauca — campaña «El Valle Somos Todos» (publicación propia)",
    sourceUrl:
      "https://valledelcauca.gov.co/publicaciones/90172/campana-el-valle-somos-todos-estos-son-los-elementos-que-se-pueden-donar-para-los-damnificados-por-el-sismo",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "verified",
    verificationNotes:
      "VERIFICADO EN CANAL PROPIO el 12 de agosto de 2026: la Gobernación del Valle del Cauca publica este punto en su propio sitio, dentro de la campaña «El Valle Somos Todos», con su dirección y la lista de artículos. La misma publicación sostiene los otros dos puntos de la Gobernación que ya están en el seed (Antigua Licorera del Valle y Casa del Valle en Bogotá), hoy como «reported» citando a El País: ver §6.1 del documento de candidatos. LA FUENTE NO PUBLICA HORARIO. Nota: esa publicación describe el sismo como «magnitud 6.9» mientras el resto del seed usa 7,4; es una discrepancia de la cifra del evento, no del punto de acopio.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },

  // === ATLÁNTICO — 3 =========================================================
  {
    slug: "punto-acopio-gobernacion-atlantico",
    name: "Galería de la Plaza de la Paz",
    organization: "Gobernación del Atlántico — Secretaría del Interior",
    type: "general",
    department: "Atlántico",
    municipality: "Barranquilla",
    address: "Galería de la Plaza de la Paz",
    geocodeQuery: "Plaza de la Paz, Barranquilla, Atlántico, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua potable embotellada",
      "Ropa en buen estado",
      "Cobijas",
      "Colchonetas",
      "Artículos de higiene personal",
      "Pañales",
      "Alimentos para bebés",
      "Linternas",
      "Baterías",
    ],
    urgentNeeds: ["Agua potable embotellada", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Gobernación del Atlántico, vía El Heraldo",
    sourceUrl:
      "https://www.elheraldo.co/atlantico/2026/08/11/gobernacion-del-atlantico-habilita-punto-de-acopio-para-recibir-ayudas-destinadas-a-afectados-por-el-sismo/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "HORARIO DELIBERADAMENTE VACÍO: dos artículos de El Heraldo del MISMO DÍA se contradicen — el listado de centros dice «6:00 a. m. a 6:00 p. m.» y la nota dedicada dice «a partir de las 8:00 de la mañana». No hay forma de decidir cuál es correcto y un horario inventado manda gente a una puerta cerrada. Confirmar antes de ir. PENDIENTE DE ASCENSO: la primaria sería atlantico.gov.co, que el 12 de agosto no resolvió por DNS; el vocero está nombrado (subsecretario Nelson Oquendo) y el gobernador Eduardo Verano aparece citado. Reintentar desde otra red.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "iub-campus-soledad",
    name: "Institución Universitaria de Barranquilla — Campus Soledad",
    organization: "Institución Universitaria de Barranquilla (IUB)",
    type: "general",
    department: "Atlántico",
    municipality: "Soledad",
    address: "Calle 18 #39-100",
    geocodeQuery: "Calle 18 # 39-100, Soledad, Atlántico, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua potable",
      "Artículos de aseo",
      "Insumos médicos",
      "Pañales",
    ],
    urgentNeeds: ["Agua potable", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 6:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Institución Universitaria de Barranquilla, vía El Heraldo",
    sourceUrl:
      "https://www.elheraldo.co/atlantico/2026/08/11/estos-son-los-centros-de-acopio-en-barranquilla-en-los-que-puede-realizar-sus-donaciones-a-los-afectados-por-el-terremoto/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Primer punto del seed en Soledad (680.000 habitantes, hasta hoy sin cobertura). La lista de artículos NO viene desglosada por punto en la fuente: es la canasta general que el artículo atribuye a los centros de acopio de la ciudad. Confirmar antes de ir. Pendiente localizar la publicación propia de la IUB.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "bomberos-voluntarios-soledad",
    name: "Cuerpo de Bomberos Voluntarios de Soledad — Granabastos",
    organization: "Cuerpo de Bomberos Voluntarios de Soledad",
    type: "general",
    department: "Atlántico",
    municipality: "Soledad",
    address: "Granabastos, calle 63 #1-300",
    geocodeQuery: "Granabastos, Soledad, Atlántico, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: ["Alimentos no perecederos", "Medicamentos", "Ropa en buen estado"],
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Cuerpo de Bomberos Voluntarios de Soledad y Centro de Formación y Capacitación de Bomberos, vía El Heraldo",
    sourceUrl:
      "https://www.elheraldo.co/atlantico/2026/08/11/estos-son-los-centros-de-acopio-en-barranquilla-en-los-que-puede-realizar-sus-donaciones-a-los-afectados-por-el-terremoto/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Opera dentro de la Gran Central de Abastos del Caribe (Granabastos). La fuente enumera «alimentos, medicinas, ropa» sin más detalle y no publica horario. OJO al modelar los artículos: acepta medicamentos, a diferencia de la mayoría de puntos del seed. Confirmar antes de ir.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },

  // === SANTANDER — 8 (7 Bucaramanga + 1 Floridablanca) ======================
  // Fuente común: Vanguardia, 11 de agosto de 2026. El artículo publica un
  // horario general de 8:00 a. m. a 5:00 p. m. para el conjunto de los puntos.
  {
    slug: "banco-alimentos-quinta-etapa-bucaramanga",
    name: "Centro Comercial Quinta Etapa — Banco de Alimentos",
    organization: "Banco de Alimentos de Bucaramanga",
    type: "food",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Centro Comercial Quinta Etapa, primer piso, Cabecera",
    geocodeQuery: "Centro Comercial Quinta Etapa, Bucaramanga, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Arroz",
      "Aceite",
      "Pasta",
      "Lentejas",
      "Fríjol",
      "Garbanzo",
      "Arveja",
      "Enlatados",
      "Harina",
      "Panela",
      "Chocolate",
      "Avena",
      "Leche en polvo",
    ],
    urgentNeeds: ["Arroz", "Aceite", "Enlatados"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Banco de Alimentos de Bucaramanga, vía Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Es el único de los nueve puntos de Vanguardia con lista de artículos desglosada. El horario es el general que el artículo atribuye al conjunto de puntos, no uno propio de esta sede. Confirmar antes de ir.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "centroabastos-cruz-roja-bucaramanga",
    name: "Centroabastos — auditorio",
    organization: "Cruz Roja Colombiana",
    type: "general",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Vía a Chimitá, auditorio de Centroabastos",
    geocodeQuery: "Centroabastos, Bucaramanga, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Productos de aseo",
      "Cobijas",
      "Elementos de primera necesidad",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Productos de aseo"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    // La restricción de días va DENTRO del texto a propósito: publicar solo el
    // horario haría creer que abre todos los días.
    scheduleText: "8:00 a. m. – 5:00 p. m., solo martes, jueves y sábado",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Cruz Roja Colombiana, vía Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "ATENCIÓN: es el único punto del seed que NO opera todos los días. Vanguardia precisa martes, jueves y sábado. La lista de artículos no viene desglosada para este punto: es la canasta general del artículo. PENDIENTE DE ASCENSO: siendo la Cruz Roja Colombiana la entidad responsable, cruzrojacolombiana.org ya está en la lista blanca de scripts/validate-seed.ts; basta con localizar la publicación de la seccional Santander.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "alcaldia-bucaramanga",
    name: "Alcaldía de Bucaramanga — primer piso",
    organization: "Alcaldía de Bucaramanga",
    type: "general",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Primer piso de las instalaciones de la Alcaldía de Bucaramanga",
    geocodeQuery: "Alcaldía de Bucaramanga, Bucaramanga, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Productos de aseo",
      "Pañales",
      "Cobijas",
      "Elementos de primera necesidad",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Pañales", "Cobijas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Bucaramanga, vía Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "PENDIENTE DE ASCENSO A UN CLIC: la entidad responsable es la Alcaldía y su dominio bucaramanga.gov.co responde, pero el 12 de agosto no se localizó la publicación de esta emergencia en su sala de prensa. Es de los ascensos más baratos de esta tanda.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    // DIRECCIÓN FLOJA: «centro de Bucaramanga» es una referencia, no
    // nomenclatura. Su pin no puede ser mejor que «municipality».
    slug: "gobernacion-santander-bucaramanga",
    name: "Gobernación de Santander",
    organization: "Gobernación de Santander",
    type: "general",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Sede de la Gobernación de Santander, centro de Bucaramanga",
    geocodeQuery: "Gobernación de Santander, Bucaramanga, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Elementos de aseo",
      "Artículos de primera necesidad",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Elementos de aseo"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Gobernación de Santander, vía Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "LA FUENTE NO PUBLICA NOMENCLATURA: solo dice que opera en la sede de la Gobernación, en el centro de Bucaramanga. Su pin debe quedar como «municipality» salvo que alguien confirme la dirección. PENDIENTE DE ASCENSO: santander.gov.co responde y sería la primaria.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "idesan-bucaramanga",
    name: "Idesan — sede Sotomayor",
    organization: "Gobernación de Santander — Idesan",
    type: "general",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Calle 48 #27A-48, Sotomayor",
    geocodeQuery: "Calle 48 # 27A-48, Bucaramanga, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Elementos de aseo",
      "Artículos de primera necesidad",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Elementos de aseo"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Gobernación de Santander, vía Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Segundo punto de la Gobernación de Santander, este sí con nomenclatura. Vanguardia lo describe como receptor de «ayudas humanitarias» sin desglosar: la lista de artículos es la general del artículo. Confirmar antes de ir.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "loteria-de-santander-bucaramanga",
    name: "Lotería de Santander",
    organization: "Lotería de Santander",
    type: "general",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Calle 36 con carrera 21, centro",
    geocodeQuery: "Calle 36 con Carrera 21, Bucaramanga, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: ["Alimentos no perecederos", "Elementos de primera necesidad"],
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Lotería de Santander, vía Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "La dirección es un cruce de vías, no un número de puerta: el pin será aproximado. Confirmar antes de ir.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "banco-alimentos-bucaramanga",
    name: "Banco de Alimentos de Bucaramanga — sede San Francisco",
    organization: "Banco de Alimentos de Bucaramanga",
    type: "food",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Carrera 20 #11-46, barrio San Francisco",
    geocodeQuery: "Carrera 20 # 11-46, Bucaramanga, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Arroz",
      "Aceite",
      "Pasta",
      "Lentejas",
      "Fríjol",
      "Enlatados",
      "Harina",
      "Panela",
      "Leche en polvo",
    ],
    urgentNeeds: ["Arroz", "Aceite", "Enlatados"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Banco de Alimentos de Bucaramanga, vía Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Sede propia del Banco de Alimentos, distinta del punto del Centro Comercial Quinta Etapa: son dos lugares físicos diferentes de la misma organización, no un duplicado. La lista de artículos se tomó de la que el artículo publica para el punto del centro comercial, del mismo operador; NO viene desglosada para esta sede. Confirmar antes de ir.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    // MUNICIPIO NUEVO. Dirección floja: la fuente no da nomenclatura.
    slug: "gestion-del-riesgo-floridablanca",
    name: "Oficina de Gestión del Riesgo de Floridablanca",
    organization: "Alcaldía de Floridablanca — Oficina de Gestión del Riesgo",
    type: "general",
    department: "Santander",
    municipality: "Floridablanca",
    address: "Sede de la Oficina de Gestión del Riesgo de Floridablanca",
    geocodeQuery: "Floridablanca, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Elementos de aseo",
      "Cobijas",
      "Medicamentos",
      "Artículos de primera necesidad",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Elementos de aseo", "Cobijas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Oficina de Gestión del Riesgo de Floridablanca, vía Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/11/terremoto-en-colombia-nueve-puntos-donde-puede-realizar-donaciones-en-bucaramanga/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "PRIMER PUNTO DEL SEED EN EL ÁREA METROPOLITANA DE BUCARAMANGA FUERA DE LA CAPITAL. LA FUENTE NO PUBLICA NOMENCLATURA: solo dice que la Oficina de Gestión del Riesgo es uno de los puntos. Su pin no puede ser mejor que «municipality» sin una confirmación. Si el revisor exige dirección utilizable, este es candidato a quedar fuera, pero dejarlo fuera cuesta el único punto de Floridablanca. NOTA IMPORTANTE: floridablanca.gov.co SÍ publica una donatón, pero es «para familias afectadas de Santander y Córdoba», que es OTRA emergencia — no sirve como primaria de este punto.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },

  // === ANTIOQUIA / RIONEGRO — 3, municipio nuevo ============================
  // Fuente común: DiariOriente, 11 de agosto de 2026, citando textualmente a la
  // Alcaldía de Rionegro: «estos son los únicos puntos autorizados oficialmente
  // para la recolección de donaciones en el municipio».
  {
    slug: "coliseo-ivan-ramiro-cordoba-rionegro",
    name: "Coliseo Iván Ramiro Córdoba",
    organization:
      "Alcaldía de Rionegro / estrategia Creesiendo, con Corporación Presentes y Gobernación de Antioquia",
    type: "general",
    department: "Antioquia",
    municipality: "Rionegro",
    address: "Carrera 52 #41-61",
    geocodeQuery: "Carrera 52 # 41-61, Rionegro, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Productos de aseo e higiene personal",
      "Ropa en buen estado",
      "Elementos para mascotas",
      "Linternas",
      "Baterías",
      "Guantes",
      "Tapabocas",
      "Guantes desechables",
      "Gasas",
      "Alcohol",
      "Botiquines",
      "Analgésicos",
      "Termómetros",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Productos de aseo e higiene personal"],
    rejectedItems: [
      "Medicamentos que requieran fórmula o prescripción médica",
      "Productos vencidos",
      "Alimentos perecederos",
    ],
    scheduleText: "7:30 a. m. – 4:30 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Rionegro, vía DiariOriente",
    sourceUrl: "https://diarioriente.com/altiplano/rionegro/rionegro-habili.html",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Campaña #ColombiaSeLevanta. Nota a diferencia del resto del seed: ESTE PUNTO SÍ RECIBE ROPA en buen estado y medicamentos de venta libre; lo que rechaza expresamente son los medicamentos que requieren fórmula médica. PENDIENTE DE ASCENSO A UN CLIC: rionegro.gov.co responde y su portada lista la noticia «Rionegro se suma a #ColombiaSeLevanta para apoyar a las familias afectadas por el sismo», pero no se consiguió la URL del artículo el 12 de agosto. Es el mejor lead abierto de esta tanda.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "casa-cincopasitos-rionegro",
    name: "Casa CincoPasitos",
    organization:
      "Alcaldía de Rionegro / estrategia Creesiendo, con Corporación Presentes y Gobernación de Antioquia",
    type: "general",
    department: "Antioquia",
    municipality: "Rionegro",
    address: "Carrera 50 #51-19",
    geocodeQuery: "Carrera 50 # 51-19, Rionegro, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Productos de aseo e higiene personal",
      "Ropa en buen estado",
      "Elementos para mascotas",
      "Linternas",
      "Baterías",
      "Guantes",
      "Tapabocas",
      "Gasas",
      "Alcohol",
      "Botiquines",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Productos de aseo e higiene personal"],
    rejectedItems: [
      "Medicamentos que requieran fórmula o prescripción médica",
      "Productos vencidos",
      "Alimentos perecederos",
    ],
    scheduleText: "7:30 a. m. – 4:30 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Rionegro, vía DiariOriente",
    sourceUrl: "https://diarioriente.com/altiplano/rionegro/rionegro-habili.html",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Campaña #ColombiaSeLevanta. La lista de artículos y el horario son los de la campaña, comunes a los tres puntos de Rionegro. Confirmar antes de ir.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "antiguo-colegio-san-antonio-rionegro",
    name: "Antiguo Colegio San Antonio de Pereira — Oficina de Desarrollo Económico",
    organization:
      "Alcaldía de Rionegro / estrategia Creesiendo, con Corporación Presentes y Gobernación de Antioquia",
    type: "general",
    department: "Antioquia",
    municipality: "Rionegro",
    address:
      "Antiguo Colegio San Antonio de Pereira, Oficina de Desarrollo Económico",
    geocodeQuery: "San Antonio de Pereira, Rionegro, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Productos de aseo e higiene personal",
      "Ropa en buen estado",
      "Elementos para mascotas",
      "Linternas",
      "Baterías",
      "Guantes",
      "Tapabocas",
      "Gasas",
      "Alcohol",
      "Botiquines",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Productos de aseo e higiene personal"],
    rejectedItems: [
      "Medicamentos que requieran fórmula o prescripción médica",
      "Productos vencidos",
      "Alimentos perecederos",
    ],
    scheduleText: "7:30 a. m. – 4:30 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Rionegro, vía DiariOriente",
    sourceUrl: "https://diarioriente.com/altiplano/rionegro/rionegro-habili.html",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "LA FUENTE NO PUBLICA NOMENCLATURA para este punto: lo ubica en el antiguo colegio de San Antonio de Pereira, un corregimiento de Rionegro. Anclar al corregimiento y aceptar precisión baja; NO dejar que el geocodificador elija, que es como se produjeron los errores de Santa Marta y de Delfos (§5 y §3.c de docs/sources.md).",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },

  // === CALDAS / MANIZALES — 2 ==============================================
  {
    slug: "coliseo-mayor-manizales",
    name: "Coliseo Mayor Jorge Arango Uribe — solo alimento para mascotas",
    organization: "Alcaldía de Manizales",
    type: "animal_aid",
    department: "Caldas",
    municipality: "Manizales",
    address: "Unidad Deportiva Palogrande",
    geocodeQuery: "Coliseo Mayor Jorge Arango Uribe, Manizales, Caldas, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: ["Alimento para perros", "Alimento para gatos"],
    urgentNeeds: ["Alimento para perros", "Alimento para gatos"],
    rejectedItems: [
      "Ropa",
      "Alimentos para personas",
      "Productos vencidos",
      "Alimentos perecederos",
    ],
    scheduleText: "8:00 a. m. – 6:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Manizales, vía La Patria",
    sourceUrl:
      "https://www.lapatria.com/manizales/llueven-ayudas-en-manizales-tras-terremoto-comunidad-se-mueve-para-donar-conozca-puntos",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "EL DATO PRINCIPAL DE ESTE REGISTRO ES LA RESTRICCIÓN, NO LA DIRECCIÓN: según La Patria, en el Coliseo Mayor SOLO se recibe alimento para mascotas. Publicarlo sin esa restricción mandaría gente con alimentos y ropa a un sitio que no los acepta. Matiza —no contradice— la §4.6 de docs/sources.md, que excluyó este recinto el 10 de agosto por ser albergue y no centro de acopio: dos días después sí recibe, pero solo concentrado. La Patria además publica que NO se recibe ropa porque la comunidad ya donó suficiente. FECHA COMPROBADA A PROPÓSITO: §10 documenta un artículo de La Patria con fecha de plantilla de 2026 sobre contenido real de 2020; este es del 11 de agosto de 2026 y habla del sismo de magnitud 7,4.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "coliseo-menor-manizales",
    name: "Coliseo Menor Ramón Marín Vargas",
    organization: "Alcaldía de Manizales",
    type: "general",
    department: "Caldas",
    municipality: "Manizales",
    address: "Unidad Deportiva Palogrande",
    geocodeQuery: "Coliseo Menor Ramón Marín Vargas, Manizales, Caldas, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos secos",
      "Artículos de higiene",
      "Cobijas",
      "Frazadas",
      "Toallas",
      "Toallas higiénicas",
      "Pañales",
      "Elementos para bebés",
      "Equipos ortopédicos",
    ],
    urgentNeeds: ["Cobijas", "Frazadas", "Pañales", "Equipos ortopédicos"],
    rejectedItems: ["Ropa", "Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 6:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Manizales, vía La Patria",
    sourceUrl:
      "https://www.lapatria.com/manizales/llueven-ayudas-en-manizales-tras-terremoto-comunidad-se-mueve-para-donar-conozca-puntos",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Comparte recinto con el Coliseo Mayor (Unidad Deportiva Palogrande) pero es OTRO edificio y OTRA canasta: aquí van los alimentos y los artículos de aseo, allá solo alimento para mascotas. Al geocodificar hay que separarlos, o quedarán apilados. NO recibe ropa: La Patria publica que la comunidad ya donó suficiente. Manizales es una de las cuatro ciudades más golpeadas y este es el primer punto general de la ciudad en el seed, además del banco de alimentos.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },

  // === CÓRDOBA / MONTERÍA — 2 ==============================================
  {
    slug: "coliseo-happy-lora-monteria",
    name: "Coliseo Miguel 'Happy' Lora",
    organization: "Gobernación de Córdoba — campaña «Córdoba se solidariza»",
    type: "general",
    department: "Córdoba",
    municipality: "Montería",
    address: "Coliseo Miguel 'Happy' Lora",
    geocodeQuery: "Coliseo Miguel Happy Lora, Montería, Córdoba, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua potable",
      "Elementos de aseo personal",
      "Insumos médicos",
      "Artículos para bebés",
      "Cobijas",
      "Alimento para mascotas",
    ],
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Insumos médicos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 12:30 p. m. y 2:00 p. m. – 7:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Gobernación de Córdoba, vía El Heraldo",
    sourceUrl:
      "https://www.elheraldo.co/colombia/2026/08/11/gobernacion-de-cordoba-habilita-punto-de-acopio-para-apoyar-a-familias-afectadas-por-el-sismo/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "TRAMPA DE RECICLAJE COMPROBADA Y ESQUIVADA: este mismo recinto aparece en una campaña de junio de 2026 por los sismos de Venezuela y, más recientemente, como albergue de la Gobernación de Córdoba por evacuaciones locales. Se sostiene aquí porque El Heraldo del 11 de agosto de 2026 dice expresamente que la motivación es «el sismo registrado en el país la mañana del lunes 10 de agosto» y nombra al gobernador Erasmo Zuleta Bechara. Aun así, ES EL CANDIDATO QUE MÁS MERECE UNA LLAMADA ANTES DE PUBLICARSE. Ni cordoba.gov.co ni monteria.gov.co tienen publicación propia de esta emergencia.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "estadio-18-de-junio-monteria",
    name: "Estadio de Béisbol 18 de Junio",
    organization: "Alcaldía de Montería, con Pastoral Social",
    type: "general",
    department: "Córdoba",
    municipality: "Montería",
    address: "Estadio de Béisbol 18 de Junio",
    geocodeQuery: "Estadio 18 de Junio, Montería, Córdoba, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Artículos de aseo",
      "Artículos para bebé",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Artículos de aseo"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Montería, vía El Heraldo",
    sourceUrl:
      "https://www.elheraldo.co/colombia/2026/08/11/alcaldia-de-monteria-activa-recepcion-de-ayudas-humanitarias-para-familias-afectadas-en-el-pais/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "La Alcaldía lo llama «único centro de recepción», pero ESA PALABRA NO SE PUEDE REPRODUCIR: el mismo día la Gobernación de Córdoba abrió el Coliseo Miguel 'Happy' Lora. Son dos administraciones distintas y los dos puntos existen. TRAMPA DE RECICLAJE COMPROBADA: monteria.gov.co tiene una publicación que declara este mismo estadio «nuevo y único punto oficial de acopio», pero es por INUNDACIONES, no por el terremoto; ese enlace NO sirve como primaria y no debe usarse aunque el título encaje. La fuente no publica horario.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },

  // === CASANARE / YOPAL — 6, DEPARTAMENTO NUEVO =============================
  // Campaña «Yopal abraza a Colombia», Alcaldía de Yopal + Diócesis de Yopal.
  // Recepción declarada del 12 al 18 de agosto de 2026 — de los pocos
  // registros del proyecto con fecha de cierre conocida.
  //
  // ADVERTENCIA QUE APLICA A LOS SEIS: la fuente NO publica ni una sola
  // dirección con nomenclatura. Si se publican los seis sin conseguir
  // direcciones, van a quedar seis pines apilados sobre el centroide de Yopal,
  // que es el problema ya corregido en Cartagena y en Unicentro. La
  // recomendación del documento es publicar SOLO `alcaldia-yopal` mientras
  // tanto.
  {
    slug: "alcaldia-yopal",
    name: "Alcaldía de Yopal — entrada por el Parque de La Herradura",
    organization: "Alcaldía de Yopal / Diócesis de Yopal — «Yopal abraza a Colombia»",
    type: "general",
    department: "Casanare",
    municipality: "Yopal",
    address: "Alcaldía de Yopal, entrada por el Parque de La Herradura",
    geocodeQuery: "Parque de La Herradura, Yopal, Casanare, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Arroz",
      "Fríjol",
      "Aceite",
      "Leche",
      "Café",
      "Azúcar",
      "Sal",
      "Pasta",
      "Enlatados",
      "Papel higiénico",
      "Cepillos dentales",
      "Crema dental",
      "Toallas higiénicas",
      "Pañales",
      "Colchonetas",
      "Cobijas",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Colchonetas", "Cobijas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-12",
    endsAt: "2026-08-18",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Alcaldía de Yopal y Diócesis de Yopal — campaña «Yopal abraza a Colombia», vía Prensa Libre Casanare",
    sourceUrl:
      "https://prensalibrecasanare.com/yopal/alcaldiayopal/57709-alcaldna-y-diucesis-mediante-campasa-yopal-abraza-a-colombia-instan-a-la-solidaridad-con-las-familias-afectadas-por-el-terremoto.html",
    sourcePublishedAt: "2026-08-12",
    verificationStatus: "reported",
    verificationNotes:
      "ABRE UN DEPARTAMENTO ENTERO: Casanare no tenía ningún centro publicado. Es el punto más sólido de los seis de la campaña, porque es el único con una referencia geográfica utilizable (el Parque de La Herradura). La fuente NO publica horario ni teléfono, y NO publica direcciones con nomenclatura para ninguno de los seis puntos. La campaña declara recepción del 12 al 18 de agosto de 2026: la aplicación avisará sola cuando pase esa fecha. Pendiente localizar la publicación en un dominio propio de la Alcaldía o de la Diócesis.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "banco-alimentos-diocesis-yopal",
    name: "Banco de Alimentos de la Diócesis de Yopal",
    organization: "Diócesis de Yopal — «Yopal abraza a Colombia»",
    type: "food",
    department: "Casanare",
    municipality: "Yopal",
    address: "Banco de Alimentos de la Diócesis de Yopal",
    geocodeQuery: "Yopal, Casanare, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Arroz",
      "Fríjol",
      "Aceite",
      "Leche",
      "Café",
      "Azúcar",
      "Sal",
      "Pasta",
      "Enlatados",
      "Papel higiénico",
      "Cepillos dentales",
      "Crema dental",
      "Toallas higiénicas",
      "Pañales",
      "Colchonetas",
      "Cobijas",
    ],
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-12",
    endsAt: "2026-08-18",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Alcaldía de Yopal y Diócesis de Yopal — campaña «Yopal abraza a Colombia», vía Prensa Libre Casanare",
    sourceUrl:
      "https://prensalibrecasanare.com/yopal/alcaldiayopal/57709-alcaldna-y-diucesis-mediante-campasa-yopal-abraza-a-colombia-instan-a-la-solidaridad-con-las-familias-afectadas-por-el-terremoto.html",
    sourcePublishedAt: "2026-08-12",
    verificationStatus: "reported",
    verificationNotes:
      "SIN DIRECCIÓN: la fuente solo publica el nombre de la institución. Su pin caerá en el centroide de Yopal salvo que alguien consiga la dirección. Ver la advertencia general de los seis puntos de Yopal antes de publicar.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "catedral-san-jose-yopal",
    name: "Catedral San José",
    organization: "Diócesis de Yopal — «Yopal abraza a Colombia»",
    type: "general",
    department: "Casanare",
    municipality: "Yopal",
    address: "Catedral San José, Yopal",
    geocodeQuery: "Catedral San José, Yopal, Casanare, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Arroz",
      "Fríjol",
      "Aceite",
      "Leche",
      "Café",
      "Azúcar",
      "Sal",
      "Pasta",
      "Enlatados",
      "Papel higiénico",
      "Crema dental",
      "Toallas higiénicas",
      "Pañales",
      "Colchonetas",
      "Cobijas",
    ],
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-12",
    endsAt: "2026-08-18",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Alcaldía de Yopal y Diócesis de Yopal — campaña «Yopal abraza a Colombia», vía Prensa Libre Casanare",
    sourceUrl:
      "https://prensalibrecasanare.com/yopal/alcaldiayopal/57709-alcaldna-y-diucesis-mediante-campasa-yopal-abraza-a-colombia-instan-a-la-solidaridad-con-las-familias-afectadas-por-el-terremoto.html",
    sourcePublishedAt: "2026-08-12",
    verificationStatus: "reported",
    verificationNotes:
      "SIN DIRECCIÓN: la fuente solo publica el nombre. Es un POI con nombre propio, así que el geocodificador probablemente lo encuentre — pero §5 documenta que un POI con nombre propio es justamente el modo de fallo que produce pines equivocados con etiqueta de alta confianza. Revisar el pin a mano.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "parroquia-san-miguel-arcangel-yopal",
    name: "Parroquia San Miguel Arcángel",
    organization: "Diócesis de Yopal — «Yopal abraza a Colombia»",
    type: "general",
    department: "Casanare",
    municipality: "Yopal",
    address: "Parroquia San Miguel Arcángel, Yopal",
    geocodeQuery: "Parroquia San Miguel Arcángel, Yopal, Casanare, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Arroz",
      "Fríjol",
      "Aceite",
      "Leche",
      "Café",
      "Azúcar",
      "Sal",
      "Pasta",
      "Enlatados",
      "Papel higiénico",
      "Crema dental",
      "Toallas higiénicas",
      "Pañales",
      "Colchonetas",
      "Cobijas",
    ],
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-12",
    endsAt: "2026-08-18",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Alcaldía de Yopal y Diócesis de Yopal — campaña «Yopal abraza a Colombia», vía Prensa Libre Casanare",
    sourceUrl:
      "https://prensalibrecasanare.com/yopal/alcaldiayopal/57709-alcaldna-y-diucesis-mediante-campasa-yopal-abraza-a-colombia-instan-a-la-solidaridad-con-las-familias-afectadas-por-el-terremoto.html",
    sourcePublishedAt: "2026-08-12",
    verificationStatus: "reported",
    verificationNotes:
      "SIN DIRECCIÓN: la fuente solo publica el nombre de la parroquia. Ver la advertencia general de los seis puntos de Yopal.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "parroquia-maria-auxiliadora-yopal",
    name: "Parroquia María Auxiliadora",
    organization: "Diócesis de Yopal — «Yopal abraza a Colombia»",
    type: "general",
    department: "Casanare",
    municipality: "Yopal",
    address: "Parroquia María Auxiliadora, Yopal",
    geocodeQuery: "Parroquia María Auxiliadora, Yopal, Casanare, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Arroz",
      "Fríjol",
      "Aceite",
      "Leche",
      "Café",
      "Azúcar",
      "Sal",
      "Pasta",
      "Enlatados",
      "Papel higiénico",
      "Crema dental",
      "Toallas higiénicas",
      "Pañales",
      "Colchonetas",
      "Cobijas",
    ],
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-12",
    endsAt: "2026-08-18",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Alcaldía de Yopal y Diócesis de Yopal — campaña «Yopal abraza a Colombia», vía Prensa Libre Casanare",
    sourceUrl:
      "https://prensalibrecasanare.com/yopal/alcaldiayopal/57709-alcaldna-y-diucesis-mediante-campasa-yopal-abraza-a-colombia-instan-a-la-solidaridad-con-las-familias-afectadas-por-el-terremoto.html",
    sourcePublishedAt: "2026-08-12",
    verificationStatus: "reported",
    verificationNotes:
      "SIN DIRECCIÓN: la fuente solo publica el nombre de la parroquia. Ver la advertencia general de los seis puntos de Yopal.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
  {
    slug: "parroquia-san-antonio-de-padua-yopal",
    name: "Parroquia San Antonio de Padua",
    organization: "Diócesis de Yopal — «Yopal abraza a Colombia»",
    type: "general",
    department: "Casanare",
    municipality: "Yopal",
    address: "Parroquia San Antonio de Padua, Yopal",
    geocodeQuery: "Parroquia San Antonio de Padua, Yopal, Casanare, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Arroz",
      "Fríjol",
      "Aceite",
      "Leche",
      "Café",
      "Azúcar",
      "Sal",
      "Pasta",
      "Enlatados",
      "Papel higiénico",
      "Crema dental",
      "Toallas higiénicas",
      "Pañales",
      "Colchonetas",
      "Cobijas",
    ],
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-12",
    endsAt: "2026-08-18",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName:
      "Alcaldía de Yopal y Diócesis de Yopal — campaña «Yopal abraza a Colombia», vía Prensa Libre Casanare",
    sourceUrl:
      "https://prensalibrecasanare.com/yopal/alcaldiayopal/57709-alcaldna-y-diucesis-mediante-campasa-yopal-abraza-a-colombia-instan-a-la-solidaridad-con-las-familias-afectadas-por-el-terremoto.html",
    sourcePublishedAt: "2026-08-12",
    verificationStatus: "reported",
    verificationNotes:
      "SIN DIRECCIÓN: la fuente solo publica el nombre de la parroquia. Ver la advertencia general de los seis puntos de Yopal.",
    lastVerifiedAt: VERIFIED_AT_COBERTURA,
  },
];
```

---

## 4. Ciudades que se buscaron y no dieron nada

La distinción importa. **«No existe punto» no es lo mismo que «no se pudo comprobar»**, y §3.d.4 documenta que el 12 de agosto varios dominios oficiales dieron 403 y que eso **no es prueba de ausencia**.

### 4.1 No se encontró punto (búsqueda hecha, resultado negativo)

| Ciudad | Qué se buscó | Resultado |
|---|---|---|
| **Soacha** (750 k, Cundinamarca) | Búsqueda dirigida + publicación de la Gobernación de Cundinamarca del 11 de agosto | La Gobernación de Cundinamarca publica **solo dos** centros, ambos ya en el seed (Plaza de la Paz en Bogotá y Empresa de Licores en Cota). **Soacha no aparece en ninguna lista.** Cundinamarca sigue con 5 municipios y ninguno es Soacha. |
| **Bello, Sabaneta, La Estrella, Caldas, Copacabana, Girardota** (Antioquia) | Búsqueda dirigida por municipio y en `antioquia.gov.co` | Nada. `antioquia.gov.co` publica sobre el sismo (PMU, alerta roja hospitalaria, evaluación de daños) pero **no habilita puntos de acopio departamentales**. El único municipio del Valle de Aburrá y el Oriente con puntos propios encontrados es **Rionegro**. Sabaneta sigue con su único registro `pending`. |
| **Girón y Piedecuesta** (Santander) | Artículo de los «nueve puntos» de Vanguardia, leído entero | **Ninguno de los nueve está en Girón ni en Piedecuesta.** Un resumen automático afirmaba que sí; al abrir el artículo, no. Siguen en cero. |
| **Palmira, Tuluá, Buga, Jamundí, Buenaventura** (Valle del Cauca) | Búsqueda dirigida y en los dominios municipales | Nada de esta emergencia. El repositorio oficial de la Alcaldía de Cali y la campaña de la Gobernación del Valle listan **solo puntos en Cali y uno en Bogotá**. Buga sigue con su registro `pending` y Buenaventura con su banco `inactive`. |
| **Dosquebradas y Armenia** (Eje Cafetero) | Búsqueda dirigida y en dominios municipales | Nada nuevo. Lo que hay en `dosquebradas.gov.co` sobre acopio es la campaña **«Dosquebradas Unida por Córdoba»**, de otra emergencia. Armenia sigue solo con su banco de alimentos. |
| **Quibdó y Chocó** | Búsqueda dirigida a la Alcaldía y la Gobernación | **La «lectura del vacío» de §6 sigue vigente al 12 de agosto.** Ni la Gobernación del Chocó ni la Alcaldía de Quibdó publican puntos de acopio; lo que la Gobernación sí habilitó es una **cuenta bancaria** (Banco de Bogotá, ahorros 578818429, «Ayuda humanitaria», NIT 891.680.010-3). El único punto físico en Quibdó sigue siendo el de la red de Tigresas que ya está en el seed. |
| **Leticia, Inírida, San José del Guaviare, Mitú, Puerto Carreño, San Andrés** | Búsqueda dirigida | Nada. Ninguna fuente encontrada menciona actividad de acopio en Amazonas, Guainía, Guaviare, Vaupés, Vichada ni San Andrés. Se mantiene la lectura de §6: son departamentos de baja densidad sin actividad reportada. |

### 4.2 No se pudo comprobar (límite de herramienta, NO ausencia)

| Dominio / fuente | Obstáculo el 12 de agosto | Qué se pierde |
|---|---|---|
| `barranquilla.gov.co` | **HTTP 403** (tercer día seguido) | La primaria del punto de Barranquillita, que lleva dos días en `reported` con evidencia circunstancial fuerte |
| `cartagena.gov.co` | **HTTP 403** | La primaria del Coliseo Bernardo Caraballo |
| `santamarta.gov.co` | **HTTP 403** | La primaria de la Ogricc |
| `atlantico.gov.co` | **DNS `ENOTFOUND`** al acceso directo; el buscador solo tiene indexado contenido de 2014-2022 | La primaria del punto de la Gobernación del Atlántico en la Plaza de la Paz |
| `mioriente.com` | **HTTP 403** | Una segunda fuente independiente para los tres puntos de Rionegro |
| `areacucuta.com` | **HTTP 403** | El único artículo localizado sobre el centro de acopio del Banco de Alimentos de Cúcuta |
| `monteria.gov.co` (índice de publicaciones) | **HTTP 404** en la ruta de listado | Barrido completo de la sala de prensa de Montería |
| Instagram (incluida la cuenta de Tigresas, en lista blanca) | Contenido no legible sin sesión | Corroborar en canal propio los puntos de Tigresas en Montería y Riohacha |

**Cúcuta merece una línea aparte.** Existe un centro de acopio del **Banco de Alimentos de Cúcuta** anunciado para esta emergencia, con dirección **calle 2AN #1-26, barrio Pescadero, detrás del SENA**. Ese dato viene de un resumen de búsqueda sobre `areacucuta.com`, y **la página devolvió 403: no la pude abrir**. Por la regla 1 del proyecto, **no se propone como candidato**. Queda como lead en §7.3. Cúcuta sigue con un solo punto.

---

## 5. Trampas de reciclaje esquivadas en esta tanda

Cinco. Las cinco se detectaron **solo al abrir la fuente** o al leer la fecha real del contenido. La constante `EARTHQUAKE_DATE` sigue ganándose el sueldo.

1. **`valledelcauca.gov.co` — «Vallecaucanos aún pueden sumarse a la campaña 'Unidos por Venezuela'».** Aparece arriba en los resultados al buscar «centro de acopio donaciones terremoto 2026» en el dominio de la Gobernación del Valle. Es de la campaña por los **sismos de Venezuela de junio de 2026** y menciona la Secretaría de Gestión del Riesgo del Valle y «La Obra Show Bar» como puntos. **Ninguno de esos dos entró.** Es la misma trampa de §3.d.5, ahora en un dominio `.gov.co`, que es donde más peligrosa resulta: pasa el filtro de «canal propio» y falla el de fecha.

2. **`centrodeinformacion.manizales.gov.co` — «Montería nos necesita, Manizales responde».** Es el sitio oficial de la Alcaldía de Manizales publicando **puntos de acopio reales, con direcciones** (plazoleta de la Alcaldía, estación de bomberos Fundadores, Mallplaza, Sancancio, Mercaldas Las Palmas). Todos por las **inundaciones en Montería**, no por el terremoto. Un rastreo apresurado habría metido cinco puntos falsos en Manizales **con sello `verified`**, porque la fuente es impecable: lo único que falla es el evento.

3. **`floridablanca.gov.co` — «Floridablanca se une a donatón para familias afectadas de Santander y Córdoba».** Mismo patrón: dominio oficial, campaña de donaciones, otra emergencia. No se usó como primaria del punto de Floridablanca.

4. **Montería — el Coliseo Happy Lora y el Estadio 18 de Junio, tres veces reutilizados.** Los dos recintos aparecen (a) en una campaña de junio de 2026 **por Venezuela**, (b) en publicaciones de `monteria.gov.co` por **inundaciones** —una de ellas titulada «nuevo y **único** punto oficial de acopio», que es exactamente el titular que uno querría encontrar— y (c) en los artículos de El Heraldo del 11 de agosto de 2026 que sí son de este terremoto. **Solo (c) sirve.** Es el caso más denso de reciclaje que ha aparecido en el proyecto, y la razón de que los dos candidatos de Montería lleven la advertencia en su propia ficha.

5. **Una dirección de Quibdó que la fuente no contiene.** Un resumen automático atribuyó al artículo de Pulzo sobre el Chocó un punto en «Calle 25 #6-58, barrio Pandeyuca». **Al abrir el artículo, esa dirección no está.** Pulzo menciona que hay puntos en Quibdó, Cali, Pereira, Manizales y Armenia, y remite expresamente a «acudir a las fuentes oficiales». La dirección no coincide con la del punto de Quibdó que sí tiene el seed (Calle 27A #23-44). Es el cuarto dato fabricado que este proyecto documenta, después de los tres de §10.

**Y un sexto dato descartado que no es reciclaje sino atribución cruzada:** el «8:00 a. m. a 6:00 p. m.» que un resumen atribuyó a la Escuela Nacional del Deporte de Cali pertenece, en el repositorio oficial, a los **puntos de donación de sangre**. Ver §2.1.

---

## 6. Correcciones detectadas al seed actual

### 6.1 Dos centros `reported` tienen ahora su fuente primaria localizada ⭐

**Es el hallazgo más rentable de la tanda y no es un centro nuevo.**

`valledelcauca.gov.co` respondió. La Gobernación del Valle publicó el 11 de agosto su campaña **«El Valle Somos Todos»** con los tres puntos y sus direcciones. Dos de ellos **ya están en el seed** como `reported`, citando a El País:

| Slug en el seed | Dirección en el seed | Dirección en la publicación propia | ¿Coincide? |
|---|---|---|---|
| `antigua-licorera-del-valle-cali` | Carrera 1 #26-85 | «Antigua Licorera del Valle, Carrera 1 No. 26-85, Cali» | **Sí, exacta** |
| `casa-del-valle-bogota` | Calle 34 #5-50, barrio La Merced | «Casa del Valle en Bogotá, Calle 34 No. 5-50, barrio La Merced, localidad de Santa Fe» | **Sí, exacta** |

Ambos cumplen la definición de `verified`: la entidad responsable publicando en su propio canal, en un dominio que ya está en `OFFICIAL_SITES`. **Propuesta: ascender los dos**, cambiando `sourceName` y `sourceUrl` a la publicación de la Gobernación y `sourcePublishedAt` a `2026-08-11`.

Dos salvedades antes de hacerlo:

- La publicación **no trae horario**. `casa-del-valle-bogota` tiene hoy `scheduleText: "Desde las 7:00 a. m.; la fuente no publicó hora de cierre"`, que viene de La FM (§10). Ese dato **no gana ni pierde certeza** con este hallazgo y debe conservarse tal cual, con su salvedad dentro del texto.
- La publicación describe el evento como **«sismo de magnitud 6.9»**, mientras el resto del seed usa 7,4. Es una discrepancia sobre la cifra del terremoto, no sobre el punto de acopio, y no invalida nada — pero conviene saberlo antes de que alguien la encuentre y se alarme.

> **Y aplica aquí la regla que §5.3 dejó escrita:** antes de ascender, **revisar la geometría**. `banco-de-alimentos-cali` y `casa-del-valle-bogota` están los dos en la lista de pines aproximados de §5.1. Promover al sello «Verificado» un centro cuyo mapa apunta a kilómetros de distancia es peor que dejarlo en `reported`. Así apareció el error de 11 km de `acsc-bogota`.

### 6.2 `plazoleta-jairo-varela-cali` tiene dirección y primaria nuevas

Está en el seed como `reported` citando a El País. El repositorio oficial de la Alcaldía de Cali lo lista con dirección: **«Av. 2 Nte. # 10 Nte. - 1 Granada»**. Es canal propio y **da dirección donde antes no había**. Candidato claro a ascenso a `verified` — y, de nuevo, revisar el pin antes.

### 6.3 §6 dice «21 departamentos» y hoy son 26

Confirmado. `docs/sources.md` §6 conserva la lista de 21 departamentos y la de 12 sin cobertura, pero la cabecera del mismo documento ya dice «26 departamentos» y el conteo sobre `data/centers.ts` da **26**. Entraron **Arauca, Caquetá, Putumayo, Chocó y Risaralda** y nadie actualizó la sección. Los «12 departamentos sin centros confirmados» son hoy **7**: Amazonas, Casanare, Guainía, Guaviare, San Andrés y Providencia, Vaupés y Vichada.

**Si entra el bloque de Yopal, serán 6 y el conteo pasará a 27.** Ojo con el detalle al recontar: Casanare **ya aparece** en `data/centers.ts` a través de `tigresas-casanare`, pero ese registro está `disputed` y no se publica. El conteo que le importa al usuario es el de departamentos con al menos un centro **publicado**, no el de departamentos presentes en el archivo. Si se cuenta sobre el archivo en vez de sobre lo publicable, salen números distintos — y ese es exactamente el tipo de desajuste que dejó «21» escrito cuando ya eran 26.

La «lectura del vacío» que acompaña a esa lista **hay que reescribirla, no borrarla**: sigue explicando bien por qué Chocó y Risaralda tardaron, pero ya no describe el estado del mapa, porque ambos entraron.

### 6.4 Horarios nuevos para centros que ya están publicados

Datos que aparecieron al investigar otras ciudades y que **no se aplicaron** —este documento no toca archivos existentes— pero que conviene registrar:

| Slug en el seed | Horario hoy | Dato encontrado | Fuente |
|---|---|---|---|
| `coliseo-bernardo-caraballo-cartagena` | — | 8:00 a. m. – 5:00 p. m. | El Tiempo, «puntos de acopio en la región Caribe», 11 ago 2026 |
| `tigresas-barranquilla-casa-abelardista` | — | 9:00 a. m. – 5:00 p. m. | El Tiempo, mismo artículo |
| `ogricc-santa-marta` | — | 8:30 a. m. – 5:30 p. m., **segundo piso** | El Tiempo, mismo artículo |
| `gobernacion-cundinamarca-plaza-de-la-paz` | — | 8:00 a. m. – 5:00 p. m.; dirección **Calle 26 No. 51-53, sector CAN** | Infobae, 11 ago 2026 |
| `empresa-licores-cundinamarca` | — | 7:30 a. m. – 4:00 p. m. | Infobae, 11 ago 2026 |

**Advertencia sobre estos cinco.** El Tiempo e Infobae son, para este proyecto, **agregadores**, y §3 es explícito: se usan para corroborar, nunca como fuente única. Ninguno de estos horarios debería entrar sin una segunda fuente, y el de Plaza de la Paz **menos todavía**, porque §7.6 dice que la fuente original no publicó dirección y que se geocodificó la sede de la Gobernación: cambiar la dirección por la de un agregador movería un pin sin respaldo primario.

### 6.5 El registro `disputed` de Casanare no se resolvió

`tigresas-casanare` («Calle 12 #21-44», +57 310 310 4757, municipio asumido Yopal sin confirmar) **sigue igual**. La campaña «Yopal abraza a Colombia» es de otra organización —Alcaldía y Diócesis— y no lo menciona. Ninguna de las fuentes abiertas hoy nombra esa dirección ni ese teléfono. **La llamada sigue siendo la única vía.** Lo que sí cambia es la urgencia: si entra el bloque de Yopal, Casanare deja de depender de este registro para existir en el mapa.

---

## 7. Leads abiertos

Ordenados por relación esfuerzo/valor.

1. **La noticia de Rionegro en `rionegro.gov.co`.** El dominio responde y su portada lista «Rionegro se suma a #ColombiaSeLevanta para apoyar a las familias afectadas por el sismo». No conseguí la URL del artículo: la sección `/galeria/23/noticias/` sirve contenido de 2024 y el buscador no la tiene indexada. **Qué falta:** navegar el portal a mano desde un navegador. Si el artículo lista los tres puntos, **los tres suben a `verified` de golpe** y Rionegro entra con sello. Es el ascenso más barato disponible.

2. **`atlantico.gov.co` desde otra red.** El dominio no resolvió por DNS. La Gobernación del Atlántico habilitó su punto con vocero nombrado y el gobernador citado; la primaria casi seguro existe. **Qué falta:** un reintento desde otra conexión.

3. **El centro de acopio del Banco de Alimentos de Cúcuta.** Anunciado en `areacucuta.com`, que devolvió 403. La dirección que circula es calle 2AN #1-26, barrio Pescadero, detrás del SENA. **Qué falta:** abrir esa página, o buscar el canal propio del Banco de Alimentos de Cúcuta. Cúcuta es Tier 1 y sigue con un punto solo.

4. **Las direcciones de los cinco puntos religiosos de Yopal.** La campaña está bien documentada pero sin nomenclatura. **Qué falta:** una llamada a la Alcaldía de Yopal o a la Diócesis, o la pieza gráfica de la campaña. Sin eso, la recomendación de §2.7 es publicar solo el punto de la Alcaldía.

5. **Los tres puntos de la red de Tigresas en Montería.** El Tiempo (11 de agosto) los atribuye a Tigresas de la Patria con dirección: Centro de Solidaridad (calle 69 No. 3-89, barrio El Recreo), Punto de Solidaridad Norte (carrera 1A No. 62-41) y Punto de Solidaridad Centro (calle 69 No. 1C-92). **No entraron como candidatos** porque la cuenta de Tigresas —que está en la lista blanca— no es legible sin sesión, y porque esa red arrastra la campaña de Venezuela de junio. **Qué falta:** ver las piezas gráficas de la red, igual que se hizo con los 31 puntos de §3.b. Si aparecen, entran directamente como `verified` y Montería pasa de 1 a 6.

6. **El punto de Riohacha.** El mismo artículo de El Tiempo lista «Terrazas de Coquivacoa, casa 15, barrio Coquivacoa» **sin decir quién lo opera**. La forma (una casa particular, con nomenclatura de conjunto) encaja con los puntos de Tigresas. **No se propone**: un centro de acopio sin entidad responsable no es publicable. **Qué falta:** identificar quién lo habilitó.

7. **Los nueve puntos privados de Barranquilla.** El Heraldo publica, además de los institucionales, una lista de puntos en negocios y edificios con dirección exacta: Pamela's Wellness Food (calle 82 #55-55 y bodega en calle 86 #73-142), Del Origen (oficina calle 79B #74A-112 y bodega carrera 3 #60-177), Edificio Bosques del Golf (carrera 58 #81-160), Casona FOCA (calle 86 #50-129), Viva VIU (carrera 51B #87-50), Mallplaza VIU (carrera 55 #99-51), Banco de Alimentos Arquidiocesano (calle 53C #31-121) y dos puntos de la Universidad del Norte dentro del campus (Bienestar Organizacional, bloque A piso 3; Centro para el Desarrollo, Liderazgo y Participación, Coliseo piso 2, programa Univoluntarios). **No entraron al bloque** porque son nueve registros sin horario, sin teléfono y sin entidad organizadora identificable más allá del propio negocio — publicarlos multiplicaría por tres los puntos de Barranquilla con la información más pobre del seed. **Qué falta:** una decisión editorial y, para el Banco de Alimentos Arquidiocesano y Uninorte, que son institucionales, la publicación en su propio canal. Esos dos son los que más valen del grupo.

8. **Los cuatro puntos de Ibagué que ya vencieron.** [El Nuevo Día](https://www.elnuevodia.com.co/ibague/ibague-habilita-puntos-de-acopio-para-ayudar-pereira-538726) (11 de agosto) publica cuatro puntos de la Alcaldía de Ibagué —CC La Estación, Castiagro, CC Multicentro y CC Acqua— pero con un plazo explícito: **«hasta las 2:00 de la tarde» del martes 11**. **A la hora de escribir esto ya pasó.** No se proponen. Se anotan aquí porque son la prueba de que hay campañas de horas, y porque si la Alcaldía de Ibagué abre una segunda tanda, esos cuatro sitios son los primeros donde mirar. Ibagué sigue con un punto y sin dirección exacta.

9. **Los siete CAFE de Pereira.** El mapa nacional de El Tiempo menciona «siete Centros de Atención (CAFE) en diferentes barrios» de Pereira. **No se propusieron**: no se pudo determinar si reciben donaciones o si las distribuyen, que es justo la distinción que §3.b obliga a hacer en la zona golpeada, y el artículo no publica direcciones. **Qué falta:** `pereira.gov.co`. Pereira es una de las cuatro ciudades más afectadas y tiene un solo punto activo.

---

## 8. Nota de método

Esta tanda invirtió el orden de trabajo respecto a las anteriores: **primero el canal propio de la entidad, después los medios.** El resultado es medible. Cali pasó de 0 a 4 puntos con sello en una sola lectura, porque `cali.gov.co` publica un repositorio con direcciones; y la primaria de dos centros que llevaban dos días atascados en `reported` apareció en el primer intento sobre `valledelcauca.gov.co`.

También conviene decir lo contrario, porque es igual de informativo: **empezar por la primaria multiplicó los falsos positivos peligrosos.** Tres de las cinco trampas de reciclaje de §5 están en dominios `.gov.co`, y una de ellas —los puntos de acopio de Manizales por las inundaciones de Montería— tiene forma perfecta de fuente válida: entidad correcta, dominio correcto, direcciones exactas, todo menos el evento. Buscar en canales oficiales no reduce la necesidad de leer la fecha y el evento: **la aumenta**, porque el resto de las señales de calidad dejan de discriminar.
