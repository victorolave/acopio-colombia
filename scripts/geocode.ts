/**
 * Geocodifica UNA SOLA VEZ los centros del seed usando Nominatim (OpenStreetMap).
 *
 *   npx tsx scripts/geocode.ts
 *
 * Escribe data/coordinates.json. El resultado se revisa VISUALMENTE antes de
 * publicar: Nominatim no siempre resuelve la nomenclatura colombiana
 * (carrera/calle/diagonal) y puede caer en el centroide del municipio.
 *
 * Nunca se geocodifica desde el cliente ni en cada build.
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { SEED_CENTERS } from "../data/centers";

const OUT = new URL("../data/coordinates.json", import.meta.url).pathname;
const USER_AGENT = "AcopioColombia/0.1 (proyecto ciudadano de emergencia; contacto: acopiocolombia@proton.me)";

// Caja envolvente aproximada de Colombia continental + insular.
const CO_BOUNDS = { minLat: -4.3, maxLat: 13.5, minLon: -82.0, maxLon: -66.8 };

type Precision = "exact" | "approximate" | "municipality" | "failed";

type Entry = {
  slug: string;
  query: string;
  latitude: number | null;
  longitude: number | null;
  displayName: string | null;
  /**
   * exact        → el geocodificador resolvió el número de la vía (o un POI con nombre propio).
   * approximate  → cayó en el centroide de la vía o de un barrio: sirve para orientar, no para navegar.
   * municipality → solo se pudo ubicar el municipio.
   * failed       → sin resultado utilizable; el centro NO se publica con mapa.
   */
  precision: Precision;
};

/**
 * Consultas curadas manualmente tras revisar la primera pasada.
 * Se prueban en orden hasta que una devuelva un resultado utilizable.
 * Motivo de cada override documentado en docs/sources.md.
 */
const QUERY_OVERRIDES: Record<string, string[]> = {
  // Cayó en Ciudad Bolívar (Carrera 24 existe en varias localidades). La sede está en Barrios Unidos.
  "sede-administrativa-cruz-roja-bogota": [
    "Cruz Roja Colombiana Seccional Cundinamarca y Bogotá, Bogotá, Colombia",
    "Carrera 24, Barrios Unidos, Bogotá, Colombia",
  ],
  // Cayó en La Candelaria (Comuna 10); la sede está en Guayabal (Comuna 15).
  "fubam-banco-arquidiocesano-alimentos-medellin": [
    "Banco Arquidiocesano de Alimentos, Medellín, Colombia",
    "Carrera 52, Guayabal, Medellín, Antioquia, Colombia",
  ],
  // Cayó en el corregimiento de Tomarrazón, a ~45 km del casco urbano.
  "acsc-riohacha": ["Calle 7, Centro, Riohacha, La Guajira, Colombia", "Riohacha, La Guajira, Colombia"],
  "acsc-popayan": ["Carrera 9 Norte, Popayán, Cauca, Colombia", "Popayán, Cauca, Colombia"],
  "empresa-licores-cundinamarca": [
    "Empresa de Licores de Cundinamarca, Cota, Colombia",
    "Siberia, Cota, Cundinamarca, Colombia",
  ],
  "banco-alimentos-armenia": ["Armenia, Quindío, Colombia"],
  "banco-alimentos-manizales": ["Manizales, Caldas, Colombia"],
  // Ya no se fuerza al municipio: las piezas de las Tigresas aportaron la
  // dirección exacta (Carrera 4 #23-42, sector Estadio).

  // --- Red de las Tigresas: correcciones tras revisar la primera pasada ------
  // «Carrera 47» resolvió a Teusaquillo (~calle 40); La Castellana está al norte.
  "tigresas-bogota-gaula": ["Carrera 47, La Castellana, Bogotá, Colombia"],
  // «Carrera 7» resolvió a La Candelaria (centro); la 7 con 180 está en el extremo norte.
  "tigresas-bogota-codabas": ["Carrera 7 con Calle 180, Bogotá, Colombia", "Calle 180, Bogotá, Colombia"],
  // «Carrera 15A» resolvió a Los Mártires (centro); la 15A con 122 está en Usaquén.
  "tigresas-bogota-122-plaza": ["Carrera 15A con Calle 122, Bogotá, Colombia", "Calle 122, Bogotá, Colombia"],
  // Los tres puntos de Cartagena caían en el mismo centroide del municipio y
  // quedaban apilados en el mapa. Se separan por barrio, que sí es dato real
  // de la fuente: Bocagrande, Crespo y Ternera son zonas distintas.
  "tigresas-cartagena-perpetuo-socorro": ["Bocagrande, Cartagena de Indias, Bolívar, Colombia"],
  "tigresas-cartagena-cristo-rey": ["Crespo, Cartagena de Indias, Bolívar, Colombia"],
  "tigresas-banco-alimentos-cartagena": ["Ternera, Cartagena de Indias, Bolívar, Colombia"],
  // «Calle 30» resolvió a Bonda, corregimiento rural al oriente de Santa Marta.
  "tigresas-santa-marta-amor-en-accion": ["Calle 30, Centro, Santa Marta, Magdalena, Colombia"],
  "centro-acopio-barranquillita": [
    "Barranquillita, Barranquilla, Atlántico, Colombia",
    "Carrera 43, Barranquilla, Atlántico, Colombia",
  ],
  "antigua-licorera-del-valle-cali": [
    "Antigua Licorera del Valle, Cali, Colombia",
    "Carrera 1, Centro, Cali, Valle del Cauca, Colombia",
  ],
  // "La Rivera, Cúcuta" resolvió a ~20 km al norte del casco urbano. Se usa el centroide del municipio.
  "acsc-cucuta": ["Cúcuta, Norte de Santander, Colombia"],
  // "Carrera 50" resolvió a la Comuna 2 (norte de Medellín); la sede está en el sur (Guayabal/Belén).
  "fundacion-saciar-medellin": [
    "Fundación Saciar, Medellín, Colombia",
    "Carrera 50, Guayabal, Medellín, Antioquia, Colombia",
  ],
  // "Calle 16" y "Calle 24" resolvieron a la zona turística sur (Gaira/Rodadero), no al centro.
  "ogricc-santa-marta": ["Calle 16, Centro, Santa Marta, Magdalena, Colombia"],
  "acsc-santa-marta": ["Calle 24, Centro, Santa Marta, Magdalena, Colombia"],
};

