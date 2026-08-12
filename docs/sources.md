# Fuentes y trazabilidad del seed nacional

**Emergencia:** terremoto de magnitud 7,4 del **10 de agosto de 2026**, 7:34 a. m., epicentro en **San José del Palmar (Chocó)**, profundidad ~82 km. Ciudades más golpeadas: Quibdó, Pereira, Manizales y Cali. Balance preliminar del día: 111 fallecidos (elevado a 132 según Asocapitales en el transcurso de la jornada), más de 570 heridos, ~1.575 viviendas afectadas y 61 edificaciones colapsadas. El Gobierno declaró desastre nacional.

**Fecha de la investigación:** 10 de agosto de 2026. **Ampliada:** 11 de agosto de 2026 (dos tandas: red de Tigresas y día 2 de la emergencia) y 12 de agosto de 2026 (rastreo de fuentes primarias, §3.d). **Aporte externo:** tanda «ciudades golpeadas» de @Garzu96 (§11).
**Consolidado:** 108 registros · **99 publicables** (67 verificados + 32 reportados) · 3 en disputa · 3 inactivos · 3 pendientes · **26 departamentos y 39 municipios**.

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

## 3.d Tanda del 12 de agosto — rastreo de fuentes primarias

Hasta el día 2, **49 centros** estaban en `reported` por una sola razón: existía un comunicado o una lista de la entidad responsable, pero **nadie había conseguido localizarlo**. Se citaba al medio que lo citaba. Esta tanda fue a buscar esos documentos.

Se repartieron los 58 registros no verificados en seis frentes **agrupados por entidad responsable, no por departamento**, porque verificar aquí significa encontrar a la entidad publicando en su propio canal: los 16 puntos de la ACSC dependían de un único comunicado, y buscarlo seis veces por separado habría sido desperdicio.

**Resultado: 26 ascensos a `verified`, 2 altas, 1 baja, 0 descensos.**

### 3.d.1 ACSC — apareció el comunicado (16 centros)

