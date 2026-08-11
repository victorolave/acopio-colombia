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

/** Colombia continental e insular. */
const BOUNDS = { minLat: -4.3, maxLat: 13.5, minLon: -82.0, maxLon: -66.8 };

const PUBLIC_STATUSES = ["verified", "reported"] as const;

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
    if (!center.sourceUrl) {
      fail(
        slug,
        "publico-sin-enlace",
        "Un centro publicado necesita `sourceUrl` para que cualquiera pueda comprobarlo.",
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
    if (center.acceptedItems.length === 0) {
      fail(
        slug,
        "publico-sin-articulos",
        "Un centro publicado debe indicar qué recibe; si no, no le sirve a nadie.",
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
    const isInstitutional = /\.gov\.co|\.gob\.co|cruzrojacolombiana\.org|defensacivil\.gov\.co/.test(url);
    if (!isInstitutional) {
      fail(
        slug,
        "verificado-sin-fuente-institucional",
        `«verified» exige el sitio propio de la entidad responsable. «${url}» no lo parece. Si la fuente es un medio que cita a la entidad, el estado correcto es «reported».`,
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
