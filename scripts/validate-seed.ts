/**
 * Valida data/centers.ts. Corre en CI en cada pull request.
 *
 *   npm run validate:seed
 *
 * POR QUÉ EXISTE
 * Este repositorio es público y acepta aportes de datos. Eso lo convierte en un
 * posible vector de desinformación durante una emergencia: alguien puede abrir
 * un pull request con un centro inventado y una fuente de apariencia creíble.
 *
 * La revisión humana sigue siendo obligatoria, pero las reglas que se pueden
 * comprobar mecánicamente NO deberían depender de que un revisor cansado se
 * acuerde de ellas a las 3 de la mañana. Aquí quedan como código.
 *
 * La regla más importante es la #6: la fuente no puede ser anterior al
 * terremoto. Es exactamente el error que casi contamina el seed original,
 * cuando circularon direcciones de la campaña por los sismos de Venezuela de
 * junio de 2026 presentadas como centros para esta emergencia.
 */
import { SEED_CENTERS, type SeedCenter } from "../data/centers";
import COORDINATES from "../data/coordinates.json";
import { DEPARTMENTS } from "../lib/validation";

/** Fecha del terremoto. Ninguna fuente anterior sirve para esta emergencia. */
const EARTHQUAKE_DATE = "2026-08-10";

/**
 * Cuentas oficiales aceptadas como fuente para `verified`.
 *
 * La especificación del proyecto siempre admitió «Instagram oficial, Facebook
 * oficial, X oficial» como fuente de validación: una cuenta oficial de la
 * entidad responsable es la entidad publicando en su propio canal, no un
 * tercero citándola.
 *
 * Es una LISTA BLANCA a propósito. Cualquiera puede crear una cuenta que
 * parezca oficial; añadir una aquí es una decisión consciente que queda
 * visible en el diff del pull request y exige revisión humana.
 *
 * Para añadir una cuenta: comprueba que sea la cuenta real de la entidad
 * responsable, deja constancia de quién lo comprobó y documenta en
 * docs/sources.md.
 */
const OFFICIAL_ACCOUNTS = [
  {
    url: "https://www.instagram.com/tigresasdelapatriaoficial",
    entidad:
      "Tigresas de la Patria — red difundida por la primera dama Ana Lucía Pineda, encargada por el presidente de coordinar la ayuda ciudadana por este terremoto",
    comprobadoPor: "@victorolave, 11 de agosto de 2026",
  },
  {
    url: "https://www.instagram.com/tigresasmoviendoseconcorazon",
    entidad:
      "Tigresas Moviéndose con Corazón — cuenta de la campaña «Colombia un solo corazón», la misma red que @tigresasdelapatriaoficial. Es la que mantiene la «Red Nacional de Puntos de Solidaridad» al día en su historia destacada «📍Puntos», departamento por departamento.",
    comprobadoPor:
      "@victorolave, 14 de agosto de 2026, mediante lectura asistida con navegador con sesión iniciada (ver docs/revalidacion-2026-08-14.md). Es la segunda cuenta de la MISMA organización que ya estaba en la lista: la cuenta principal difunde la campaña y esta la opera. Se comprobó que ambas se etiquetan mutuamente y que la primera dama (@analu_pineda) publica desde las dos. NO amplía qué cuenta como entidad responsable —a diferencia del precedente de @somosbelisario—, solo reconoce el canal donde esta red mantiene su lista viva.",
  },
  {
    url: "https://www.instagram.com/somosbelisario",
    entidad:
      "Somos Belisario Grupo Empresarial — cadena de restaurantes de Medellín que anunció EN SU PROPIA CUENTA que habilitó tres centros de acopio por este terremoto",
    comprobadoPor:
      "@victorolave, 12 de agosto de 2026, sobre verificación asistida de la publicación. PRECEDENTE NUEVO: es la primera cuenta de un negocio privado en esta lista; hasta ahora solo había organizaciones de la respuesta oficial. Se admite porque la publicación es de la propia empresa, con fecha visible posterior al sismo y dirección coincidente con la ficha. Si esta política se quiere acotar, este es el registro que hay que revisar primero.",
  },
];

