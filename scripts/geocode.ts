/**
 * Geocodifica los centros del seed usando Nominatim (OpenStreetMap).
 *
 *   npx tsx scripts/geocode.ts                      → TODOS los centros
 *   npx tsx scripts/geocode.ts --only slug-a,slug-b → solo esos
 *   npx tsx scripts/geocode.ts --missing            → solo los que no tienen coordenada
 *
 * Escribe data/coordinates.json fusionando sobre lo existente: los slugs que no
 * entran en esta pasada conservan su entrada intacta.
 *
 * POR QUÉ EXISTEN `--only` Y `--missing`. La pasada completa reescribe las 100+
 * entradas, y `docs/sources.md` §3.g documenta el riesgo: varios pines se
 * afinaron a mano y una pasada ciega los devolvía a la posición equivocada. Hoy
 * `MANUAL_OVERRIDES` los protege, pero sigue habiendo dos motivos para acotar:
 * cada centro cuesta ~2 segundos de espera por la política de uso de Nominatim,
 * y el resultado se revisa a mano uno por uno —revisar 17 líneas es viable,
 * revisar 128 no lo es, y una revisión que no se hace es una revisión que miente.
 *
 * El resultado se revisa VISUALMENTE antes de publicar: Nominatim no siempre
 * resuelve la nomenclatura colombiana (carrera/calle/diagonal) y puede caer en
 * el centroide del municipio.
 *
 * Nunca se geocodifica desde el cliente ni en cada build.
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { SEED_CENTERS } from "../data/centers";
import {
  addressQuery,
  classifyPrecision,
  insideColombia,
  municipalityQuery,
  searchNominatim,
  type GeocodePrecision,
} from "../lib/geocoding";

// `URL.pathname` produce «/C:/…» en Windows y rompe la escritura; fileURLToPath
// resuelve la ruta nativa en cualquier sistema operativo.
const OUT = fileURLToPath(new URL("../data/coordinates.json", import.meta.url));

type Precision = GeocodePrecision | "failed";

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
  // Cayó en el centroide de Envigado. La nomenclatura «39 sur» del Valle de
  // Aburrá no resuelve en OSM; se intenta primero la oficina como POI y luego
  // la vía, antes de rendirse al municipio.
  "gestion-del-riesgo-envigado": [
    "Oficina de Gestión del Riesgo, Envigado, Antioquia, Colombia",
    "Carrera 40, Envigado, Antioquia, Colombia",
  ],
  // Cayó en el CENTROIDE DE BOGOTÁ (~4.653), a unos 10 km al sur del punto real.
  // La Calle 161A es una vía corta del extremo norte y OSM no la resuelve. Un
  // pin así de errado en un centro «verificado» es el peor modo de fallo del
  // proyecto, así que se ancla a Usaquén y se degrada la precisión.
  "usaquen-usaquen-vl0m": [
    "Calle 161A, Usaquén, Bogotá, Colombia",
    "Calle 161, Usaquén, Bogotá, Colombia",
    "Usaquén, Bogotá, Colombia",
  ],
  // AMBIGÜEDAD RESUELTA Y SEDE NUEVA — 14 de agosto de 2026.
  //
  // Historia previa: cayó en el centroide de Medellín; al forzar «Calle 79,
  // Laureles» enganchó un POI llamado «Ginger Cocina» en la CALLE 35 y lo selló
  // `exact` —pin equivocado con alta confianza, el fallo de la iglesia de Santa
  // Marta—. Como la pieza escribía «Laureles 79 #52A-23» sin aclarar si el 79
  // era calle o carrera, se ancló al barrio y se aceptó precisión baja.
  //
  // La propia librería resolvió las dos cosas: era CARRERA 79, y se mudó al
  // barrio LOS COLORES (Carrera 79 #52A-34). Anclar a Laureles ya no solo es
  // impreciso: apunta al barrio equivocado.
  "libreria-rodante-delfos-medellin": [
    "Carrera 79, Los Colores, Medellín, Antioquia, Colombia",
    "Los Colores, Medellín, Antioquia, Colombia",
  ],
  // TRASLADO — 14 de agosto de 2026. «Carrera 81 # 33AA-08» no resuelve y cae en
  // el centroide de Medellín. La referencia que publica la propia cuenta —la
  // iglesia de Santa Gema— sí es un POI localizable, y el barrio Santa Gema
  // acota bastante más que la ciudad.
  "bodega-guayaquiliando-medellin": [
    "Carrera 81, Santa Gema, Medellín, Antioquia, Colombia",
    "Iglesia Santa Gema, Medellín, Antioquia, Colombia",
    "Santa Gema, Medellín, Antioquia, Colombia",
  ],
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

  // --- Altas del 14 de agosto de 2026 ---------------------------------------
  // Los cinco que fallaron la revisión visual de la primera pasada.

  // «Avenida Carrera 24 # 39-29» cayó en el centroide de Bogotá. El Park Way es
  // un eje conocido de Teusaquillo y OSM sí lo tiene por nombre.
  "tigresas-bogota-park-way": [
    "Park Way, Teusaquillo, Bogotá, Colombia",
    "Avenida Carrera 24, Teusaquillo, Bogotá, Colombia",
  ],
  // «Carrera 31 # 41A-50» cayó en el centroide del municipio.
  "tigresas-villavicencio": ["Carrera 31, Villavicencio, Meta, Colombia"],
  // Mismo fallo que `acsc-cucuta` (§5.3): el centroide del municipio de Cúcuta
  // incluye zona rural y queda ~20 km al norte del casco urbano.
  "tigresas-cucuta-zona-industrial": [
    "Calle 17N, Cúcuta, Norte de Santander, Colombia",
    "Zona Industrial, Cúcuta, Norte de Santander, Colombia",
  ],
  // Cayó en el centroide de Pereira; la Avenida del Sur es un eje identificable.
  "tigresas-pereira-mercasa": [
    "Mercasa, Pereira, Risaralda, Colombia",
    "Avenida del Sur, Pereira, Risaralda, Colombia",
  ],
  // Resolvía al MISMO punto de «Calle 69, El Recreo» que
  // `tigresas-monteria-centro-solidaridad`, dejando dos pines apilados — el
  // problema que ya hubo que corregir en Cartagena. La nomenclatura «#1C-92»
  // sitúa este en el cruce con la Carrera 1C, junto al Sinú.
  "tigresas-monteria-norte-calle-69": [
    "Calle 69 con Carrera 1C, Montería, Córdoba, Colombia",
    "Carrera 1C, Montería, Córdoba, Colombia",
  ],
};

/**
 * Correcciones manuales aplicadas DESPUÉS de geocodificar, tras revisar los resultados uno a uno.
 * Cada entrada explica por qué el geocodificador falló. Se aplican siempre.
 */
