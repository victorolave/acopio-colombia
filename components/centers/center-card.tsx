"use client";

import Link from "next/link";
import { IconCheck, IconAlert, IconClock, IconPhone, IconRoute } from "@/components/ui/icons";
import { trackEvent } from "@/lib/analytics";
import { formatDistance } from "@/lib/distance";
import { relativeTime } from "@/lib/format";
import { googleMapsUrl, telUrl } from "@/lib/maps";
import { tripAdvisory } from "@/lib/schedule";
import type { CenterWithDistance } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  center: CenterWithDistance;
  selected?: boolean;
  onSelect?: (slug: string) => void;
};

/**
 * Tarjeta pensada para ESCANEAR, no para leer.
 *
 * La versión anterior metía 354 caracteres por tarjeta: nombre, dirección,
 * organización, necesidades urgentes, cinco artículos, horario, fecha de
 * verificación y enlace. Con 70 centros, encontrar el adecuado exigía leerlo
 * todo. Aquí se deja lo que decide —distancia, nombre, municipio, estado y
 * dos o tres cosas que recibe— y el resto vive en la ficha.
 *
 * Las acciones van EN la tarjeta: quien ya decidió no debería tener que entrar
 * al detalle solo para tocar «Cómo llegar».
 */
export function CenterCard({ center, selected, onSelect }: Props) {
  const distance = formatDistance(center.distanceKm);
  const updated = relativeTime(center.last_verified_at);
  const advisory = tripAdvisory(center);
  const verified = center.verification_status === "verified";

  const items = center.urgent_needs.length > 0 ? center.urgent_needs : center.accepted_items;

  return (
    <article
      onClick={() => onSelect?.(center.slug)}
      className={cn(
        "rounded-xl border bg-white transition-colors",
        selected ? "border-brand-600 ring-1 ring-brand-600" : "border-ink-100",
      )}
    >
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-[15px] font-semibold leading-snug text-ink-900">
            <Link href={`/centros/${center.slug}`} className="hover:underline">
              {center.name}
            </Link>
          </h3>
          {distance && (
            <span className="shrink-0 rounded-lg bg-ink-50 px-2 py-1 text-sm font-semibold tabular-nums text-ink-900">
              {distance}
            </span>
          )}
        </div>

        <p className="mt-0.5 truncate text-sm text-ink-500">
          {center.address} · {center.municipality}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              verified ? "text-brand-700" : "text-caution-700",
            )}
          >
            {verified ? <IconCheck className="size-3.5" /> : <IconAlert className="size-3.5" />}
            {verified ? "Verificado" : "Reportado"}
          </span>
          <span aria-hidden="true" className="text-ink-300">
            ·
          </span>
          <span className="truncate text-xs text-ink-500">
            {items.slice(0, 3).join(" · ")}
          </span>
        </div>

        {/* El horario decide el viaje más que la distancia: un centro que cierra
            a las 4 es inútil a las 5. Cuando la fuente no lo publicó se dice
            así, en lugar de callarlo o de disfrazar de dato un «consultar». */}
        <p
          className={cn(
            "mt-1.5 flex items-start gap-1.5 text-xs",
            advisory.level === "ok" && "text-ink-700",
            advisory.level === "caution" && "text-caution-700",
            advisory.level === "warning" && "font-medium text-caution-700",
          )}
        >
          {advisory.level === "ok" ? (
            <IconClock className="mt-px size-3.5 shrink-0" />
          ) : (
            <IconAlert className="mt-px size-3.5 shrink-0" />
          )}
          <span className="min-w-0 truncate">{advisory.short}</span>
        </p>

        {updated && <p className="mt-1 text-xs text-ink-500">Verificado {updated}</p>}
      </div>

      {/* Acciones directas. Altura 44px para cumplir el objetivo táctil mínimo. */}
      <div className="flex items-stretch border-t border-ink-100 text-sm font-medium">
        <a
          href={googleMapsUrl(center)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            trackEvent("click_directions", center.slug);
          }}
          className="flex min-h-11 flex-1 items-center justify-center gap-1.5 text-brand-700 active:bg-brand-50"
        >
          <IconRoute className="size-4" />
          Cómo llegar
        </a>
        {center.phone && (
          <a
            href={telUrl(center.phone)}
            onClick={(e) => e.stopPropagation()}
            className="flex min-h-11 flex-1 items-center justify-center gap-1.5 border-l border-ink-100 text-ink-700 active:bg-ink-50"
          >
            <IconPhone className="size-4" />
            Llamar
          </a>
        )}
        <Link
          href={`/centros/${center.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="flex min-h-11 flex-1 items-center justify-center border-l border-ink-100 text-ink-700 active:bg-ink-50"
        >
          Detalles
        </Link>
      </div>
    </article>
  );
}