/**
 * Correcciones manuales aplicadas DESPUÉS de geocodificar, tras revisar los resultados uno a uno.
 * Cada entrada explica por qué el geocodificador falló. Se aplican siempre.
 */
const MANUAL_OVERRIDES: Record<string, Pick<Entry, "latitude" | "longitude" | "precision"> & { why: string }> = {
  "acsc-cucuta": {
    // Nominatim devuelve el centroide del MUNICIPIO de Cúcuta, que incluye zona rural
    // y queda ~20 km al norte del casco urbano. Se fija el centro urbano.
    latitude: 7.893909,
    longitude: -72.507821,
    precision: "municipality",
    why: "Centroide administrativo del municipio quedaba a ~20 km del casco urbano; se usa el centro de Cúcuta.",
  },
  "tigresas-santa-marta-amor-en-accion": {
    // Tres consultas distintas resolvieron a Bonda, un corregimiento rural al
    // oriente, y la última llegó a marcarse «exact» por coincidir con un POI
    // con nombre propio. Ese es el caso peligroso: pin equivocado con etiqueta
    // de alta confianza. Se fija el centro de Santa Marta y se degrada.
    latitude: 11.240454,
    longitude: -74.206037,
    precision: "approximate",
    why: "Las consultas resolvían al corregimiento rural de Bonda; se usa el centro de Santa Marta como aproximación.",
  },
  "acsc-santa-marta": {
    // La consulta enganchó un POI ("Hotel Monterrey") sobre la Calle 11, no la Calle 24.
    latitude: 11.240454,
    longitude: -74.206037,
    precision: "approximate",
    why: "El geocodificador devolvió un POI en otra vía; se usa el centro histórico de Santa Marta como aproximación.",
  },
};