/**
 * Sitios web aceptados como fuente propia de la entidad responsable.
 *
 * ANTES esto era un regex suelto que solo reconocía dominios gubernamentales.
 * El problema: `docs/sources.md` define `verified` como «el canal propio de la
 * entidad responsable», y hay entidades responsables que no son el Estado —una
 * asociación científica, una fundación, una universidad— publicando en su
 * propio dominio. El regex decía «gubernamental» cuando la regla dice «propio».
 *
 * Se convierte en lista blanca por la misma razón que OFFICIAL_ACCOUNTS:
 * ampliarla debe ser una DECISIÓN CONSCIENTE, visible en el diff del pull
 * request, con constancia de quién comprobó qué. Un regex permisivo dejaría
 * entrar cualquier dominio que alguien registre a nombre de una entidad falsa.
 */
const OFFICIAL_SITES = [
  {
    match: /\.gov\.co|\.gob\.co/,
    entidad: "Entidades públicas colombianas (alcaldías, gobernaciones, ministerios)",
    comprobadoPor: "Regla original del proyecto, 10 de agosto de 2026",
  },
  {
    match: /cruzrojacolombiana\.org|defensacivil\.gov\.co/,
    entidad: "Cruz Roja Colombiana y Defensa Civil — organismos de socorro",
    comprobadoPor: "Regla original del proyecto, 10 de agosto de 2026",
  },
  {
    match: /sociedadescientificas\.com/,
    entidad:
      "Asociación Colombiana de Sociedades Científicas (ACSC) — comunicado del 10 de agosto de 2026 firmado por su presidente, Jaime Alberto González, con las 16 sedes de S.C.A.R.E. habilitadas",
    comprobadoPor:
      "@victorolave, 12 de agosto de 2026, sobre verificación asistida: se leyó el PDF del comunicado (3 páginas, imagen escaneada sin capa de texto) y se cotejaron las 16 direcciones y los 16 teléfonos contra el seed, con coincidencia exacta.",
  },
];

/** Colombia continental e insular. */
const BOUNDS = { minLat: -4.3, maxLat: 13.5, minLon: -82.0, maxLon: -66.8 };

const PUBLIC_STATUSES = ["verified", "reported"] as const;

/**
 * Excepciones a la regla `publico-sin-enlace`.
 *
 * La regla existe porque la promesa del proyecto es que CUALQUIERA pueda
 * comprobar un centro publicado. Saltársela tiene un costo real: quien lea la
 * ficha no tiene forma de contrastarla.
 *
 * Se admite excepción solo cuando la fuente existe y fue vista, pero no tiene
 * URL estable —el caso típico es una pieza gráfica difundida por redes o
 * WhatsApp—. Igual que con la lista blanca de cuentas oficiales, añadir un slug
 * aquí es una DECISIÓN CONSCIENTE y queda a la vista en el diff del PR.
 *
 * Cada entrada debe decir de dónde salió el dato y cuándo se revisa.
 */
