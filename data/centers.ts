/**
 * FUENTE ÚNICA DE VERDAD del seed nacional de Acopio Colombia.
 *
 * Emergencia: terremoto de magnitud 7,4 del 10 de agosto de 2026,
 * epicentro en San José del Palmar (Chocó), 7:34 a. m.
 *
 * REGLAS (no negociables):
 *  - `verified`  → confirmado en el sitio o comunicado propio de la autoridad/organización responsable.
 *  - `reported`  → publicado por medio periodístico confiable citando a la entidad, sin fuente primaria localizada.
 *  - `disputed`  → fuentes contradictorias, o duda razonable de que corresponda a ESTA emergencia. NO se publica.
 *  - `pending`   → enviado por la comunidad. NO se publica.
 *  - `inactive`  → cerró o dejó de recibir. NO se lista en resultados normales.
 *
 * Las coordenadas se generan con `npm run seed:build` (Nominatim/OSM) y quedan
 * congeladas en este archivo. Ver docs/sources.md para la trazabilidad completa.
 */

export type VerificationStatus =
  | "verified"
  | "reported"
  | "pending"
  | "disputed"
  | "inactive";

export type CenterType =
  | "general"
  | "food"
  | "medical"
  | "rescue_supplies"
  | "animal_aid"
  | "mixed";

export type SeedCenter = {
  slug: string;
  name: string;
  organization: string | null;
  type: CenterType;
  department: string;
  municipality: string;
  address: string;
  /** Consulta enviada al geocodificador. Si es null se usa `address, municipality, department, Colombia`. */
  geocodeQuery?: string | null;
  latitude: number | null;
  longitude: number | null;
  acceptedItems: string[];
  urgentNeeds: string[];
  rejectedItems: string[];
  scheduleText: string | null;
  startsAt: string | null;
  endsAt: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  sourceName: string;
  sourceUrl: string | null;
  sourcePublishedAt: string | null;
  verificationStatus: VerificationStatus;
  verificationNotes: string | null;
  lastVerifiedAt: string | null;
};

const VERIFIED_AT = "2026-08-10T23:00:00-05:00";

/** Tanda del día 2: la Alcaldía de Bogotá republicó su lista el 11 de agosto. */
const VERIFIED_AT_DIA2 = "2026-08-11T12:00:00-05:00";

/** Revisión del día 3: se rastrearon las fuentes primarias de lo que estaba `reported`. */
const VERIFIED_AT_DIA3 = "2026-08-12T01:00:00-05:00";

/**
 * Revalidación del día 4 (13 de agosto de 2026).
 *
 * Primera pasada cuyo objetivo NO fue ampliar cobertura sino RETIRAR lo que
 * dejó de operar. Se rastreó cada bloque de centros contra su fuente primaria
 * buscando cierres, traslados y saturación.
 *
 * ALCANCE Y LÍMITE, porque importa para leer las fechas de este archivo: la
 * revalidación fue DOCUMENTAL, no telefónica. Confirma que la entidad sigue
 * listando el punto en su canal propio; NO confirma que la bodega esté abierta
 * ahora mismo. Un punto puede llenarse y cerrar en horas sin que nadie
 * actualice la página. Ver docs/revalidacion-2026-08-13.md.
 */
const REVALIDATED_AT_DIA4 = "2026-08-13T12:00:00-05:00";

/**
 * Revalidación del día 5 (14 de agosto de 2026) — primera hecha con navegador.
 *
 * Las cuatro anteriores usaron `WebFetch`, y eso dejaba fuera todo lo que exige
 * sesión. `docs/sources.md` §3.d.4 lo tenía anotado como límite de herramienta:
 * «Contenido no legible sin sesión — Instagram, incluida la cuenta en lista
 * blanca de Tigresas». Con un navegador con sesión iniciada, el bloque más
 * grande y menos reverificado del seed —30 centros de Tigresas parados en el 10
 * de agosto— por fin se pudo releer contra su fuente propia.
 *
 * MISMO LÍMITE QUE SIEMPRE: sigue siendo documental, no telefónica. Las dos
 * excepciones son los dos centros cuya cuenta publicó actividad ESE día
 * (Guayaquiliando y AfroUdeA), y fueron justo los que trajeron malas noticias.
 * Ver docs/revalidacion-2026-08-14.md.
 */
const REVALIDATED_AT_DIA5 = "2026-08-14T22:00:00-05:00";

/**
 * La lista viva de la red de Tigresas, localizada el 14 de agosto de 2026.
 *
 * `docs/revalidacion-2026-08-13.md` §8 cerró diciendo que la cobertura del seed
 * era mejor que la de cualquier medio y que, por eso mismo, «solo la cuenta que
 * la publicó puede decir qué sigue en pie». Esto es esa cuenta diciéndolo: la
 * historia destacada «📍Puntos» de la cuenta de campaña, con la Red Nacional de
 * Puntos de Solidaridad departamento por departamento.
 *
 * Se actualiza EN CAPAS, y conviene saberlo al leer las fechas: la mayoría de
 * las diapositivas son del 11 de agosto, Córdoba entró el 12 y Boyacá y
 * Risaralda el 13. La campaña se está expandiendo, no cerrando.
 *
 * El `sourceUrl` apunta al PERFIL de la campaña, no a la destacada. Las
 * historias destacadas se editan en sitio —esta misma lo hace, por capas— y su
 * URL no garantiza el contenido: es la lección de `sources.md` §4.8, «citar una
 * URL no es citar un contenido». El perfil es lo estable y lo que la lista
 * blanca de `scripts/validate-seed.ts` puede autorizar; la destacada concreta
 * queda citada en la nota de cada ficha y en docs/revalidacion-2026-08-14.md.
 */
const TIGRESAS_HIGHLIGHT_SOURCE = {
  sourceName:
    "Tigresas Moviéndose con Corazón — «Red Nacional de Puntos de Solidaridad» (historia destacada «📍Puntos» de la cuenta oficial de la campaña)",
  sourceUrl: "https://www.instagram.com/tigresasmoviendoseconcorazon",
  sourcePublishedAt: "2026-08-13",
};

/**
 * Boletín propio de la Alcaldía de Medellín, localizado el 12 de agosto de 2026.
 *
 * Hasta ahora los puntos de Medellín colgaban de El Colombiano y El Tiempo, que
 * citaban a la Alcaldía sin que se hubiera localizado la publicación primaria.
 * Este boletín ES la Alcaldía publicando en su propio sitio institucional, que
 * es la definición de `verified` en este proyecto.
 *
 * SALVEDAD IMPORTANTE: el boletín confirma la EXISTENCIA de cada punto, pero no
 * publica direcciones ni horarios. Esos datos siguen viniendo de medios y NO
 * suben de nivel de confianza por este hallazgo. Cada ficha lo dice.
 */
const MEDELLIN_BOLETIN_SOURCE = {
  sourceName: "Alcaldía de Medellín — Secretaría de Inclusión Social y Familia (boletín oficial)",
  sourceUrl:
    "https://www.medellin.gov.co/es/sala-de-prensa/noticias/en-10-puntos-se-recibiran-las-donaciones-para-enviar-desde-medellin-a-las-comunidades-afectadas-por-el-sismo/",
  sourcePublishedAt: "2026-08-11",
};

/**
 * Campaña «El Valle Somos Todos», publicada por la Gobernación del Valle del
 * Cauca en su propio sitio el 11 de agosto de 2026.
 *
 * POR QUÉ APARECE AHORA. §3.d.4 de docs/sources.md dejó estos puntos en
 * `reported` no por falta de fuente sino por límite de herramienta:
 * `valledelcauca.gov.co` devolvía 404 en su sección de publicaciones. Ese mismo
 * párrafo pedía reintentar desde otra red antes de dar nada por inexistente.
 * Se reintentó el 12 de agosto y la publicación estaba ahí.
 *
 * La publicación trae las direcciones EXACTAS y coinciden con las que el seed
 * ya venía publicando vía El País. No publica horario: `scheduleText` no cambia.
 */
const VALLE_CAMPANA_SOURCE = {
  sourceName: "Gobernación del Valle del Cauca — campaña «El Valle Somos Todos»",
  sourceUrl:
    "https://valledelcauca.gov.co/publicaciones/90172/campana-el-valle-somos-todos-estos-son-los-elementos-que-se-pueden-donar-para-los-damnificados-por-el-sismo",
  sourcePublishedAt: "2026-08-11",
};

/**
 * «Terremoto de Cali | Repositorio Oficial de Información», de la Alcaldía de
 * Santiago de Cali en su propio sitio.
 *
 * Mismo caso y mismo desenlace: `cali.gov.co` no resolvía por DNS el 12 de
 * agosto (§3.d.4) y el punto de la Plazoleta Jairo Varela colgaba de El País.
 * El repositorio lo lista con la misma dirección que el seed ya traía.
 */
const CALI_REPOSITORIO_SOURCE = {
  sourceName: "Alcaldía de Santiago de Cali — Repositorio Oficial de Información",
  sourceUrl:
    "https://www.cali.gov.co/gobierno/publicaciones/193607/terremoto-de-cali-repositorio-oficial-de-informacion/",
  sourcePublishedAt: "2026-08-11",
};

/** Ascensos del Valle del Cauca tras el reintento de dominios del 12 de agosto. */
const VERIFIED_AT_VALLE = "2026-08-12T16:00:00-05:00";

/** Alta de Rionegro, tanda 2 de cobertura del 12 de agosto de 2026. */
const VERIFIED_AT_TANDA2 = "2026-08-12T22:00:00-05:00";

/**
 * Canasta de la campaña #ColombiaSeLevanta de la Alcaldía de Rionegro.
 *
 * Es la lista de la CAMPAÑA, no de cada punto: la primaria no la desglosa por
 * sede. OJO AL COPIAR: incluye ROPA, al revés que la campaña de Medellín, que
 * la rechaza expresamente. Dos municipios vecinos con reglas opuestas — copiar
 * la canasta de uno al otro manda gente con ropa a una puerta que no la acepta.
 */
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

const RIONEGRO_BASE = {
  organization:
    "Alcaldía de Rionegro — estrategia Creesiendo, campaña #ColombiaSeLevanta",
  type: "general" as const,
  department: "Antioquia",
  municipality: "Rionegro",
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
  verificationStatus: "verified" as const,
  lastVerifiedAt: VERIFIED_AT_TANDA2,
  latitude: null,
  longitude: null,
};

const RIONEGRO_CENTROS: SeedCenter[] = [
  {
    ...RIONEGRO_BASE,
    slug: "coliseo-ivan-ramiro-cordoba-rionegro",
    name: "Coliseo Iván Ramiro Córdoba",
    address: "Carrera 52 #41-61",
    geocodeQuery: "Carrera 52 # 41-61, Rionegro, Antioquia, Colombia",
    verificationNotes: RIONEGRO_NOTA,
  },
  {
    ...RIONEGRO_BASE,
    slug: "casa-cincopasitos-rionegro",
    name: "Casa CincoPasitos",
    address: "Carrera 50 #51-19",
    geocodeQuery: "Carrera 50 # 51-19, Rionegro, Antioquia, Colombia",
    verificationNotes: RIONEGRO_NOTA,
  },
  {
    // EL MÁS DÉBIL DE LOS TRES: la primaria no publica nomenclatura, solo el
    // nombre del inmueble y la oficina. Si alguien recorta Rionegro, es este.
    ...RIONEGRO_BASE,
    slug: "antiguo-colegio-san-antonio-rionegro",
    name: "Antiguo Colegio San Antonio — Oficina de Desarrollo Económico",
    address: "Antiguo Colegio San Antonio, Oficina de Desarrollo Económico",
    geocodeQuery: "San Antonio de Pereira, Rionegro, Antioquia, Colombia",
    verificationNotes: `${RIONEGRO_NOTA} LA PRIMARIA NO PUBLICA NOMENCLATURA para este punto: escribe «Antiguo Colegio San Antonio, Oficina de Desarrollo Económico». DiariOriente (11 ago) lo llama «Antiguo Colegio San Antonio DE PEREIRA», que es un corregimiento de Rionegro y es la única pista geográfica disponible; se usó SOLO en \`geocodeQuery\`, no en el nombre ni en la dirección, porque la primaria no lo dice. Su pin no puede ser mejor que \`approximate\`. Si se considera que no basta como dirección publicable, ESTE es el que hay que dejar fuera.`,
  },
];

/** Salvedad común a los 9 puntos que el boletín confirma sin publicar dirección ni horario. */
const MEDELLIN_BOLETIN_NOTA =
  "Confirmado el 12 de agosto de 2026 en el boletín propio de la Alcaldía de Medellín (11 de agosto), que lo lista entre los 10 puntos oficiales de la campaña. El boletín NO publica dirección ni horario: esos datos siguen procediendo de medios (El Colombiano, El Tiempo) y no ganan certeza con esta verificación.";

/**
 * Fuente de la mayoría de los puntos de Medellín del día 2.
 *
 * Es una pieza gráfica que circuló en redes SIN entidad que la firme. No es la
 * Alcaldía publicando en su canal, ni un medio citando a la Alcaldía: es un
 * tercero recopilando. Se publica como `reported` —nunca `verified`— y cada
 * registro lleva la salvedad de abajo.
 */
const PIEZA_CIUDADANA_MEDELLIN = "Pieza gráfica ciudadana difundida en redes (sin entidad identificable)";

const PIEZA_CIUDADANA_NOTA =
  "FUENTE NO OFICIAL: proviene de una pieza gráfica difundida en redes que no está firmada por ninguna entidad. No se localizó comunicado de la Alcaldía de Medellín ni de la organización responsable que confirme este punto. Confirmar antes de desplazarse.";

// Canastas reutilizables ------------------------------------------------------

const CRUZ_ROJA_ITEMS = [
  "Agua potable embotellada",
  "Cobijas",
  "Mantas",
  "Almohadas",
  "Colchonetas",
  "Toldillos",
  "Arroz",
  "Aceite",
  "Pasta",
  "Enlatados abre fácil",
  "Fríjoles",
  "Lentejas",
  "Harina",
  "Panela",
  "Leche en polvo",
  "Chocolate en polvo",
  "Tapabocas",
  "Gasas estériles",
  "Alcohol",
  "Clorhexidina",
  "Guantes",
  "Jabón",
  "Shampoo",
  "Productos dentales",
  "Productos de higiene menstrual",
  "Papel higiénico",
  "Pañales",
  "Toallitas húmedas",
  "Artículos para bebés",
];

const ACSC_ITEMS = [
  "Insumos médicos nuevos y vigentes",
  "Líquidos endovenosos",
  "Tubos endotraqueales",
  "Máscaras laríngeas",
  "Yelcos",
  "Equipos de succión",
  "Gasas",
  "Jeringas",
  "Agujas",
  "Guantes",
  "Tapabocas",
  "Antisépticos",
  "Material para curaciones",
  "Productos de higiene",
  "Alimentos no perecederos",
  "Plantas generadoras de energía",
];

/**
 * Comunicado propio de la ACSC, localizado el 12 de agosto de 2026.
 *
 * Durante dos días estos 16 puntos colgaron de El Espectador, que citaba un
 * comunicado que nadie había localizado. El comunicado existe, está en el
 * dominio propio de la ACSC y lo firma su presidente.
 *
 * OJO: el PDF es una imagen escaneada SIN capa de texto. Las herramientas que
 * solo extraen texto lo devuelven vacío o ilegible; hay que leerlo como imagen.
 * Se dejó constancia aquí para que quien vuelva a comprobarlo no concluya por
 * error que el enlace está roto.
 */
const ACSC_SOURCE = {
  sourceName:
    "Asociación Colombiana de Sociedades Científicas (ACSC) — comunicado a la opinión pública",
  sourceUrl: "https://sociedadescientificas.com/solidaridad-con-victimas-del-terremoto-agosto-10/",
  sourcePublishedAt: "2026-08-10",
};

const ACSC_NOTES =
  "VERIFICADO EN CANAL PROPIO el 12 de agosto de 2026: el comunicado de la ACSC del 10 de agosto, firmado por su presidente Jaime Alberto González, lista esta sede con su dirección y su teléfono. Se cotejaron las 16 sedes del comunicado contra el seed y coinciden una por una. Los puntos operan en sedes de la Sociedad Colombiana de Anestesiología y Reanimación (S.C.A.R.E.), que son OFICINAS, no bodegas. EL COMUNICADO NO PUBLICA HORARIOS de ninguna sede: por eso la ficha sigue diciendo que hay que llamar antes de ir, y no se inventa un horario plausible. Corrobora El Espectador, 10 de agosto de 2026.";

// --- Red de las Tigresas de la Patria / «Colombia un solo corazón» -----------

/**
 * Canasta según la lista que la propia primera dama publicó el 10 de agosto de
 * 2026 (recogida por Semana). Las piezas gráficas de la red no detallan los
 * artículos punto por punto, salvo Barranquilla.
 */
const TIGRESAS_ITEMS = [
  "Agua potable y bebidas de hidratación",
  "Arroz",
  "Aceite",
  "Pasta",
  "Enlatados",
  "Alimentos no perecederos",
  "Jabón y shampoo",
  "Cepillo y crema dental",
  "Toallas higiénicas",
  "Papel higiénico",
  "Cascos de seguridad para rescate",
  "Guantes de protección",
  "Gafas de protección",
  "Tapabocas",
];

