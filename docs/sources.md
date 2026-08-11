# Fuentes y trazabilidad del seed nacional

**Emergencia:** terremoto de magnitud 7,4 del **10 de agosto de 2026**, 7:34 a. m., epicentro en **San José del Palmar (Chocó)**, profundidad ~82 km. Ciudades más golpeadas: Quibdó, Pereira, Manizales y Cali. Balance preliminar del día: 111 fallecidos (elevado a 132 según Asocapitales en el transcurso de la jornada), más de 570 heridos, ~1.575 viviendas afectadas y 61 edificaciones colapsadas. El Gobierno declaró desastre nacional.

**Fecha de la investigación:** 10 de agosto de 2026. **Ampliada:** 11 de agosto de 2026 (dos tandas: red de Tigresas y día 2 de la emergencia).
**Consolidado:** 97 registros · **88 publicables** (39 verificados + 49 reportados) · 4 en disputa · 3 inactivos · 2 pendientes · 26 departamentos.

---

## 1. Cómo se clasificó cada centro

| Estado | Criterio aplicado | ¿Se publica? |
|---|---|---|
| `verified` | Confirmado en el **canal propio** de la autoridad u organización responsable: sitio institucional o cuenta oficial de la lista blanca. | Sí, con sello «Verificado» |
| `reported` | Publicado por un medio periodístico confiable **citando explícitamente a la entidad**, sin que se localizara la publicación primaria. | Sí, con aviso «confirma antes de ir» |
| `disputed` | Fuentes contradictorias o duda razonable de que corresponda a esta emergencia. | **No** |
| `inactive` | La propia organización informó que la sede no está operando. | **No** |

Regla dura aplicada en todo el proceso: **la mención en un agregador nacional no basta para marcar `verified`**. Solo se marca `verified` lo que la entidad responsable publica en su propio canal: el sitio institucional (`bogota.gov.co`) o una cuenta oficial de la lista blanca en `scripts/validate-seed.ts`.

---

## 2. Fuentes primarias consultadas (sitio oficial)

| Entidad | URL | Fecha | Centros extraídos |
|---|---|---|---|
| Alcaldía Mayor de Bogotá | [bogota.gov.co — «En Bogotá se habilitan seis puntos de donaciones…»](https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia) | 10 ago 2026 | 6 (Cruz Roja + Palacio de los Deportes) |

**Nota honesta:** es el único **sitio web** institucional que se logró consultar directamente el 10 de agosto. El 11 de agosto se sumaron 31 puntos publicados por la primera dama en el canal oficial de las Tigresas de la Patria (sección 3.b), que también es la entidad responsable publicando en su propio canal. Los 33 centros restantes provienen de medios que citan a la entidad y siguen como `reported`.

---

## 3. Fuentes periodísticas que citan a la entidad responsable