const SIN_ENLACE_APROBADOS = new Set<string>([
  // Pieza gráfica «Puntos de acopio Medellín» compartida por @victorolave el
  // 11 de agosto de 2026. No está firmada por ninguna entidad y no se localizó
  // la publicación original con URL estable. Se publican como `reported`, con
  // la salvedad en `verificationNotes` de cada ficha.
  // REVISAR: sustituir por `sourceUrl` en cuanto aparezca el post original.
  "simon-coffee-medellin",
  "remanence-medellin",
  "fundacion-el-arte-de-los-suenos-medellin",
  "la-razon-medellin",
  "batallon-girardot-medellin",
  // RESUELTO el 12 de agosto de 2026: `restaurante-belisario-medellin` salió de
  // esta lista porque su propia cuenta publicó el punto con URL estable.
  //
  // RESUELTOS el 14 de agosto de 2026 — `bodega-guayaquiliando-medellin`,
  // `libreria-rodante-delfos-medellin` y `udea-afroudea-medellin` también
  // salieron: las tres cuentas publican sus puntos con URL estable.
  //
  // Conviene decir por qué aparecieron ahora y no antes, porque cambia cómo se
  // lee esta lista. `docs/revalidacion-2026-08-13.md` §6 concluyó, tras
  // buscarlos uno por uno, que «ninguna búsqueda en internet los va a validar
  // nunca». Era falso: las búsquedas se hicieron sin sesión de Instagram, y
  // cinco de los ocho aparecieron al primer intento en cuanto la hubo. Lo que se
  // había escrito como un hecho del mundo era un límite de herramienta.
  //
  // Quedan cinco. Que sigan aquí NO significa que no existan ni que no tengan
  // canal: significa que todavía no se ha dado con él.
]);

/**
 * Excepciones a la regla `publico-sin-articulos`.
 *
 * La regla existe porque un centro que no dice qué recibe no le sirve a nadie,
 * y sigue siendo cierto. Pero tiene un punto ciego que apareció con los CAFE de
 * Pereira: cuando la fuente confirma que el punto EXISTE y publica su dirección
 * pero **no publica qué recibe**, la regla obliga a elegir entre dos males.
 *
 * O se deja el centro fuera del mapa —y se pierde un punto real en una de las
 * ciudades más golpeadas y peor cubiertas—, o se rellena `acceptedItems` con
 * las categorías que «suelen pedirse». Lo segundo parece inofensivo y no lo es:
 * `acceptedItems` alimenta el FILTRO de la interfaz, así que quien filtre por
 * «Agua potable» verá ese punto y leerá que recibe agua sin que ninguna fuente
 * lo diga. Un dato inventado es peor que un dato ausente, porque el ausente se
 * ve y el inventado no.
 *
 * Se resuelve igual que `SIN_ENLACE_APROBADOS`: no se elimina la regla, se
 * abre una excepción explícita. Añadir un slug aquí es una DECISIÓN CONSCIENTE,
 * visible en el diff del pull request, y el validador emite un aviso permanente
 * hasta que la fuente publique la lista.
 *
 * La ficha DEBE explicar en `verificationNotes` que no se sabe qué recibe y
 * pedir que se confirme antes de llevar la donación.
 */
const SIN_ARTICULOS_APROBADOS = new Set<string>([
  // Los 7 CAFE de la Alcaldía de Pereira, aportados por @Garzu96 el 12 de
  // agosto de 2026. El Diario publica los siete con dirección y Semana los
  // corrobora, pero ninguna de las dos fuentes lista los artículos.
  // REVISAR: quitar de aquí en cuanto la Alcaldía publique la canasta.
  "cafe-consota-pereira",
  "cafe-perla-del-otun-pereira",
  "cafe-el-remanso-pereira",
  "cafe-kennedy-pereira",
  "cafe-ormaza-pereira",
  "cafe-san-nicolas-pereira",
  "cafe-comuna-del-cafe-pereira",
]);

type Issue = { slug: string; rule: string; message: string };

const errors: Issue[] = [];
const warnings: Issue[] = [];

const fail = (slug: string, rule: string, message: string) =>
  errors.push({ slug, rule, message });
const warn = (slug: string, rule: string, message: string) =>
  warnings.push({ slug, rule, message });

const coords = COORDINATES as Record<
  string,
  { latitude: number | null; longitude: number | null; precision: string }
>;

const seenSlugs = new Set<string>();
const seenLocations = new Map<string, string>();

