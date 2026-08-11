import { NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  addressQuery,
  classifyPrecision,
  insideColombia,
  municipalityQuery,
  searchNominatim,
  type GeocodePrecision,
} from "@/lib/geocoding";

/**
 * Encuadra el mapa de /registrar a partir de la dirección escrita.
 *
 * NO decide la ubicación del centro: devuelve un punto de partida para mover la
 * cámara y soltar un pin provisional. La persona sigue siendo responsable de
 * arrastrar el pin hasta la entrada. `scripts/geocode.ts` documenta con detalle
 * por qué no confiamos en este servicio para fijar coordenadas publicables:
 * resuelve mal la nomenclatura colombiana y a veces devuelve un punto errado
 * con apariencia de alta confianza.
 */

const schema = z.object({
  address: z.string().trim().min(3, "Escribe la dirección.").max(240),
  municipality: z.string().trim().min(2, "Escribe el municipio.").max(120),
  department: z.string().trim().min(2, "Selecciona el departamento.").max(120),
});

type Found = {
  found: true;
  latitude: number;
  longitude: number;
  displayName: string;
  precision: GeocodePrecision;
};

export async function POST(request: Request) {
  const ip = clientIp(request);

  const perClient = rateLimit(`geocode:${ip}`, 30, 3600);
  if (!perClient.allowed) {
    return NextResponse.json(
      { error: "Demasiadas búsquedas desde esta conexión. Marca el punto en el mapa a mano." },
      { status: 429, headers: { "Retry-After": String(perClient.retryAfterSeconds) } },
    );
  }

  // Cortesía con Nominatim (pide máx. 1 req/s). El contador es por instancia, así
  // que en serverless el techo real es más laxo; ver la nota en lib/rate-limit.ts.
  const global = rateLimit("geocode:global", 40, 60);
  if (!global.allowed) {
    return NextResponse.json(
      { error: "El buscador de direcciones está saturado. Marca el punto en el mapa a mano." },
      { status: 503, headers: { "Retry-After": String(global.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Revisa la dirección." },
      { status: 400 },
    );
  }

  const { address, municipality, department } = parsed.data;

  try {
    const direct = await searchNominatim(addressQuery(address, municipality, department), {
      revalidateSeconds: 86400,
    });

    if (direct && insideColombia(direct.lat, direct.lon)) {
      return NextResponse.json<Found>({
        found: true,
        latitude: Number(direct.lat.toFixed(6)),
        longitude: Number(direct.lon.toFixed(6)),
        displayName: direct.displayName,
        precision: classifyPrecision(direct),
      });
    }

    // Respaldo: si la dirección no resuelve, al menos encuadramos el municipio.
    // Es mejor que dejar a la persona haciendo zoom desde el país entero.
    const fallback = await searchNominatim(municipalityQuery(municipality, department), {
      revalidateSeconds: 86400,
    });

    if (fallback && insideColombia(fallback.lat, fallback.lon)) {
      return NextResponse.json<Found>({
        found: true,
        latitude: Number(fallback.lat.toFixed(6)),
        longitude: Number(fallback.lon.toFixed(6)),
        displayName: fallback.displayName,
        precision: "municipality",
      });
    }

    return NextResponse.json({ found: false });
  } catch (error) {
    console.error("[geocode] falló la consulta:", error);
    return NextResponse.json(
      { error: "No pudimos buscar la dirección. Marca el punto en el mapa a mano." },
      { status: 502 },
    );
  }
}
