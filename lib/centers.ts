import "server-only";

import { SEED_CENTERS } from "@/data/centers";
import COORDINATES from "@/data/coordinates.json";
import { hasEnded } from "./format";
import { canConfirmBeforeGoing } from "./schedule";
import { createSupabasePublicClient } from "./supabase/public";
import type { CollectionCenter, LocationPrecision, VerificationStatus } from "./types";

/** Estados que se muestran al público. `pending` y `disputed` nunca salen. */
export const PUBLIC_STATUSES: VerificationStatus[] = ["verified", "reported"];

/**
 * Un centro entra en listas, mapa y búsqueda si su estado es publicable **y**
 * su fecha de cierre no ha pasado.
 *
 * Lo segundo faltaba. `getPublicCenters()` filtraba solo por
 * `verification_status`, así que `parque-principal-itagui` —con `endsAt` del 12
 * de agosto puesto desde el primer día— se sirvió durante todo el 13 en lista,
 * mapa y resultados de búsqueda. El aviso de cierre existía, pero vivía en la
 * ficha de detalle: justo la página que quien escanea la lista no llega a abrir.
 *
 * Se filtra en memoria a propósito, en vez de añadir un `.or(...)` a la consulta
 * de Supabase: `hasEnded()` resuelve el vencimiento a las 23:59:59 de Colombia y
 * duplicar esa regla en SQL abre la puerta a que las dos rutas —Supabase y seed
 * estático— discrepen en el borde del día. Una sola definición, aplicada a las
 * dos.
 */
function isPubliclyListable(center: CollectionCenter, now = new Date()): boolean {
  return PUBLIC_STATUSES.includes(center.verification_status) && !hasEnded(center.ends_at, now);
}

const COLUMNS =
  "id, slug, name, organization, type, department, municipality, address, latitude, longitude, location_precision, accepted_items, urgent_needs, rejected_items, schedule_text, starts_at, ends_at, phone, whatsapp, email, source_name, source_url, source_published_at, verification_status, verification_notes, last_verified_at, created_at, updated_at";

type CoordinateEntry = {
  latitude: number | null;
  longitude: number | null;
  precision: LocationPrecision | "failed";
};

/**
 * Respaldo estático: el seed nacional con las coordenadas ya geocodificadas.
 * Se usa cuando Supabase no está configurado, de modo que el sitio sea útil
 * desde el primer despliegue.
 */
function staticCenters(): CollectionCenter[] {
  const coords = COORDINATES as Record<string, CoordinateEntry>;
  const now = new Date().toISOString();

  return SEED_CENTERS.flatMap((center) => {
    const coord = coords[center.slug];
    if (!coord || coord.latitude === null || coord.longitude === null || coord.precision === "failed") {
      return [];
    }
    return [
      {
        id: center.slug,
        slug: center.slug,
        name: center.name,
        organization: center.organization,
        type: center.type,
        department: center.department,
        municipality: center.municipality,
        address: center.address,
        latitude: coord.latitude,
        longitude: coord.longitude,
        location_precision: coord.precision as LocationPrecision,
        accepted_items: center.acceptedItems,
        urgent_needs: center.urgentNeeds,
        rejected_items: center.rejectedItems,
        schedule_text: center.scheduleText,
        starts_at: center.startsAt,
        ends_at: center.endsAt,
        phone: center.phone,
        whatsapp: center.whatsapp,
        email: center.email,
        source_name: center.sourceName,
        source_url: center.sourceUrl,
        source_published_at: center.sourcePublishedAt,
        verification_status: center.verificationStatus,
        verification_notes: center.verificationNotes,
        last_verified_at: center.lastVerifiedAt,
        created_at: now,
        updated_at: now,
      } satisfies CollectionCenter,
    ];
  });
}

/**
 * Orden por defecto: el que ve quien NO comparte su ubicación.
 *
 * Antes era alfabético por nombre, y eso no optimiza nada. El primer resultado
 * del país era «122 Plaza Apartahotel» porque el «1» ordena antes que las
 * letras: un centro sin horario y sin teléfono. Alfabético no era una decisión
 * de producto, era el orden que quedó.
 *
 * Sin ubicación NINGÚN orden global es correcto —una lista de los centros mejor
 * documentados del país le sirve poco a alguien en Pasto, y para eso están los
 * atajos de ciudad—, pero sí se puede evitar abrir con un punto al que nadie
 * puede llamar. Verificados primero, luego los que se pueden confirmar sin
 * viajar, y alfabético dentro de cada grupo para que el orden siga siendo
 * predecible.
 *
 * Ojo: esto NO ordena por completitud del dato. Hacerlo hundiría la red mejor
 * verificada del seed —30 de los 44 `verified` vienen de una pieza gráfica que
 * no publicó horarios— y eso sería ordenar por calidad del comunicado de
 * prensa, no por utilidad. La completitud es un filtro que el usuario activa,
 * no un peso oculto.
 */
function byDefaultRelevance(a: CollectionCenter, b: CollectionCenter): number {
  const rank = (c: CollectionCenter) =>
    (c.verification_status === "verified" ? 0 : 2) + (canConfirmBeforeGoing(c) ? 0 : 1);

  return rank(a) - rank(b) || a.name.localeCompare(b.name, "es");
}

/** Centros publicables (verificados + reportados), en el orden por defecto. */
export async function getPublicCenters(): Promise<CollectionCenter[]> {
  const supabase = createSupabasePublicClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("collection_centers")
      .select(COLUMNS)
      .in("verification_status", PUBLIC_STATUSES)
      .order("name", { ascending: true });

    if (!error && data)
      return (data as CollectionCenter[]).filter((c) => isPubliclyListable(c)).sort(byDefaultRelevance);
    // Si Supabase falla durante una emergencia, es mejor servir el seed que una página en blanco.
    console.error("[centers] Supabase no respondió, usando seed estático:", error?.message);
  }

  return staticCenters()
    .filter((c) => isPubliclyListable(c))
    .sort(byDefaultRelevance);
}

/**
 * Asimetría deliberada con `getPublicCenters()`: aquí **no** se filtra por
 * `ends_at`.
 *
 * Un centro vencido sale de listas, mapa y búsqueda porque ahí nadie lee la
 * letra pequeña. Pero quien llega a la ficha por un enlace guardado o
 * compartido merece leer «este punto cerró el 12 de agosto», no un 404: la
 * respuesta a la pregunta que traía es el aviso, no el vacío.
 * `app/centros/[slug]/page.tsx` ya consulta `hasEnded()` para mostrarlo.
 */
export async function getCenterBySlug(slug: string): Promise<CollectionCenter | null> {
  const supabase = createSupabasePublicClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("collection_centers")
      .select(COLUMNS)
      .eq("slug", slug)
      .in("verification_status", PUBLIC_STATUSES)
      .maybeSingle();

    if (!error && data) return data as CollectionCenter;
    if (!error) return null;
    console.error("[centers] Supabase no respondió, usando seed estático:", error.message);
  }

  return (
    staticCenters().find((c) => c.slug === slug && PUBLIC_STATUSES.includes(c.verification_status)) ?? null
  );
}

export async function getAllSlugs(): Promise<string[]> {
  const centers = await getPublicCenters();
  return centers.map((c) => c.slug);
}
