const BOGOTA_TZ = "America/Bogota";

const dateTimeFormatter = new Intl.DateTimeFormat("es-CO", {
  timeZone: BOGOTA_TZ,
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  timeZone: BOGOTA_TZ,
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDateTime(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return dateTimeFormatter.format(date).replace(",", " ·");
}

export function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return dateFormatter.format(date);
}

/** "hace 2 horas", "hace 3 días". Null si no hay fecha. */
export function relativeTime(iso: string | null, now: Date = new Date()): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  const diffMinutes = Math.round((now.getTime() - date.getTime()) / 60000);
  if (diffMinutes < 1) return "hace unos segundos";
  if (diffMinutes < 60) return `hace ${diffMinutes} min`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`;

  const diffDays = Math.round(diffHours / 24);
  return `hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`;
}

/** Umbral a partir del cual pedimos confirmar antes de desplazarse. */
export const STALE_AFTER_HOURS = 48;

export function isStale(iso: string | null, now: Date = new Date()): boolean {
  if (!iso) return true;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return true;
  return now.getTime() - date.getTime() > STALE_AFTER_HOURS * 3600 * 1000;
}

/** ¿La campaña ya terminó según su fecha de cierre? */
export function hasEnded(endsAt: string | null, now: Date = new Date()): boolean {
  if (!endsAt) return false;
  const date = new Date(`${endsAt}T23:59:59-05:00`);
  if (Number.isNaN(date.getTime())) return false;
  return now.getTime() > date.getTime();
}
