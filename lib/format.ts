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

/** Momento del sismo, en hora de Bogotá. */
export const EVENT_AT = "2026-08-10T07:34:00-05:00";

export type Freshness = "fresh" | "aging" | "stale";

/**
 * Cuántas horas aguanta una verificación antes de considerarse vieja.
 *
 * Era una constante de 48 h, y eso tiene un problema que solo se ve con el
 * calendario en la mano: todos los centros del seed se verificaron el mismo
 * día, así que con un único corte binario las 94 tarjetas cambian de estado a
 * la vez y el aviso deja de distinguir nada. Una advertencia universal se lee
 * igual que ninguna.
 *
 * Escalonar por fase de la emergencia NO elimina ese efecto —solo la
 * reverificación lo hace— pero reparte el aviso en tres niveles en lugar de
 * encender 94 alarmas idénticas, y ajusta la exigencia al momento: en la fase
 * aguda los puntos abren y cierran el mismo día; dos semanas después, un dato
 * de anteayer sigue sirviendo.
 */
export function staleAfterHours(now: Date = new Date()): number {
  const days = (now.getTime() - new Date(EVENT_AT).getTime()) / 86_400_000;
  if (days <= 3) return 24;
  if (days <= 10) return 48;
  return 96;
}

export function freshness(iso: string | null, now: Date = new Date()): Freshness {
  if (!iso) return "stale";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "stale";

  const hours = (now.getTime() - date.getTime()) / 3_600_000;
  const limit = staleAfterHours(now);
  if (hours > limit) return "stale";
  if (hours > limit / 2) return "aging";
  return "fresh";
}

export function isStale(iso: string | null, now: Date = new Date()): boolean {
  return freshness(iso, now) === "stale";
}

/** ¿La campaña ya terminó según su fecha de cierre? */
export function hasEnded(endsAt: string | null, now: Date = new Date()): boolean {
  if (!endsAt) return false;
  const date = new Date(`${endsAt}T23:59:59-05:00`);
  if (Number.isNaN(date.getTime())) return false;
  return now.getTime() > date.getTime();
}
