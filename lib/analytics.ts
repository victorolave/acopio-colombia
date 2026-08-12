"use client";

import { track } from "@vercel/analytics";
import type { EvidenceKind } from "@/lib/validation";

/**
 * Lista CERRADA de eventos. No se mide nada fuera de esta lista.
 *
 * Solo se permiten DOS propiedades, ambas de valor acotado y ninguna del
 * visitante:
 *   - `center`:   el slug del centro, que es información pública.
 *   - `evidence`: cuál de las pruebas acompañó a un envío ("url" | "contact" |
 *                 "both"). Nunca el enlace ni el contacto en sí.
 *
 * Nunca se envían datos del visitante: ni ubicación, ni texto de búsqueda, ni
 * datos de contacto de los formularios.
 */
export type AnalyticsEvent =
  | "view_center"
  | "click_directions"
  | "click_whatsapp"
  | "view_register"
  | "start_register"
  | "submit_center"
  | "report_center";

export function trackEvent(event: AnalyticsEvent, centerSlug?: string) {
  track(event, centerSlug ? { center: centerSlug } : undefined);
}

/**
 * Envío completado. Va aparte de `trackEvent` porque es el único que lleva la
 * propiedad `evidence`, y así el tipo impide mandarla en cualquier otro evento.
 *
 * Con `view_register` → `start_register` → `submit_center` se lee el embudo
 * completo: si la gente no llega, el problema es de alcance; si llega y no
 * empieza, es del encuadre; si empieza y no envía, es de fricción. Sin esos
 * tres eventos las tres enfermedades se ven iguales.
 */
export function trackSubmitCenter(evidence: EvidenceKind) {
  track("submit_center", { evidence });
}
