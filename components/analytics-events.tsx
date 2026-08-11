"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Registra la visita a la ficha de un centro. Una sola vez por montaje. */
export function TrackCenterView({ slug }: { slug: string }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent("view_center", slug);
  }, [slug]);

  return null;
}

/**
 * Enlace externo que registra un evento antes de abrirse.
 * Es un enlace real (`<a href>`), no un `onClick` sobre un `div`: sigue
 * funcionando con clic central, "abrir en pestaña nueva" y sin JavaScript.
 */
export function TrackedLink({
  event,
  centerSlug,
  children,
  ...props
}: {
  event: AnalyticsEvent;
  centerSlug?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} onClick={() => trackEvent(event, centerSlug)}>
      {children}
    </a>
  );
}