/**
 * Canasta propia del punto La 80 (Medellín).
 *
 * No reutiliza `TIGRESAS_ITEMS` porque la pieza gráfica de este punto SÍ detalla
 * qué recibe, y no coincide: añade alimento para mascotas, pañitos, leche de
 * fórmula, colchonetas, linternas, baterías y botiquines. Es el mismo criterio
 * de `RIONEGRO_ITEMS` — copiar la canasta genérica sobre un punto que publicó la
 * suya manda gente con lo que no piden y deja fuera lo que sí.
 */
const TIGRESAS_LA80_ITEMS = [
  "Alimentos no perecederos",
  "Alimentos para mascotas",
  "Artículos de aseo",
  "Pañales",
  "Pañitos húmedos",
  "Leche de fórmula",
  "Mantas",
  "Sábanas",
  "Colchonetas",
  "Linternas",
  "Baterías",
  "Botiquines",
];

const TIGRESAS_SOURCE = {
  sourceName:
    "Tigresas de la Patria / «Colombia un solo corazón» — piezas gráficas difundidas por la primera dama Ana Lucía Pineda",
  sourceUrl: "https://www.instagram.com/tigresasdelapatriaoficial/",
  sourcePublishedAt: "2026-08-10",
};

/**
 * NOTA DE VERIFICACIÓN COMÚN A TODA LA RED.
 *
 * Estos puntos están como `verified` porque la organización responsable los
 * publicó en su propio canal oficial, que es exactamente la definición de
 * `verified` en este proyecto, y el mismo criterio con el que se aceptaron los
 * seis puntos de la Alcaldía de Bogotá.
 *
 * El presidente encargó públicamente a la primera dama coordinar la ayuda
 * ciudadana por este terremoto (Pulzo y Semana, 10 de agosto de 2026), y una de
 * las piezas se titula «Nuevos puntos de solidaridad para apoyar con donaciones
 * a nuestros hermanos afectados por el terremoto».
 *
 * La publicación en la cuenta oficial fue comprobada por @victorolave el 11 de
 * agosto de 2026. La cuenta está en la lista blanca de
 * scripts/validate-seed.ts.
 *
 * Salvedad que se conserva en la nota pública: esta misma red recogió más de
 * 100 toneladas para los sismos de Venezuela en junio de 2026, con puntos en
 * Cali, Cartagena, Putumayo y Doral. Por eso se recomienda llamar antes de
 * llevar cargas grandes.
 */
const TIGRESAS_NOTES =
  "Punto de la Red Nacional de Puntos de Solidaridad publicada por la primera dama Ana Lucía Pineda en los canales oficiales de las Tigresas de la Patria. El presidente le encargó públicamente coordinar la ayuda ciudadana por este terremoto (10 de agosto de 2026). Es la organización responsable publicando su propia red, no un tercero citándola. Ten en cuenta que esta red también operó una campaña por los sismos de Venezuela en junio de 2026: si vas a llevar una carga grande, vale la pena llamar antes para confirmar que el punto sigue recibiendo.";

/**
 * DEGRADACIÓN DEL BLOQUE DEL CESAR — 14 de agosto de 2026.
 *
 * La lista viva de la red (historia destacada «📍Puntos», releída hoy) recorre
 * 22 departamentos uno por uno. **El Cesar no aparece en ninguna diapositiva.**
 * No es que falten puntos sueltos: falta la sección entera del departamento.
 *
 * Eso NO es prueba de cierre, y el precedente está escrito en `sources.md` §4.8:
 * tres puntos de la Cruz Roja desaparecieron de `bogota.gov.co` y seguían
 * operando. Una entidad reorganiza su publicación sin reorganizar su operación,
 * y ocultar por ausencia manda a la gente a menos puntos de los que existen.
 *
 * Lo que sí se perdió es el respaldo del SELLO. `verified` significa «la entidad
 * responsable lo publica en su propio canal», y hoy la entidad no los publica.
 * Así que baja el nivel de confianza al que la evidencia sostiene hoy —que es
 * exactamente para lo que existen los estados— y los cinco siguen publicados
 * con el aviso «confirma antes de ir».
 *
 * Refuerza la cautela un detalle propio del bloque: `sources.md` §3.b registra
 * que San Diego venía DUPLICADO en dos piezas gráficas distintas. El Cesar entró
 * por piezas concretas que esta destacada puede simplemente no haber recogido.
 */
const CESAR_DEGRADADO_NOTA =
  "DEGRADADO EL 14 DE AGOSTO DE 2026. La red publicó su lista nacional actualizada y el departamento del Cesar no aparece en ella: ni este punto ni ningún otro del departamento. Eso no significa que haya cerrado —puede seguir recibiendo sin figurar en la pieza—, pero sí que hoy nadie lo respalda desde el canal oficial. Por eso pierde el sello de verificado y conserva su sitio en el mapa. Confirma por teléfono antes de desplazarte.";

function tigresa(
  slug: string,
  name: string,
  department: string,
  municipality: string,
  address: string,
  phone: string | null,
  extra: Partial<SeedCenter> = {},
): SeedCenter {
  return {
    slug,
    name,
    organization: "Tigresas de la Patria — «Colombia un solo corazón»",
    type: "general",
    department,
    municipality,
    address,
    geocodeQuery: null,
    latitude: null,
    longitude: null,
    acceptedItems: TIGRESAS_ITEMS,
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Elementos de aseo"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone,
    whatsapp: phone,
    email: null,
    // Por defecto, la lista viva del 13 de agosto: es la fuente más reciente y
    // la que reconfirma 28 de los 33 registros de la red (ver
    // docs/revalidacion-2026-08-14.md §1.1). Los cinco del Cesar, que NO
    // aparecen en ella, restauran `TIGRESAS_SOURCE` en su propio `extra`.
    ...TIGRESAS_HIGHLIGHT_SOURCE,
    verificationStatus: "verified",
    verificationNotes: TIGRESAS_NOTES,
    lastVerifiedAt: REVALIDATED_AT_DIA5,
    ...extra,
  };
}

function acsc(
  slug: string,
  department: string,
  municipality: string,
  address: string,
  phone: string,
  geocodeQuery?: string,
): SeedCenter {
  return {
    slug,
    name: `ACSC ${municipality} — centro de acopio de insumos médicos`,
    organization: "Asociación Colombiana de Sociedades Científicas (ACSC)",
    type: "medical",
    department,
    municipality,
    address,
    geocodeQuery: geocodeQuery ?? null,
    latitude: null,
    longitude: null,
    acceptedItems: ACSC_ITEMS,
    urgentNeeds: ["Insumos médicos nuevos y vigentes", "Material para curaciones"],
    rejectedItems: ["Medicamentos vencidos", "Insumos abiertos o usados"],
    scheduleText: "Consultar por teléfono antes de asistir",
    startsAt: "2026-08-10",
    endsAt: null,
    phone,
    whatsapp: null,
    email: null,
    ...ACSC_SOURCE,
    verificationStatus: "verified",
    verificationNotes: ACSC_NOTES,
    lastVerifiedAt: VERIFIED_AT_DIA3,
  };
}

// -----------------------------------------------------------------------------

/**
 * Canasta de la tanda de Medellín del 11 de agosto.
 *
 * El Tiempo publica la restricción explícita de esta campaña: por bioseguridad
 * y logística NO se recibe ropa, medicamentos ni alimentos perecederos o
 * vencidos. Es una restricción propia de esta emergencia, distinta de la de las
 * campañas previas de la ciudad.
 */
const MEDELLIN_DIA2_ITEMS = [
  "Agua",
  "Arroz",
  "Aceite",
  "Granos",
  "Alimentos enlatados",
  "Leche",
  "Panela",
  "Harina",
  "Alimentos listos para consumir",
  "Colchonetas",
  "Cobijas",
  "Pañales",
  "Artículos de aseo",
];

const MEDELLIN_DIA2_RECHAZADOS = [
  "Ropa",
  "Medicamentos",
  "Alimentos perecederos",
  "Productos vencidos",
];

/**
 * Los cuatro parques biblioteca de la red pública que recibieron donaciones.
 *
 * Ni El Tiempo ni la pieza ciudadana publican direcciones: los cuatro se
 * geocodifican por nombre de POI, así que su precisión será `approximate` en el
 * mejor caso. Se generan con un helper porque solo cambian nombre y consulta.
 */
const PARQUES_BIBLIOTECA_MEDELLIN: SeedCenter[] = (
  [
    ["belen", "Parque Biblioteca Belén", "Parque Biblioteca Belén, Medellín, Antioquia, Colombia"],
    ["san-javier", "Parque Biblioteca San Javier", "Parque Biblioteca San Javier, Medellín, Antioquia, Colombia"],
    [
      "gabriel-garcia-marquez",
      "Parque Biblioteca Gabriel García Márquez",
      "Parque Biblioteca Gabriel García Márquez, Medellín, Antioquia, Colombia",
    ],
    [
      "leon-de-greiff",
      "Parque Biblioteca León de Greiff",
      "Parque Biblioteca León de Greiff, Medellín, Antioquia, Colombia",
    ],
  ] as const
).map(([id, name, query]) => ({
  slug: `parque-biblioteca-${id}-medellin`,
  name,
  organization: "Red de Bibliotecas Públicas de Medellín / Alcaldía de Medellín",
  type: "general" as const,
  department: "Antioquia",
  municipality: "Medellín",
  address: `${name}, Medellín`,
  geocodeQuery: query,
  latitude: null,
  longitude: null,
  acceptedItems: MEDELLIN_DIA2_ITEMS,
  urgentNeeds: ["Alimentos no perecederos", "Artículos de aseo"],
  rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
  scheduleText: "9:00 a. m. – 6:00 p. m., de lunes a sábado",
  startsAt: "2026-08-11",
  endsAt: null,
  phone: null,
  whatsapp: null,
  email: null,
  ...MEDELLIN_BOLETIN_SOURCE,
  verificationStatus: "verified" as const,
  verificationNotes: `${MEDELLIN_BOLETIN_NOTA} El boletín nombra a los cuatro parques biblioteca uno por uno. Ninguna fuente publica dirección: el pin se geocodifica por nombre del parque biblioteca y queda aproximado. El horario proviene de Semana (11 de agosto de 2026), que nombra explícitamente a los cuatro en la misma frase: «desde las 9:00 a. m. a 6:00 p. m. de lunes a sábados». Ese horario NO cubre los demás puntos de Medellín.`,
  lastVerifiedAt: VERIFIED_AT_DIA3,
}));

// -----------------------------------------------------------------------------
// TANDA CIUDADES GOLPEADAS — 11 de agosto de 2026
//
// Las ciudades con más víctimas eran las menos cubiertas del seed (Cali 3,
// Pereira 2, Manizales 1, frente a 18 de Medellín). Esta tanda incorpora los
// puntos oficiales publicados el 10-11 de agosto por las alcaldías de Cali,
// Pereira y Manizales a través de medios locales que las citan (El País,
// El Diario, La Patria). Quibdó y el Chocó siguen SIN canal oficial anunciado
// al cierre del 11 de agosto: ver docs/sources.md, §11.
// -----------------------------------------------------------------------------

/**
 * Canasta del día 2 de Cali (El País, 11 de agosto, citando a la Alcaldía).
 * El día 1 la Plazoleta Jairo Varela pedía solo elementos de protección para
 * búsqueda y rescate; el día 2 la lista se amplió a ayuda humanitaria general.
 */
const CALI_DIA2_ITEMS = [
  "Agua",
  "Alimentos no perecederos",
  "Colchonetas",
  "Sábanas",
  "Cobijas",
  "Sánduches preparados",
  "Dulces",
  "Suero oral (tipo Electrolit)",
  "Alcohol",
  "Gasas",
  "Vendas",
  "Ropa en buen estado (adultos y niños)",
  "Cascos",
  "Guantes de construcción",
  "Gafas de protección",
  "Tapabocas",
  "Linternas y linternas frontales",
  "Bolsas",
  "Baños móviles",
];

const CALI_DIA2_URGENTES = [
  "Agua",
  "Suero oral (tipo Electrolit)",
  "Cascos",
  "Guantes de construcción",
];

/**
 * Los siete puntos CAFE de la Alcaldía de Pereira.
 *
 * El Diario (Pereira) publicó los siete con sus direcciones el 10 de agosto
 * citando a la administración municipal; Semana corroboró los siete nombres el
 * 11. La fuente NO publica qué artículos recibe cada punto.
 *
 * POR ESO VA VACÍA, y conviene explicar por qué no se rellenó con las
 * categorías básicas de la emergencia, que fue la propuesta original del
 * aporte. `acceptedItems` no es descriptivo: alimenta el filtro de la
 * interfaz. Rellenarlo con lo que suele pedirse hace que alguien que filtre
 * por «Agua potable» vea estos siete puntos y lea en la ficha que reciben
 * agua, sin que ninguna fuente lo diga. Es el mismo razonamiento por el que
 * §10 decidió no cargar los teléfonos generales de la entidad: un campo sin
 * fuente se queda vacío y la salvedad vive en `verificationNotes`.
 */
const CAFE_PEREIRA_ITEMS: string[] = [];

const CAFE_PEREIRA_NOTA =
  "Punto CAFE habilitado por la Alcaldía de Pereira tras la declaratoria de calamidad pública (El Diario, 10 de agosto; Semana corrobora los siete puntos el 11). NO SE PUBLICA QUÉ RECIBE: ninguna de las dos fuentes lista los artículos de cada punto, así que la ficha va sin lista en vez de suponer una. Pregunta en el punto antes de llevar la donación. Tampoco hay horario ni teléfono publicados. ";

function cafePereira(
  slug: string,
  name: string,
  address: string,
  geocodeQuery: string | null,
  notaUbicacion: string,
): SeedCenter {
  return {
    slug,
    name,
    organization: "Alcaldía de Pereira",
    type: "general",
    department: "Risaralda",
    municipality: "Pereira",
    address,
    geocodeQuery,
    latitude: null,
    longitude: null,
    acceptedItems: CAFE_PEREIRA_ITEMS,
    urgentNeeds: [],
    rejectedItems: [],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Pereira, vía El Diario (Pereira)",
    sourceUrl:
      "https://www.eldiario.com.co/actualidad/pereira-declara-calamidad-publica-y-establece-toque-de-queda-en-tres-sectores/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes: CAFE_PEREIRA_NOTA + notaUbicacion,
    lastVerifiedAt: VERIFIED_AT_DIA2,
  };
}

