import type { CollectionCenter } from "./types";

/**
 * Enlaces profundos hacia navegadores externos. No construimos navegación propia.
 *
 * DECISIÓN IMPORTANTE: cuando el pin es aproximado (la mayoría de las direcciones
 * colombianas no resuelven con exactitud contra OpenStreetMap), enviamos a Google
 * Maps la DIRECCIÓN EN TEXTO en lugar de las coordenadas. El buscador de Google
 * interpreta la nomenclatura local mucho mejor que nuestro geocodificador, así que
 * es más probable que la persona llegue al sitio correcto.
 */

export function googleMapsUrl(center: CollectionCenter): string {
  if (center.location_precision === "exact") {
    return `https://www.google.com/maps/search/?api=1&query=${center.latitude},${center.longitude}`;
  }
  const query = [center.name, center.address, center.municipality, center.department, "Colombia"]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function wazeUrl(center: CollectionCenter): string {
  // Waze no tiene búsqueda por texto tan fiable: siempre navega por coordenadas,
  // pero avisamos en la interfaz cuando el pin es aproximado.
  return `https://waze.com/ul?ll=${center.latitude},${center.longitude}&navigate=yes`;
}

export function whatsappUrl(rawNumber: string, message?: string): string {
  const digits = rawNumber.replace(/\D/g, "");
  const withCountryCode = digits.startsWith("57") ? digits : `57${digits}`;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${withCountryCode}${text}`;
}

export function telUrl(rawNumber: string): string {
  return `tel:${rawNumber.replace(/[^\d+]/g, "")}`;
}

export const DEFAULT_MAP_STYLE =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL || "https://tiles.openfreemap.org/styles/liberty";

/** Encuadre inicial: Colombia continental. */
export const COLOMBIA_CENTER: [number, number] = [-74.2, 4.6];
export const COLOMBIA_ZOOM = 4.6;
