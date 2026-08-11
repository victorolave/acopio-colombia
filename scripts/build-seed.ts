/**
 * Genera supabase/seed.sql a partir de data/centers.ts + data/coordinates.json.
 *
 *   npm run seed:build
 *
 * El seed es idempotente (upsert por slug), así que se puede volver a correr
 * sin duplicar centros. Incluye TODOS los estados —también `disputed` e
 * `inactive`— para que queden registrados y auditables; las políticas RLS se
 * encargan de que no se publiquen.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { SEED_CENTERS } from "../data/centers";
import COORDINATES from "../data/coordinates.json";

type CoordinateEntry = {
  latitude: number | null;
  longitude: number | null;
  precision: "exact" | "approximate" | "municipality" | "failed";
};

const coords = COORDINATES as Record<string, CoordinateEntry>;

const q = (value: string | null): string =>
  value === null ? "null" : `'${value.replace(/'/g, "''")}'`;

const arr = (values: string[]): string =>
  values.length === 0
    ? "'{}'"
    : `array[${values.map((v) => q(v)).join(", ")}]::text[]`;

const rows: string[] = [];
const skipped: string[] = [];

for (const center of SEED_CENTERS) {
  const coord = coords[center.slug];
  if (!coord || coord.latitude === null || coord.longitude === null || coord.precision === "failed") {
    skipped.push(center.slug);
    continue;
  }

  rows.push(
    `  (${[
      q(center.slug),
      q(center.name),
      q(center.organization),
      `'${center.type}'::center_type`,
      q(center.department),
      q(center.municipality),
      q(center.address),
      String(coord.latitude),
      String(coord.longitude),
      `'${coord.precision}'::location_precision`,
      arr(center.acceptedItems),
      arr(center.urgentNeeds),
      arr(center.rejectedItems),
      q(center.scheduleText),
      center.startsAt ? `'${center.startsAt}'::date` : "null",
      center.endsAt ? `'${center.endsAt}'::date` : "null",
      q(center.phone),
      q(center.whatsapp),
      q(center.email),
      q(center.sourceName),
      q(center.sourceUrl),
      center.sourcePublishedAt ? `'${center.sourcePublishedAt}'::date` : "null",
      `'${center.verificationStatus}'::verification_status`,
      q(center.verificationNotes),
      center.lastVerifiedAt ? `'${center.lastVerifiedAt}'::timestamptz` : "null",
    ].join(", ")})`,
  );
}

const counts = SEED_CENTERS.reduce<Record<string, number>>((acc, c) => {
  acc[c.verificationStatus] = (acc[c.verificationStatus] ?? 0) + 1;
  return acc;
}, {});

const sql = `-- ===========================================================================
-- Acopio Colombia — seed nacional
-- GENERADO AUTOMÁTICAMENTE por scripts/build-seed.ts. No editar a mano:
-- editar data/centers.ts y volver a ejecutar \`npm run seed:build\`.
--
-- Emergencia: terremoto de magnitud 7,4 del 10 de agosto de 2026,
-- epicentro en San José del Palmar (Chocó).
--
-- Resumen por estado de verificación:
${Object.entries(counts)
  .sort()
  .map(([status, n]) => `--   ${status.padEnd(9)} ${n}`)
  .join("\n")}
--
-- Trazabilidad completa de fuentes: docs/sources.md
-- ===========================================================================

insert into public.collection_centers (
  slug, name, organization, type,
  department, municipality, address,
  latitude, longitude, location_precision,
  accepted_items, urgent_needs, rejected_items,
  schedule_text, starts_at, ends_at,
  phone, whatsapp, email,
  source_name, source_url, source_published_at,
  verification_status, verification_notes, last_verified_at
) values
${rows.join(",\n")}
on conflict (slug) do update set
  name = excluded.name,
  organization = excluded.organization,
  type = excluded.type,
  department = excluded.department,
  municipality = excluded.municipality,
  address = excluded.address,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  location_precision = excluded.location_precision,
  accepted_items = excluded.accepted_items,
  urgent_needs = excluded.urgent_needs,
  rejected_items = excluded.rejected_items,
  schedule_text = excluded.schedule_text,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  email = excluded.email,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  source_published_at = excluded.source_published_at,
  -- El estado NO se pisa si un administrador ya moderó el registro desde el
  -- panel. Sin esta guarda, un centro marcado inactivo porque cerró volvería a
  -- publicarse como verificado en la siguiente ejecución del seed.
  verification_status = case
    when public.collection_centers.moderated_at is not null
      then public.collection_centers.verification_status
    else excluded.verification_status
  end,
  verification_notes = case
    when public.collection_centers.moderated_at is not null
      then public.collection_centers.verification_notes
    else excluded.verification_notes
  end,
  last_verified_at = case
    when public.collection_centers.moderated_at is not null
      then public.collection_centers.last_verified_at
    else excluded.last_verified_at
  end;
`;

// `URL.pathname` produce «/C:/…» en Windows y rompe la escritura; fileURLToPath
// resuelve la ruta nativa en cualquier sistema operativo.
writeFileSync(fileURLToPath(new URL("../supabase/seed.sql", import.meta.url)), sql);

console.log(`supabase/seed.sql escrito con ${rows.length} centros.`);
if (skipped.length) console.log(`Omitidos por falta de coordenadas: ${skipped.join(", ")}`);
console.log("Estados:", counts);
