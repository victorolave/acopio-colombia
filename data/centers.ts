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
    ...TIGRESAS_SOURCE,
    verificationStatus: "verified",
    verificationNotes: TIGRESAS_NOTES,
    lastVerifiedAt: VERIFIED_AT,
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
    verificationStatus: "verified",
    verificationNotes:
      "Publicado directamente por la Alcaldía Mayor de Bogotá el 10 de agosto de 2026 como uno de los seis puntos oficiales. También aparece como «SAMU de la Alquería» en algunas publicaciones.",
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
    verificationStatus: "verified",
    verificationNotes:
      "Uno de los seis puntos oficiales de la Alcaldía Mayor de Bogotá. La Alcaldía lo nombra «Sede Cruz Roja Barrios Unidos / Centro de Salvamento Acuático».",
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
    verificationStatus: "verified",
    verificationNotes:
      "Bodega de acopio y clasificación previa al envío de ayudas a los departamentos afectados. Punto oficial de la Alcaldía Mayor de Bogotá.",
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
    verificationStatus: "verified",
    verificationNotes:
      "Punto de mayor capacidad de los seis habilitados por la Alcaldía Mayor de Bogotá el 10 de agosto de 2026.",
    lastVerifiedAt: VERIFIED_AT,
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
    sourceName: "Alcaldía de Santiago de Cali, vía El País (Cali)",
    sourceUrl:
      "https://www.elpais.com.co/cali/alcaldia-habilita-nuevos-espacios-para-recibir-ayudas-y-atender-a-afectados-en-cali-1154.html",
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes:
      "Día 1 (10 ago): la Alcaldía lo habilitó priorizando elementos de protección para los equipos de búsqueda y rescate (El País: elpais.com.co/cali/habilitan-centro-de-acopio-en-cali-tras-fuerte-terremoto-asi-puede-donar-agua-y-elementos-de-seguridad-1047.html). Día 2 (11 ago): El País, citando a la Alcaldía, amplía la lista a ayuda humanitaria general —alimentos, cobijas, ropa, botiquín— además de los elementos de rescate; por eso el tipo pasa de «rescue_supplies» a «mixed».",
    lastVerifiedAt: VERIFIED_AT_DIA2,
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
    sourceName: "Gobernación del Valle del Cauca, vía El País (Cali)",
    sourceUrl:
      "https://www.elpais.com.co/valle/gobernacion-del-valle-declara-calamidad-publica-tras-fuerte-terremoto-y-habilita-puntos-para-recibir-donaciones-1030.html",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Habilitado por la Gobernación del Valle del Cauca junto con la declaratoria de calamidad pública. La nota no detalla horarios ni la lista completa de artículos: confirmar antes de ir.",
    lastVerifiedAt: VERIFIED_AT,
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
    sourceName: "Gobernación del Valle del Cauca, vía El País (Cali)",
    sourceUrl:
      "https://www.elpais.com.co/valle/gobernacion-del-valle-declara-calamidad-publica-tras-fuerte-terremoto-y-habilita-puntos-para-recibir-donaciones-1030.html",
    sourcePublishedAt: "2026-08-10",
    verificationStatus: "reported",
    verificationNotes:
      "Punto en Bogotá habilitado por la Gobernación del Valle del Cauca para canalizar ayudas hacia el suroccidente del país.",
    lastVerifiedAt: VERIFIED_AT,
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
    verificationStatus: "reported",
    verificationNotes:
      "Jornada de dos días (11 y 12 de agosto de 2026). Reportado por un agregador nacional; no se localizó comunicado de la Alcaldía de Itagüí. Confirmar antes de desplazarse.",
    lastVerifiedAt: VERIFIED_AT,
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
    scheduleText: "Consultar antes de asistir",
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
      "NO PUBLICADO COMO ACTIVO. ABACO informó que la sede de Pereira resultó afectada por el sismo y que se evalúa una ubicación alterna. Volver a consultar con ABACO antes de reactivarlo.",
    lastVerifiedAt: VERIFIED_AT,
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
    verificationStatus: "pending",
    verificationNotes:
      "NO PUBLICADO. Llegó como captura de una historia de Instagram que a su vez recompartía la de otra cuenta personal: es una publicación copiada, sin enlace localizable y sin organización responsable identificada. Se anuncia como «Comunicado N.º 9» de un grupo de voluntarios, lo que sugiere una operación real y sostenida, pero no se localizó ningún respaldo institucional ni cobertura de prensa. ADEMÁS SU HORARIO ES DE UN SOLO DÍA (4:00 p. m. – 7:30 p. m.): antes de publicarlo hay que confirmar que siga abierto, o corregir el horario. Rechaza medicamentos de forma explícita.",
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
    { geocodeQuery: "Carrera 23 # 4-116, Valledupar, Cesar, Colombia" }),
  tigresa("tigresas-pailitas", "Emisora Universal Stereo", "Cesar", "Pailitas",
    "Barrio El Bosque", "+57 314 592 7152",
    { geocodeQuery: "Pailitas, Cesar, Colombia" }),
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
    { geocodeQuery: "Calle 30 # 6-69, Santa Marta, Magdalena, Colombia" }),
  tigresa("tigresas-arauca-capital", "Tigresas Arauca Capital", "Arauca", "Arauca",
    "Calle 17 #17-31, barrio Cristo Rey", "+57 314 401 4272",
    { geocodeQuery: "Calle 17 # 17-31, Arauca, Colombia" }),
  tigresa("tigresas-san-diego-cesar", "Punto de Solidaridad San Diego", "Cesar", "San Diego",
    "Carrera 13 #2F-85, Urbanización Chiriaimo", "+57 301 297 9760",
    {
      geocodeQuery: "San Diego, Cesar, Colombia",
      verificationNotes: `${TIGRESAS_NOTES} Aparece DUPLICADO en dos piezas distintas de la campaña, con la misma dirección y teléfono; se consolidó en un solo registro.`,
    }),
  tigresa("tigresas-pereira-alpaca", "Complejo Bodeguero Alpaca — Bodega 01", "Risaralda", "Pereira",
    "Vía La Romelia – El Pollo, Vereda Santa Ana Baja, a la altura del Hotel Tángara", "+57 310 528 9438",
    {
      geocodeQuery: "La Romelia, Dosquebradas, Risaralda, Colombia",
      verificationNotes: `${TIGRESAS_NOTES} Aparece en la pieza titulada «Nuevos puntos de solidaridad para apoyar con donaciones a nuestros hermanos afectados por el terremoto», la referencia más explícita a ESTA emergencia de toda la red. Pereira es una de las ciudades más golpeadas. Dirección rural sin nomenclatura urbana: el pin es orientativo, guíate por la referencia del Hotel Tángara.`,
    }),
  tigresa("tigresas-el-copey", "Punto de Solidaridad El Copey", "Cesar", "El Copey",
    "Calle 8 #20-22, Barrio San Carlos", "+57 316 454 5452",
    { geocodeQuery: "El Copey, Cesar, Colombia" }),
  tigresa("tigresas-chia", "Punto de Solidaridad Chía", "Cundinamarca", "Chía",
    "Carrera 9 #12-41, diagonal al CAM", "+57 311 255 5912",
    { geocodeQuery: "Carrera 9 # 12-41, Chía, Cundinamarca, Colombia" }),
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
    { geocodeQuery: "Calle 15 # 16-43, Acacías, Meta, Colombia" }),
  tigresa("tigresas-florencia", "Punto de Solidaridad Florencia", "Caquetá", "Florencia",
    "Carrera 10A #7-04, Barrio Avenidas", "+57 317 887 1620",
    { geocodeQuery: "Carrera 10A # 7-04, Florencia, Caquetá, Colombia" }),
  tigresa("tigresas-granada-meta", "Punto de Solidaridad Granada", "Meta", "Granada",
    "Calle 12 #14-115, Barrio Belén", "+57 311 843 6106",
    { geocodeQuery: "Granada, Meta, Colombia" }),
  tigresa("tigresas-pacho", "Oficina Orange — Zona Rosa", "Cundinamarca", "Pacho",
    "Calle 6 #16-10, Oficina Orange, Zona Rosa", "+57 302 515 2769",
    { geocodeQuery: "Pacho, Cundinamarca, Colombia" }),
  tigresa("tigresas-mocoa", "Froylán Café", "Putumayo", "Mocoa",
    "Calle 9 #6-14, Local 109", "+57 314 484 4307",
    { geocodeQuery: "Calle 9 # 6-14, Mocoa, Putumayo, Colombia" }),
  tigresa("tigresas-bosconia", "Punto de Solidaridad Bosconia", "Cesar", "Bosconia",
    "Carrera 18 #13-78, Barrio San Martín", "+57 313 591 9358",
    { geocodeQuery: "Bosconia, Cesar, Colombia" }),
  tigresa("tigresas-pasto", "Antiguo Pre-ICFES Montilla", "Nariño", "Pasto",
    "Calle 17 #27-59, Barrio Centro", "+57 320 688 6196",
    { geocodeQuery: "Calle 17 # 27-59, Pasto, Nariño, Colombia" }),
  tigresa("tigresas-cali-yumbo", "Punto de Solidaridad Yumbo", "Valle del Cauca", "Yumbo",
    "Carrera 30 #10-90, Arroyo Hondo", "+57 316 791 2163",
    { geocodeQuery: "Arroyo Hondo, Yumbo, Valle del Cauca, Colombia" }),
  tigresa("tigresas-bogota-122-plaza", "122 Plaza Apartahotel", "Bogotá D.C.", "Bogotá D.C.",
    "Carrera 15A #122-27", null,
    { geocodeQuery: "Carrera 15A # 122-27, Bogotá, Colombia" }),
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
    acceptedItems: MEDELLIN_DIA2_ITEMS,
    urgentNeeds: ["Alimentos no perecederos", "Artículos de aseo"],
    rejectedItems: MEDELLIN_DIA2_RECHAZADOS,
    scheduleText: "Lunes a viernes, 9:00 a. m. – 5:00 p. m.",
    startsAt: "2026-08-11",
    endsAt: null,
    phone: "+57 311 450 5940",
    whatsapp: null,
    email: null,
    sourceName: PIEZA_CIUDADANA_MEDELLIN,
    sourceUrl: null,
    sourcePublishedAt: "2026-08-11",
    verificationStatus: "reported",
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} La pieza no da dirección del bloque 9: se usó Ciudad Universitaria. Tiene teléfono publicado, que es la vía más rápida para confirmarlo. El acceso al campus puede requerir identificación.`,
    lastVerifiedAt: VERIFIED_AT_DIA2,
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
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} Negocio privado sumado a la iniciativa: sin horario publicado y puede dejar de recibir sin aviso. Llamar o pasar a confirmar antes de llevar carga.`,
    lastVerifiedAt: VERIFIED_AT_DIA2,
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
    address: "Avenida 80 #52-88",
    geocodeQuery: "Avenida 80 # 52-88, Medellín, Antioquia, Colombia",
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
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} Iniciativa privada, sin horario publicado.`,
    lastVerifiedAt: VERIFIED_AT_DIA2,
  },
  {
    slug: "libreria-rodante-delfos-medellin",
    name: "Librería Rodante Delfos",
    organization: null,
    type: "general",
    department: "Antioquia",
    municipality: "Medellín",
    address: "Laureles, Calle 79 #52A-23",
    geocodeQuery: "Calle 79 # 52A-23, Laureles, Medellín, Antioquia, Colombia",
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
    verificationNotes: `${PIEZA_CIUDADANA_NOTA} AMBIGÜEDAD DE DIRECCIÓN: la pieza escribe «Laureles 79 #52A-23», que puede leerse como Calle 79 o como Carrera 79 (ambas existen en Laureles). Se interpretó Calle 79. VALIDAR PIN antes de promover.`,
    lastVerifiedAt: VERIFIED_AT_DIA2,
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
