import "server-only";

import { SEED_CENTERS } from "@/data/centers";
import COORDINATES from "@/data/coordinates.json";
import { createSupabaseServerClient } from "./supabase/server";
import type { CollectionCenter, LocationPrecision, VerificationStatus } from "./types";

/** Estados que se muestran al público. `pending` y `disputed` nunca salen. */
export const PUBLIC_STATUSES: VerificationStatus[] = ["verified", "reported"];

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

/** Centros publicables (verificados + reportados). Ordenados por estado y nombre. */
export async function getPublicCenters(): Promise<CollectionCenter[]> {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("collection_centers")
      .select(COLUMNS)
      .in("verification_status", PUBLIC_STATUSES)
      .order("verification_status", { ascending: true })
      .order("name", { ascending: true });

    if (!error && data) return data as CollectionCenter[];
    // Si Supabase falla durante una emergencia, es mejor servir el seed que una página en blanco.
    console.error("[centers] Supabase no respondió, usando seed estático:", error?.message);
  }

  return staticCenters()
    .filter((c) => PUBLIC_STATUSES.includes(c.verification_status))
    .sort((a, b) =>
      a.verification_status === b.verification_status
        ? a.name.localeCompare(b.name, "es")
        : a.verification_status === "verified"
          ? -1
          : 1,
    );
}

export async function getCenterBySlug(slug: string): Promise<CollectionCenter | null> {
  const supabase = await createSupabaseServerClient();

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