export const SEED_CENTERS: SeedCenter[] = [
  // ===========================================================================
  // BOGOTÁ D.C. — Alcaldía de Bogotá + Cruz Roja Seccional Cundinamarca y Bogotá
  // Fuente primaria: bogota.gov.co (10 ago 2026)
  // ===========================================================================
  {
    slug: "samu-sur-cruz-roja-bogota",
    name: "SAMU Sur — Cruz Roja",
    organization: "Cruz Roja Colombiana Seccional Cundinamarca y Bogotá",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Avenida Carrera 68 #31-41 sur",
    geocodeQuery: "Avenida Carrera 68 # 31-41 sur, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CRUZ_ROJA_ITEMS,
    urgentNeeds: ["Agua potable embotellada", "Colchonetas", "Cobijas", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos", "Ropa usada en mal estado"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "DEGRADADO A `reported` el 12 de agosto de 2026, y conviene saber por qué. Este punto entró como `verified` el 10 de agosto porque la Alcaldía Mayor de Bogotá lo publicaba en bogota.gov.co. Esa MISMA URL fue actualizada en sitio —sin cambiar la dirección ni la fecha visible— y hoy ya NO lo menciona: el 10 de agosto listaba seis puntos, el 11 cuatro y el 12 cinco, y este no está en la lista vigente (ver §4.8 de docs/sources.md). AUSENCIA DE LA LISTA NO ES PRUEBA DE CIERRE: es una sede propia de la Cruz Roja y puede seguir recibiendo, así que se mantiene PUBLICADO. Lo que ya no se sostiene es el SELLO de verificado, porque la fuente que lo respaldaba dejó de respaldarlo. Queda como `reported`, con el aviso «confirma antes de ir», hasta que la Cruz Roja Seccional Cundinamarca y Bogotá lo confirme por teléfono. Publicado directamente por la Alcaldía Mayor de Bogotá el 10 de agosto de 2026 como uno de los seis puntos oficiales. También aparece como «SAMU de la Alquería» en algunas publicaciones.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "samu-norte-cruz-roja-bogota",
    name: "SAMU Norte — Cruz Roja",
    organization: "Cruz Roja Colombiana Seccional Cundinamarca y Bogotá",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Calle 134 con Carrera 7B Bis #132-31",
    geocodeQuery: "Carrera 7B Bis # 132-31, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CRUZ_ROJA_ITEMS,
    urgentNeeds: ["Agua potable embotellada", "Alimentos no perecederos", "Artículos de higiene"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "inactive",
    verificationNotes:
      "NO PUBLICADO. Fue uno de los seis puntos oficiales de la Alcaldía Mayor de Bogotá del 10 de agosto de 2026, pero se marcó INACTIVO desde el panel de administración el 11 de agosto de 2026. En la base de datos la decisión queda protegida por `moderated_at`; aquí se replica para que el respaldo estático no lo muestre como activo si Supabase deja de responder.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "centro-salvamento-acuatico-cruz-roja-bogota",
    name: "Centro de Salvamento Acuático — Cruz Roja (Sede Barrios Unidos)",
    organization: "Cruz Roja Colombiana Seccional Cundinamarca y Bogotá",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Avenida La Esmeralda #63-81",
    geocodeQuery: "Avenida La Esmeralda # 63-81, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CRUZ_ROJA_ITEMS,
    urgentNeeds: ["Agua potable embotellada", "Alimentos no perecederos", "Primeros auxilios"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "DEGRADADO A `reported` el 12 de agosto de 2026, y conviene saber por qué. Este punto entró como `verified` el 10 de agosto porque la Alcaldía Mayor de Bogotá lo publicaba en bogota.gov.co. Esa MISMA URL fue actualizada en sitio —sin cambiar la dirección ni la fecha visible— y hoy ya NO lo menciona: el 10 de agosto listaba seis puntos, el 11 cuatro y el 12 cinco, y este no está en la lista vigente (ver §4.8 de docs/sources.md). AUSENCIA DE LA LISTA NO ES PRUEBA DE CIERRE: es una sede propia de la Cruz Roja y puede seguir recibiendo, así que se mantiene PUBLICADO. Lo que ya no se sostiene es el SELLO de verificado, porque la fuente que lo respaldaba dejó de respaldarlo. Queda como `reported`, con el aviso «confirma antes de ir», hasta que la Cruz Roja Seccional Cundinamarca y Bogotá lo confirme por teléfono. Uno de los seis puntos oficiales de la Alcaldía Mayor de Bogotá. La Alcaldía lo nombra «Sede Cruz Roja Barrios Unidos / Centro de Salvamento Acuático».",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "sede-administrativa-cruz-roja-bogota",
    name: "Sede administrativa Cruz Roja",
    organization: "Cruz Roja Colombiana Seccional Cundinamarca y Bogotá",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Carrera 24 #73-38",
    geocodeQuery: "Carrera 24 # 73-38, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CRUZ_ROJA_ITEMS,
    urgentNeeds: ["Agua potable embotellada", "Colchonetas", "Artículos de higiene"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    // La pieza del 11 de agosto publica por primera vez el horario: es el único
    // punto de la lista que recibe 24 horas.
    scheduleText: "Abierto 24 horas",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "verified",
    verificationNotes:
      "Uno de los seis puntos oficiales publicados por la Alcaldía Mayor de Bogotá el 10 de agosto de 2026.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "bodega-cruz-roja-bogota",
    name: "Bodega Cruz Roja",
    organization: "Cruz Roja Colombiana Seccional Cundinamarca y Bogotá",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Diagonal 79B #62-53",
    geocodeQuery: "Diagonal 79B # 62-53, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CRUZ_ROJA_ITEMS,
    urgentNeeds: ["Agua potable embotellada", "Colchonetas", "Cobijas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "DEGRADADO A `reported` el 12 de agosto de 2026, y conviene saber por qué. Este punto entró como `verified` el 10 de agosto porque la Alcaldía Mayor de Bogotá lo publicaba en bogota.gov.co. Esa MISMA URL fue actualizada en sitio —sin cambiar la dirección ni la fecha visible— y hoy ya NO lo menciona: el 10 de agosto listaba seis puntos, el 11 cuatro y el 12 cinco, y este no está en la lista vigente (ver §4.8 de docs/sources.md). AUSENCIA DE LA LISTA NO ES PRUEBA DE CIERRE: es una sede propia de la Cruz Roja y puede seguir recibiendo, así que se mantiene PUBLICADO. Lo que ya no se sostiene es el SELLO de verificado, porque la fuente que lo respaldaba dejó de respaldarlo. Queda como `reported`, con el aviso «confirma antes de ir», hasta que la Cruz Roja Seccional Cundinamarca y Bogotá lo confirme por teléfono. Bodega de acopio y clasificación previa al envío de ayudas a los departamentos afectados. Punto oficial de la Alcaldía Mayor de Bogotá.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "palacio-de-los-deportes-bogota",
    name: "Palacio de los Deportes",
    organization: "Alcaldía Mayor de Bogotá / Cruz Roja Colombiana",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Calle 63 #59A-06",
    geocodeQuery: "Palacio de los Deportes, Bogotá, Colombia",

    latitude: null,
    longitude: null,
    acceptedItems: CRUZ_ROJA_ITEMS,
    urgentNeeds: ["Agua potable embotellada", "Colchonetas", "Pañales", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 8:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-14",
    verificationStatus: "verified",
    verificationNotes:
      "VOLVIÓ A `verified` el 14 de agosto de 2026, y la historia completa es la parte útil. Entró como `verified` el 10 de agosto porque la Alcaldía lo publicaba en bogota.gov.co; el 12 se DEGRADÓ a `reported` porque esa misma URL, actualizada en sitio y sin cambiar la fecha visible, había dejado de mencionarlo (§4.8 de docs/sources.md). Hoy la página vuelve a listarlo, con dirección exacta, horario propio de 8:00 a. m. a 8:00 p. m. y un destino declarado: las donaciones recogidas aquí van para el Chocó. La condición que motivó la degradación desapareció, así que recupera el sello. ESTA PÁGINA CAMBIA A DIARIO: 6 puntos el 10 de agosto, 4 el 11, 5 el 12 y 6 el 14, siempre en la misma URL y con la misma fecha visible. No es un incidente, es el comportamiento normal de esta fuente; si el punto vuelve a desaparecer de ella, el estado correcto es `reported`, no `inactive`. Punto de mayor capacidad de los habilitados por la Alcaldía en Bogotá.",
    lastVerifiedAt: REVALIDATED_AT_DIA5,
  },
  {
    slug: "estadio-el-campin-bogota",
    name: "Estadio El Campín",
    organization:
      "Alcaldía Mayor de Bogotá, con apoyo de la Cruz Roja Colombiana e iniciativa de Sencia Bogotá",
    type: "mixed",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Avenida NQS (Carrera 30) entre Calle 53B Bis y Calle 57",
    geocodeQuery: "Estadio Nemesio Camacho El Campín, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua embotellada",
      "Arroz",
      "Aceite",
      "Pasta",
      "Alimentos enlatados",
      "Granos",
      "Harina",
      "Panela",
      "Leche en polvo",
      "Chocolate",
      "Cobijas",
      "Mantas",
      "Almohadas",
      "Colchonetas",
      "Toldillos",
      "Tapabocas",
      "Gasas",
      "Alcohol",
      "Clorhexidina",
      "Guantes",
      "Jabón",
      "Shampoo",
      "Toallas higiénicas",
      "Pañales",
      "Biberones",
    ],
    urgentNeeds: ["Agua embotellada", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: [],
    scheduleText: "8:00 a. m. – 9:00 p. m., horario continuo",
    startsAt: "2026-08-12",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/ambiente/estadio-el-campin-de-bogota-nuevo-punto-ayudas-damnificados-terremoto",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "verified",
    verificationNotes:
      "ALTA DEL 12 DE AGOSTO DE 2026. Punto NUEVO, anunciado por la Alcaldía Mayor de Bogotá en su propio sitio el 11 de agosto y abierto desde el miércoles 12. No existía cuando se armó el seed. La dirección es la referencia de acceso que publica la fuente (avenida NQS entre calles 53B Bis y 57), no una nomenclatura de portal: el pin se geocodifica por el nombre del estadio. La fuente no publica lista de rechazados; `rejectedItems` queda vacío en lugar de suponerla.",
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },

  // ===========================================================================
  // CUNDINAMARCA — Gobernación de Cundinamarca (11 al 23 de agosto de 2026)
  // ===========================================================================
  {
    slug: "gobernacion-cundinamarca-plaza-de-la-paz",
    name: "Gobernación de Cundinamarca — Plaza de la Paz",
    organization: "Gobernación de Cundinamarca",
    type: "mixed",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Sede de la Gobernación de Cundinamarca, Calle 26 #51-53, Plaza de la Paz",
    geocodeQuery: "Gobernación de Cundinamarca, Calle 26, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua potable",
      "Elementos de aseo e higiene personal",
      "Productos de limpieza",
      "Ropa nueva",
      "Insumos básicos de salud",
      "Alimento para perros y gatos",
      "Elementos de cuidado para animales",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Agua potable", "Elementos de aseo e higiene personal"],
    rejectedItems: ["Ropa usada", "Productos vencidos"],
    scheduleText: "Lunes a domingo, 8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: "2026-08-23",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Gobernación de Cundinamarca, vía El Espectador",
    sourceUrl:
      "https://www.elespectador.com/bogota/donde-donar-para-los-afectados-por-el-terremoto-puntos-autorizados-en-bogota-y-cundinamarca/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Campaña oficial de la Gobernación de Cundinamarca, vigente entre el 11 y el 23 de agosto de 2026. La dirección exacta de la Plaza de la Paz no fue publicada en la nota: se geocodificó la sede de la Gobernación. VALIDAR PIN MANUALMENTE.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "empresa-licores-cundinamarca",
    name: "Empresa de Licores de Cundinamarca",
    organization: "Gobernación de Cundinamarca",
    type: "mixed",
    department: "Cundinamarca",
    municipality: "Cota",
    address: "Autopista Medellín km 3.8, vía Siberia–Cota",
    geocodeQuery: "Empresa de Licores de Cundinamarca, Cota, Cundinamarca, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua potable",
      "Elementos de aseo e higiene personal",
      "Productos de limpieza",
      "Ropa nueva",
      "Insumos básicos de salud",
      "Alimento para perros y gatos",
      "Elementos de cuidado para animales",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Agua potable"],
    rejectedItems: ["Ropa usada", "Productos vencidos"],
    scheduleText: "Lunes a domingo, 7:30 a. m. – 4:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: "2026-08-23",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Gobernación de Cundinamarca, vía El Espectador",
    sourceUrl:
      "https://www.elespectador.com/bogota/donde-donar-para-los-afectados-por-el-terremoto-puntos-autorizados-en-bogota-y-cundinamarca/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Punto oficial de la Gobernación de Cundinamarca, vigente del 11 al 23 de agosto de 2026.",
    lastVerifiedAt: VERIFIED_AT,
  },

  // ===========================================================================
  // VALLE DEL CAUCA — Alcaldía de Cali y Gobernación del Valle
  // ===========================================================================
  {
    slug: "plazoleta-jairo-varela-cali",
    name: "Plazoleta Jairo Varela",
    organization: "Alcaldía de Santiago de Cali",
    type: "mixed",
    department: "Valle del Cauca",
    municipality: "Cali",
    address: "Avenida 2 Norte #10N-1, frente al Centro Administrativo Municipal (CAM)",
    geocodeQuery: "Plazoleta Jairo Varela, Cali, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CALI_DIA2_ITEMS,
    urgentNeeds: CALI_DIA2_URGENTES,
    rejectedItems: ["Productos vencidos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...CALI_REPOSITORIO_SOURCE,
    verificationStatus: "verified",
    verificationNotes:
      "ASCENDIDO el 12 de agosto de 2026: el repositorio oficial de la Alcaldía de Cali lo lista como punto de acopio con la dirección «Av. 2 Nte. # 10 Nte. - 1 Granada», que corrobora la que el seed ya publicaba vía El País. Es la entidad responsable publicando en su propio canal. QUÉ RECIBE, y de dónde sale ese dato: día 1 (10 ago) la Alcaldía lo habilitó priorizando elementos de protección para los equipos de búsqueda y rescate; día 2 (11 ago) El País, citando a la Alcaldía, amplía la lista a ayuda humanitaria general —alimentos, cobijas, ropa, botiquín— además de los elementos de rescate, y por eso el tipo es «mixed» y no «rescue_supplies». Esa canasta sigue viniendo de El País y NO gana certeza con el ascenso: el repositorio confirma que el punto existe y su dirección, no publica la lista de artículos. Mismo criterio que se aplicó al boletín de Medellín en §3.d.2. SIN HORARIO: ninguna fuente oficial lo publica. Se rechazó a propósito el «8:00 a. m. – 6:00 p. m.» que circulaba: en el repositorio ese horario pertenece a los puntos de donación de SANGRE, que son otra cosa.",
    lastVerifiedAt: VERIFIED_AT_VALLE,
  },
  {
    slug: "antigua-licorera-del-valle-cali",
    name: "Antigua Licorera del Valle",
    organization: "Gobernación del Valle del Cauca",
    type: "general",
    department: "Valle del Cauca",
    municipality: "Cali",
    address: "Carrera 1 #26-85",
    geocodeQuery: "Carrera 1 # 26-85, Cali, Valle del Cauca, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua potable",
      "Colchonetas",
      "Mantas",
      "Kits de aseo",
      "Insumos médicos",
    ],
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...VALLE_CAMPANA_SOURCE,
    verificationStatus: "verified",
    verificationNotes:
      "ASCENDIDO el 12 de agosto de 2026: la campaña «El Valle Somos Todos», en el sitio propio de la Gobernación del Valle, publica «Antigua Licorera del Valle, Carrera 1 No. 26-85, Cali» — coincidencia EXACTA con la dirección que el seed ya traía vía El País. Habilitado junto con la declaratoria de calamidad pública. SIN HORARIO: la publicación no lo trae, así que sigue sin publicarse. Confirmar antes de ir.",
    lastVerifiedAt: VERIFIED_AT_VALLE,
  },
  {
    slug: "casa-del-valle-bogota",
    name: "Casa del Valle",
    organization: "Gobernación del Valle del Cauca",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Calle 34 #5-50, barrio La Merced",
    geocodeQuery: "Calle 34 # 5-50, Bogotá, Colombia",
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
      "Bolsas resistentes",
      "Toallas",
      "Linternas",
      "Cascos",
      "Alimento para perros y gatos",
    ],
    urgentNeeds: ["Carpas", "Colchonetas", "Linternas", "Cascos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    /**
     * La salvedad va DENTRO del texto a propósito. La fuente solo publicó la
     * hora de apertura, y un «7:00 a. m.» suelto se lee como horario completo:
     * alguien llegaría a las 6 de la tarde creyendo que alcanza.
     */
    scheduleText: "Desde las 7:00 a. m.; la fuente no publicó hora de cierre",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...VALLE_CAMPANA_SOURCE,
    verificationStatus: "verified",
    verificationNotes:
      "ASCENDIDO el 12 de agosto de 2026: la campaña «El Valle Somos Todos», en el sitio propio de la Gobernación del Valle, publica «Casa del Valle en Bogotá, Calle 34 No. 5-50, barrio La Merced, localidad de Santa Fe» — coincidencia EXACTA con la dirección del seed. Punto en Bogotá para canalizar ayudas hacia el suroccidente. EL PIN SIGUE APROXIMADO a propósito: el geocodificador resolvió «Diagonal 34» en vez de «Calle 34». Cae en La Merced, Santa Fe, que es el barrio y la localidad que declara la fuente, pero no corrobora la nomenclatura, así que la navegación sigue yendo por dirección en texto. EL HORARIO NO CAMBIA: la publicación de la Gobernación no lo trae, y el «desde las 7:00 a. m.» sigue siendo de La FM, con su salvedad intacta. NOTA: la publicación describe el evento como «sismo de magnitud 6.9»; el resto del seed usa 7,4. Es una discrepancia sobre la cifra del terremoto, no sobre el punto.",
    lastVerifiedAt: VERIFIED_AT_VALLE,
  },
  {
    slug: "banco-de-alimentos-cali",
    name: "Banco de Alimentos de Cali",
    organization: "Fundación Arquidiocesana Banco de Alimentos de Cali (red ABACO)",
    type: "food",
    department: "Valle del Cauca",
    municipality: "Cali",
    address: "Calle 24 #6-103",
    geocodeQuery: "Calle 24 # 6-103, Cali, Valle del Cauca, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua embotellada",
      "Arroz",
      "Aceite",
      "Pasta",
      "Enlatados",
      "Leche en polvo",
      "Elementos de primeros auxilios",
    ],
    urgentNeeds: ["Agua embotellada", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "ABACO, vía Semana",
    sourceUrl:
      "https://www.semana.com/nacion/articulo/bancos-de-alimentos-activan-ayuda-para-damnificados-por-el-terremoto-en-colombia-asi-puede-donar/202641/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Incluido por ABACO en el corredor humanitario activado para esta emergencia y replicado por Infobae y La FM. No se localizó comunicado propio del Banco de Alimentos de Cali.",
    lastVerifiedAt: VERIFIED_AT,
  },

  // ===========================================================================
  // ATLÁNTICO — Alcaldía Distrital de Barranquilla
  // ===========================================================================
  {
    slug: "centro-acopio-barranquillita",
    name: "Centro de acopio Barranquillita",
    organization: "Alcaldía de Barranquilla — Oficina Distrital de Gestión del Riesgo",
    type: "general",
    department: "Atlántico",
    municipality: "Barranquilla",
    address: "Carrera 43 #6-120, sector Barranquillita",
    geocodeQuery: "Carrera 43 # 6-120, Barranquilla, Atlántico, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua potable",
      "Insumos médicos",
      "Productos de aseo",
      "Artículos para bebés",
      "Ropa en buen estado",
      "Colchonetas",
    ],
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "Abierto 24 horas",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Barranquilla, vía El Heraldo",
    sourceUrl:
      "https://www.elheraldo.co/atlantico/2026/08/10/distrito-habilita-centro-de-acopio-para-ayudar-a-afectados-por-sismo-en-colombia/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "CONFLICTO DE FUENTES RESUELTO PARCIALMENTE: circuló una dirección idéntica asociada a la campaña por los sismos de Venezuela de junio de 2026. El Heraldo publicó el 10 de agosto de 2026 que el Distrito habilitó ESTE punto para el terremoto de Chocó, atribuyéndolo al alcalde Alejandro Char y a la Oficina Distrital de Gestión del Riesgo. Se mantiene como «reportado» hasta confirmar en barranquilla.gov.co.",
    lastVerifiedAt: VERIFIED_AT,
  },

  // ===========================================================================
  // BOLÍVAR — Alcaldía de Cartagena
  // ===========================================================================
  {
    slug: "coliseo-bernardo-caraballo-cartagena",
    name: "Coliseo Bernardo Caraballo",
    organization: "Alcaldía Mayor de Cartagena de Indias",
    type: "general",
    department: "Bolívar",
    municipality: "Cartagena",
    address: "Coliseo de Combate Bernardo Caraballo, barrio Chiquinquirá",
    geocodeQuery: "Coliseo Bernardo Caraballo, Cartagena, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua",
      "Alimentos no perecederos",
      "Sábanas",
      "Colchonetas",
      "Artículos de higiene y cuidado personal",
    ],
    urgentNeeds: ["Agua", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Cartagena, vía El Tiempo",
    sourceUrl:
      "https://www.eltiempo.com/colombia/otras-ciudades/cartagena-activa-campana-de-ayudas-para-damnificados-por-el-terremoto-y-habilita-punto-de-acopio-desde-este-martes-aqui-pueden-llevar-las-ayudas-3577427",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Campaña ordenada por el alcalde Dumek Turbay Paz, con participación de Bomberos, Dadis e IDER. Recepción a partir del martes 11 de agosto de 2026. La nota no publica dirección exacta: se geocodificó por nombre del coliseo. VALIDAR PIN MANUALMENTE.",
    lastVerifiedAt: VERIFIED_AT,
  },

  // ===========================================================================
  // MAGDALENA — Alcaldía Distrital de Santa Marta
  // ===========================================================================
  {
    slug: "ogricc-santa-marta",
    name: "Oficina de Gestión del Riesgo de Desastres (Ogricc)",
    organization: "Alcaldía Distrital de Santa Marta",
    type: "general",
    department: "Magdalena",
    municipality: "Santa Marta",
    address: "Calle 16 #14A-08, segundo piso, barrio El Cundí",
    geocodeQuery: "Calle 16 # 14A-08, Santa Marta, Magdalena, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua potable",
      "Colchonetas",
      "Frazadas",
      "Elementos de aseo",
      "Artículos para bebés",
      "Insumos médicos",
    ],
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:30 a. m. – 5:30 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Distrital de Santa Marta, vía Hoy Diario del Magdalena",
    sourceUrl:
      "https://www.hoydiariodelmagdalena.com.co/archivos/1304749/santa-marta-habilita-centro-de-acopio-para-apoyar-a-damnificados-por-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Habilitado por la Alcaldía de Santa Marta (alcalde Carlos Pinedo Cuello) a través de la Ogricc. ESTE punto reemplaza en la práctica al «Antiguo Hospital San Juan de Dios» que circuló en otras publicaciones y que NO pudo confirmarse (ver registro «disputed»).",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "antiguo-hospital-san-juan-de-dios-santa-marta",
    name: "Antiguo Hospital San Juan de Dios",
    organization: "Gobernación del Magdalena",
    type: "general",
    department: "Magdalena",
    municipality: "Santa Marta",
    address: "Antiguo Hospital San Juan de Dios, centro histórico",
    geocodeQuery: "Antiguo Hospital San Juan de Dios, Santa Marta, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua",
      "Colchonetas",
      "Frazadas",
      "Ropa nueva o en buen estado",
      "Elementos de aseo",
      "Artículos para bebés",
      "Alimento para mascotas",
      "Insumos médicos",
    ],
    urgentNeeds: [],
    rejectedItems: [],
    scheduleText: "8:00 a. m. – 12:00 m. y 2:00 p. m. – 5:00 p. m.",
    startsAt: null,
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Sin fuente primaria localizada",
    sourceUrl: null,
    sourcePublishedAt: null,
    verificationStatus: "disputed",
    verificationNotes:
      "NO PUBLICADO. No se localizó ningún comunicado de la Gobernación del Magdalena que habilite este inmueble como centro de acopio para el terremoto del 10 de agosto de 2026. Las únicas menciones recientes verificables del Antiguo Hospital San Juan de Dios corresponden a escrutinios electorales (junio de 2026) y a un programa de recuperación patrimonial (febrero de 2026). La Alcaldía de Santa Marta sí habilitó un punto distinto (Ogricc, calle 16 #14A-08). REQUIERE VALIDACIÓN MANUAL.",
    lastVerifiedAt: null,
  },

  // ===========================================================================
  // ANTIOQUIA — Alcaldía de Medellín («En Medellín somos solidarios»)
  // ===========================================================================
  {
    slug: "fubam-banco-arquidiocesano-alimentos-medellin",
    name: "Fundación Banco Arquidiocesano de Alimentos (FUBAM)",
    organization: "FUBAM, en alianza con la Alcaldía de Medellín y Corporación Presentes",
    type: "food",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Carrera 52 #30A-97, barrio Guayabal",
    geocodeQuery: "Carrera 52 # 30A-97, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua",
      "Arroz",
      "Aceite",
      "Pasta",
      "Lentejas",
      "Fríjol",
      "Garbanzos",
      "Arvejas",
      "Alimentos enlatados",
      "Harina de maíz y trigo",
      "Panela",
      "Chocolate",
      "Frutos secos",
      "Avena",
      "Leche en polvo",
      "Leche UHT",
      "Jabón",
      "Shampoo",
      "Toallas higiénicas",
      "Pañales",
      "Toallitas húmedas",
      "Colchonetas",
      "Mantas",
    ],
    urgentNeeds: ["Agua", "Alimentos no perecederos", "Artículos de aseo"],
    rejectedItems: ["Medicamentos", "Ropa", "Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...MEDELLIN_BOLETIN_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${MEDELLIN_BOLETIN_NOTA} DUDA RESUELTA ANTES: existía riesgo de confundir este punto con la campaña por los sismos de Venezuela de junio de 2026. El Colombiano y Telemedellín publicaron el 10 de agosto de 2026 que la Alcaldía lo habilitó para ESTA emergencia, dentro de «En Medellín somos solidarios» con la Corporación Presentes. Explícitamente NO recibe medicamentos ni ropa.`,
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },
  {
    slug: "fundacion-saciar-medellin",
    name: "Fundación Saciar",
    organization: "Fundación Saciar, en alianza con la Alcaldía de Medellín",
    type: "food",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Carrera 50 #25-261, barrio Belén",
    geocodeQuery: "Carrera 50 # 25-261, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua",
      "Arroz",
      "Aceite",
      "Pasta",
      "Lentejas",
      "Fríjol",
      "Alimentos enlatados",
      "Harina",
      "Panela",
      "Leche en polvo",
      "Jabón",
      "Papel higiénico",
      "Toallas higiénicas",
      "Pañales",
      "Colchonetas",
      "Mantas",
    ],
    urgentNeeds: ["Agua", "Alimentos no perecederos", "Artículos de aseo"],
    rejectedItems: ["Medicamentos", "Ropa", "Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...MEDELLIN_BOLETIN_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${MEDELLIN_BOLETIN_NOTA} DISCREPANCIA DE DIRECCIÓN AÚN ABIERTA: La Silla Vacía publicó «Carrera 52 #25-261»; El Colombiano, Infobae, Publimetro, La FM y Telemedellín coinciden en «Carrera 50 #25-261». Se usa la versión mayoritaria. El boletín de la Alcaldía no dirime la discrepancia porque no publica direcciones. VALIDAR PIN MANUALMENTE.`,
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },
  {
    slug: "parque-principal-itagui",
    name: "Parque Principal de Itagüí",
    organization: "Alcaldía de Itagüí",
    type: "general",
    department: "Antioquia",
    municipality: "Itagüí",
    address: "Parque Principal Simón Bolívar",
    geocodeQuery: "Parque Principal Itagüí, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Agua",
      "Elementos de aseo",
      "Colchonetas",
      "Mantas",
    ],
    urgentNeeds: ["Agua", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "10:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: "2026-08-12",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Colombia.com",
    sourceUrl:
      "https://www.colombia.com/actualidad/noticias/centros-de-acopio-y-ayudas-humanitarias-habilitadas-en-colombia-tras-temblor-10-de-agosto-595512",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "inactive",
    verificationNotes:
      "CERRADO. Jornada de dos días que terminó el 12 de agosto de 2026. La revalidación del 13 de agosto confirmó en la fuente original que el punto operó únicamente el martes 11 y el miércoles 12 entre las 10:00 a. m. y las 5:00 p. m., coordinado por el Consejo Municipal de Juventudes de Itagüí con la organización afro AfroDhamiri. Ninguna fuente posterior lo relista. Se pasa a `inactive` porque `endsAt` ya venció: no debe aparecer en resultados.",
    lastVerifiedAt: REVALIDATED_AT_DIA4,
  },
  // ELIMINADO el 12 de agosto de 2026: `terminal-transportes-la-alpujarra-medellin`.
  // Era un registro fantasma. Agrupaba en disputa «Terminal de Transportes» y
  // «La Alpujarra» desde el 10 de agosto; sus dos mitades quedaron resueltas y
  // publicadas por separado como `hall-alcaldia-medellin` y
  // `terminal-del-norte-medellin`, ambas confirmadas después en el boletín
  // propio de la Alcaldía. Su propia nota decía «pendiente de decidir si se crea
  // como registro propio»: ya no hay nada que decidir. Ver docs/sources.md §4.9.

  // ===========================================================================
  // SANTANDER — iniciativas locales en Bucaramanga
  // ===========================================================================
  {
    slug: "consejo-municipal-juventudes-bucaramanga",
    name: "Consejo Municipal de Juventudes de Bucaramanga",
    organization: "Consejo Municipal de Juventudes de Bucaramanga",
    type: "general",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Conjunto Plaza Mayor, entrada 4, oficina 110",
    geocodeQuery: "Conjunto Plaza Mayor, Bucaramanga, Santander, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: ["Elementos de primera necesidad", "Alimentos no perecederos", "Elementos de aseo"],
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/10/en-bucaramanga-habilitan-puntos-de-recoleccion-de-ayudas-tras-el-sismo-en-colombia/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Iniciativa ciudadana, no gubernamental. Vanguardia no publicó horarios ni teléfono. Confirmar antes de desplazarse.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "uis-arbol-ceiba-bucaramanga",
    name: "Universidad Industrial de Santander — Árbol Ceiba",
    organization: "Colectivo estudiantil de la UIS",
    type: "mixed",
    department: "Santander",
    municipality: "Bucaramanga",
    address: "Campus central UIS, punto de recolección junto al Árbol Ceiba",
    geocodeQuery: "Universidad Industrial de Santander, Bucaramanga, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Ropa en buen estado",
      "Medicamentos básicos",
      "Elementos de primeros auxilios",
      "Alimentos no perecederos",
      "Alimento para mascotas",
    ],
    urgentNeeds: ["Elementos de primeros auxilios", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Vanguardia",
    sourceUrl:
      "https://www.vanguardia.com/area-metropolitana/bucaramanga/2026/08/10/en-bucaramanga-habilitan-puntos-de-recoleccion-de-ayudas-tras-el-sismo-en-colombia/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Punto organizado por un colectivo estudiantil dentro del campus de la UIS. Sin horario publicado. El acceso al campus puede requerir identificación.",
    lastVerifiedAt: VERIFIED_AT,
  },

  // ===========================================================================
  // RED ACSC — 16 sedes nacionales de insumos médicos
  // ===========================================================================
  acsc(
    "acsc-medellin",
    "Antioquia",
    "Medellín",
    "Carrera 43A #1 Sur-100, Edificio Torre Sudameris, oficina 1004",
    "(604) 6052298",
    "Carrera 43A # 1 Sur 100, Medellín, Antioquia, Colombia",
  ),
  acsc(
    "acsc-barranquilla",
    "Atlántico",
    "Barranquilla",
    "Carrera 54 #68-196, piso 2, oficinas 216-222, Prado Office Center",
    "(605) 3861950",
    "Carrera 54 # 68-196, Barranquilla, Atlántico, Colombia",
  ),
  acsc(
    "acsc-bogota",
    "Bogotá D.C.",
    "Bogotá D.C.",
    "Carrera 15A #120-74",
    "(601) 7448100",
    "Carrera 15A # 120-74, Bogotá, Colombia",
  ),
  acsc(
    "acsc-cartagena",
    "Bolívar",
    "Cartagena",
    "Manga, Calle 28 #26-53, Edificio Portus, oficina 1202",
    "(605) 6939844",
    "Calle 28 # 26-53, Manga, Cartagena, Bolívar, Colombia",
  ),
  acsc(
    "acsc-tunja",
    "Boyacá",
    "Tunja",
    "Calle 20 #12-84, local 117, Centro Cívico y Comercial Plaza Real",
    "(608) 7471763",
    "Calle 20 # 12-84, Tunja, Boyacá, Colombia",
  ),
  acsc(
    "acsc-popayan",
    "Cauca",
    "Popayán",
    "Carrera 9 #18N-231, oficina 205, Edificio Terrazas del Norte",
    "(602) 8353770",
    "Carrera 9 # 18N-231, Popayán, Cauca, Colombia",
  ),
  acsc(
    "acsc-valledupar",
    "Cesar",
    "Valledupar",
    "Calle 11 #8-79, oficinas 202-203, Edificio SOA",
    "(605) 5893964",
    "Calle 11 # 8-79, Valledupar, Cesar, Colombia",
  ),
  acsc(
    "acsc-monteria",
    "Córdoba",
    "Montería",
    "Calle 62 #7-53, barrio La Castellana",
    "(604) 7890650",
    "Calle 62 # 7-53, Montería, Córdoba, Colombia",
  ),
  acsc(
    "acsc-riohacha",
    "La Guajira",
    "Riohacha",
    "Calle 7 #11-114, oficina 8, segundo piso, Edificio Doña Cándida",
    "(605) 7274999",
    "Calle 7 # 11-114, Riohacha, La Guajira, Colombia",
  ),
  acsc(
    "acsc-neiva",
    "Huila",
    "Neiva",
    "Carrera 5 #10-49, local 201, Centro Comercial Plaza Real",
    "(608) 8631026",
    "Carrera 5 # 10-49, Neiva, Huila, Colombia",
  ),
  acsc(
    "acsc-santa-marta",
    "Magdalena",
    "Santa Marta",
    "Calle 24 #3-99, Edificio 424, oficina 1007",
    "(605) 4368361",
    "Calle 24 # 3-99, Santa Marta, Magdalena, Colombia",
  ),
  acsc(
    "acsc-villavicencio",
    "Meta",
    "Villavicencio",
    "Avenida 40 #16B-159, Centro Comercial Villacentro, locales 83 y 84",
    "(608) 6833520",
    "Centro Comercial Villacentro, Villavicencio, Meta, Colombia",
  ),
  acsc(
    "acsc-pasto",
    "Nariño",
    "Pasto",
    "Carrera 25 #15-62, oficina 201, Edificio Zaguán del Lago",
    "(602) 7382025",
    "Carrera 25 # 15-62, Pasto, Nariño, Colombia",
  ),
  acsc(
    "acsc-cucuta",
    "Norte de Santander",
    "Cúcuta",
    "Calle 8A #5E-25, barrio La Rivera",
    "(607) 5956341",
    "Calle 8A # 5E-25, Cúcuta, Norte de Santander, Colombia",
  ),
  acsc(
    "acsc-bucaramanga",
    "Santander",
    "Bucaramanga",
    "Calle 45 #28-36, Edificio Verona Plaza",
    "(607) 6973093",
    "Calle 45 # 28-36, Bucaramanga, Santander, Colombia",
  ),
  acsc(
    "acsc-sincelejo",
    "Sucre",
    "Sincelejo",
    "Calle 28, Carrera 25-365, Parque Comercial Guacarí, Torre Médica, oficinas 3327-3328",
    "(605) 2765344",
    "Parque Comercial Guacarí, Sincelejo, Sucre, Colombia",
  ),

  // ===========================================================================
  // RED ABACO — bancos de alimentos del corredor humanitario
  // ===========================================================================
  {
    slug: "banco-alimentos-armenia",
    name: "Banco de Alimentos Monseñor Roberto López Londoño",
    organization: "Red ABACO",
    type: "food",
    department: "Quindío",
    municipality: "Armenia",
    address: "Sede del Banco de Alimentos de Armenia",
    geocodeQuery: "Banco de Alimentos, Armenia, Quindío, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua",
      "Arroz",
      "Aceite",
      "Pasta",
      "Lentejas",
      "Fríjol",
      "Garbanzos",
      "Arvejas",
      "Alimentos enlatados",
      "Leche en polvo",
      "Leche UHT",
      "Avena",
      "Harinas",
      "Jabón",
      "Crema dental",
      "Papel higiénico",
      "Pañales",
      "Toallas higiénicas",
      "Colchonetas",
      "Mantas",
    ],
    urgentNeeds: ["Agua", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "Consultar antes de asistir",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "ABACO, vía Semana",
    sourceUrl:
      "https://www.semana.com/nacion/articulo/bancos-de-alimentos-activan-ayuda-para-damnificados-por-el-terremoto-en-colombia-asi-puede-donar/202641/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Parte del corredor humanitario activado por ABACO para el terremoto del 10 de agosto de 2026. Semana no publicó dirección exacta: la coordenada proviene de geocodificación por nombre. VALIDAR PIN Y DIRECCIÓN MANUALMENTE.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "banco-alimentos-manizales",
    name: "Banco de Alimentos de Manizales",
    organization: "Red ABACO",
    type: "food",
    department: "Caldas",
    municipality: "Manizales",
    address: "Sede del Banco de Alimentos de Manizales",
    geocodeQuery: "Banco de Alimentos, Manizales, Caldas, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua",
      "Arroz",
      "Aceite",
      "Pasta",
      "Granos",
      "Alimentos enlatados",
      "Leche en polvo",
      "Jabón",
      "Papel higiénico",
      "Pañales",
      "Colchonetas",
      "Mantas",
    ],
    urgentNeeds: ["Agua", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "Consultar antes de asistir",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "ABACO, vía Semana",
    sourceUrl:
      "https://www.semana.com/nacion/articulo/bancos-de-alimentos-activan-ayuda-para-damnificados-por-el-terremoto-en-colombia-asi-puede-donar/202641/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Manizales es ciudad afectada por el sismo. ABACO lo reporta como punto activo del corredor humanitario. Sin dirección exacta publicada: coordenada por geocodificación. VALIDAR PIN Y VIGENCIA MANUALMENTE.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "banco-arquidiocesano-alimentos-ibague",
    name: "Banco Arquidiocesano de Alimentos de Ibagué",
    organization: "Red ABACO",
    type: "food",
    department: "Tolima",
    municipality: "Ibagué",
    address: "Carrera 4 #23-42, sector Estadio",
    geocodeQuery: "Carrera 4 # 23-42, Ibagué, Tolima, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua",
      "Arroz",
      "Aceite",
      "Pasta",
      "Granos",
      "Alimentos enlatados",
      "Leche en polvo",
      "Jabón",
      "Papel higiénico",
      "Pañales",
      "Colchonetas",
      "Mantas",
    ],
    urgentNeeds: ["Agua", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    // Decía «Consultar antes de asistir», que el clasificador trata como
    // «horario desconocido». Pero la lista de la red de Tigresas SÍ publica el
    // horario de esta sede: estábamos degradando un dato que existía.
    scheduleText: "8:00 a. m. – 12:00 m. y 2:30 – 5:00 p. m.",
    startsAt: "2026-08-10",
    endsAt: null,
    phone: "+57 321 840 2089",
    whatsapp: "+57 321 840 2089",
    email: null,
    sourceName: "ABACO, vía Semana; dirección y teléfono según la red de las Tigresas de la Patria",
    sourceUrl:
      "https://www.semana.com/nacion/articulo/bancos-de-alimentos-activan-ayuda-para-damnificados-por-el-terremoto-en-colombia-asi-puede-donar/202641/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Punto del corredor humanitario de ABACO. La dirección exacta («Carrera 4 #23-42, sector Estadio») y el teléfono provienen de las piezas gráficas de la red de las Tigresas de la Patria, que coinciden en señalar el Banco de Alimentos de la Arquidiócesis de Ibagué. DOS FUENTES INDEPENDIENTES COINCIDEN en el punto, lo que refuerza su existencia, pero ninguna es la organización publicando en su propio canal.",
    lastVerifiedAt: VERIFIED_AT,
  },
  {
    slug: "banco-alimentos-pereira",
    name: "Banco de Alimentos de Pereira",
    organization: "Red ABACO",
    type: "food",
    department: "Risaralda",
    municipality: "Pereira",
    address: "Sede afectada por el sismo — ubicación alterna en evaluación",
    geocodeQuery: null,
    latitude: null,
    longitude: null,
    acceptedItems: [],
    urgentNeeds: [],
    rejectedItems: [],
    scheduleText: null,
    startsAt: null,
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "ABACO, vía Semana",
    sourceUrl:
      "https://www.semana.com/nacion/articulo/bancos-de-alimentos-activan-ayuda-para-damnificados-por-el-terremoto-en-colombia-asi-puede-donar/202641/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "inactive",
    verificationNotes:
      "SIGUE SIN PUBLICARSE, pero la revalidación del 13 de agosto encontró una pista concreta que una sola llamada puede cerrar. El Tiempo (11 de agosto, 10:46) lista textualmente «Banco de Alimentos de Pereira, transversal 5 No. 6-30, calle de las Aromas, La Badea, Dosquebradas» y publica el WhatsApp de ABACO 313 245 7978 para donaciones en especie. " +
      "NO SE REACTIVA porque ese mismo artículo se contradice: junto a la dirección mantiene que «este punto también se encuentra afectado y está en evaluación un sitio alterno». No se puede saber si Dosquebradas ES ya la sede alterna operando o si es la dirección administrativa de una operación todavía suspendida. " +
      "ACCIÓN: escribir al WhatsApp 313 245 7978 y preguntar si la bodega de La Badea recibe público hoy. Es la reactivación más barata del seed. Ver docs/revalidacion-2026-08-13.md §2.",
    lastVerifiedAt: REVALIDATED_AT_DIA4,
  },
  // ===========================================================================
  // ENVIADOS DESDE REDES SOCIALES — 11 de agosto de 2026
  //
  // Entran como `pending`: NO se publican hasta que un administrador los
  // confirme desde /admin. No es desconfianza en quien los compartió, es la
  // regla base del proyecto: no usar como fuente primaria cuentas personales,
  // publicaciones copiadas ni imágenes sin procedencia. Ambos llegaron como
  // captura de una historia de Instagram y ningún medio los recogió.
  // ===========================================================================
  {
    slug: "recolecciones-sabaneta-san-joaquin",
    name: "Punto de recolección Sabaneta — San Joaquín",
    organization: "Colectivo de voluntarios (sin organización responsable identificada)",
    type: "general",
    department: "Antioquia",
    municipality: "Sabaneta",
    address: "Calle 68A Sur #43-12, barrio San Joaquín",
    geocodeQuery: "Calle 68 Sur, Sabaneta, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua",
      "Sueros",
      "Alimentos no perecederos",
      "Enlatados",
      "Galletas",
      "Cereales",
      "Alimentos empacados",
      "Jabón",
      "Papel higiénico",
      "Cepillos y crema dental",
      "Toallas húmedas",
      "Productos de higiene menstrual",
      "Pañales",
      "Gasas",
      "Vendas",
      "Guantes",
      "Antisépticos",
      "Apósitos",
      "Cobijas",
      "Colchonetas",
      "Carpas",
      "Lonas",
      "Linternas",
      "Baterías",
      "Power banks",
      "Productos de limpieza",
      "Alimentos infantiles",
      "Mantas",
    ],
    urgentNeeds: ["Agua", "Alimentos no perecederos", "Colchonetas", "Linternas"],
    rejectedItems: ["Medicamentos", "Elementos no solicitados"],
    scheduleText: "4:00 p. m. – 7:30 p. m. (jornada de un solo día, confirmar vigencia)",
    startsAt: "2026-08-11",
    endsAt: "2026-08-11",
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Historia de Instagram de @sararamirezmurillo_, recompartida por @isabellab98a",
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    // `inactive`, no `pending`: alineado con la base de producción el 14 de
    // agosto de 2026. Un moderador lo cerró desde el panel el 13 de agosto, y
    // reaplicar el seed con `pending` habría revertido esa decisión en silencio.
    // La fecha le da la razón: su jornada era de un solo día y venció el 11.
    verificationStatus: "inactive",
    verificationNotes:
      "NO PUBLICADO. Llegó como captura de una historia de Instagram que a su vez recompartía la de otra cuenta personal: es una publicación copiada, sin enlace localizable y sin organización responsable identificada. Se anuncia como «Comunicado N.º 9» de un grupo de voluntarios, lo que sugiere una operación real y sostenida, pero no se localizó ningún respaldo institucional ni cobertura de prensa. SU JORNADA ERA DE UN SOLO DÍA (4:00 p. m. – 7:30 p. m., 11 de agosto) y ya venció, así que pasó a `inactive` desde el panel de moderación el 13 de agosto de 2026. Si el colectivo vuelve a abrir, necesita fuente propia antes de publicarse. Rechaza medicamentos de forma explícita.",
    lastVerifiedAt: null,
  },
  {
    slug: "gimnasio-casa-estudio-buga",
    name: "Gimnasio Casa Estudio Buga",
    organization: "Casa Estudio Buga — campaña «Buga Presente»",
    type: "general",
    department: "Valle del Cauca",
    municipality: "Guadalajara de Buga",
    address: "Gimnasio Casa Estudio Buga, al lado de Postobón",
    geocodeQuery: "Guadalajara de Buga, Valle del Cauca, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua embotellada",
      "Alimentos no perecederos",
      "Enlatados abre fácil",
      "Galletas",
      "Barras de cereal",
      "Leche UHT",
      "Pañales para bebés",
      "Toallas higiénicas",
      "Pañitos húmedos",
      "Papel higiénico",
      "Jabón",
      "Shampoo",
      "Crema dental",
      "Cepillos",
      "Gel antibacterial",
      "Bolsas de basura",
      "Cobijas limpias",
      "Colchonetas",
      "Sleeping bags",
      "Linternas",
      "Pilas",
      "Impermeables",
      "Ropa limpia y en buen estado",
      "Kits de primeros auxilios",
      "Gasas",
      "Vendas",
      "Esparadrapo",
      "Suero oral",
      "Guantes",
      "Termómetros",
      "Palas",
      "Picos",
      "Martillos",
      "Barretas",
      "Carretillas",
      "Baldes para escombros",
      "Tapabocas N95 o quirúrgicos",
    ],
    urgentNeeds: ["Agua embotellada", "Herramientas", "Baldes para escombros", "Tapabocas N95"],
    rejectedItems: ["Productos vencidos", "Ropa sucia o en mal estado"],
    scheduleText: "Hasta las 7:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Historia de Instagram de @yolverr — campaña «Buga Presente»",
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "pending",
    verificationNotes:
      "NO PUBLICADO. Llegó como captura de una historia de Instagram, sin enlace localizable y sin cobertura de prensa que lo respalde. La pieza está bien producida y nombra un lugar concreto («Gimnasio Casa Estudio Buga, al lado de Postobón») y cuentas de donación (Bancolombia 84800007311, Nequi 3146168510), lo que le da verosimilitud, pero la cuenta que la comparte no es la organización responsable ni una autoridad. Es de los pocos puntos que pide HERRAMIENTAS y baldes para escombros, útil para el trabajo de remoción. Confirmar dirección exacta y horario antes de publicar; el número de Nequi puede servir de contacto.",
    lastVerifiedAt: null,
  },

  // ===========================================================================
  // RED NACIONAL DE PUNTOS DE SOLIDARIDAD — Tigresas de la Patria
  // Difundida por la primera dama Ana Lucía Pineda. Ver TIGRESAS_NOTES.
  //
  // EXCLUIDO A PROPÓSITO: «Centro Internacional de Solidaridad – GEM,
  // 1850 NW 84th Ave, Doral, Florida 33126». Está fuera de Colombia, el esquema
  // restringe las coordenadas al territorio nacional, y Doral fue justamente
  // uno de los puntos de la campaña por Venezuela de junio de 2026.
  // ===========================================================================
  tigresa("tigresas-valledupar", "Centro de Solidaridad Valledupar", "Cesar", "Valledupar",
    "Carrera 23 #4-116, MZ A, Casa 14, Conjunto Residencial Callejas", "+57 311 403 9818",
    {
      geocodeQuery: "Carrera 23 # 4-116, Valledupar, Cesar, Colombia",
      ...TIGRESAS_SOURCE,
      verificationStatus: "reported",
      verificationNotes: `${TIGRESAS_NOTES} ${CESAR_DEGRADADO_NOTA}`,
      lastVerifiedAt: REVALIDATED_AT_DIA5,
    }),
  tigresa("tigresas-pailitas", "Emisora Universal Stereo", "Cesar", "Pailitas",
    "Barrio El Bosque", "+57 314 592 7152",
    {
      geocodeQuery: "Pailitas, Cesar, Colombia",
      ...TIGRESAS_SOURCE,
      verificationStatus: "reported",
      verificationNotes: `${TIGRESAS_NOTES} ${CESAR_DEGRADADO_NOTA}`,
      lastVerifiedAt: REVALIDATED_AT_DIA5,
    }),
  tigresa("tigresas-bucaramanga", "Centro de Solidaridad Bucaramanga", "Santander", "Bucaramanga",
    "Calle 54 #21A-07, barrio La Concordia", "+57 316 256 7986",
    { geocodeQuery: "Calle 54 # 21A-07, Bucaramanga, Santander, Colombia" }),
  tigresa("tigresas-cartagena-perpetuo-socorro", "Parroquia Nuestra Señora del Perpetuo Socorro", "Bolívar", "Cartagena",
    "Bocagrande", "+57 310 803 6477",
    { geocodeQuery: "Parroquia Nuestra Señora del Perpetuo Socorro, Bocagrande, Cartagena, Colombia" }),
  tigresa("tigresas-cartagena-cristo-rey", "Parroquia Cristo Rey (Crespo)", "Bolívar", "Cartagena",
    "Barrio Crespo", "+57 300 329 3219",
    { geocodeQuery: "Parroquia Cristo Rey, Crespo, Cartagena, Colombia" }),
  tigresa("tigresas-banco-alimentos-cartagena", "Banco de Alimentos de Cartagena", "Bolívar", "Cartagena",
    "Parque Industrial Ternera #1, Bodega 51", "+57 301 352 3180",
    { type: "food", geocodeQuery: "Parque Industrial Ternera, Cartagena, Bolívar, Colombia" }),
  tigresa("tigresas-tame", "Complejo Deportivo Villa Olímpica", "Arauca", "Tame",
    "Calle 15 con Carrera 37, barrio La Libertad", "+57 311 218 6525",
    { geocodeQuery: "Tame, Arauca, Colombia" }),
  tigresa("tigresas-bogota-gaula", "GAULA — La Castellana", "Bogotá D.C.", "Bogotá D.C.",
    "Carrera 47 #94-68, barrio La Castellana", "+57 318 544 4431",
    { geocodeQuery: "Carrera 47 # 94-68, Bogotá, Colombia" }),
  tigresa("tigresas-bogota-codabas", "CODABAS", "Bogotá D.C.", "Bogotá D.C.",
    "Carrera 7 #180-75, módulo 2, piso 2", "+57 305 714 1513",
    { geocodeQuery: "Carrera 7 # 180-75, Bogotá, Colombia" }),
  // Un solo registro para un solo lugar físico. El 11 de agosto la Alcaldía
  // sumó Unicentro a su lista oficial, así que el mismo centro comercial es
  // punto de DOS campañas a la vez. Dos registros producirían dos pines
  // apilados sobre las mismas coordenadas —el problema que ya hubo que corregir
  // en Cartagena—, y para quien va a donar la distinción no cambia nada.
  tigresa("tigresas-bogota-unicentro", "Unicentro Bogotá", "Bogotá D.C.", "Bogotá D.C.",
    "Carrera 15 #124-30 (entradas por la Carrera 13, Zona de Banderas, y por la Carrera 15, entrada principal)",
    "+57 317 645 6373",
    {
      geocodeQuery: "Unicentro, Bogotá, Colombia",
      organization:
        "Alcaldía Mayor de Bogotá y Cruz Roja Colombiana Seccional Cundinamarca y Bogotá, junto con Tigresas de la Patria",
      scheduleText: "8:00 a. m. – 9:00 p. m., de lunes a domingo",
      sourceName: "Alcaldía Mayor de Bogotá",
      sourceUrl:
        "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
      sourcePublishedAt: "2026-08-11",
      verificationNotes:
        "DOS CAMPAÑAS EN EL MISMO LUGAR, UN SOLO REGISTRO. Entró el 10 de agosto por la red de Tigresas de la Patria y el 11 de agosto la Alcaldía Mayor de Bogotá lo incorporó a su lista oficial de cuatro puntos, con dirección exacta (Carrera 15 #124-30) y horario. Se conserva el teléfono de la red de Tigresas porque sigue siendo válido para coordinar cargas grandes.",
      lastVerifiedAt: VERIFIED_AT_DIA2,
    }),
  tigresa("tigresas-barranquilla-casa-abelardista", "Casa Abelardista", "Atlántico", "Barranquilla",
    "Carrera 49C #80-76", "+57 301 760 6374",
    {
      geocodeQuery: "Carrera 49C # 80-76, Barranquilla, Atlántico, Colombia",
      scheduleText: "9:00 a. m. – 5:00 p. m.",
      acceptedItems: ["Alimentos no perecederos", "Medicamentos", "Líquidos"],
      urgentNeeds: ["Alimentos no perecederos", "Medicamentos"],
      verificationNotes: `${TIGRESAS_NOTES} La pieza gráfica indica responsable «Fela Córdoba» y es el único punto de la red con horario y lista de artículos publicados.`,
    }),
  tigresa("tigresas-neiva-centro-solidaridad", "Centro de Solidaridad Neiva", "Huila", "Neiva",
    "Calle 8 #10-27, barrio El Altico", "+57 315 480 2554",
    { geocodeQuery: "Calle 8 # 10-27, Neiva, Huila, Colombia" }),
  tigresa("tigresas-banco-alimentos-neiva", "Banco de Alimentos de Neiva", "Huila", "Neiva",
    "Calle 33 Sur #22-141, Zona Industrial del Sur", "+57 311 264 7951",
    { type: "food", geocodeQuery: "Zona Industrial del Sur, Neiva, Huila, Colombia" }),
  tigresa("tigresas-santa-marta-amor-en-accion", "Iglesia Amor en Acción", "Magdalena", "Santa Marta",
    "Calle 30 #6-69", "+57 317 300 3459",
    {
      geocodeQuery: "Calle 30 # 6-69, Santa Marta, Magdalena, Colombia" ,
      scheduleText: "8:00 a. m. – 12:00 m. y 2:00 – 6:00 p. m.",
    }),
  tigresa("tigresas-arauca-capital", "Tigresas Arauca Capital", "Arauca", "Arauca",
    "Calle 17 #17-31, barrio Cristo Rey", "+57 314 401 4272",
    { geocodeQuery: "Calle 17 # 17-31, Arauca, Colombia" }),
  tigresa("tigresas-san-diego-cesar", "Punto de Solidaridad San Diego", "Cesar", "San Diego",
    "Carrera 13 #2F-85, Urbanización Chiriaimo", "+57 301 297 9760",
    {
      geocodeQuery: "San Diego, Cesar, Colombia",
      ...TIGRESAS_SOURCE,
      verificationStatus: "reported",
      verificationNotes: `${TIGRESAS_NOTES} Aparece DUPLICADO en dos piezas distintas de la campaña, con la misma dirección y teléfono; se consolidó en un solo registro. ${CESAR_DEGRADADO_NOTA}`,
      lastVerifiedAt: REVALIDATED_AT_DIA5,
    }),
  tigresa("tigresas-pereira-alpaca", "Complejo Bodeguero Alpaca — Bodega 01", "Risaralda", "Pereira",
    "Vía La Romelia – El Pollo, Vereda Santa Ana Baja, Complejo Bodeguero Alpaca, Bodega 01, a la altura del Hotel Tángara (vía pavimentada)",
    "+57 310 528 9438",
    {
      geocodeQuery: "La Romelia, Dosquebradas, Risaralda, Colombia",
      scheduleText: "8:00 a. m. – 12:00 m. y 2:00 – 6:00 p. m.",
      verificationNotes: `${TIGRESAS_NOTES} Aparece en la pieza titulada «Nuevos puntos de solidaridad para apoyar con donaciones a nuestros hermanos afectados por el terremoto», la referencia más explícita a ESTA emergencia de toda la red. Pereira es una de las ciudades más golpeadas. Dirección rural sin nomenclatura urbana: el pin es orientativo, guíate por la referencia del Hotel Tángara. La lista del 13 de agosto añadió el nombre del complejo y la bodega, y precisa que la vía está pavimentada; responsables: Laura Catalina Cardona, Nancy Pita o Nancy Maldonado.`,
    }),
  tigresa("tigresas-el-copey", "Punto de Solidaridad El Copey", "Cesar", "El Copey",
    "Calle 8 #20-22, Barrio San Carlos", "+57 316 454 5452",
    {
      geocodeQuery: "El Copey, Cesar, Colombia",
      ...TIGRESAS_SOURCE,
      verificationStatus: "reported",
      verificationNotes: `${TIGRESAS_NOTES} ${CESAR_DEGRADADO_NOTA}`,
      lastVerifiedAt: REVALIDATED_AT_DIA5,
    }),
  tigresa("tigresas-chia", "Punto de Solidaridad Chía", "Cundinamarca", "Chía",
    "Carrera 9 #12-41, diagonal al CAM", "+57 311 255 5912",
    {
      geocodeQuery: "Carrera 9 # 12-41, Chía, Cundinamarca, Colombia" ,
      scheduleText: "8:00 a. m. – 7:00 p. m.",
    }),
  tigresa("tigresas-quibdo", "Punto de Solidaridad Quibdó", "Chocó", "Quibdó",
    "Calle 27A #23-44, Barrio Los Ángeles, sector San Gabriel", "+57 310 805 0535",
    {
      geocodeQuery: "Calle 27A # 23-44, Quibdó, Chocó, Colombia",
      verificationNotes: `${TIGRESAS_NOTES} Quibdó está dentro de la zona más afectada: verifica que siga operando y que reciba donaciones en lugar de distribuirlas. La pieza indica responsable «Minerva Palacio».`,
    }),
  tigresa("tigresas-caqueza", "Deportivos Willys", "Cundinamarca", "Cáqueza",
    "Calle 4 N #4-09", "+57 314 308 7520",
    { geocodeQuery: "Cáqueza, Cundinamarca, Colombia" }),
  tigresa("tigresas-sincelejo", "Punto de Solidaridad Sincelejo", "Sucre", "Sincelejo",
    "Calle 19 #21-41, barrio 7 de Agosto, frente a la Droguería Maxi Económica", "+57 311 478 8851",
    { geocodeQuery: "Calle 19 # 21-41, Sincelejo, Sucre, Colombia" }),
  tigresa("tigresas-acacias", "Punto de Solidaridad Acacías", "Meta", "Acacías",
    "Calle 15 #16-43, frente al Banco de Occidente, Barrio Centro", "+57 314 242 6083",
    {
      geocodeQuery: "Calle 15 # 16-43, Acacías, Meta, Colombia" ,
      scheduleText: "8:00 a. m. – 12:00 m. y 2:00 – 6:00 p. m.",
    }),
  tigresa("tigresas-florencia", "Punto de Solidaridad Florencia", "Caquetá", "Florencia",
    "Carrera 10A #7-04, Barrio Avenidas", "+57 317 887 1620",
    { geocodeQuery: "Carrera 10A # 7-04, Florencia, Caquetá, Colombia" }),
  tigresa("tigresas-granada-meta", "Punto de Solidaridad Granada", "Meta", "Granada",
    "Calle 12 #14-115, Barrio Belén", "+57 311 843 6106",
    {
      geocodeQuery: "Granada, Meta, Colombia" ,
      scheduleText: "8:00 a. m. – 12:00 m. y 2:00 – 6:00 p. m.",
    }),
  tigresa("tigresas-pacho", "Oficina Orange — Zona Rosa", "Cundinamarca", "Pacho",
    "Calle 6 #16-10, Oficina Orange, Zona Rosa", "+57 302 515 2769",
    { geocodeQuery: "Pacho, Cundinamarca, Colombia" }),
  tigresa("tigresas-mocoa", "Froylán Café", "Putumayo", "Mocoa",
    "Calle 9 #6-14, Local 109", "+57 314 484 4307",
    { geocodeQuery: "Calle 9 # 6-14, Mocoa, Putumayo, Colombia" }),
  tigresa("tigresas-bosconia", "Punto de Solidaridad Bosconia", "Cesar", "Bosconia",
    "Carrera 18 #13-78, Barrio San Martín", "+57 313 591 9358",
    {
      geocodeQuery: "Bosconia, Cesar, Colombia",
      ...TIGRESAS_SOURCE,
      verificationStatus: "reported",
      verificationNotes: `${TIGRESAS_NOTES} ${CESAR_DEGRADADO_NOTA}`,
      lastVerifiedAt: REVALIDATED_AT_DIA5,
    }),
  tigresa("tigresas-pasto", "Antiguo Pre-ICFES Montilla", "Nariño", "Pasto",
    "Calle 17 #27-59, Barrio Centro", "+57 320 688 6196",
    {
      geocodeQuery: "Calle 17 # 27-59, Pasto, Nariño, Colombia" ,
      scheduleText: "Lunes a viernes, 9:30 a. m. – 12:30 p. m. y 2:30 – 6:00 p. m.; sábados, 10:00 a. m. – 1:00 p. m.",
    }),
  tigresa("tigresas-cali-yumbo", "Punto de Solidaridad Yumbo", "Valle del Cauca", "Yumbo",
    "Carrera 30 #10-90, Arroyo Hondo", "+57 316 791 2163",
    { geocodeQuery: "Arroyo Hondo, Yumbo, Valle del Cauca, Colombia" }),
  tigresa("tigresas-bogota-122-plaza", "122 Plaza Apartahotel", "Bogotá D.C.", "Bogotá D.C.",
    "Carrera 15A #122-27", null,
    {
      geocodeQuery: "Carrera 15A # 122-27, Bogotá, Colombia",
      // Es un apartahotel: la recepción está siempre atendida. Sin teléfono
      // publicado, este horario es lo ÚNICO que permite confirmar antes de ir,
      // y por eso salda el aviso `sin-horario-ni-contacto` del validador.
      scheduleText: "Recepción 24 horas",
    }),

  // ===========================================================================
  // ALTAS DEL 14 DE AGOSTO DE 2026 — 17 puntos de la lista viva de la red.
  //
  // La historia destacada «📍Puntos» recorre 22 departamentos. Cotejada contra
  // el seed, 28 registros se reconfirmaron y estos 17 no existían. Dos
  // departamentos entran por primera vez al proyecto (Córdoba y Boyacá) y
  // Antioquia estrena cobertura de la red en la ciudad.
  //
  // Ninguno declara fecha de cierre. Ver docs/revalidacion-2026-08-14.md §1.3.
  // ===========================================================================

  // --- Antioquia -------------------------------------------------------------
  tigresa("tigresas-medellin-la-80", "Punto de Acopio La 80", "Antioquia", "Medellín",
    "Carrera 80 #49A-39, frente a Los Verdes de la 80", "+57 322 653 1804",
    {
      geocodeQuery: "Carrera 80 # 49A-39, Medellín, Antioquia, Colombia",
      scheduleText: "8:00 a. m. – 8:00 p. m.",
      acceptedItems: TIGRESAS_LA80_ITEMS,
      urgentNeeds: ["Alimentos no perecederos", "Alimentos para mascotas", "Artículos de aseo"],
      sourceName: "Tigresas de la Patria — publicación propia «COLOMBIA MOVIÉNDOSE CON CORAZÓN»",
      sourceUrl: "https://www.instagram.com/tigresasdelapatriaoficial/p/Db8Y8VihK9w/",
      sourcePublishedAt: "2026-08-12",
      verificationNotes: `${TIGRESAS_NOTES} Es el punto MEJOR EVIDENCIADO de la red: la cuenta oficial lo anunció el 12 de agosto con pieza gráfica, canasta detallada, teléfono y responsables (Esperanza Martínez y Liliana Zapata), y lo repitió en dos publicaciones posteriores. SALVEDAD DE ATADURA: la pieza gráfica NO nombra la ciudad —un comentario público lo señala— y que sea Medellín se establece por el texto de la publicación hermana, «Desde Medellín seguimos trabajando para recibir, organizar y hacer llegar ayudas humanitarias». Es atadura contextual, no literal, igual que la de Rionegro.`,
    }),
  tigresa("tigresas-medellin-sur-mayorista", "Centro de acopio Central Mayorista de Antioquia", "Antioquia", "Medellín",
    "Central Mayorista de Antioquia", "+57 320 691 5374",
    {
      geocodeQuery: "Central Mayorista de Antioquia, Itagüí, Antioquia, Colombia",
      scheduleText: "8:00 a. m. – 5:00 p. m.",
      verificationNotes: `${TIGRESAS_NOTES} La lista lo rotula «Medellín Sur». La Central Mayorista de Antioquia está administrativamente en ITAGÜÍ, no en Medellín: el municipio se conserva como Medellín porque es el que declara la fuente, pero el pin apunta al recinto real. Si alguien filtra por municipio, este es el registro que conviene revisar.`,
    }),
  tigresa("tigresas-medellin-terminal-sur", "Terminal del Sur — Local 015", "Antioquia", "Medellín",
    "Local 015, Centro Comercial Terminal del Sur", null,
    {
      geocodeQuery: "Terminal del Sur, Medellín, Antioquia, Colombia",
      sourceName: "Tigresas de la Patria — publicación propia (apertura del punto)",
      sourceUrl: "https://www.instagram.com/tigresasdelapatriaoficial/reel/Db_eOEbhZxy/",
      sourcePublishedAt: "2026-08-13",
      verificationNotes: `${TIGRESAS_NOTES} Anunciado por la cuenta oficial: «Hoy abrimos un nuevo punto de acopio en la Terminal del Sur, facilitando soluciones de transporte para nuestros hermanos colombianos». La fuente no publica teléfono ni horario, así que no hay forma de confirmar antes de ir salvo acercarse a la terminal.`,
    }),

  // --- Bogotá D.C. -----------------------------------------------------------
  tigresa("tigresas-bogota-park-way", "Punto de Solidaridad Park Way", "Bogotá D.C.", "Bogotá D.C.",
    "Avenida Carrera 24 #39-29", "+57 310 267 7601",
    {
      geocodeQuery: "Avenida Carrera 24 # 39-29, Park Way, Bogotá, Colombia",
      verificationNotes: `${TIGRESAS_NOTES} La lista indica encargada «Olga Mayorga».`,
    }),

  // --- Boyacá (departamento nuevo) -------------------------------------------
  tigresa("tigresas-tunja-defensores", "Defensores de la Patria Boyacá", "Boyacá", "Tunja",
    "Carrera 12 #21-45, Local 3", "+57 314 442 0954",
    {
      geocodeQuery: "Carrera 12 # 21-45, Tunja, Boyacá, Colombia",
      scheduleText: "9:00 a. m. – 12:00 m. y 2:00 – 6:00 p. m.",
    }),
  tigresa("tigresas-tunja-bodega-2", "Tunja — Bodega 2", "Boyacá", "Tunja",
    "Carrera 2 #58-79", "+57 322 859 4727",
    {
      geocodeQuery: "Carrera 2 # 58-79, Tunja, Boyacá, Colombia",
      scheduleText: "8:00 a. m. – 5:00 p. m.",
      verificationNotes: `${TIGRESAS_NOTES} La lista indica responsable «Faustino García».`,
    }),

  // --- Caquetá ---------------------------------------------------------------
  tigresa("tigresas-florencia-super-mio", "Super Mío Ciudadela", "Caquetá", "Florencia",
    "Carrera 30B #22-42, La Ciudadela", "+57 317 887 1620",
    {
      geocodeQuery: "Carrera 30B # 22-42, Florencia, Caquetá, Colombia",
      verificationNotes: `${TIGRESAS_NOTES} Segundo punto de Florencia. Comparte responsable (Marisol Arciniegas) y teléfono con el de Carrera 10A: si llamas, confirma a cuál de los dos te refieres.`,
    }),

  // --- Casanare --------------------------------------------------------------
  tigresa("tigresas-villanueva-casanare", "Hotel Versalles Tigresa", "Casanare", "Villanueva",
    "Calle 11 #16-35", "+57 318 544 4431",
    {
      geocodeQuery: "Villanueva, Casanare, Colombia",
      scheduleText: "24 horas",
      verificationNotes: `${TIGRESAS_NOTES} Responsable «Lucenith Gross». Es el ÚNICO punto de Casanare con municipio identificable: el otro registro del departamento sigue en «disputed» justamente porque la fuente nunca dijo a qué municipio pertenece.`,
    }),

  // --- Córdoba (departamento nuevo) ------------------------------------------
  tigresa("tigresas-monteria-centro-solidaridad", "Centro de Solidaridad Montería", "Córdoba", "Montería",
    "Calle 69 #3-86, barrio El Recreo", null,
    { geocodeQuery: "Calle 69 # 3-86, Montería, Córdoba, Colombia" }),
  tigresa("tigresas-monteria-norte-edificio-rio", "Punto de Solidaridad Norte — Edificio Río", "Córdoba", "Montería",
    "Carrera 1A #62-41, Edificio Río, apartamento 1502", null,
    { geocodeQuery: "Carrera 1A # 62-41, Montería, Córdoba, Colombia" }),
  tigresa("tigresas-monteria-norte-calle-69", "Punto de Solidaridad Norte — Calle 69", "Córdoba", "Montería",
    "Calle 69 #1C-92", null,
    {
      geocodeQuery: "Calle 69 # 1C-92, Montería, Córdoba, Colombia",
      verificationNotes: `${TIGRESAS_NOTES} La lista rotula DOS puntos distintos como «Punto de Solidaridad Norte», con direcciones diferentes; se crean por separado y se distinguen por dirección. Ninguno de los tres de Montería publica teléfono.`,
    }),

  // --- Meta ------------------------------------------------------------------
  tigresa("tigresas-villavicencio", "Punto de Solidaridad Villavicencio", "Meta", "Villavicencio",
    "Carrera 31 #41A-50, contiguo a la Universidad Gran Colombia", "+57 310 734 2742",
    {
      geocodeQuery: "Carrera 31 # 41A-50, Villavicencio, Meta, Colombia",
      verificationNotes: `${TIGRESAS_NOTES} La lista indica tigresa encargada «Aurora Montenegro».`,
    }),

  // --- Norte de Santander ----------------------------------------------------
  tigresa("tigresas-cucuta-portal-bocono", "Conjunto Portal Boconó — Local 2", "Norte de Santander", "Cúcuta",
    "Conjunto Portal Boconó, Local 2, anillo vial antes de Postobón", "+57 312 339 2032",
    { geocodeQuery: "Anillo Vial Occidental, Cúcuta, Norte de Santander, Colombia" }),
  tigresa("tigresas-cucuta-zona-industrial", "Punto de Solidaridad Zona Industrial", "Norte de Santander", "Cúcuta",
    "Calle 17N #4-50, zona industrial", "+57 312 339 3032",
    {
      geocodeQuery: "Calle 17N # 4-50, Cúcuta, Norte de Santander, Colombia",
      scheduleText: "Horario continuo hasta las 7:00 p. m.",
      verificationNotes: `${TIGRESAS_NOTES} Responsables: Lorena Larrotta, Ángela Andrea Piedrahita y Andrés Hernández. La fuente publica los dos números como WhatsApp; el segundo es +57 320 656 8404.`,
    }),

  // --- Risaralda -------------------------------------------------------------
  tigresa("tigresas-pereira-mercasa", "Mercasa Pereira — Bodega ZP-01-02 L6", "Risaralda", "Pereira",
    "Avenida del Sur (Calle 100 #100-89), Bodega ZP-01-02 L6", "+57 313 550 9707",
    {
      geocodeQuery: "Avenida del Sur, Pereira, Risaralda, Colombia",
      scheduleText: "8:00 a. m. – 6:00 p. m.",
      verificationNotes: `${TIGRESAS_NOTES} La propia pieza lo rotula «NUEVO PUNTO», así que nace después del 11 de agosto. Responsable «Maria Malcum». Pereira es una de las ciudades más golpeadas y este es el segundo punto de la red allí.`,
    }),

  // --- Tolima ----------------------------------------------------------------
  tigresa("tigresas-ibague-plazas-del-bosque", "Centro Comercial Plazas del Bosque", "Tolima", "Ibagué",
    "Avenida Ambalá 69-80", "+57 321 840 2089",
    { geocodeQuery: "Avenida Ambalá, Ibagué, Tolima, Colombia" }),
  tigresa("tigresas-ibague-casa-loma", "Casa Loma", "Tolima", "Ibagué",
    "Calle 116 #48-49, barrio San Francisco de Aparco", "+57 320 884 1094",
    { geocodeQuery: "Calle 116 # 48-49, Ibagué, Tolima, Colombia" }),
  {
    slug: "tigresas-casanare",
    name: "Punto de Solidaridad Casanare",
    organization: "Tigresas de la Patria — «Colombia un solo corazón»",
    type: "general",
    department: "Casanare",
    municipality: "Yopal",
    address: "Calle 12 #21-44",
    geocodeQuery: null,
    latitude: null,
    longitude: null,
    acceptedItems: TIGRESAS_ITEMS,
    urgentNeeds: [],
    rejectedItems: [],
    scheduleText: null,
    startsAt: null,
    endsAt: null,
    phone: "+57 310 310 4757",
    whatsapp: "+57 310 310 4757",
    email: null,
    ...TIGRESAS_SOURCE,
    sourceName: "Sin municipio identificable en la fuente",
    sourceUrl: null,
    sourcePublishedAt: null,
    verificationStatus: "disputed",
    verificationNotes:
      "NO PUBLICADO. La pieza gráfica solo dice «Casanare» y una dirección («Calle 12 #21-44») sin municipio. Casanare es un departamento con 19 municipios: publicar esto mandaría gente a una calle que existe en varios de ellos. Se asume Yopal por ser la capital, pero NO está confirmado. Llamar al +57 310 310 4757 para establecer el municipio antes de publicarlo.",
    lastVerifiedAt: null,
  },

  {
    slug: "banco-alimentos-buenaventura",
    name: "Banco de Alimentos de Buenaventura",
    organization: "Red ABACO",
    type: "food",
    department: "Valle del Cauca",
    municipality: "Buenaventura",
    address: "Sede afectada por el sismo — ubicación alterna en evaluación",
    geocodeQuery: null,
    latitude: null,
    longitude: null,
    acceptedItems: [],
    urgentNeeds: [],
    rejectedItems: [],
    scheduleText: null,
    startsAt: null,
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "ABACO, vía Semana",
    sourceUrl:
      "https://www.semana.com/nacion/articulo/bancos-de-alimentos-activan-ayuda-para-damnificados-por-el-terremoto-en-colombia-asi-puede-donar/202641/",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "inactive",
    verificationNotes:
      "NO PUBLICADO COMO ACTIVO. ABACO informó que la sede de Buenaventura resultó afectada y que se evalúa una ubicación alterna.",
    lastVerifiedAt: VERIFIED_AT,
  },

  // ===========================================================================
  // TANDA DEL 11 DE AGOSTO DE 2026 — día 2 de la emergencia
  // ===========================================================================

  // --- Bogotá: nueva lista oficial de la Alcaldía -----------------------------
  //
  // El 11 de agosto la Alcaldía publicó la pieza «Bogotá se solidariza ante el
  // sismo» con CUATRO puntos, y bogota.gov.co —la misma URL que respaldaba los
  // seis del día 1— fue actualizada en sitio para listar esos mismos cuatro.
  // Es la entidad responsable publicando en su canal propio: `verified`.
  //
  // OJO con los seis del día 1: solo `sede-administrativa-cruz-roja-bogota`
  // sobrevive en la lista nueva. Los otros cinco ya no aparecen en la fuente.
  // Se conservan como estaban por decisión explícita (ver docs/sources.md §4.8);
  // ausencia de la lista no es prueba de cierre.
  {
    slug: "universidad-jorge-tadeo-lozano-bogota",
    name: "Universidad Jorge Tadeo Lozano",
    organization: "Alcaldía Mayor de Bogotá / Cruz Roja Colombiana Seccional Cundinamarca y Bogotá",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Carrera 4 #22-61",
    // La nomenclatura «Carrera 4 #22-61» cae en el centro histórico y compite
    // con varias vías. El campus es un POI con nombre propio: resuelve mejor.
    geocodeQuery: "Universidad Jorge Tadeo Lozano, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CRUZ_ROJA_ITEMS,
    urgentNeeds: ["Agua potable embotellada", "Colchonetas", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 9:00 p. m., de lunes a domingo",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "verified",
    verificationNotes:
      "Uno de los cuatro puntos de la lista publicada por la Alcaldía Mayor de Bogotá el 11 de agosto de 2026, en la pieza «Bogotá se solidariza ante el sismo» y en bogota.gov.co. Operado con la Cruz Roja Colombiana Seccional Cundinamarca y Bogotá.",
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },
  {
    // SLUG HEREDADO A PROPÓSITO. Este punto entró primero por el formulario
    // público (un vecino lo envió citando la cuenta del alcalde) y se aprobó
    // desde el panel el 11 de agosto a las 16:13 UTC, así que
    // /centros/usaquen-usaquen-vl0m YA está vivo. Darle un slug limpio habría
    // creado un segundo registro del mismo punto —dos pines apilados, ambos
    // verificados— y roto la URL que ya circula. Se conserva el slug feo y el
    // seed mejora el registro existente: nombre, municipio, horario, artículos,
    // coordenadas y fuente oficial. Si algún día se quiere el slug limpio, hay
    // que hacerlo con una redirección, no con un registro nuevo.
    slug: "usaquen-usaquen-vl0m",
    name: "Punto de acopio Usaquén",
    organization: "Alcaldía Mayor de Bogotá / Cruz Roja Colombiana Seccional Cundinamarca y Bogotá",
    type: "general",
    department: "Bogotá D.C.",
    municipality: "Bogotá D.C.",
    address: "Calle 161A #7F-55",
    geocodeQuery: "Calle 161A # 7F-55, Usaquén, Bogotá, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: CRUZ_ROJA_ITEMS,
    urgentNeeds: ["Agua potable embotellada", "Colchonetas", "Alimentos no perecederos"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "8:00 a. m. – 9:00 p. m., de lunes a domingo",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía Mayor de Bogotá",
    sourceUrl:
      "https://bogota.gov.co/mi-ciudad/seguridad/puntos-de-donacion-en-bogota-para-damnificados-terremoto-en-colombia",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "verified",
    verificationNotes:
      "La pieza oficial y bogota.gov.co solo publican «Usaquén» y la dirección, sin nombre del establecimiento. Este punto había llegado ANTES por el formulario público (un vecino lo envió citando la cuenta del alcalde) y estaba en la cola como `pending`; la fuente oficial lo confirma. VALIDAR PIN: la Calle 161A es una vía corta del norte y la nomenclatura bogotana no resuelve de forma fiable en OSM.",
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },

  // --- Medellín: tanda del 11 de agosto --------------------------------------
  //
  // Dos orígenes distintos, y por eso dos `sourceName` distintos:
  //
  //  a) Puntos que El Tiempo publica citando a la Alcaldía de Medellín.
  //     Es «medio confiable citando a la entidad» → `reported`.
  //  b) Puntos que solo aparecen en una pieza gráfica ciudadana difundida en
  //     redes, sin entidad identificable que la firme. También `reported`,
  //     pero con la salvedad anotada en cada registro.
  //
  // Ninguna de las dos fuentes publica direcciones para los puntos
  // institucionales (Alcaldía, EAFIT, UdeA, parques biblioteca): esos se
  // geocodifican por nombre de POI y quedarán `approximate` en el mejor caso.
  {
    slug: "hall-alcaldia-medellin",
    name: "Hall principal de la Alcaldía de Medellín",
    organization: "Alcaldía de Medellín",
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Centro Administrativo Municipal La Alpujarra, Calle 44 #52-165",
    geocodeQuery: "Alcaldía de Medellín, La Alpujarra, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Agua", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...MEDELLIN_BOLETIN_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${MEDELLIN_BOLETIN_NOTA} RESUELVE UNA DISPUTA ANTERIOR: el 10 de agosto este punto (La Alpujarra) se marcó \`disputed\` y no se publicó, porque los resúmenes de búsqueda lo atribuían a la Alcaldía pero El Colombiano y Telemedellín solo confirmaban FUBAM y Saciar. La dirección de La Alpujarra no la publica ninguna fuente: se tomó la del Centro Administrativo Municipal. VALIDAR PIN.`,
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },
  {
    slug: "terminal-del-norte-medellin",
    name: "Terminal del Norte — local 9840",
    organization: "Terminales Medellín, en alianza con la Alcaldía de Medellín",
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Terminal de Transporte del Norte, Carrera 64C #78-580, local 9840",
    geocodeQuery: "Terminal de Transporte del Norte, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Agua", "Alimentos no perecederos", "Colchonetas"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...MEDELLIN_BOLETIN_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${MEDELLIN_BOLETIN_NOTA} El boletín lo nombra «Terminal del Norte (local 9840)», que confirma el local publicado por El Tiempo el 11 de agosto y descarta la Terminal del Sur. El número de la vía no lo publica ninguna fuente: se tomó la dirección conocida de la terminal. VALIDAR PIN.`,
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },
  {
    slug: "universidad-eafit-medellin",
    name: "Universidad EAFIT — placa cubierta",
    organization: "Universidad EAFIT, en alianza con la Alcaldía de Medellín",
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Carrera 49 #7 Sur-50, bloque de la placa cubierta",
    geocodeQuery: "Universidad EAFIT, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Agua", "Alimentos no perecederos"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: "Lunes a viernes, 7:00 a. m. – 6:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...MEDELLIN_BOLETIN_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${MEDELLIN_BOLETIN_NOTA} El boletín lo nombra «Universidad Eafit (placa cubierta)», que confirma el punto exacto dentro del campus. El HORARIO proviene de la pieza gráfica ciudadana y ninguna fuente oficial lo respalda. La dirección es la sede principal de EAFIT. El acceso al campus puede requerir identificación.`,
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },
  {
    slug: "biblioteca-publica-el-poblado-medellin",
    name: "Biblioteca Pública El Poblado",
    organization: "Red de Bibliotecas Públicas de Medellín / Alcaldía de Medellín",
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Biblioteca Pública El Poblado, Medellín",
    geocodeQuery: "Biblioteca Pública El Poblado, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Alimentos no perecederos", "Artículos de aseo"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    // Semana la nombra EXPRESAMENTE junto a los cuatro parques biblioteca en la
    // misma frase de la jornada, así que el horario sí la cubre. Ver §10 de
    // docs/sources.md, donde está la cita literal.
    scheduleText: "9:00 a. m. – 6:00 p. m., de lunes a sábado",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    ...MEDELLIN_BOLETIN_SOURCE,
    verificationStatus: "verified",
    verificationNotes: `${MEDELLIN_BOLETIN_NOTA} ALTA DEL 12 DE AGOSTO DE 2026: es el décimo punto del boletín oficial y faltaba en el seed. El dato estaba a la vista desde el día 2 y se pasó por alto: la cita de Semana recogida en §10 de docs/sources.md la nombra expresamente —«los parques bibliotecas Belén, San Javier, Gabriel García Márquez, León de Greiff (La Ladera) y la biblioteca pública El Poblado»— pero solo se crearon los cuatro parques biblioteca. De ahí sale también su horario.`,
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },
  {
    slug: "udea-afroudea-medellin",
    name: "Universidad de Antioquia — Oficina AfroUdeA, bloque 9",
    organization: "Oficina AfroUdeA, Universidad de Antioquia",
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Ciudad Universitaria, Calle 67 #53-108, bloque 9",
    geocodeQuery: "Universidad de Antioquia, Ciudad Universitaria, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    // CANASTA PROPIA, y es importante que no herede la del municipio.
    //
    // La campaña de la Alcaldía de Medellín RECHAZA medicamentos, y esta ficha
    // usaba esa canasta. Pero AfroUdeA los pide «de manera urgente». Estábamos
    // publicando lo contrario de lo que el centro hace — el mismo error que
    // `docs/sources.md` §3.d.3 ya corrigió en Belisario. Segunda vez que una
    // constante compartida contradice al punto que describe.
    acceptedItems: [
      "Utensilios de cocina",
      "Medicamentos",
      "Colchonetas",
      "Materiales para construcción",
      "Alimentos no perecederos",
      "Artículos de aseo",
    ],
    urgentNeeds: [
      "Utensilios de cocina",
      "Medicamentos",
      "Colchonetas",
      "Materiales para construcción",
    ],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: "Lunes a viernes, 9:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-11",
    // ÚLTIMO DÍA ANUNCIADO POR LA PROPIA ENTIDAD.
    endsAt: "2026-08-14",
    phone: "+57 311 450 5940",
    whatsapp: null,
    email: null,
    sourceName: "AfroUdeA — publicación propia del colectivo",
    sourceUrl: "https://www.instagram.com/p/DcBuTjXRUTq/",
    sourcePublishedAt: "2026-08-14",
    verificationStatus: "reported",
    verificationNotes:
      "ÚLTIMO DÍA DE RECOLECCIÓN: 14 DE AGOSTO DE 2026. Lo anunció el propio colectivo esa mañana: «Último día de recolección de ayudas en la @udea. Necesitamos el mayor apoyo. Se requieren de manera urgente utensilios de cocina, medicamentos, colchonetas, materiales para la construcción. Estaremos todo el día en el Bloque 9». PUEDE REABRIR: en los comentarios de esa misma publicación dos personas preguntan si el cierre es definitivo —«último día POR AHORA, ¿sí?»— y la cuenta no respondió en el hilo. El anuncio de la entidad es explícito; su permanencia, no. Si vuelve a abrir, quítale la fecha de cierre. LA CANASTA CAMBIÓ: pide medicamentos, que la campaña general de Medellín rechaza; esta ficha ya no hereda esa lista. La fuente no da dirección del bloque 9: se usó Ciudad Universitaria. El acceso al campus puede requerir identificación.",
    lastVerifiedAt: REVALIDATED_AT_DIA5,
  },
  {
    slug: "simon-coffee-medellin",
    name: "Simón Coffee",
    organization: null,
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Carrera 37 #10-54",
    geocodeQuery: "Carrera 37 # 10-54, El Poblado, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: PIEZA_CIUDADANA_MEDELLIN,
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} Negocio privado sumado a la iniciativa: sin horario publicado y puede dejar de recibir sin aviso. Llamar o pasar a confirmar antes de llevar carga. SEÑAL EN CONTRA, anotada el 14 de agosto de 2026: se localizó su cuenta oficial (@simoncoffeemedellin), está activa y publica con regularidad, pero en sus doce publicaciones más recientes NO menciona el acopio, ni donaciones, ni el terremoto. Eso no prueba que no reciba —un negocio pequeño puede hacerlo sin publicarlo—, pero los otros cuatro puntos localizables de esta misma pieza sí lo publican, y con insistencia. Es el único cuyo canal propio guarda silencio. Ya no es «no hay dónde consultar»: hay cuenta, y no dice nada. ES LA PRIMERA LLAMADA DEL BLOQUE.`,
    lastVerifiedAt: REVALIDATED_AT_DIA5,
  },
  {
    slug: "restaurante-belisario-medellin",
    name: "Somos Belisario — oficina",
    organization: "Somos Belisario Grupo Empresarial",
    type: "mixed",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Calle 7 #35-44 (oficina)",
    geocodeQuery: "Calle 7 # 35-44, El Poblado, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    // OJO: esta canasta NO es la de la campaña de Medellín. La empresa publicó
    // la suya y recibe justo lo que aquella rechaza: medicinas y ropa.
    acceptedItems: [
      "Medicinas",
      "Agua",
      "Alimentos no perecederos",
      "Ropa nueva o en muy buen estado",
    ],
    urgentNeeds: ["Medicinas", "Agua", "Alimentos no perecederos"],
    rejectedItems: ["Ropa usada en mal estado"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Somos Belisario Grupo Empresarial (cuenta oficial de la empresa)",
    sourceUrl: "https://www.instagram.com/somosbelisario/p/Db6ksTmO0Us/",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "verified",
    verificationNotes:
      "VERIFICADO EN CANAL PROPIO el 12 de agosto de 2026: la propia empresa publicó el 11 de agosto que habilitó centros de acopio por ESTE terremoto, con la misma dirección que ya traía la ficha. CORRIGE UN DATO QUE ESTÁBAMOS PUBLICANDO MAL: hasta ahora esta ficha usaba la canasta genérica de la campaña de Medellín, que rechaza medicamentos y ropa; la empresa dice expresamente que SÍ recibe medicinas y ropa nueva o en muy buen estado. La publicación menciona TRES sedes —esta oficina, Provenza y CC El Tesoro— pero solo da dirección de la primera: las otras dos no se crean como registros hasta tener dirección publicada.",
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },
  {
    slug: "remanence-medellin",
    name: "Remanence",
    organization: null,
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Calle 10B #35-27",
    geocodeQuery: "Calle 10B # 35-27, El Poblado, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: "Lunes a domingo, 11:00 a. m. – 5:30 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: PIEZA_CIUDADANA_MEDELLIN,
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} Negocio privado sumado a la iniciativa. Es de los pocos de la pieza con horario publicado.`,
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },
  {
    slug: "bodega-guayaquiliando-medellin",
    name: "Bodega Guayaquiliando",
    organization: null,
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    // SE MUDÓ EL 12 DE AGOSTO. La dirección anterior era «Avenida 80 #52-88» y
    // se publicó durante dos días después de que el punto dejara de operar allí.
    address: "Carrera 81 #33AA-08, al lado del restaurante 7 Mesas, cerca de la iglesia de Santa Gema",
    geocodeQuery: "Carrera 81 # 33AA-08, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: [
      "Cajas de cartón",
      "Alimentos no perecederos",
      "Artículos de aseo personal",
      "Comida para bebés",
      "Insumos médicos",
    ],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: "10:00 a. m. – 8:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Guayaquiliando — publicación propia de la cuenta que opera el punto",
    sourceUrl: "https://www.instagram.com/p/Db8k6QDxYux/",
    sourcePublishedAt: "2026-08-12",
    verificationStatus: "reported",
    verificationNotes:
      "TRASLADO CONFIRMADO POR LA PROPIA CUENTA. El 12 de agosto @guayaquiliando publicó: «NUEVA UBICACIÓN DE RECOLECCIÓN. Ya no podemos recibir NADA en la que estábamos, así que POR FAVOR DIFUNDIR», con la dirección actual y el horario. Si llegaste aquí buscando la Avenida 80 #52-88, esa bodega ya no recibe. El punto está operando: la cuenta documenta despachos a Manizales, Cali, Pereira, Buenaventura y Quimbaya, y más de 120 toneladas en tres días. Sigue como «reported» y no como «verified» porque quien lo opera es una cuenta de divulgación, no la entidad responsable de la respuesta oficial. DISCREPANCIA MENOR: una publicación anterior del mismo día da «Carrera 81 #33AA-39»; ambas citan la misma referencia (7 Mesas / iglesia de Santa Gema), así que es la misma cuadra. Se usa la del anuncio de traslado.",
    lastVerifiedAt: REVALIDATED_AT_DIA5,
  },
  {
    slug: "libreria-rodante-delfos-medellin",
    name: "Librería Rodante Delfos",
    organization: null,
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    // NUEVA SEDE. La anterior se anotó como «Laureles, Calle 79 #52A-23», con la
    // ambigüedad Calle/Carrera sin resolver. La cuenta la resolvió: es CARRERA.
    address: "Carrera 79 #52A-34, barrio Los Colores",
    geocodeQuery: "Carrera 79 # 52A-34, Los Colores, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: "Jueves, viernes y sábados",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Librería Rodante Delfos — publicación propia",
    sourceUrl: "https://www.instagram.com/libreriadelfos1/",
    sourcePublishedAt: "2026-08-13",
    verificationStatus: "reported",
    verificationNotes:
      "SEDE NUEVA Y AMBIGÜEDAD RESUELTA. La ficha anterior dudaba entre Calle 79 y Carrera 79 porque la pieza ciudadana escribía «Laureles 79 #52A-23»; la propia librería publicó «¡Ahora tenemos nueva sede en el barrio Los Colores de Medellín! (Carrera 79 #52A-34)», así que era CARRERA, y además cambió de sede y de barrio. El pin anterior estaba anclado a Laureles. ATIENDE SOLO JUEVES, VIERNES Y SÁBADOS: «¡Abrimos nuestras puertas para recibirles jueves, viernes y sábados en la sede de Los Colores!». Sigue operando: canaliza donaciones hacia el Chocó junto a la Red de Derechos Humanos del Pacífico, con registro de entregas en Quibdó. Sale de la lista de excepciones sin enlace: ahora tiene canal propio comprobable.",
    lastVerifiedAt: REVALIDATED_AT_DIA5,
  },
  {
    slug: "fundacion-el-arte-de-los-suenos-medellin",
    name: "Fundación El Arte de los Sueños",
    organization: "Fundación El Arte de los Sueños",
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Barrio Perpetuo Socorro, Carrera 48 #35-47",
    geocodeQuery: "Carrera 48 # 35-47, Perpetuo Socorro, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Alimentos no perecederos", "Artículos de aseo"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText:
      "Lunes, miércoles y viernes 8:30 a. m. – 12:00 m.; martes y jueves 8:30 a. m. – 4:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: PIEZA_CIUDADANA_MEDELLIN,
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} Horario detallado por días, de los más específicos de la pieza.`,
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },
  {
    slug: "la-razon-medellin",
    name: "La Razón",
    organization: null,
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Calle 44 #42-70",
    geocodeQuery: "Calle 44 # 42-70, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Alimentos no perecederos"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: PIEZA_CIUDADANA_MEDELLIN,
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} La pieza no aclara qué tipo de establecimiento es. Sin horario publicado.`,
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },
  {
    slug: "batallon-girardot-medellin",
    name: "Batallón Girardot",
    organization: "Ejército Nacional de Colombia",
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Calle 66E #39-84",
    geocodeQuery: "Batallón Girardot, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Alimentos no perecederos", "Colchonetas"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: PIEZA_CIUDADANA_MEDELLIN,
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} INSTALACIÓN MILITAR: el ingreso puede exigir documento de identidad y registro previo. Confirmar antes de desplazarse, sobre todo con carga grande. REVISAR — SEÑAL NEGATIVA (12 de agosto de 2026): el boletín propio de la Alcaldía de Medellín lista sus 10 puntos oficiales y este NO está entre ellos, pese a que sí confirma los otros ocho puntos de la ciudad que teníamos. No es contradicción directa —el Ejército puede tener su propia iniciativa, ajena a la campaña municipal— pero es el único punto de Medellín que sigue sin ninguna fuente comprobable. Decisión editorial pendiente: localizar comunicado de la Cuarta Brigada o bajar a \`disputed\`.`,
    lastVerifiedAt: VERIFIED_AT_DIA3,
  },
  ...PARQUES_BIBLIOTECA_MEDELLIN,

  // --- Envigado: pieza oficial de la Alcaldía ---------------------------------
  //
  // Municipio NUEVO en el seed. La pieza «Envigado apoya a las familias
  // afectadas por el terremoto» lleva el escudo de la Alcaldía de Envigado: es
  // la entidad responsable publicando en su canal, que es la definición de
  // `verified` en este proyecto. No se localizó URL estable (ver la excepción
  // declarada en scripts/validate-seed.ts).
  {
    slug: "gestion-del-riesgo-envigado",
    name: "Oficina de Gestión del Riesgo de Envigado",
    organization: "Alcaldía de Envigado",
    type: "mixed",
    department: "Antioquia",
    municipality: "Envigado",
    address: "Carrera 40 #39 sur-59",
    geocodeQuery: "Carrera 40 # 39 sur - 59, Envigado, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Alimentos no perecederos",
      "Enlatados",
      "Granos",
      "Azúcar",
      "Sal",
      "Chocolate",
      "Café",
      "Aceite",
      "Harina",
      "Pastas",
      "Pañales de niño y adulto",
      "Pañitos húmedos",
      "Crema dental",
      "Toallas higiénicas",
      "Jabón de baño",
      "Cepillos de dientes",
      "Desodorantes",
      "Champú en sobres",
      "Detergentes",
      "Jabón en barra",
      "Papel higiénico",
      "Escobas",
      "Trapeadoras",
      "Baldes",
      "Cepillos de piso",
      "Colchonetas nuevas",
      "Sábanas nuevas",
      "Mantas nuevas",
      "Cobijas nuevas",
      "Alimento para perros y gatos",
    ],
    urgentNeeds: ["Alimentos no perecederos", "Elementos de aseo", "Colchonetas nuevas"],
    rejectedItems: ["Medicamentos", "Ropa nueva", "Ropa usada", "Productos vencidos"],
    scheduleText: "Lunes a viernes, 7:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: "+57 604 339 4065",
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Envigado (pieza oficial «Envigado apoya a las familias afectadas por el terremoto»)",
    // OJO: este enlace es el SITIO INSTITUCIONAL de la entidad, no la pieza.
    // No se localizó una URL estable de la publicación; se enlaza el canal
    // propio de la Alcaldía para que quien lea pueda contrastar con la fuente
    // responsable. Sustituir por el enlace directo en cuanto aparezca.
    sourceUrl: "https://www.envigado.gov.co",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "verified",
    verificationNotes:
      "Pieza oficial firmada con el escudo de la Alcaldía de Envigado, comprobada por @victorolave el 11 de agosto de 2026 — mismo criterio con el que se aceptaron los puntos de Tigresas de la Patria. El enlace apunta al sitio institucional, NO a la pieza: no se localizó una URL estable de la publicación. DOS RESTRICCIONES PROPIAS: los elementos para dormir deben ser NUEVOS, y no se recibe ropa (ni nueva ni usada) ni medicamentos. Es el único punto del seed que pide explícitamente alimento para perros y gatos. La pieza también publica una cuenta para donación en dinero, registrada en docs/sources.md §8 y deliberadamente fuera del mapa.",
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },

  // --- Rionegro: la Alcaldía publicó en su propio dominio ---------------------
  //
  // Municipio NUEVO en el seed. El lead venía de la tanda de cobertura: el
  // portal enlaza la noticia desde la portada en `/publicaciones/1389/`, no
  // desde `/galeria/23/noticias/`, que sirve contenido de 2024. Buscar por la
  // sección de noticias daba «no existe»; navegar la portada la encontró.
  ...RIONEGRO_CENTROS,

  {
    slug: "casa-eterna-la-explanada",
    name: "Casa Eterna",
    organization: null,
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Calle 23 Sur #3-133, sector La Explanada, vía Las Palmas",
    geocodeQuery: "La Explanada, Vía Las Palmas, Medellín, Antioquia, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: [],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: "Lunes a domingo, 2:00 p. m. – 6:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: PIEZA_CIUDADANA_MEDELLIN,
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "disputed",
    verificationNotes:
      "NO PUBLICADO. La pieza lo agrupa bajo «Otros municipios» sin decir cuál. «Calle 23 Sur» con la vía Las Palmas de por medio cae en la frontera entre Medellín y Envigado, y la nomenclatura sur del Valle de Aburrá se repite entre municipios. Se aplica el mismo criterio que con el punto de Casanare: municipio ambiguo no se publica. Resolver antes de activarlo.",
    lastVerifiedAt: null,
  },

  // ===========================================================================
  // TANDA CIUDADES GOLPEADAS — 11 de agosto de 2026
  // Pereira (7 puntos CAFE) · Cali (2.º punto oficial) · Manizales (Coliseo
  // Mayor). Fuentes y hallazgos en docs/sources.md, sección 10.
  // ===========================================================================
  cafePereira(
    "cafe-consota-pereira",
    "CAFE Consota",
    "Manzanas 7 y 8 de Villa Consota, sector Cuba",
    "Barrio Cuba, Pereira, Risaralda, Colombia",
    "El pin marca el sector de Cuba: la fuente ubica el punto en las manzanas 7 y 8 de Villa Consota.",
  ),
  cafePereira(
    "cafe-perla-del-otun-pereira",
    "CAFE Perla del Otún",
    "Diagonal a la iglesia de los 2.500 Lotes, sector Cuba",
    "Perla del Otún, Pereira, Risaralda, Colombia",
    "El pin marca el barrio Perla del Otún; el punto queda diagonal a la iglesia de los 2.500 Lotes.",
  ),
  cafePereira(
    "cafe-el-remanso-pereira",
    "CAFE El Remanso",
    "Avenida principal del barrio El Remanso, junto al Centro de Salud",
    "Pereira, Risaralda, Colombia",
    "El barrio no resolvió en el geocodificador: el pin cae en el centroide del municipio. Guíate por la dirección, no por el mapa.",
  ),
  cafePereira(
    "cafe-kennedy-pereira",
    "CAFE Kennedy",
    "Parque principal del barrio Kennedy",
    "Barrio Kennedy, Pereira, Risaralda, Colombia",
    "El pin marca el barrio Kennedy; el punto es el parque principal, junto a la cancha.",
  ),
  cafePereira(
    "cafe-ormaza-pereira",
    "CAFE Ormaza",
    "Calle 3 bis # 5-38, avenida del Río",
    "Calle 3 bis # 5-38, Pereira, Risaralda, Colombia",
    "El pin marca el centroide de la calle 3 bis, no el predio exacto.",
  ),
  cafePereira(
    "cafe-san-nicolas-pereira",
    "CAFE San Nicolás",
    "Carrera 14 bis # 28-38, antigua Estación de Policía",
    "Pereira, Risaralda, Colombia",
    "Ni la dirección ni el barrio resolvieron en el geocodificador: el pin cae en el centroide del municipio. Guíate por la dirección, no por el mapa.",
  ),
  cafePereira(
    "cafe-comuna-del-cafe-pereira",
    "CAFE Comuna del Café",
    "Carrera 3 con calle 59 A, sector A del Parque Industrial",
    "Parque Industrial, Pereira, Risaralda, Colombia",
    "El pin marca el sector Parque Industrial.",
  ),
  {
    slug: "escuela-nacional-del-deporte-cali",
    name: "Escuela Nacional del Deporte",
    organization: "Alcaldía de Santiago de Cali",
    type: "mixed",
    department: "Valle del Cauca",
    municipality: "Cali",
    address: "Calle 9 # 34-01",
    geocodeQuery: "Calle 9 # 34-01, Cali, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [...CALI_DIA2_ITEMS, "Pañales"],
    urgentNeeds: CALI_DIA2_URGENTES,
    rejectedItems: ["Productos vencidos"],
    scheduleText: null,
    startsAt: "2026-08-11",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Santiago de Cali, vía El País (Cali)",
    sourceUrl:
      "https://www.elpais.com.co/cali/alcaldia-habilita-nuevos-espacios-para-recibir-ayudas-y-atender-a-afectados-en-cali-1154.html",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Segundo punto oficial de recepción de la Alcaldía de Cali, publicado por El País el 11 de agosto citando a la administración. OJO: el mismo 11 de agosto a las 10:43 a. m. el punto fue evacuado temporalmente durante la réplica de magnitud 3,8 (El País: elpais.com.co/cali/fuerte-replica-en-cali-y-otras-regiones-obligan-a-evacuar-edificios-para-prevenir-1113.html) y no se localizó confirmación posterior del horario de operación. Confirma antes de desplazarte.",
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },
  {
    slug: "coliseo-mayor-jorge-arango-uribe-manizales",
    name: "Coliseo Mayor Jorge Arango Uribe",
    organization: "Alcaldía de Manizales",
    type: "general",
    department: "Caldas",
    municipality: "Manizales",
    address: "Coliseo Mayor Jorge Arango Uribe, carrera 24, barrio Palogrande",
    geocodeQuery: "Coliseo Mayor, Manizales, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [
      "Agua potable",
      "Alimentos no perecederos",
      "Implementos de aseo",
      "Ropa en buen estado",
      "Cobijas",
    ],
    urgentNeeds: ["Agua potable", "Alimentos no perecederos", "Implementos de aseo"],
    rejectedItems: ["Productos vencidos", "Alimentos perecederos"],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Manizales, vía La Patria (Manizales)",
    sourceUrl:
      "https://www.lapatria.com/manizales/el-coliseo-mayor-de-manizales-recibe-los-primeros-damnificados-tras-el-sismo-historias-y",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Es ante todo un ALBERGUE temporal habilitado por la Alcaldía de Manizales (junto con el Coliseo Menor y el SIC de Aranjuez) que además recibe donaciones ciudadanas para las familias que aloja —más de 140 personas al 11 de agosto—. La apertura de los albergues la confirmó la Alcaldía en sus canales; la recepción de donaciones en este punto la reporta La Patria. Si llevas donaciones, entrégalas sin interferir con la operación del albergue. REVIERTE UNA EXCLUSIÓN DELIBERADA, y por eso queda dicho aquí: §4.6 de docs/sources.md había dejado este recinto FUERA del mapa el 10 de agosto, con el argumento de que aparecía en las notas como albergue y no como acopio, y que publicarlo enviaría donaciones a un lugar que no las recibe. Lo que cambió no es el criterio sino el hecho: La Patria reporta recepción efectiva de donaciones ciudadanas en el sitio. El criterio se mantiene intacto para el resto —los albergues de Cali y el Coliseo Menor siguen fuera—, y §4.6 quedó reescrita en vez de borrada para que la reversión sea auditable.",
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },
  {
    slug: "coliseo-menor-manizales",
    name: "Coliseo Menor de Manizales",
    organization: "Alcaldía de Manizales",
    type: "general",
    department: "Caldas",
    municipality: "Manizales",
    address: "Coliseo Menor, Manizales",
    geocodeQuery: "Coliseo Menor, Manizales, Colombia",
    latitude: null,
    longitude: null,
    acceptedItems: [],
    urgentNeeds: [],
    rejectedItems: [],
    scheduleText: null,
    startsAt: "2026-08-10",
    endsAt: null,
    phone: null,
    whatsapp: null,
    email: null,
    sourceName: "Alcaldía de Manizales, vía La Patria (Manizales)",
    sourceUrl:
      "https://www.lapatria.com/manizales/el-coliseo-mayor-de-manizales-recibe-los-primeros-damnificados-tras-el-sismo-historias-y",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "pending",
    verificationNotes:
      "NO PUBLICADO. Es albergue temporal confirmado por la Alcaldía, pero la recepción de donaciones ciudadanas en ESTE punto solo está implícita en la cobertura de La Patria (el llamado explícito a donar es del Coliseo Mayor). Publicar cuando una fuente confirme que recibe donaciones, para no mandar gente a un albergue que no las recibe.",
    lastVerifiedAt: null,
  },
];