/** Municipio de respaldo cuando ninguna consulta resuelve la dirección. */
function municipalityQuery(municipality: string, department: string) {
  return `${municipality}, ${department}, Colombia`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function geocode(query: string): Promise<{ lat: number; lon: number; displayName: string; type: string } | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "co");
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT, "Accept-Language": "es" } });
  if (!res.ok) {
    console.warn(`  ! HTTP ${res.status} para "${query}"`);
    return null;
  }
  const json = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
    addresstype?: string;
    type?: string;
  }>;
  if (!json.length) return null;
  const hit = json[0];
  return {
    lat: Number(hit.lat),
    lon: Number(hit.lon),
    displayName: hit.display_name,
    type: hit.addresstype ?? hit.type ?? "unknown",
  };
}

function insideColombia(lat: number, lon: number) {
  return (
    lat >= CO_BOUNDS.minLat && lat <= CO_BOUNDS.maxLat && lon >= CO_BOUNDS.minLon && lon <= CO_BOUNDS.maxLon
  );
}

async function main() {
  const existing: Record<string, Entry> = existsSync(OUT)
    ? JSON.parse(readFileSync(OUT, "utf8"))
    : {};

  const targets = SEED_CENTERS.filter((c) => c.geocodeQuery !== null);

  for (const center of targets) {
    const candidates = [
      ...(QUERY_OVERRIDES[center.slug] ?? []),
      center.geocodeQuery ?? `${center.address}, ${center.municipality}, ${center.department}, Colombia`,
    ];
    const fallback = municipalityQuery(center.municipality, center.department);

    let resolved: Entry | null = null;

    for (const query of candidates) {
      const hit = await geocode(query);
      await sleep(1100); // política de uso de Nominatim: máx. 1 req/s
      if (!hit || !insideColombia(hit.lat, hit.lon)) continue;

      // Clasificación CONSERVADORA: ante la duda, "approximate".
      // Un pin optimista manda a alguien al lugar equivocado durante una emergencia.
      const isAdminArea = /^(city|town|village|municipality|administrative|state|county)$/.test(hit.type);
      const isAreaish = /^(suburb|neighbourhood|quarter|locality|hamlet|residential)$/.test(hit.type);
      const isStreet = /^(road|primary|secondary|tertiary|unclassified|trunk|living_street)$/.test(hit.type);
      const hasHouseNumber = /^\d+[^,]*,/.test(hit.displayName);

      const precision: Precision = isAdminArea
        ? "municipality"
        : hasHouseNumber
          ? "exact"
          : isStreet || isAreaish
            ? "approximate"
            : "exact"; // POI con nombre propio (coliseo, universidad, plazoleta, centro comercial)

      resolved = {
        slug: center.slug,
        query,
        latitude: Number(hit.lat.toFixed(6)),
        longitude: Number(hit.lon.toFixed(6)),
        displayName: hit.displayName,
        precision,
      };
      break;
    }

    if (!resolved) {
      const hit = await geocode(fallback);
      await sleep(1100);
      resolved =
        hit && insideColombia(hit.lat, hit.lon)
          ? {
              slug: center.slug,
              query: fallback,
              latitude: Number(hit.lat.toFixed(6)),
              longitude: Number(hit.lon.toFixed(6)),
              displayName: hit.displayName,
              precision: "municipality",
            }
          : {
              slug: center.slug,
              query: candidates[0],
              latitude: null,
              longitude: null,
              displayName: null,
              precision: "failed",
            };
    }

    const manual = MANUAL_OVERRIDES[center.slug];
    if (manual) {
      resolved = {
        ...resolved,
        latitude: manual.latitude,
        longitude: manual.longitude,
        precision: manual.precision,
        displayName: `[corrección manual] ${manual.why}`,
      };
    }

    existing[center.slug] = resolved;
    const mark = { exact: "✓", approximate: "~", municipality: "▫", failed: "✗" }[resolved.precision];
    console.log(
      `${mark} ${center.slug} [${resolved.precision}] → ${resolved.latitude ?? "—"}, ${resolved.longitude ?? "—"}  (${(resolved.displayName ?? "sin resultado").slice(0, 60)})`,
    );
  }

  writeFileSync(OUT, JSON.stringify(existing, null, 2) + "\n");
  const failed = Object.values(existing).filter((e) => e.precision === "failed");
  console.log(`\nEscrito ${OUT}`);
  console.log(`Sin resolver: ${failed.length} → ${failed.map((f) => f.slug).join(", ") || "ninguno"}`);
}

main();
