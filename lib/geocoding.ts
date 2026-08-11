/**
 * Cliente compartido de Nominatim (OpenStreetMap).
 *
 * Lo usan DOS consumidores con propósitos distintos:
 *  - `scripts/geocode.ts`       → geocodifica el seed una sola vez, en frío, y su
 *                                 resultado se revisa a mano antes de publicarse.
 *  - `app/api/geocode/route.ts` → encuadra el mapa de /registrar bajo demanda.
 *
 * NUNCA se llama desde el navegador: la política de uso de Nominatim exige un
 * User-Agent identificable (que el navegador no deja fijar), pide cachear los
 * resultados y limita a 1 petición por segundo. Por eso el formulario pasa por
 * un route handler propio en lugar de hablar directo con el servicio.
 */

export const NOMINATIM_USER_AGENT =
  "AcopioColombia/0.1 (proyecto ciudadano de emergencia; contacto: acopiocolombia@proton.me)";

/** Caja envolvente aproximada de Colombia continental + insular. */
export const CO_BOUNDS = { minLat: -4.3, maxLat: 13.5, minLon: -82.0, maxLon: -66.8 };

export type GeocodePrecision = "exact" | "approximate" | "municipality";

export type NominatimHit = {
  lat: number;
  lon: number;
  displayName: string;
  type: string;
};

export function insideColombia(lat: number, lon: number): boolean {
  return (
    lat >= CO_BOUNDS.minLat && lat <= CO_BOUNDS.maxLat && lon >= CO_BOUNDS.minLon && lon <= CO_BOUNDS.maxLon
  );
}

/**
 * Clasificación CONSERVADORA: ante la duda, "approximate".
 * Un pin optimista manda a alguien al lugar equivocado durante una emergencia.
 */
export function classifyPrecision(hit: NominatimHit): GeocodePrecision {
  const isAdminArea = /^(city|town|village|municipality|administrative|state|county)$/.test(hit.type);
  const isAreaish = /^(suburb|neighbourhood|quarter|locality|hamlet|residential)$/.test(hit.type);
  const isStreet = /^(road|primary|secondary|tertiary|unclassified|trunk|living_street)$/.test(hit.type);
  const hasHouseNumber = /^\d+[^,]*,/.test(hit.displayName);

  if (isAdminArea) return "municipality";
  if (hasHouseNumber) return "exact";
  if (isStreet || isAreaish) return "approximate";
  return "exact"; // POI con nombre propio (coliseo, universidad, plazoleta, centro comercial)
}

/** Consulta de respaldo cuando la dirección completa no resuelve. */
export function municipalityQuery(municipality: string, department: string): string {
  return `${municipality}, ${department}, Colombia`;
}

/** Consulta por defecto para una dirección colombiana. */
export function addressQuery(address: string, municipality: string, department: string): string {
  return `${address}, ${municipality}, ${department}, Colombia`;
}

type NominatimResponse = Array<{
  lat: string;
  lon: string;
  display_name: string;
  addresstype?: string;
  type?: string;
}>;

/**
 * Devuelve el mejor resultado, o `null` si no hay ninguno utilizable.
 *
 * `revalidate` alimenta la Data Cache de Next cuando se llama desde el servidor
 * de la app (Nominatim pide explícitamente que cacheemos). En el script de Node
 * la opción se ignora sin efecto.
 */
export async function searchNominatim(
  query: string,
  options: { timeoutMs?: number; revalidateSeconds?: number } = {},
): Promise<NominatimHit | null> {
  const { timeoutMs = 8000, revalidateSeconds } = options;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "co");
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url, {
    headers: { "User-Agent": NOMINATIM_USER_AGENT, "Accept-Language": "es" },
    signal: AbortSignal.timeout(timeoutMs),
    ...(revalidateSeconds ? { next: { revalidate: revalidateSeconds } } : {}),
  });

  if (!res.ok) {
    console.warn(`[geocoding] HTTP ${res.status} para "${query}"`);
    return null;
  }

  const json = (await res.json()) as NominatimResponse;
  const hit = json[0];
  if (!hit) return null;

  return {
    lat: Number(hit.lat),
    lon: Number(hit.lon),
    displayName: hit.display_name,
    type: hit.addresstype ?? hit.type ?? "unknown",
  };
}
