"use client";

import { track } from "@vercel/analytics";

/**
 * Lista CERRADA de eventos. No se mide nada fuera de esta lista.
 *
 * La única propiedad permitida es el `slug` del centro, que es información
 * pública. Nunca se envían datos del visitante: ni ubicación, ni texto de
 * búsqueda, ni datos de contacto de los formularios.
 */
export type AnalyticsEvent =
  | "view_center"
  | "click_directions"
  | "click_whatsapp"
  | "submit_center"
  | "report_center";

export function trackEvent(event: AnalyticsEvent, centerSlug?: string) {
  track(event, centerSlug ? { center: centerSlug } : undefined);
}
