"use client";

import { useCallback, useState } from "react";

export type UserPosition = { latitude: number; longitude: number };

export type GeolocationState = {
  status: "idle" | "requesting" | "granted" | "denied" | "unavailable";
  position: UserPosition | null;
  message: string | null;
};

/**
 * PRIVACIDAD: la ubicación vive únicamente en memoria, en este estado de React.
 * No se persiste, no se envía al servidor y no entra en analítica.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: "idle",
    position: null,
    message: null,
  });

  const request = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({
        status: "unavailable",
        position: null,
        message: "Tu navegador no permite compartir la ubicación. Busca tu ciudad manualmente.",
      });
      return;
    }

    setState((prev) => ({ ...prev, status: "requesting", message: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setState({
          status: "granted",
          position: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
          message: null,
        }),
      (error) =>
        setState({
          status: error.code === error.PERMISSION_DENIED ? "denied" : "unavailable",
          position: null,
          message:
            error.code === error.PERMISSION_DENIED
              ? "No pudimos acceder a tu ubicación. Busca tu ciudad para ver los centros cercanos."
              : "No pudimos obtener tu ubicación en este momento. Busca tu ciudad manualmente.",
        }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  return { ...state, request };
}
