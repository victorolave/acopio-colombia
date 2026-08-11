"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/**
 * Analítica de Vercel, envuelta para poder controlar qué se envía.
 *
 * Vercel Analytics no usa cookies ni huella digital del dispositivo, pero aquí
 * medimos con una restricción adicional: `beforeSend` recorta la URL a la ruta
 * y descarta por completo la cadena de consulta.
 *
 * Por qué importa: la portada guarda los filtros y la búsqueda en el estado de
 * React, no en la URL, así que hoy no habría nada sensible que filtrar. Pero si
 * alguien decide más adelante mover los filtros a query params —una refactor
 * razonable— la búsqueda del visitante empezaría a viajar a la analítica sin
 * que nadie lo note. Esto lo impide por construcción.
 *
 * La ubicación del visitante nunca pasa por aquí: vive solo en memoria, en
 * `useGeolocation`, y no entra en la URL.
 */
export function Analytics() {
  return (
    <VercelAnalytics
      beforeSend={(event) => {
        try {
          const url = new URL(event.url);
          return { ...event, url: `${url.origin}${url.pathname}` };
        } catch {
          return event;
        }
      }}
    />
  );
}