const MANUAL_OVERRIDES: Record<string, Pick<Entry, "latitude" | "longitude" | "precision"> & { why: string }> = {
  "tigresas-bogota-park-way": {
    // El QUERY_OVERRIDE lo rescató del centroide de Bogotá y cayó bien: dentro
    // del Park Way, Teusaquillo. Pero Nominatim devolvió el POLÍGONO DE LA UPZ
    // con nombre propio, y el clasificador lo selló `exact`.
    //
    // Es el modo de fallo de §5.4 —pin con etiqueta de confianza más alta que la
    // evidencia—, el mismo que ya mordió en la iglesia de Santa Marta y en
    // Delfos. El área es correcta; el número de la casa (Av. Carrera 24 #39-29)
    // NO está corroborado por este resultado. Subir el sello de un centro no es
    // motivo para subir la precisión de su pin: son dos ejes distintos.
    latitude: 4.63202,
    longitude: -74.075035,
    precision: "approximate",
    why: "El resultado es el polígono de la UPZ Park Way, no la dirección: orienta bien pero no corrobora la nomenclatura. La navegación va por dirección en texto.",
  },
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

  "usaquen-usaquen-vl0m": {
    // El QUERY_OVERRIDE de arriba lo rescató del centroide de Bogotá, pero lo
    // dejó en el centroide de la Calle 161A (Villa Magdala), todavía a 2,4 km
    // del punto real. En un centro `verified` de la Alcaldía Mayor eso es el
    // peor modo de fallo del proyecto: sello de alta confianza sobre un pin que
    // manda a la gente a otro barrio.
    //
    // Se fija con la ficha de Google Maps de la dirección exacta que ya
    // publicamos, «Cl. 161a #7 F 55»: el pin CORROBORA la dirección impresa, así
    // que se sella `exact` sin que ficha y navegación se contradigan.
    latitude: 4.737079,
    longitude: -74.026046,
    precision: "exact",
    why: "El pin de Google corrobora la Calle 161A #7F-55; el centroide de la vía quedaba a 2,4 km en un centro verificado.",
  },

  // ---------------------------------------------------------------------------
  // Pines tomados de la lista colaborativa de Google Maps «Puntos de acopio MDE /
  // Compás Urbano» (2026-08-11), extraída del endpoint interno de listas.
  //
  // ALCANCE, Y ES UNA LÍNEA QUE NO SE CRUZA: esa lista es un tercero sin fuente
  // por pin, así que NO sirve para afirmar que un centro existe ni para mover un
  // `verificationStatus`. Se usa ÚNICAMENTE como GEOMETRÍA de centros que ya
  // teníamos sustentados por su propia fuente. La pregunta que responde no es
  // «¿este sitio recibe donaciones?» sino «¿dónde queda el sitio que ya
  // confirmamos por otro lado?».
  //
  // Criterio para el grado de precisión, porque `exact` no es cosmético: según
  // lib/maps.ts, un pin `exact` hace que «Cómo llegar» mande COORDENADAS a Google
  // Maps en vez de la dirección en texto, y eso elimina el fallback que hoy salva
  // a la nomenclatura colombiana. Entonces:
  //   - `exact`       → el pin corrobora la dirección que YA publicamos, o es un
  //                     POI con nombre propio a menos de 300 m del punto actual.
  //   - `approximate` → POI con nombre propio pero lejos de la dirección impresa.
  //                     Se mejora la coordenada y se conserva el fallback textual,
  //                     porque ficha y navegación no pueden contradecirse.
  // ---------------------------------------------------------------------------

  "simon-coffee-medellin": {
    // Nominatim cayó en el centroide de la Carrera 37. El pin es el POI «Simón
    // Coffee», a 234 m: mismo nombre propio, marca única en la ciudad.
    latitude: 6.209586,
    longitude: -75.566377,
    precision: "exact",
    why: "POI con nombre propio en Google Maps; Nominatim solo resolvía el centroide de la Carrera 37.",
  },
  "fundacion-el-arte-de-los-suenos-medellin": {
    // Centroide de la Carrera 48 → POI homónimo a 179 m, dentro del Perpetuo Socorro.
    latitude: 6.236355,
    longitude: -75.572418,
    precision: "exact",
    why: "POI con nombre propio en Google Maps, coherente con la dirección del Perpetuo Socorro.",
  },
  "gestion-del-riesgo-envigado": {
    // Único centro `verified` del Valle de Aburrá, y hasta ahora con pin de vía.
    // El pin de la lista es la dirección «Cra. 40 #39» anotada como «Oficina
    // Gestión del Riesgo de Envigado»: corrobora la dirección que publicamos.
    latitude: 6.167091,
    longitude: -75.586845,
    precision: "exact",
    why: "El pin corrobora la Carrera 40 #39 sur-59 y nombra la oficina; la nomenclatura «39 sur» no resuelve en OSM.",
  },
  "udea-afroudea-medellin": {
    // Ya era `exact`, pero apuntaba al centroide de Ciudad Universitaria. El pin
    // es el bloque 9 «Hernán Henao Delgado», que es literalmente lo que dice el
    // nombre del centro. 272 m de mejora dentro de un campus grande.
    latitude: 6.265728,
    longitude: -75.569724,
    precision: "exact",
    why: "Se pasa del centroide del campus al bloque 9, que es la sede que declara el centro.",
  },
  "restaurante-belisario-medellin": {
    // Nominatim enganchó la Calle 7 en El Tesoro, a 836 m. La lista trae la
    // dirección exacta «Cl. 7 #35-44», la misma que publicamos.
    latitude: 6.206436,
    longitude: -75.565875,
    precision: "exact",
    why: "El pin corrobora la Calle 7 #35-44; Nominatim había resuelto la misma vía en El Tesoro.",
  },
  // `bodega-guayaquiliando-medellin` TENÍA una corrección manual aquí, fijada a
  // 6.266046, -75.595864 y sellada `exact` porque corroboraba «Avenida 80
  // #52-88». Se retiró el 14 de agosto de 2026: **el punto se mudó**. La cuenta
  // que lo opera anunció el 12 de agosto que esa bodega ya no recibe nada.
  //
  // Se anota en vez de borrarse en silencio, por el mismo criterio de §4.6 de
  // `docs/sources.md`: un pin afinado a mano que desaparece sin rastro es un pin
  // que alguien va a volver a «arreglar» hacia atrás. La dirección nueva se
  // geocodifica normal y su precisión sale de la revisión visual, no de aquí.

  "fundacion-saciar-medellin": {
    // POI «Saciar» a 619 m del centroide de la Carrera 50. Mejora clara del pin,
    // pero lejos de la dirección impresa (Carrera 50 #25-261): se queda
    // `approximate` para no romper el enlace por texto de la ficha.
    latitude: 6.228658,
    longitude: -75.576720,
    precision: "approximate",
    why: "POI de Google a 619 m de la dirección publicada: mejora el pin, pero se conserva la navegación por texto.",
  },
  "remanence-medellin": {
    // POI «Remanence Center Store Medellín» a 773 m del centroide de la Calle 10B.
    // Mismo caso que Saciar: mejor pin, distancia demasiado grande frente a la
    // dirección publicada como para sellarlo `exact`.
    latitude: 6.210096,
    longitude: -75.565046,
    precision: "approximate",
    why: "POI de Google a 773 m de la Calle 10B #35-27: mejora el pin, pero se conserva la navegación por texto.",
  },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const existing: Record<string, Entry> = existsSync(OUT)
    ? JSON.parse(readFileSync(OUT, "utf8"))
    : {};

  const onlyArg = process.argv.find((a) => a.startsWith("--only"));
  const onlySlugs = onlyArg
    ? new Set(
        (onlyArg.includes("=") ? onlyArg.split("=")[1] : process.argv[process.argv.indexOf(onlyArg) + 1])
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      )
    : null;
  const onlyMissing = process.argv.includes("--missing");

  let targets = SEED_CENTERS.filter((c) => c.geocodeQuery !== null);

  if (onlySlugs) {
    const known = new Set(SEED_CENTERS.map((c) => c.slug));
    const desconocidos = [...onlySlugs].filter((s) => !known.has(s));
    if (desconocidos.length) {
      // Un slug mal escrito produciría una pasada silenciosamente vacía, y el
      // operador creería que geocodificó algo. Mejor romper aquí.
      console.error(`Slugs que no existen en el seed: ${desconocidos.join(", ")}`);
      process.exit(1);
    }
    targets = targets.filter((c) => onlySlugs.has(c.slug));
  }

  if (onlyMissing) {
    targets = targets.filter((c) => {
      const e = existing[c.slug];
      return !e || e.latitude === null || e.longitude === null || e.precision === "failed";
    });
  }

  const alcance = onlySlugs ? "--only" : onlyMissing ? "--missing" : "TODOS";
  console.log(`Alcance: ${alcance} → ${targets.length} de ${SEED_CENTERS.length} centros\n`);

  if (!targets.length) {
    console.log("Nada que geocodificar.");
    return;
  }

  for (const center of targets) {
    const candidates = [
      ...(QUERY_OVERRIDES[center.slug] ?? []),
      center.geocodeQuery ?? addressQuery(center.address, center.municipality, center.department),
    ];
    const fallback = municipalityQuery(center.municipality, center.department);

    let resolved: Entry | null = null;

    for (const query of candidates) {
      const hit = await searchNominatim(query);
      await sleep(1100); // política de uso de Nominatim: máx. 1 req/s
      if (!hit || !insideColombia(hit.lat, hit.lon)) continue;

      const precision = classifyPrecision(hit);

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
      const hit = await searchNominatim(fallback);
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
