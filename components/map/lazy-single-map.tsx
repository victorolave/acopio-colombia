"use client";

import dynamic from "next/dynamic";

/**
 * Envoltura cliente para poder usar `ssr: false`: así MapLibre (~200 kB) sale
 * del bundle inicial de la ficha del centro. La dirección escrita y el botón
 * "Cómo llegar" funcionan aunque el mapa nunca cargue.
 */
const SingleCenterMap = dynamic(() => import("./single-center-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-64 w-full place-items-center bg-ink-100 text-sm text-ink-500">
      Cargando mapa…
    </div>
  ),
});

export default SingleCenterMap;
