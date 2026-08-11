"use client";

import { useState } from "react";
import { googleMapsUrl, wazeUrl } from "@/lib/maps";
import type { CollectionCenter } from "@/lib/types";

/**
 * No construimos navegación propia: abrimos Google Maps o Waze.
 * Cuando el pin es aproximado, googleMapsUrl envía la dirección en texto,
 * que Google interpreta mejor que nuestras coordenadas.
 */
export function DirectionsButton({ center }: { center: CollectionCenter }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full rounded-lg bg-brand-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-brand-700"
      >
        📍 Cómo llegar
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-lg border border-ink-300 bg-white shadow-lg">
          <a
            href={googleMapsUrl(center)}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 text-ink-700 hover:bg-ink-50"
          >
            Google Maps
          </a>
          <a
            href={wazeUrl(center)}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-ink-100 px-4 py-3 text-ink-700 hover:bg-ink-50"
          >
            Waze
          </a>
          {center.location_precision !== "exact" && (
            <p className="border-t border-ink-100 bg-caution-50 px-4 py-2 text-xs text-caution-700">
              El punto exacto no está confirmado. Google Maps abrirá la búsqueda por dirección; Waze usará
              una ubicación aproximada.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