| | |
|---|---|
| **Fuente** | [sociedadescientificas.com — «Comunicado a la opinión pública: solidaridad con las comunidades afectadas…»](https://sociedadescientificas.com/solidaridad-con-victimas-del-terremoto-agosto-10/) |
| **Fecha** | Bogotá D.C., 10 de agosto de 2026 |
| **Firma** | Jaime Alberto González, presidente de la ACSC 2026-2028 |

El comunicado lista las 16 sedes con dirección y teléfono. Se cotejaron **una por una** contra el seed: las 16 direcciones y los 16 teléfonos coinciden. El Espectador había transcrito bien.

Dos datos que solo aparecen en el original:

- Los puntos operan en **sedes de la Sociedad Colombiana de Anestesiología y Reanimación (S.C.A.R.E.)**, sociedad miembro que prestó sus oficinas regionales. Explica por qué las direcciones son oficinas y no bodegas, y por qué ninguna publica horario.
- La sede de Pasto incluye el **«Edificio Zaguán del Lago»**, que faltaba en el seed. Ya incorporado.

> **Trampa de herramienta, anotada para quien vuelva a comprobarlo.** El PDF del comunicado es una **imagen escaneada sin capa de texto**. Las herramientas que solo extraen texto lo devuelven vacío o «ilegible», y es fácil concluir por error que el enlace está roto. Hay que leerlo como imagen.

### 3.d.2 Medellín — apareció el boletín de la Alcaldía (9 centros + 1 alta)

[medellin.gov.co — «En 10 puntos se recibirán las donaciones…»](https://www.medellin.gov.co/es/sala-de-prensa/noticias/en-10-puntos-se-recibiran-las-donaciones-para-enviar-desde-medellin-a-las-comunidades-afectadas-por-el-sismo/), 11 de agosto de 2026, Secretaría de Inclusión Social y Familia (Luz María Ramírez).

Confirma nueve puntos que teníamos como `reported`: FUBAM, Fundación Saciar, hall de la Alcaldía, Terminal del Norte, EAFIT y los cuatro parques biblioteca.

**Salvedad que se conserva y que importa:** el boletín confirma que **el punto existe**, pero **no publica direcciones ni horarios**. Esos datos siguen viniendo de medios y **no ganan certeza** por este hallazgo. La discrepancia de dirección de Fundación Saciar (§4.5) sigue abierta: el boletín no la dirime.

**Alta:** `biblioteca-publica-el-poblado-medellin`, décimo punto del boletín. **Estaba a la vista desde el día 2 y se pasó por alto**: la cita de Semana recogida en §10 la nombra expresamente —«…León de Greiff (La Ladera) **y la biblioteca pública El Poblado**»— pero solo se crearon los cuatro parques biblioteca. De esa misma cita sale su horario.

**Señal negativa:** el boletín lista 10 puntos y el **Batallón Girardot no está** entre ellos, pese a que sí confirma los otros ocho de la ciudad. No es contradicción directa —el Ejército puede tener iniciativa propia— pero es hoy el único punto de Medellín sin ninguna fuente comprobable. Marcado para decisión editorial en su ficha.

### 3.d.3 Belisario — la empresa publicó en su propio canal (1 centro)

[@somosbelisario](https://www.instagram.com/somosbelisario/p/Db6ksTmO0Us/), 11 de agosto de 2026: «SOMOS CENTRO DE ACOPIO PARA: MEDICINAS, AGUA, ALIMENTOS NO PERECEDEROS Y ROPA NUEVA O EN MUY BUEN ESTADO».

Es la propia empresa anunciando su punto, con la dirección que ya traía la ficha. Sale de `SIN_ENLACE_APROBADOS` porque ahora tiene URL estable.

**Corrige un dato que estábamos publicando mal.** La ficha usaba la canasta genérica de la campaña de Medellín, que **rechaza medicamentos y ropa**. La empresa dice que **sí** los recibe. Publicábamos lo contrario de lo que el centro hace.

> **Precedente nuevo, y conviene decirlo en voz alta.** `@somosbelisario` es la **primera cuenta de un negocio privado** en la lista blanca de `scripts/validate-seed.ts`; hasta ahora solo había organizaciones de la respuesta oficial. Cumple la definición literal de canal propio, pero amplía qué cuenta como entidad responsable. Revisar si se quiere sostener como política.

### 3.d.4 Lo que NO se pudo verificar, y por qué

**0 ascensos** en Caribe (4), zona andina (10) y red ABACO (6). La razón **no es ausencia de fuente sino límite de herramienta**, y conviene reintentarlo desde otra red antes de dar nada por inexistente:

| Obstáculo | Afecta a |
|---|---|
| HTTP 403 a todo acceso directo | `barranquilla.gov.co`, `cartagena.gov.co`, `santamarta.gov.co` |
| DNS no resuelve | `cali.gov.co` |
| 404 en la sección de publicaciones | `valledelcauca.gov.co` |
| Contenido no legible sin sesión | Instagram, incluida la cuenta en lista blanca de Tigresas |

Casos con evidencia circunstancial fuerte que **aun así no se ascendieron**: Barranquillita (vocero nombrado y confirmación del alcalde el 11 de agosto), Coliseo Bernardo Caraballo (confirmado que abrió el martes 11 y sigue operando) y Ogricc Santa Marta (dos artículos independientes del 10 y el 12 coinciden en dirección, horario y entidad). Ninguno es canal propio, así que siguen en `reported`.

### 3.d.5 Cuatro trampas de reciclaje esquivadas

La regla `EARTHQUAKE_DATE` existe por esto. Las cuatro se detectaron **solo al abrir la fuente**:

1. **`donahoy.abaco.org.co/colombia2026`** — parece la página de ABACO hecha para esta emergencia. Su texto es de la campaña **«Unidos por Vzla» de junio de 2026** (terremotos de Venezuela, epicentro Yaracuy). Es exactamente el error que casi contamina el seed original.
2. **`cartagena.gov.co`** — una nota con título casi idéntico al que se buscaba, sobre **el mismo coliseo**, resultó ser del **10 de febrero de 2026** y sobre la emergencia de Montería.
3. **Buga** — la cuenta de origen del envío pendiente tiene una publicación reciente sobre un proyecto sin relación con el terremoto (donar un gimnasio de calistenia para embellecer un monumento).
4. **Un resumen automático de búsqueda fabricó un teléfono**, atribuyendo el mismo número a dos entidades distintas. Descartado al contrastar con la fuente.

### 3.d.6 Estado de Pereira y Buenaventura (bancos ABACO)

Siguen `inactive`, **sin cambio**. Ninguna fuente del 11 o 12 de agosto anuncia reapertura, y la del 11 refuerza que ambas ciudades siguen con vías dañadas. Hay una contradicción menor sin resolver: Semana dice que ABACO está «evaluando» un punto alterno y Diario del Sur que «operan con puntos alternos», ambos del 10 de agosto citando la misma fuente. Diario del Sur no aporta dirección, así que no alcanza para reactivar.

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

### 4.6 Manizales — Coliseo Mayor → **excluido el 10 de agosto, admitido el 12** ⚠️

**Decisión del 10 de agosto.** Aparecía en algunas notas, pero como **albergue temporal**, no como centro de acopio. **Excluido deliberadamente**: publicarlo enviaría donaciones a un lugar que no las recibe.

**Revisada el 12 de agosto de 2026 con la tanda de @Garzu96 (§11).** Se admite como `reported`. La Patria (10 de agosto) reporta **recepción efectiva de donaciones ciudadanas** en el sitio, para las más de 140 personas que aloja. La ficha dice, en este orden, que es **ante todo un albergue** y que quien lleve donaciones no interfiera con su operación.

> **Lo que cambió es el hecho, no el criterio.** «Albergue ≠ acopio» sigue en pie y sigue excluyendo a los albergues de Cali (cancha Miguel Calero, Diamante de Béisbol) y al **Coliseo Menor de Manizales**, que queda en `pending` justamente porque su recepción de donaciones solo está implícita en la cobertura. Lo que este caso añade es que un recinto puede ser **las dos cosas a la vez**, y que la prueba para admitirlo es que una fuente reporte recepción efectiva, no que el sitio parezca apropiado.
>
> Esta sección se **reescribe en vez de borrarse**. Un mapa de emergencia que revierte una exclusión sin dejar rastro no es auditable: quien lea la ficha mañana tiene que poder ver que estuvo fuera, por qué, y qué evidencia lo hizo entrar.

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

#### Actualización del 12 de agosto — la página cambió por segunda vez

La misma URL, releída el 12 de agosto, lista ahora **cinco** puntos: Universidad Jorge Tadeo Lozano, Calle 161A #7F-55 (Usaquén), Unicentro, **estadio El Campín** y la sede administrativa de la Cruz Roja. El 10 de agosto eran seis, el 11 eran cuatro, hoy son cinco. **Tres composiciones distintas en tres días, sin que cambie ni la URL ni la fecha visible.** Esto ya no es un incidente: es el comportamiento normal de esta fuente, y confirma que hace falta el snapshot automático que pedía la lección de arriba.

El punto añadido tiene además **artículo propio** en el mismo dominio —[«El estadio El Campín, habilitado como nuevo punto de recepción…»](https://bogota.gov.co/mi-ciudad/ambiente/estadio-el-campin-de-bogota-nuevo-punto-ayudas-damnificados-terremoto), 11 de agosto— y abre **el miércoles 12**. Se dio de alta como `estadio-el-campin-bogota`, `verified`, con horario continuo de 8:00 a. m. a 9:00 p. m.

**Los cuatro centros de la tabla de arriba siguen `verified`, por decisión expresa mantenida el 12 de agosto.** El razonamiento del día 2 no ha cambiado: ausencia de la lista no es prueba de cierre, y son sedes propias de la Cruz Roja. **Sigue pendiente la llamada a la Cruz Roja Seccional**, y es hoy el riesgo abierto más alto del proyecto: cuatro fichas con el sello más fuerte del sitio apoyadas en una fuente que ya no las sostiene.

### 4.9 Medellín — Terminal y La Alpujarra: disputa resuelta

§4.3 dejó en disputa un registro que agrupaba «Terminal de Transportes» y «La Alpujarra», porque los resúmenes de búsqueda los atribuían a la Alcaldía pero El Colombiano y Telemedellín solo confirmaban FUBAM y Saciar.

El 11 de agosto El Tiempo publica ambos citando a la Alcaldía, y **precisa que la terminal es la del Norte, local 9840** —no una genérica—. Resolución:

- La Alpujarra → se publica como `hall-alcaldia-medellin`.
- La terminal → se publica como `terminal-del-norte-medellin`.
- El registro viejo `terminal-transportes-la-alpujarra-medellin` se conservó en disputa, sin coordenadas y sin publicar, con la nota de traza que apunta a los dos nuevos.

**Cerrado el 12 de agosto de 2026:** ese registro viejo quedó **eliminado**. Sus dos mitades llevaban un día publicadas por separado y ambas fueron después confirmadas en el boletín propio de la Alcaldía (§3.d.2); su propia nota decía «pendiente de decidir si se crea como registro propio» y ya no había nada que decidir. Mantener un registro fantasma en `disputed` solo añade ruido a un archivo que se revisa a las tres de la mañana.

También quedó **corroborada la dirección de Fundación Saciar**: la pieza ciudadana coincide en «Carrera 50 #25-261», la versión mayoritaria que ya usaba el seed frente al «Carrera 52» de La Silla Vacía (§4.5). Tercera fuente independiente a favor.

---

## 5. Precisión de las coordenadas

Las coordenadas se generaron **una sola vez** con Nominatim (OpenStreetMap) mediante `scripts/geocode.ts` y quedaron congeladas en `data/coordinates.json`. No se geocodifica desde el cliente.

**Hallazgo importante:** la nomenclatura colombiana (carrera / calle / diagonal + número) **no resuelve de forma fiable** contra OSM. En la primera pasada, «Carrera 24 #73-38» (sede de la Cruz Roja, Barrios Unidos) cayó en **Ciudad Bolívar**, y la sede ACSC de Riohacha cayó en el corregimiento rural de **Tomarrazón**, a ~45 km del casco urbano.

Por eso el proyecto **modela la precisión como dato de primera clase** (`location_precision`) y la muestra al usuario:

| Precisión | Centros publicados | Comportamiento en la interfaz |
|---|---|---|
| `exact` | 28 | Pin normal, deep link por coordenadas |
| `approximate` | 49 | Aviso «el punto es aproximado, guíate por la dirección»; Google Maps recibe la **dirección en texto** |
| `municipality` | 13 | Aviso «ubicación aproximada al municipio» |

> Recuento rehecho el 12 de agosto de 2026 sobre los 90 centros publicados. La tabla anterior (11 / 24 / 4) sumaba 39 y venía arrastrada de una tanda previa: no reflejaba el estado del seed. **Solo 28 de 90 pines son exactos**, que es el dato que conviene tener presente antes de confiar en el mapa.

### 5.1 Pines aproximados (requieren validación visual)
`samu-sur-cruz-roja-bogota`, `samu-norte-cruz-roja-bogota`, `centro-salvamento-acuatico-cruz-roja-bogota`, `bodega-cruz-roja-bogota`, `empresa-licores-cundinamarca`, `casa-del-valle-bogota`, `banco-de-alimentos-cali`, `centro-acopio-barranquillita`, `ogricc-santa-marta`, `fubam-banco-arquidiocesano-alimentos-medellin`, `fundacion-saciar-medellin`, `consejo-municipal-juventudes-bucaramanga`, `acsc-barranquilla`, `acsc-bogota`, `acsc-cartagena`, `acsc-tunja`, `acsc-popayan`, `acsc-valledupar`, `acsc-monteria`, `acsc-riohacha`, `acsc-neiva`, `acsc-santa-marta`, `acsc-pasto`, `acsc-bucaramanga`

### 5.2 Solo a nivel de municipio (sin dirección publicada por la fuente)
`acsc-cucuta`, `banco-alimentos-armenia`, `banco-alimentos-manizales`, `banco-arquidiocesano-alimentos-ibague`

### 5.3 Correcciones manuales aplicadas
| Centro | Problema | Corrección |
|---|---|---|
| `acsc-cucuta` | El centroide administrativo del municipio quedaba ~20 km al norte del casco urbano | Se fijó el centro urbano de Cúcuta |
| `acsc-santa-marta` | La consulta enganchó un POI («Hotel Monterrey») sobre otra vía | Se fijó el centro histórico de Santa Marta |
| `biblioteca-publica-el-poblado-medellin` | OSM no tiene la biblioteca como POI y el boletín no publica dirección | Centroide del barrio El Poblado, marcado `approximate`: es el barrio, no el edificio (12 ago 2026) |
| `acsc-bogota` | **~11 km de error.** El pin caía en la Carrera 15A de **Los Mártires**; la dirección (calle 120) está en **Usaquén**. Nominatim ofrece varios tramos con el mismo nombre de vía y la primera pasada tomó el equivocado | Se fijó el tramo de la Carrera 15A en Usaquén (12 ago 2026) |

> **Cómo apareció el error de Bogotá, porque el método importa.** No salió de una auditoría de pines: salió de **desconfiar de un ascenso**. Antes de promover los 16 puntos de la ACSC al sello «Verificado» se revisó su geometría, bajo el criterio de que promover un centro cuyo mapa apunta a 11 km es peor que dejarlo como `reported`. **Conviene aplicar esa misma revisión a cualquier tanda futura de ascensos.**

### 5.4 Tanda del 12 de agosto — pines afinados con fichas de Google Maps

Nueve centros que **ya estaban en el seed** tenían el pin en el centroide de la vía. Se corrigieron con coordenadas de Google Maps: para Usaquén, con la ficha de la dirección ya publicada; para los ocho del Valle de Aburrá, con los pines de la lista pública «Puntos de acopio MDE / Compás Urbano».

**Límite de alcance, explícito:** esa lista es un tercero que no cita fuente por punto. Se usó **solo como geometría de centros ya sustentados por su propia fuente**, nunca como evidencia de que un centro existe. No movió ningún `verificationStatus` ni dio de alta ningún registro. De los 81 puntos de la lista, **no se incorporó ninguno nuevo**.

**Criterio para sellar `exact`.** No es cosmético: según `lib/maps.ts`, un pin `exact` hace que «Cómo llegar» mande **coordenadas** a Google Maps en vez de la dirección en texto, y eso elimina justo el fallback que compensa la nomenclatura colombiana. Por eso:

- `exact` → el pin **corrobora la dirección que ya publicábamos**, o es un POI con nombre propio a menos de 300 m del punto anterior.
- `approximate` → POI con nombre propio pero lejos de la dirección impresa. Se mejora la coordenada y se conserva la navegación por texto, para que ficha y navegación no se contradigan.

| Centro | Desfase corregido | Resultado |
|---|---|---|
| `usaquen-usaquen-vl0m` | 2,4 km — el anclaje de §3.c lo dejó en el centroide de la Calle 161A, no en el sitio | `approximate` → **`exact`**; el pin corrobora la Calle 161A #7F-55 |
| `restaurante-belisario-medellin` | 836 m — Nominatim resolvió la Calle 7 en **El Tesoro** | `approximate` → **`exact`**; el pin corrobora la Calle 7 #35-44 |
| `remanence-medellin` | 773 m | Coordenada mejorada, **sigue `approximate`** (lejos de la dirección impresa) |
| `fundacion-saciar-medellin` | 619 m | Coordenada mejorada, **sigue `approximate`** (ver §7.5, dirección sin resolver) |
| `gestion-del-riesgo-envigado` | 385 m | `approximate` → **`exact`**; el pin corrobora la Carrera 40 #39 sur-59 |
| `udea-afroudea-medellin` | 272 m — apuntaba al centroide del campus | `exact` → `exact`, ahora sobre el bloque 9, que es la sede declarada |
| `simon-coffee-medellin` | 234 m | `approximate` → **`exact`** (POI con nombre propio) |
| `fundacion-el-arte-de-los-suenos-medellin` | 179 m | `approximate` → **`exact`** (POI con nombre propio) |
| `bodega-guayaquiliando-medellin` | 111 m | `approximate` → **`exact`**; el pin corrobora la Avenida 80 #52-88 |

> El de Usaquén es el más grave de los nueve y merece registro: **§3.c dio por corregido un pin que seguía a 2,4 km**, en un centro `verified` de la Alcaldía Mayor. Rescatarlo del centroide de la ciudad se sintió como haberlo arreglado. La lección es que salir de un fallo catastrófico no equivale a llegar al punto correcto, y que la revisión visual que §5 exige hay que hacerla **también sobre las coordenadas ya corregidas**.

**Discrepancias detectadas y NO aplicadas** (la lista sugiere un cambio, pero la evidencia no alcanza):

| Centro | Discrepancia | Por qué no se tocó |
|---|---|---|
| `libreria-rodante-delfos-medellin` | La lista lo ubica en **Carrera** 79 #52A-23; el seed dice **Calle** 79 | Resolvería la ambigüedad que §3.c documentó, pero viniendo de un tercero. Pisar esa decisión exige una fuente primaria. Ver §7.12 |
| `fubam-banco-arquidiocesano-alimentos-medellin` | Pin 711 m al norte, hacia el borde de la Comuna 10 | Deshace el `QUERY_OVERRIDE` que costó meterlo en Guayabal |
| `la-razon-medellin` | Pin a 1 km, rotulado «La Razón - Parche frente a frente» | No consta que sea el mismo local |
| `casa-eterna-la-explanada` | Pin coherente con vía Las Palmas | El registro sigue `disputed` y no se publica |
| `batallon-girardot-medellin` | Pin a 331 m dentro del mismo predio | Sin ganancia real: es un campus, no una puerta |

---

## 6. Cobertura territorial

**21 departamentos con al menos un centro publicado:** Antioquia, Atlántico, Bogotá D.C., Bolívar, Boyacá, Caldas, Cauca, Cesar, Córdoba, Cundinamarca, Huila, La Guajira, Magdalena, Meta, Nariño, Norte de Santander, Quindío, Santander, Sucre, Tolima, Valle del Cauca.

**12 departamentos sin centros confirmados:** Amazonas, Arauca, Caquetá, Casanare, **Chocó**, Guainía, Guaviare, Putumayo, **Risaralda**, San Andrés y Providencia, Vaupés, Vichada.

> **Lectura del vacío:** que Chocó y Risaralda no aparezcan **no es una falla de la investigación**. Son las zonas más golpeadas: reciben ayuda, no la acopian. Los centros de acopio se habilitan en ciudades no afectadas para enviar hacia allá. El resto de departamentos sin cobertura son de baja densidad poblacional y no se encontró actividad reportada.

---

## 7. Datos que deben validarse manualmente antes de sellar como verificados

1. **Los 23 centros `reported`** — confirmar en el sitio o canal oficial de cada entidad. Para 20 de ellos (Caribe, andina y ABACO) el obstáculo del 12 de agosto fue de herramienta, no de fuente: ver §3.d.4 y **reintentar desde otra red antes de darlos por inexistentes**.
2. ~~Los 16 puntos ACSC~~ — **RESUELTO el 12 de agosto de 2026** (§3.d.1). Apareció el comunicado firmado en el dominio propio de la ACSC; las 16 direcciones y teléfonos coinciden con el seed. Siguen **sin horario publicado**: la ficha pide llamar antes de ir, y no se inventó ninguno.
2.b **Refrendo humano de dos entradas de lista blanca** — `sociedadescientificas.com` (§3.d.1) y `@somosbelisario` (§3.d.3) se añadieron con comprobación asistida y quedan marcadas «refrendadas por @victorolave el 12 de agosto de 2026 en `scripts/validate-seed.ts`. La segunda además **sienta precedente**: es la primera cuenta de un negocio privado en esa lista.
2.c **Batallón Girardot (Medellín)** — el boletín oficial lista 10 puntos y no lo incluye, pese a confirmar los otros ocho de la ciudad (§3.d.2). Localizar comunicado de la Cuarta Brigada o bajar a `disputed`.
2.d **Los cuatro centros de Bogotá de §4.8** — llamar a la Cruz Roja Seccional. Es el riesgo abierto más alto del proyecto.
3. **Las 4 sedes de bancos de alimentos sin dirección** (Armenia, Manizales, Ibagué, Cúcuta ACSC) — obtener dirección exacta con ABACO / la ACSC.
4. **Los 62 pines no exactos** (de 90 publicados) — verificar visualmente contra imagen satelital o llamada al centro. Cifra recontada el 12 de agosto; la anterior estaba desactualizada.
5. **Dirección de Fundación Saciar** — resolver Carrera 50 vs. Carrera 52.
6. **Plaza de la Paz (Cundinamarca)** — la fuente no publicó dirección exacta; se geocodificó la sede de la Gobernación.
7. **Coliseo Bernardo Caraballo (Cartagena)** — la fuente no publicó dirección; se geocodificó por nombre.
8. **Los 2 registros `disputed`** — resolver o descartar definitivamente.
9. **Horarios** — la mayoría de las fuentes no los publicó. Al 11 de agosto, sobre los **95 centros publicados en producción** (el seed más lo aprobado desde `/admin`): **28 tienen horario utilizable** y **22 no tienen ni horario ni teléfono**, a los que la aplicación les avisa que no hay forma de confirmar antes de llegar. Ver §10.
10. **Vigencia de la campaña de Cundinamarca** — declarada del 11 al 23 de agosto de 2026; la aplicación avisa automáticamente cuando pasa la fecha de cierre.
11. **Los 6 puntos de Medellín de la pieza gráfica ciudadana** — ver §10, hallazgo 2. Siguen publicados como `reported` con su nota de salvedad; ninguna fuente oficial los corrobora.
12. **Dirección de Librería Rodante Delfos — resolver Calle 79 vs. Carrera 79.** La pieza original escribe «Laureles 79 #52A-23» sin aclarar la vía, y por eso el pin sigue anclado al barrio (§3.c). Una lista ciudadana de Google Maps lo ubica en la **Carrera** 79, a 2,6 km del ancla actual, pero no es fuente suficiente para decidirlo. Basta una llamada o el canal propio de la librería para cerrarlo.

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

---

## 10. Investigación de horarios y teléfonos (11 de agosto de 2026)

Búsqueda dirigida sobre los 27 centros que estaban publicados **sin horario y sin teléfono**.

### Hallazgo 1 — no existe ni un solo teléfono de punto de acopio

**0 de 27.** Ninguna fuente publica una línea propia del punto. Sí aparecen números **generales de la entidad** —Cruz Roja Bogotá `601 746 0909` / línea nacional `132`, Gobernación del Valle `602 620 00 00`, WhatsApp nacional de ABACO `313 245 7978`—, y **se decidió NO cargarlos** en el campo `phone`: implicarían «llama a este centro», que es falso, y sacarían esos registros del nivel de alerta de `tripAdvisory()` con una mejora inexistente.

### Hallazgo 2 — 6 puntos de Medellín sin corroboración en ninguna fuente

`batallon-girardot-medellin`, `bodega-guayaquiliando-medellin`, `la-razon-medellin`, `libreria-rodante-delfos-medellin`, `restaurante-belisario-medellin`, `simon-coffee-medellin`.

Son exactamente los seis cuyo `sourceName` es la pieza gráfica ciudadana sin entidad firmante. El Tiempo, El Colombiano, Semana, BluRadio y Telemedellín describen el mismo núcleo de ~10 puntos oficiales de Medellín y **ninguno los menciona**. No hay evidencia de cierre, pero sí ausencia en toda lista oficial. Se mantienen publicados: ya llevan la nota de salvedad que advierte que la fuente no es institucional.

### Horarios incorporados

| Centros | Horario | Fuente |
|---|---|---|
| Los 4 Parques Biblioteca (Belén, García Márquez, León de Greiff, San Javier) | 9:00 a. m. – 6:00 p. m., lunes a sábado | Semana, 11 ago 2026 |
| Casa del Valle (Bogotá) | Desde las 7:00 a. m., sin hora de cierre publicada | La FM, 11 ago 2026 |

> **Alcance del horario de Medellín.** La frase de Semana es: «los parques bibliotecas Belén, San Javier, Gabriel García Márquez, León de Greiff (La Ladera) y la biblioteca pública El Poblado hacen parte de esta jornada de ayudas desde las 9:00 a. m. a 6:00 p. m. de lunes a sábados». Nombra **solo a los parques biblioteca**. NO cubre a FUBAM, Fundación Saciar, Terminal del Norte ni el Hall de la Alcaldía, y se verificó que El Colombiano (10 ago) tampoco publica horario para esos cuatro.

### Datos descartados por falsos

Detectados **únicamente al abrir la fuente citada**; las síntesis automáticas de búsqueda los daban por buenos:

1. Teléfono `311 255 5912` atribuido a «122 Plaza Apartahotel» (Bogotá). En el artículo real de Infobae corresponde a un punto en **Chía**, otra ciudad de la misma lista.
2. Horario «8:00 a. m. – 9:00 p. m.» atribuido a los puntos de Cruz Roja en Bogotá. Portafolio dice expresamente que **no** publica horario para ninguno de esos seis puntos; ese horario pertenece a los cuatro puntos distintos anunciados por la Alcaldía de Bogotá.
3. Teléfonos del Banco de Alimentos de Manizales tomados de un artículo de La Patria cuyo contenido real es de **junio de 2020**; la página mostraba una fecha de plantilla de 2026.

---

---

## 11. Tanda «ciudades golpeadas» — aporte de @Garzu96 — 11 de agosto de 2026

**Motivación.** Al cierre de la tanda anterior, las ciudades con más víctimas eran las menos cubiertas del seed: Cali tenía 3 puntos, Pereira 2, Manizales 1 y Quibdó 1, frente a 18 de Medellín y 15 de Bogotá. Es un sesgo natural (los acopios nacen donde están los donantes y las fuentes consultables), pero deja sin servir justo a quien quiere ayudar a sus vecinos en la zona afectada. Esta tanda incorpora **9 puntos publicables + 1 pendiente**: los 7 CAFE de la Alcaldía de Pereira, el segundo punto oficial de Cali, el Coliseo Mayor de Manizales, y el Coliseo Menor en cola de revisión.

### Fuentes de la tanda

| Medio | URL | Fecha | Entidad citada | Centros |
|---|---|---|---|---|
| El Diario (Pereira) | [Pereira declara calamidad pública y establece toque de queda](https://www.eldiario.com.co/actualidad/pereira-declara-calamidad-publica-y-establece-toque-de-queda-en-tres-sectores/) | 10 ago 2026 | Alcaldía de Pereira | 7 (CAFE, con dirección publicada) |
| Semana | [¿Cómo ayudar a las víctimas del terremoto?](https://www.semana.com/nacion/articulo/como-ayudar-a-las-victimas-del-terremoto-estos-son-los-centros-de-acopio-en-bogota-medellin-y-otras-ciudades/202632/) | 11 ago 2026 | Alcaldía de Pereira | (corrobora los 7 nombres, sin direcciones) |
| El País (Cali) | [Estos son los nuevos albergues y puntos de acopio habilitados en Cali](https://www.elpais.com.co/cali/alcaldia-habilita-nuevos-espacios-para-recibir-ayudas-y-atender-a-afectados-en-cali-1154.html) | 11 ago 2026 | Alcaldía de Santiago de Cali | 1 nuevo (Escuela Nacional del Deporte) + actualización día 2 de Plazoleta Jairo Varela |
| El País (Cali) | [Fuerte réplica en Cali obliga a evacuar edificios](https://www.elpais.com.co/cali/fuerte-replica-en-cali-y-otras-regiones-obligan-a-evacuar-edificios-para-prevenir-1113.html) | 11 ago 2026 | — | (salvedad: la Escuela fue evacuada temporalmente durante la réplica de las 10:43 a. m.) |
| La Patria (Manizales) | [El Coliseo Mayor recibe a los primeros damnificados](https://www.lapatria.com/manizales/el-coliseo-mayor-de-manizales-recibe-los-primeros-damnificados-tras-el-sismo-historias-y) | 10 ago 2026 | Alcaldía de Manizales | 1 (Coliseo Mayor) + 1 pendiente (Coliseo Menor) |

### Decisiones editoriales de la tanda

1. **Todos entran como `reported`**, no `verified`: en ningún caso se localizó la publicación primaria en el canal propio de la alcaldía (cali.gov.co no publicaba la lista al cierre; la cuenta de X @Alcaldiapereira publicó la calamidad pública pero no se localizó el post con los CAFE). Si aparece el canal primario, subir de estado.
2. **Los CAFE de Pereira no publican lista de artículos.** Se listan las cuatro categorías básicas de la emergencia y cada ficha lo advierte. No se inventaron horarios ni teléfonos.
3. **Albergues ≠ acopios.** Los albergues de Cali (cancha Miguel Calero, Diamante de Béisbol) y los de Manizales NO se listan como centros, con una excepción documentada: el Coliseo Mayor de Manizales, donde La Patria reporta explícitamente recepción de donaciones ciudadanas; la ficha aclara que es ante todo un albergue. El Coliseo Menor queda `pending` porque la recepción de donaciones solo está implícita.
4. **Puntos de donación de SANGRE fuera de alcance.** Manizales habilitó donación de sangre (canchas auxiliares junto a Bomberos Palogrande y Hemocentro del Café, vía La Patria/Infobae). No se modelan como acopio porque el modelo de datos es de artículos físicos y un donante de mercado no debe terminar en un banco de sangre. Si el proyecto quiere cubrirlos, conviene un tipo nuevo.
5. **Precisión de pines degradada a conciencia:** «Perla del Otún» y «Parque Industrial» resolvieron como POI/barrio y se bajaron de `exact` a `approximate` a mano; El Remanso y San Nicolás no resolvieron y quedan en centroide de municipio (comparten coordenada — el aviso `coordenada-repetida` del validador es esperado y honesto).

### Hallazgo: Quibdó y el Chocó siguen sin canal oficial

Al cierre del 11 de agosto, **ni la Alcaldía de Quibdó ni la Gobernación del Chocó habían anunciado un punto de acopio o canal de donación propio**, pese a ser el departamento del epicentro ([Cambio](https://cambiocolombia.com/pais/articulo/2026/8/donde-y-que-puede-donar-para-ayudar-a-los-damnificados-estos-son-los-centros-de-acopio-en-las-ciudades-principales-de-colombia) lo señala expresamente). La ayuda hacia el Chocó se está canalizando por la Cruz Roja y por los acopios de otras ciudades. **Revisar a diario**: cuando aparezca el canal oficial del Chocó, esa tanda tiene prioridad sobre cualquier otra.

### Ajustes aplicados al integrar el aporte

Tres cosas se cambiaron respecto a la propuesta original, y conviene que estén dichas porque dos de ellas tocan reglas del proyecto.

**1. Los CAFE se publican SIN lista de artículos, y para eso hubo que abrir una excepción en el validador.** La propuesta rellenaba `acceptedItems` con las cuatro categorías básicas de la emergencia, declarándolo en la nota. El problema es que `acceptedItems` **alimenta el filtro de la interfaz**: quien filtre por «Agua potable» vería estos siete puntos y leería en la ficha que reciben agua, sin que ninguna fuente lo diga. Un dato inventado es peor que uno ausente, porque el ausente se ve.

> **Pero el aporte no eligió eso por descuido: la regla `publico-sin-articulos` lo obligaba.** El validador exigía que todo centro publicado dijera qué recibe, y no contemplaba el caso de una fuente que confirma el punto y su dirección pero no publica la canasta. La regla tenía un punto ciego y forzaba a elegir entre dejar fuera un punto real o inventarle el contenido.
>
> Se resolvió como §3.c resolvió la tensión equivalente con `publico-sin-enlace`: **no se elimina la regla, se abre una excepción explícita.** `SIN_ARTICULOS_APROBADOS` en `scripts/validate-seed.ts` lleva los siete slugs, el validador emite un aviso permanente hasta que aparezca la canasta, y añadir un slug ahí queda visible en el diff. Es la segunda vez que una regla dura del validador se encuentra con un caso legítimo que no previó, y la segunda vez que la salida correcta es la excepción documentada y no relajar la regla.

**2. El Coliseo Mayor de Manizales revertía §4.6 sin reescribirla.** Se reescribió: ver §4.6, que ahora deja constancia de que estuvo excluido, por qué, y qué evidencia lo hizo entrar.

**3. Renumeración.** Esta sección llegó como «§10» y `main` ya tenía un §10 (investigación de horarios y teléfonos). Pasó a §11, y la referencia cruzada de `data/centers.ts` se actualizó.

### Pendientes que deja esta tanda

0. **Conseguir la canasta de los siete CAFE** y sacarlos de `SIN_ARTICULOS_APROBADOS`. Es hoy el grupo de centros publicados con menos información del seed.
1. Localizar la publicación primaria de los CAFE (Alcaldía de Pereira) para subirlos a `verified` y conseguir horarios/teléfonos.
2. Confirmar si la Escuela Nacional del Deporte (Cali) retomó operación normal tras la evacuación por la réplica del 11 de agosto.
3. Confirmar si el Coliseo Menor de Manizales recibe donaciones (activaría el registro `pending`).
4. Vigilar el anuncio del canal oficial del Chocó/Quibdó.
