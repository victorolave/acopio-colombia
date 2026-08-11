const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/**
 * Distancia Haversine en kilómetros (línea recta, no recorrido vial).
 *
 * Para decenas o cientos de centros esto es suficiente y evita PostGIS.
 * Si algún día el proyecto maneja miles de puntos, migrar a una búsqueda
 * geográfica en base de datos.
 */
export function calculateDistance(
  userLatitude: number,
  userLongitude: number,
  centerLatitude: number,
  centerLongitude: number,
): number {
  const dLat = toRadians(centerLatitude - userLatitude);
  const dLon = toRadians(centerLongitude - userLongitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(userLatitude)) *
      Math.cos(toRadians(centerLatitude)) *
      Math.sin(dLon / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.asin(Math.sqrt(a));
}

export function formatDistance(km: number | null): string | null {
  if (km === null || !Number.isFinite(km)) return null;
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}