for (const center of SEED_CENTERS as SeedCenter[]) {
  const { slug } = center;

  // 1 — Identidad única -------------------------------------------------------
  if (seenSlugs.has(slug)) fail(slug, "slug-duplicado", "Ya existe otro centro con este slug.");
  seenSlugs.add(slug);

  if (!/^[a-z0-9-]+$/.test(slug)) {
    fail(slug, "slug-formato", "El slug solo admite minúsculas, números y guiones.");
  }

  // 2 — Departamento canónico -------------------------------------------------
  if (!(DEPARTMENTS as readonly string[]).includes(center.department)) {
    fail(
      slug,
      "departamento-desconocido",
      `«${center.department}» no está en la lista oficial de departamentos.`,
    );
  }

  // 3 — Toda afirmación necesita fuente --------------------------------------
  if (!center.sourceName?.trim()) {
    fail(slug, "sin-fuente", "Falta `sourceName`. Todo centro debe declarar de dónde salió.");
  }

  // 4 — Lo que se publica exige trazabilidad completa -------------------------
  const isPublic = (PUBLIC_STATUSES as readonly string[]).includes(center.verificationStatus);

  if (isPublic) {
    if (!center.sourceUrl && !SIN_ENLACE_APROBADOS.has(slug)) {
      fail(
        slug,
        "publico-sin-enlace",
        "Un centro publicado necesita `sourceUrl` para que cualquiera pueda comprobarlo. Si la fuente es una pieza gráfica sin enlace estable, añádelo a `SIN_ENLACE_APROBADOS` con su motivo: es una decisión consciente y queda visible en el diff.",
      );
    }
    if (!center.sourceUrl && SIN_ENLACE_APROBADOS.has(slug)) {
      warn(
        slug,
        "publicado-sin-enlace-aprobado",
        "Publicado SIN enlace comprobable, por excepción aprobada. Sustituir `sourceUrl` en cuanto exista una URL estable.",
      );
    }
    if (!center.lastVerifiedAt) {
      fail(
        slug,
        "publico-sin-fecha",
        "Un centro publicado necesita `lastVerifiedAt`: la interfaz muestra esa fecha al usuario.",
      );
    }
    if (!center.address?.trim()) {
      fail(slug, "publico-sin-direccion", "Un centro publicado necesita dirección.");
    }
    if (center.acceptedItems.length === 0 && !SIN_ARTICULOS_APROBADOS.has(slug)) {
      fail(
        slug,
        "publico-sin-articulos",
        "Un centro publicado debe indicar qué recibe; si no, no le sirve a nadie. Si la fuente confirma el punto pero NO publica la lista de artículos, añádelo a `SIN_ARTICULOS_APROBADOS` con su motivo en vez de inventar la canasta: es una decisión consciente y queda visible en el diff.",
      );
    }
    if (center.acceptedItems.length === 0 && SIN_ARTICULOS_APROBADOS.has(slug)) {
      warn(
        slug,
        "publicado-sin-articulos-aprobado",
        "Publicado SIN lista de artículos, por excepción aprobada: la fuente confirma el punto pero no publica qué recibe. Rellenar en cuanto la entidad lo publique.",
      );
    }
    if (!center.verificationNotes?.trim()) {
      warn(
        slug,
        "sin-notas",
        "Sin `verificationNotes`: conviene explicar cómo se comprobó y qué quedó pendiente.",
      );
    }
  }

  // 5 — `verified` es la afirmación más fuerte del sitio ----------------------
  if (center.verificationStatus === "verified") {
    if (!center.sourcePublishedAt) {
      fail(
        slug,
        "verificado-sin-fecha-fuente",
        "Marcar como verificado exige `sourcePublishedAt` de la publicación original.",
      );
    }
    const url = center.sourceUrl ?? "";
    const isInstitutionalSite = OFFICIAL_SITES.some((s) => s.match.test(url));
    // Una cuenta oficial verificada de la entidad responsable ES la entidad
    // publicando en su propio canal, no un tercero citándola. Durante una
    // emergencia suele ser además el canal MÁS rápido. Se admite solo mediante
    // lista blanca explícita, para que agregar una cuenta sea una decisión
    // consciente y revisable en el diff, no algo que cualquiera cuele.
    const isOfficialAccount = OFFICIAL_ACCOUNTS.some((a) => url.startsWith(a.url));
    if (!isInstitutionalSite && !isOfficialAccount) {
      fail(
        slug,
        "verificado-sin-fuente-institucional",
        `«verified» exige el sitio propio de la entidad responsable, o una cuenta oficial de la lista blanca. «${url}» no es ninguna. Si la fuente es un medio que cita a la entidad, el estado correcto es «reported».`,
      );
    }
  }

  // 6 — REGLA CRÍTICA: la fuente no puede ser anterior al terremoto -----------
  //     Protege contra reutilizar campañas previas, como la de los sismos de
  //     Venezuela de junio de 2026.
  if (center.sourcePublishedAt && center.sourcePublishedAt < EARTHQUAKE_DATE) {
    fail(
      slug,
      "fuente-anterior-al-sismo",
      `La fuente es del ${center.sourcePublishedAt}, anterior al terremoto del ${EARTHQUAKE_DATE}. No puede acreditar un centro de ESTA emergencia.`,
    );
  }
  if (center.startsAt && center.startsAt < EARTHQUAKE_DATE) {
    fail(
      slug,
      "inicio-anterior-al-sismo",
      `«startsAt» (${center.startsAt}) es anterior al terremoto. Probable arrastre de una campaña previa.`,
    );
  }

  // 7 — Coherencia de fechas --------------------------------------------------
  if (center.startsAt && center.endsAt && center.endsAt < center.startsAt) {
    fail(slug, "fechas-invertidas", "`endsAt` es anterior a `startsAt`.");
  }

  // 8 — Geografía -------------------------------------------------------------
  const coord = coords[slug];
  if (isPublic) {
    if (!coord || coord.latitude === null || coord.longitude === null || coord.precision === "failed") {
      fail(
        slug,
        "sin-coordenadas",
        "Falta coordenada utilizable. Ejecuta `npx tsx scripts/geocode.ts` y revisa el resultado.",
      );
    } else {
      const { latitude: lat, longitude: lon } = coord;
      if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat || lon < BOUNDS.minLon || lon > BOUNDS.maxLon) {
        fail(slug, "fuera-de-colombia", `La coordenada (${lat}, ${lon}) cae fuera de Colombia.`);
      }

      // Dos centros distintos en el MISMO punto suelen ser un duplicado o un
      // pin copiado sin revisar.
      const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
      const previous = seenLocations.get(key);
      if (previous) {
        warn(
          slug,
          "coordenada-repetida",
          `Comparte coordenada exacta con «${previous}». ¿Es un duplicado o un pin sin revisar?`,
        );
      }
      seenLocations.set(key, slug);
    }
  }

  // 9 — Un centro sin contacto ni horario obliga a la gente a ir a ciegas -----
  if (isPublic && !center.scheduleText && !center.phone && !center.whatsapp) {
    warn(
      slug,
      "sin-horario-ni-contacto",
      "Sin horario ni teléfono: quien vaya no tiene forma de confirmar antes de desplazarse.",
    );
  }
}

// --- Informe -----------------------------------------------------------------
const publicCount = (SEED_CENTERS as SeedCenter[]).filter((c) =>
  (PUBLIC_STATUSES as readonly string[]).includes(c.verificationStatus),
).length;

console.log(`Centros en el seed: ${SEED_CENTERS.length} (publicables: ${publicCount})`);

if (warnings.length) {
  console.log(`\nAvisos (${warnings.length}) — no bloquean, pero revísalos:`);
  for (const w of warnings) console.log(`  ~ [${w.rule}] ${w.slug}: ${w.message}`);
}

if (errors.length) {
  console.error(`\nErrores (${errors.length}):`);
  for (const e of errors) console.error(`  ✗ [${e.rule}] ${e.slug}: ${e.message}`);
  console.error(
    "\nRevisa docs/sources.md y CONTRIBUTING.md antes de volver a enviar los cambios.",
  );
  process.exit(1);
}

console.log("\nValidación superada: el seed cumple las reglas de verificación.");
