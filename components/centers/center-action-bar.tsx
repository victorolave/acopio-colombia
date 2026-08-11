"use client";

import { useEffect, useState } from "react";
import { IconChat, IconClose, IconPhone, IconRoute } from "@/components/ui/icons";
import { trackEvent } from "@/lib/analytics";
import { googleMapsUrl, telUrl, wazeUrl, whatsappUrl } from "@/lib/maps";
import type { CollectionCenter } from "@/lib/types";

/**
 * Barra de acciones de la ficha.
 *
 * En móvil va fija abajo: quien abre la ficha de un centro ya decidió a dónde
 * va, y «Cómo llegar» no debería depender de dónde quedó el scroll. Además es
 * la zona que alcanza el pulgar con una sola mano.
 *
 * El selector Maps/Waze era antes un desplegable posicionado en absoluto que
 * podía salirse de la pantalla. Ahora es una hoja, que en móvil se cierra
 * tocando fuera y con Escape.
 */
export function CenterActionBar({ center }: { center: CollectionCenter }) {
  const [routeOpen, setRouteOpen] = useState(false);

  useEffect(() => {
    if (!routeOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setRouteOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [routeOpen]);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 backdrop-blur lg:static lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:px-0 lg:pb-3">
          <button
            type="button"
            onClick={() => setRouteOpen(true)}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 font-semibold text-white active:bg-brand-700"
          >
            <IconRoute className="size-5" />
            Cómo llegar
          </button>

          {center.whatsapp && (
            <a
              href={whatsappUrl(center.whatsapp, `Hola, escribo por el centro de acopio ${center.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", center.slug)}
              aria-label={`Escribir por WhatsApp a ${center.name}`}
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-ink-300 text-ink-700 active:bg-ink-50"
            >
              <IconChat />
            </a>
          )}
          {center.phone && (
            <a
              href={telUrl(center.phone)}
              aria-label={`Llamar a ${center.name} al ${center.phone}`}
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-ink-300 text-ink-700 active:bg-ink-50"
            >
              <IconPhone />
            </a>
          )}
        </div>
      </div>

      {routeOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setRouteOpen(false)}
            className="absolute inset-0 bg-ink-900/50"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-ruta"
            className="relative w-full rounded-t-2xl bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:max-w-sm sm:rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 id="titulo-ruta" className="text-base font-semibold text-ink-900">
                Abrir en
              </h2>
              <button
                type="button"
                onClick={() => setRouteOpen(false)}
                aria-label="Cerrar"
                className="grid size-11 place-items-center rounded-lg text-ink-500 active:bg-ink-50"
              >
                <IconClose />
              </button>
            </div>

            <div className="mt-2 space-y-2">
              <a
                href={googleMapsUrl(center)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_directions", center.slug)}
                className="flex min-h-12 items-center rounded-xl border border-ink-300 px-4 font-medium text-ink-900 active:bg-ink-50"
              >
                Google Maps
              </a>
              <a
                href={wazeUrl(center)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_directions", center.slug)}
                className="flex min-h-12 items-center rounded-xl border border-ink-300 px-4 font-medium text-ink-900 active:bg-ink-50"
              >
                Waze
              </a>
            </div>

            {center.location_precision !== "exact" && (
              <p className="mt-3 rounded-xl bg-caution-50 p-3 text-xs text-caution-700">
                El punto exacto no está confirmado. Google Maps abrirá la búsqueda por dirección;
                Waze usará una ubicación aproximada.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