| Medio | URL | Fecha | Entidad citada | Centros |
|---|---|---|---|---|
| El Espectador | [Puntos autorizados en Bogotá y Cundinamarca](https://www.elespectador.com/bogota/donde-donar-para-los-afectados-por-el-terremoto-puntos-autorizados-en-bogota-y-cundinamarca/) | 10 ago 2026 | Gobernación de Cundinamarca | 2 |
| El Espectador | [Habilitan 16 centros de acopio para medicamentos e insumos médicos](https://www.elespectador.com/salud/habilitan-16-centros-de-acopio-para-recolectar-medicamentos-e-insumos-medicos-tras-el-sismo-de-este-10-de-agosto/) | 10 ago 2026 | ACSC (comunicado) | 16 |
| El País (Cali) | [Habilitan centro de acopio en Cali](https://www.elpais.com.co/cali/habilitan-centro-de-acopio-en-cali-tras-fuerte-terremoto-asi-puede-donar-agua-y-elementos-de-seguridad-1047.html) | 10 ago 2026 | Alcaldía de Cali | 1 |
| El País (Cali) | [Gobernación del Valle declara calamidad pública y habilita puntos](https://www.elpais.com.co/valle/gobernacion-del-valle-declara-calamidad-publica-tras-fuerte-terremoto-y-habilita-puntos-para-recibir-donaciones-1030.html) | 10 ago 2026 | Gobernación del Valle | 2 |
| El Heraldo | [Distrito habilita centro de acopio](https://www.elheraldo.co/atlantico/2026/08/10/distrito-habilita-centro-de-acopio-para-ayudar-a-afectados-por-sismo-en-colombia/) | 10 ago 2026 | Alcaldía de Barranquilla / Oficina Distrital de Gestión del Riesgo | 1 |
| El Tiempo | [Cartagena activa campaña y habilita punto de acopio](https://www.eltiempo.com/colombia/otras-ciudades/cartagena-activa-campana-de-ayudas-para-damnificados-por-el-terremoto-y-habilita-punto-de-acopio-desde-este-martes-aqui-pueden-llevar-las-ayudas-3577427) | 10 ago 2026 | Alcaldía de Cartagena | 1 |
| Hoy Diario del Magdalena | [Santa Marta habilita centro de acopio](https://www.hoydiariodelmagdalena.com.co/archivos/1304749/santa-marta-habilita-centro-de-acopio-para-apoyar-a-damnificados-por-terremoto-en-colombia) | 10 ago 2026 | Alcaldía de Santa Marta (Ogricc) | 1 |
| El Colombiano | [Puntos de acopio en Medellín](https://www.elcolombiano.com/antioquia/damnificados-sismo-puntos-acopio-medellin-donaciones-que-donar-CF39784677) | 10 ago 2026 | Alcaldía de Medellín | 2 |
| Telemedellín | [Así puede donar en Medellín](https://telemedellin.tv/asi-puede-donar-en-medellin-damnificados-temblor/) | 10 ago 2026 | Alcaldía de Medellín | (corrobora los 2) |
| Semana | [Bancos de alimentos activan ayuda](https://www.semana.com/nacion/articulo/bancos-de-alimentos-activan-ayuda-para-damnificados-por-el-terremoto-en-colombia-asi-puede-donar/202641/) | 10 ago 2026 | ABACO | 3 activos + 2 afectados |
| Vanguardia | [Puntos de recolección en Bucaramanga](https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/10/en-bucaramanga-habilitan-puntos-de-recoleccion-de-ayudas-tras-el-sismo-en-colombia/) | 10 ago 2026 | Iniciativas locales | 2 |
| Colombia.com | [Centros de acopio habilitados](https://www.colombia.com/actualidad/noticias/centros-de-acopio-y-ayudas-humanitarias-habilitadas-en-colombia-tras-temblor-10-de-agosto-595512) | 10 ago 2026 | Alcaldía de Itagüí | 1 |

Agregadores usados solo para **corroborar**, nunca como fuente única: Infobae, Publimetro, La FM, Portafolio, Noticias Caracol, La Silla Vacía.

---

## 3.b Red Nacional de Puntos de Solidaridad — Tigresas de la Patria

**31 puntos** incorporados el 11 de agosto de 2026 a partir de las piezas gráficas de la campaña «Colombia un solo corazón», difundidas por la primera dama **Ana Lucía Pineda**.

### Por qué están como `verified`

Es la organización responsable publicando su propia red en su canal oficial, que es exactamente la definición de `verified` en este proyecto, y el mismo criterio con el que se aceptaron los seis puntos de la Alcaldía de Bogotá.

El presidente Abelardo de la Espriella encargó públicamente a la primera dama y a la esposa del vicepresidente **coordinar la ayuda ciudadana y empresarial** por este terremoto (Pulzo y Semana, 10 de agosto de 2026). Una de las piezas se titula literalmente «Nuevos puntos de solidaridad para apoyar con donaciones a nuestros hermanos afectados por el terremoto».

La publicación en la cuenta oficial fue **comprobada por @victorolave el 11 de agosto de 2026**. La cuenta está en la lista blanca de `scripts/validate-seed.ts`.

> **Corrección a una regla nuestra.** El validador exigía dominio `.gov.co` para marcar `verified`, y eso era **más estricto que la especificación del proyecto**, que siempre admitió «Instagram oficial, Facebook oficial, X oficial» como fuente de validación. Una cuenta oficial de la entidad responsable es la entidad publicando en su propio canal, no un tercero citándola — y durante una emergencia suele ser el canal más rápido. La regla se corrigió con una lista blanca explícita: añadir una cuenta es una decisión consciente, visible en el diff del pull request.

### Salvedad que se conserva

Esta misma red recogió más de 100 toneladas para los sismos de Venezuela en **junio de 2026**, con puntos en Cali, Cartagena, Putumayo y Doral (Miami). Es una red permanente, no creada para este terremoto. La nota pública de cada punto recomienda **llamar antes de llevar cargas grandes**, y casi todos traen teléfono.

### Decisiones tomadas sobre esta red

| Caso | Decisión |
|---|---|
| **Miami / Doral, Florida** — «Centro Internacional de Solidaridad – GEM», 1850 NW 84th Ave | **Excluido.** Está fuera de Colombia, el esquema restringe las coordenadas al territorio nacional, y Doral fue uno de los puntos de la campaña por Venezuela de junio. |
| **San Diego (Cesar)** — Carrera 13 #2F-85 | Aparece **duplicado** en dos piezas distintas con la misma dirección y teléfono. Consolidado en un solo registro. |
| **Casanare** — «Calle 12 #21-44», sin municipio | **`disputed`, no publicado.** Casanare tiene 19 municipios y esa calle existe en varios. Se asume Yopal, pero sin confirmar. Llamar al +57 310 310 4757. |
| **Ibagué — Banco de Alimentos** | **Mejorado.** Ya estaba en el seed vía ABACO pero solo con precisión de municipio. Las piezas aportan dirección exacta (Carrera 4 #23-42, sector Estadio) y teléfono. **Dos fuentes independientes coinciden**, lo que refuerza su existencia. |
| **Quibdó (Chocó)** | Publicado con nota especial: está en la zona más afectada, hay que verificar que reciba donaciones y no que las distribuya. |
| **Pereira (Risaralda)** | Dirección rural sin nomenclatura urbana («Vía La Romelia – El Pollo, Vereda Santa Ana Baja»). Pin orientativo; la referencia útil es el Hotel Tángara. |

### Correcciones de geocodificación en esta tanda

| Punto | Falla | Corrección |
|---|---|---|
| GAULA, Bogotá | «Carrera 47» cayó en Teusaquillo (~calle 40) | Se forzó La Castellana |
| CODABAS, Bogotá | «Carrera 7» cayó en La Candelaria (centro) | Se forzó Carrera 7 con Calle 180 |
| 122 Plaza, Bogotá | «Carrera 15A» cayó en Los Mártires (centro) | Se forzó Calle 122, Usaquén |
| Iglesia Amor en Acción, Santa Marta | Tres consultas cayeron en **Bonda**, corregimiento rural, y la última llegó a marcarse `exact` por coincidir con un POI con nombre propio | Corrección manual al centro de Santa Marta, degradado a `approximate` |
| 3 puntos de Cartagena | Los tres cayeron en el mismo centroide del municipio y quedaban **apilados** en el mapa | Separados por barrio: Bocagrande, Crespo y Ternera |

> El caso de Santa Marta merece atención: el clasificador etiquetó como `exact` una coordenada **equivocada**, porque el resultado era un POI con nombre propio. Es el modo de fallo más peligroso —pin errado con etiqueta de alta confianza— y la razón por la que la salida del geocodificador se revisa a mano una por una.

**Todos estos 31 puntos requieren confirmación telefónica.** Las piezas traen teléfono para casi todos; es la vía más rápida para promoverlos a `verified` o retirarlos.

---

## 3.c Tanda del 11 de agosto — día 2 de la emergencia

Investigación de seguimiento. Aportó 21 registros nuevos y, sobre todo, destapó que **una fuente primaria del seed había cambiado** (ver §4.8).

### Bogotá — la Alcaldía republicó su lista

| Punto | Dirección | Horario | Estado |
|---|---|---|---|
| Universidad Jorge Tadeo Lozano | Carrera 4 #22-61 | 8:00 – 21:00, L-D | `verified` |
| Punto Usaquén | Calle 161A #7F-55 | 8:00 – 21:00, L-D | `verified` |
| Unicentro | Carrera 15 #124-30 | 8:00 – 21:00, L-D | `verified` (fusionado) |
| Sede administrativa Cruz Roja | Carrera 24 #73-38 | **24 horas** | `verified` (ya estaba) |

Fuentes: pieza oficial «Bogotá se solidariza ante el sismo» (Alcaldía Mayor de Bogotá + Cruz Roja Seccional Cundinamarca y Bogotá), respaldada por [bogota.gov.co](https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia) y por [El Tiempo](https://www.eltiempo.com/bogota/bogota-habilita-cuatro-puntos-de-acopio-para-recibir-donaciones-destinadas-a-los-damnificados-por-el-terremoto-3577540) del 11 de agosto.

**Dos decisiones de modelado:**

- **Unicentro se fusionó en un solo registro.** Ya existía como punto de la red de Tigresas y la Alcaldía lo sumó a su lista. Es un solo lugar físico: dos registros producirían dos pines apilados sobre las mismas coordenadas, el problema que ya hubo que corregir en Cartagena. Se conservó el teléfono de Tigresas, que sigue sirviendo para coordinar cargas grandes.
- **El punto de Usaquén llegó primero por la comunidad.** Un vecino lo envió por el formulario público citando la cuenta del alcalde, y estaba en la cola como `pending` cuando la fuente oficial lo confirmó. Es el primer caso en que el formulario se adelanta a la investigación.

### Medellín — de 2 a 12 puntos

Dos orígenes, y por eso dos `sourceName` distintos:

| Origen | Puntos | Estado |
|---|---|---|
| [El Tiempo](https://www.eltiempo.com/colombia/medellin/medellin-se-une-por-las-victimas-del-terremoto-en-colombia-conozca-los-10-puntos-para-entregar-sus-donaciones-3577553) citando a la Alcaldía de Medellín | Hall de la Alcaldía (La Alpujarra), Terminal del Norte local 9840, U. EAFIT, y los 4 parques biblioteca (Belén, San Javier, Gabriel García Márquez, León de Greiff) | `reported` |
| Pieza gráfica ciudadana difundida en redes, **sin entidad que la firme** | UdeA (AfroUdeA bloque 9), Simón Coffee, Restaurante Belisario, Remanence, Bodega Guayaquiliando, Librería Rodante Delfos, Fundación El Arte de los Sueños, La Razón, Batallón Girardot | `reported`, con salvedad en cada ficha |

Restricción propia de esta campaña, publicada por El Tiempo: **no se recibe ropa, medicamentos ni alimentos perecederos o vencidos**, por bioseguridad y logística.

> **Excepción declarada.** Los 9 puntos de la pieza ciudadana no tienen URL estable, y la regla `publico-sin-enlace` del validador exige que todo centro publicado sea comprobable. En vez de eliminar la regla —que es la que sostiene la promesa de trazabilidad— se creó una lista de excepciones explícitas en `scripts/validate-seed.ts`, con el mismo criterio que la lista blanca de cuentas oficiales: añadir un slug ahí es una decisión consciente, visible en el diff, y el validador emite un aviso permanente hasta que aparezca el enlace.

### Envigado — municipio nuevo

Pieza oficial «Envigado apoya a las familias afectadas por el terremoto», con escudo de la Alcaldía. **Oficina de Gestión del Riesgo, Carrera 40 #39 sur-59**, lunes a viernes 7:00 – 17:00, tel. (604) 339 4065. `verified`.

Particularidades: los elementos para dormir deben ser **nuevos**; no se recibe ropa (ni nueva ni usada) ni medicamentos; es el único punto del seed que pide explícitamente **alimento para perros y gatos**. El `sourceUrl` apunta al sitio institucional, **no a la pieza**: no se localizó URL estable de la publicación.

### Lo que NO cambió

- **Chocó y Quibdó siguen sin canales oficiales de donación** al 11 de agosto. Ni la Gobernación ni la Alcaldía han publicado puntos. La «lectura del vacío» de §6 se mantiene: la zona golpeada recibe ayuda, no la acopia.
- **Cali:** sin puntos nuevos. Plazoleta Jairo Varela sigue siendo el único confirmado.
- **Barranquilla:** el alcalde Char confirmó el 11 de agosto el punto de Barranquillita (Carrera 43 #6-120, 24 horas) vía [Infobae](https://www.infobae.com/colombia/2026/08/11/barranquilla-enviara-45-rescatistas-y-abrira-centro-de-acopio-por-terremoto-en-colombia/). Refuerza §4.1 pero **sigue siendo un medio citando a la entidad**: se mantiene `reported` hasta confirmarlo en `barranquilla.gov.co`.

### Geocodificación de esta tanda

| Punto | Falla | Corrección |
|---|---|---|
| `usaquen-usaquen-vl0m` | Cayó en el **centroide de Bogotá**, ~10 km al sur del punto real, en un centro marcado `verified` | Anclado a la Calle 161A, Villa Magdala, Usaquén |
| `libreria-rodante-delfos-medellin` | Primero cayó en el centroide de Medellín; al forzar «Calle 79, Laureles» enganchó un POI llamado **«Ginger Cocina» en la Calle 35** y lo etiquetó `exact` | Se le quitó la vía y se ancló al barrio Laureles, aceptando precisión baja |
| `gestion-del-riesgo-envigado` | Centroide de Envigado; la nomenclatura «39 sur» no resuelve en OSM | Anclado a la Carrera 40, San Mateo, Envigado |

> El caso de Delfos repite exactamente el fallo de la iglesia de Santa Marta descrito en §5: **pin equivocado con etiqueta de alta confianza**, porque el resultado tenía nombre propio. Es la segunda vez que ocurre. Cuando la fuente no da una vía inequívoca, la regla correcta es anclar al barrio y aceptar la precisión baja, no dejar que el geocodificador elija por nosotros.

---

## 4. Conflictos de fuentes resueltos

### 4.1 Barranquilla — Carrera 43 #6-120, Barranquillita → `reported`
Circuló la misma dirección asociada a la campaña por los **sismos de Venezuela de junio de 2026**, lo que generó dudas legítimas. El Heraldo publicó el 10 de agosto de 2026 que el Distrito habilitó **este** punto para el terremoto de Chocó, atribuyéndolo al alcalde Alejandro Char y a la Oficina Distrital de Gestión del Riesgo, con operación 24 horas. Se considera suficiente para publicar, **pero no para sellar como verificado**: falta confirmación en `barranquilla.gov.co`.

### 4.2 Medellín — FUBAM y Fundación Saciar → `reported`
Mismo riesgo de contaminación con la campaña de Venezuela. Resuelto: El Colombiano y Telemedellín publican el 10 de agosto que la **Alcaldía de Medellín** los habilitó para esta emergencia, dentro de la campaña «En Medellín somos solidarios» con la Corporación Presentes, e incluyen una restricción específica de esta emergencia (**no reciben medicamentos ni ropa**), que no aparecía en campañas previas.

### 4.3 Medellín — Terminal de Transportes y La Alpujarra → `disputed`, **no publicado**
Resúmenes de búsqueda atribuyen a la Alcaldía puntos en la Terminal de Transportes y La Alpujarra. Al consultar **directamente** El Colombiano y Telemedellín, solo aparecen FUBAM y Saciar. Sin dirección ni horario confirmados. **Requiere validación manual.**

### 4.4 Santa Marta — Antiguo Hospital San Juan de Dios → `disputed`, **no publicado**
No se localizó ningún comunicado de la Gobernación del Magdalena que habilite ese inmueble como centro de acopio para esta emergencia. Las menciones recientes verificables del edificio corresponden a **escrutinios electorales (junio 2026)** y a un **programa de recuperación patrimonial (febrero 2026)**. En cambio, sí se confirmó un punto distinto: la **Ogricc de la Alcaldía de Santa Marta**, calle 16 #14A-08, El Cundí. Ese es el que se publica.

### 4.5 Fundación Saciar — dirección discrepante
La Silla Vacía publica «Carrera 52 #25-261». El Colombiano, Telemedellín, Infobae, Publimetro, La FM y Colombia.com coinciden en «**Carrera 50** #25-261». Se usó la versión mayoritaria. **Validar en terreno.**

### 4.6 Manizales — Coliseo Mayor
Aparece en algunas notas, pero como **albergue temporal**, no como centro de acopio. **Excluido deliberadamente**: publicarlo enviaría donaciones a un lugar que no las recibe.

### 4.7 Pereira y Buenaventura (bancos de alimentos ABACO) → `inactive`
ABACO informó que ambas sedes resultaron **afectadas por el sismo** y que se evalúa ubicación alterna. No se publican como activas.

---

### 4.8 Bogotá — la fuente primaria cambió bajo el seed ⚠️

**El hallazgo más importante del día 2, y no es un centro nuevo.**

`bogota.gov.co` —la **misma URL** que este documento registra en §2 como única fuente primaria del seed— fue **actualizada en sitio**. El 10 de agosto listaba seis puntos. El 11 de agosto lista **cuatro**, y son otros. La URL no cambió; el contenido sí. La fecha de publicación visible en la página tampoco cambió.

Galán, el 11 de agosto: *«A partir de hoy, estos serán los 4 puntos de acopio en los que la Alcaldía de Bogotá estará recibiendo donaciones»*.

De los seis originales **sobrevive uno**: `sede-administrativa-cruz-roja-bogota`. Estos cuatro siguen publicados como `verified` citando una página que ya no los menciona:

| Centro | Estado actual | ¿En la fuente hoy? |
|---|---|---|
| `samu-sur-cruz-roja-bogota` | `verified` | No |
| `centro-salvamento-acuatico-cruz-roja-bogota` | `verified` | No |
| `bodega-cruz-roja-bogota` | `verified` | No |
| `palacio-de-los-deportes-bogota` | `verified` | No |

**Decisión tomada el 11 de agosto: no tocarlos todavía.** Ausencia de la lista **no es prueba de cierre** —son sedes propias de la Cruz Roja y pueden seguir recibiendo—, y ocultarlas sin evidencia enviaría a la gente a menos puntos de los que existen. Lo que sí quedó sin respaldo es el **sello de verificado**. Pendiente: llamar a la Cruz Roja Seccional y decidir entre degradar a `reported` o reconfirmar.

**Señal temprana que funcionó.** El único reporte de la comunidad recibido hasta ahora fue sobre SAMU Norte —*«nos dijeron que por salubridad ellos no pueden recibir en este punto, que solo están tratando urgencias»*— y llegó **antes** de que cambiara la página oficial. Ese centro ya estaba marcado `inactive` por esa vía. El crowdsourcing detectó la consolidación antes que la fuente institucional.

> **Lección de método, aplicable a todo el seed.** Las fuentes de emergencia se actualizan en sitio conservando URL y fecha. **Citar una URL no es citar un contenido.** `source_url` por sí solo no detecta esto. Hace falta releer periódicamente las fuentes del seed, o guardar un hash/snapshot del contenido citado para que un job avise del cambio. Es la diferencia entre enterarse revisando y enterarse porque alguien manejó hasta el Palacio de los Deportes con el carro lleno.

### 4.9 Medellín — Terminal y La Alpujarra: disputa resuelta

§4.3 dejó en disputa un registro que agrupaba «Terminal de Transportes» y «La Alpujarra», porque los resúmenes de búsqueda los atribuían a la Alcaldía pero El Colombiano y Telemedellín solo confirmaban FUBAM y Saciar.

El 11 de agosto El Tiempo publica ambos citando a la Alcaldía, y **precisa que la terminal es la del Norte, local 9840** —no una genérica—. Resolución:

- La Alpujarra → se publica como `hall-alcaldia-medellin`.
- La terminal → se publica como `terminal-del-norte-medellin`.
- El registro viejo `terminal-transportes-la-alpujarra-medellin` se conserva en disputa, sin coordenadas y sin publicar, con la nota de traza que apunta a los dos nuevos.

También quedó **corroborada la dirección de Fundación Saciar**: la pieza ciudadana coincide en «Carrera 50 #25-261», la versión mayoritaria que ya usaba el seed frente al «Carrera 52» de La Silla Vacía (§4.5). Tercera fuente independiente a favor.

---

## 5. Precisión de las coordenadas

Las coordenadas se generaron **una sola vez** con Nominatim (OpenStreetMap) mediante `scripts/geocode.ts` y quedaron congeladas en `data/coordinates.json`. No se geocodifica desde el cliente.

**Hallazgo importante:** la nomenclatura colombiana (carrera / calle / diagonal + número) **no resuelve de forma fiable** contra OSM. En la primera pasada, «Carrera 24 #73-38» (sede de la Cruz Roja, Barrios Unidos) cayó en **Ciudad Bolívar**, y la sede ACSC de Riohacha cayó en el corregimiento rural de **Tomarrazón**, a ~45 km del casco urbano.

Por eso el proyecto **modela la precisión como dato de primera clase** (`location_precision`) y la muestra al usuario:

| Precisión | Centros publicados | Comportamiento en la interfaz |
|---|---|---|
| `exact` | 11 | Pin normal, deep link por coordenadas |
| `approximate` | 24 | Aviso «el punto es aproximado, guíate por la dirección»; Google Maps recibe la **dirección en texto** |
| `municipality` | 4 | Aviso «ubicación aproximada al municipio» |

### 5.1 Pines aproximados (requieren validación visual)
`samu-sur-cruz-roja-bogota`, `samu-norte-cruz-roja-bogota`, `centro-salvamento-acuatico-cruz-roja-bogota`, `bodega-cruz-roja-bogota`, `empresa-licores-cundinamarca`, `casa-del-valle-bogota`, `banco-de-alimentos-cali`, `centro-acopio-barranquillita`, `ogricc-santa-marta`, `fubam-banco-arquidiocesano-alimentos-medellin`, `fundacion-saciar-medellin`, `consejo-municipal-juventudes-bucaramanga`, `acsc-barranquilla`, `acsc-bogota`, `acsc-cartagena`, `acsc-tunja`, `acsc-popayan`, `acsc-valledupar`, `acsc-monteria`, `acsc-riohacha`, `acsc-neiva`, `acsc-santa-marta`, `acsc-pasto`, `acsc-bucaramanga`

### 5.2 Solo a nivel de municipio (sin dirección publicada por la fuente)
`acsc-cucuta`, `banco-alimentos-armenia`, `banco-alimentos-manizales`, `banco-arquidiocesano-alimentos-ibague`

### 5.3 Correcciones manuales aplicadas
| Centro | Problema | Corrección |
|---|---|---|
| `acsc-cucuta` | El centroide administrativo del municipio quedaba ~20 km al norte del casco urbano | Se fijó el centro urbano de Cúcuta |
| `acsc-santa-marta` | La consulta enganchó un POI («Hotel Monterrey») sobre otra vía | Se fijó el centro histórico de Santa Marta |

---

## 6. Cobertura territorial

**21 departamentos con al menos un centro publicado:** Antioquia, Atlántico, Bogotá D.C., Bolívar, Boyacá, Caldas, Cauca, Cesar, Córdoba, Cundinamarca, Huila, La Guajira, Magdalena, Meta, Nariño, Norte de Santander, Quindío, Santander, Sucre, Tolima, Valle del Cauca.

**12 departamentos sin centros confirmados:** Amazonas, Arauca, Caquetá, Casanare, **Chocó**, Guainía, Guaviare, Putumayo, **Risaralda**, San Andrés y Providencia, Vaupés, Vichada.

> **Lectura del vacío:** que Chocó y Risaralda no aparezcan **no es una falla de la investigación**. Son las zonas más golpeadas: reciben ayuda, no la acopian. Los centros de acopio se habilitan en ciudades no afectadas para enviar hacia allá. El resto de departamentos sin cobertura son de baja densidad poblacional y no se encontró actividad reportada.

---

## 7. Datos que deben validarse manualmente antes de sellar como verificados

1. **Los 33 centros `reported`** — confirmar en el sitio o canal oficial de cada entidad.
2. **Los 16 puntos ACSC** — no se localizó el comunicado original en el sitio de la ACSC; se tomaron de El Espectador. Confirmar por los teléfonos publicados.
3. **Las 4 sedes de bancos de alimentos sin dirección** (Armenia, Manizales, Ibagué, Cúcuta ACSC) — obtener dirección exacta con ABACO / la ACSC.
4. **Los 28 pines no exactos** — verificar visualmente contra imagen satelital o llamada al centro.
5. **Dirección de Fundación Saciar** — resolver Carrera 50 vs. Carrera 52.
6. **Plaza de la Paz (Cundinamarca)** — la fuente no publicó dirección exacta; se geocodificó la sede de la Gobernación.
7. **Coliseo Bernardo Caraballo (Cartagena)** — la fuente no publicó dirección; se geocodificó por nombre.
8. **Los 2 registros `disputed`** — resolver o descartar definitivamente.
9. **Horarios** — la mayoría de las fuentes no los publicó. Solo 8 centros tienen horario confirmado.
10. **Vigencia de la campaña de Cundinamarca** — declarada del 11 al 23 de agosto de 2026; la aplicación avisa automáticamente cuando pasa la fecha de cierre.

---

## 8. Canales de donación económica encontrados (no incluidos en el mapa)

No se modelaron como «centros de acopio» porque no son lugares físicos a los que llevar ayuda:

- **ABACO** — Bancolombia ahorros 04867105340 / corriente 15264342372, Bre-B `0090989753`, NIT 900326456-1.
- **Banco de Alimentos de Bogotá** — Bre-B `0091677852`, campaña #JuntosContraElHambre.
- **Fundación Solidaridad por Colombia** — Bancolombia 167-000109-63, Bre-B `@juntosxcolombia`.
- **Alcaldía de Cartagena / Minuto de Dios** — Davivienda 0040 0024 0970.
- **Gobernación de Antioquia** — donaciones económicas articuladas con la Cruz Roja.
- **Alcaldía de Envigado / Cruz Roja** — Davivienda cuenta corriente 0560455069996490, a nombre de la Sociedad Nacional de la Cruz Roja Colombiana, NIT 899999025-3. Publicada en la pieza oficial de Envigado del 11 de agosto de 2026.

## 9. Líneas de emergencia

`123` Policía, Bomberos y Defensa Civil · `111` desastres naturales · `119` incendios y rescates (Bogotá) · `125` urgencias médicas · `132` Cruz Roja Colombiana · `126` Policía de Carreteras.
Reunificación familiar Cruz Roja: `rcf@cruzrojacolombiana.org`, WhatsApp +57 321 213 9525.
