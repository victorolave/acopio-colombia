"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CenterCard } from "./center-card";
import { VerificationBadge } from "./verification-badge";
import { useGeolocation } from "./use-geolocation";
import { Filters, type FilterState } from "@/components/filters/filters";
import { calculateDistance, formatDistance } from "@/lib/distance";
import { centerAcceptsCategory } from "@/lib/items";
import { googleMapsUrl, wazeUrl } from "@/lib/maps";
import type { CenterWithDistance, CollectionCenter } from "@/lib/types";
import { cn, normalize } from "@/lib/utils";

/**
 * El mapa se carga aparte: en conexiones malas la lista tiene que servir sola.
 */
const CentersMap = dynamic(() => import("@/components/map/centers-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-ink-100 text-sm text-ink-500">
      Cargando mapa…
    </div>
  ),
});

const INITIAL_FILTERS: FilterState = {
  query: "",
  department: "",
  categories: [],
  onlyVerified: false,
};

export function CentersExplorer({ centers }: { centers: CollectionCenter[] }) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const geo = useGeolocation();

  const departments = useMemo(
    () => Array.from(new Set(centers.map((c) => c.department))).sort((a, b) => a.localeCompare(b, "es")),
    [centers],
  );

  const withDistance: CenterWithDistance[] = useMemo(() => {
    const position = geo.position;
    const list = centers.map((center) => ({
      ...center,
      distanceKm: position
        ? calculateDistance(position.latitude, position.longitude, center.latitude, center.longitude)
        : null,
    }));

    if (!position) return list;
    return list.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }, [centers, geo.position]);

  const filtered = useMemo(() => {
    const q = normalize(filters.query.trim());

    return withDistance.filter((center) => {
      if (filters.onlyVerified && center.verification_status !== "verified") return false;
      if (filters.department && center.department !== filters.department) return false;

      if (filters.categories.length > 0) {
        const matches = filters.categories.some((id) =>
          centerAcceptsCategory(center.accepted_items, id),
        );
        if (!matches) return false;
      }

      if (q) {
        const haystack = normalize(
          [center.name, center.organization, center.municipality, center.department, center.address]
            .filter(Boolean)
            .join(" "),
        );
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [withDistance, filters]);

  const selected = filtered.find((c) => c.slug === selectedSlug) ?? null;

  return (
    <div className="space-y-4">
      {/* Ubicación ---------------------------------------------------------- */}
      <div className="rounded-xl border border-ink-100 bg-white p-4">
        {geo.status === "granted" ? (
          <p className="text-sm text-ink-700">
            <span aria-hidden="true">📍</span> Mostrando centros ordenados por cercanía.{" "}
            <span className="text-ink-500">Tu ubicación no se almacena.</span>
          </p>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={geo.request}
              disabled={geo.status === "requesting"}
              className="rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {geo.status === "requesting" ? "Buscando tu ubicación…" : "📍 Ver centros cerca de mí"}
            </button>
            <p className="text-sm text-ink-500">
              Tu ubicación se usa únicamente para mostrarte centros cercanos y no se almacena.
            </p>
          </div>
        )}
        {geo.message && (
          <p role="status" className="mt-2 text-sm text-caution-700">
            {geo.message}
          </p>
        )}
      </div>

      <Filters
        value={filters}
        onChange={setFilters}
        departments={departments}
        resultCount={filtered.length}
      />

      {/* Alternador móvil --------------------------------------------------- */}
      <div className="flex rounded-lg border border-ink-300 bg-white p-1 lg:hidden" role="tablist">
        {(["list", "map"] as const).map((mode) => (
          <button
            key={mode}
            role="tab"
            aria-selected={view === mode}
            onClick={() => setView(mode)}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition",
              view === mode ? "bg-brand-600 text-white" : "text-ink-700",
            )}
          >
            {mode === "list" ? "Lista" : "Mapa"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        {/* Mapa ------------------------------------------------------------- */}
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border border-ink-100 bg-white",
            "h-[55vh] min-h-80 lg:sticky lg:top-4 lg:h-[calc(100dvh-8rem)]",
            view === "map" ? "block" : "hidden lg:block",
          )}
        >
          <CentersMap
            centers={filtered}
            userPosition={geo.position}
            selectedSlug={selectedSlug}
            onSelect={setSelectedSlug}
          />

          {selected && (
            <div className="absolute inset-x-2 bottom-2 rounded-xl border border-ink-100 bg-white p-4 shadow-lg">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-ink-900">{selected.name}</h3>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(null)}
                  aria-label="Cerrar detalle del centro"
                  className="rounded p-1 text-ink-500 hover:bg-ink-50"
                >
                  ✕
                </button>
              </div>
              <p className="mt-1 text-sm text-ink-500">
                {selected.address} · {selected.municipality}, {selected.department}
              </p>
              <div className="mt-2">
                <VerificationBadge status={selected.verification_status} />
              </div>
              {selected.accepted_items.length > 0 && (
                <p className="mt-2 text-sm text-ink-700">
                  <span className="font-medium">Reciben: </span>
                  {selected.accepted_items.slice(0, 4).join(", ")}
                </p>
              )}
              {selected.distanceKm !== null && (
                <p className="mt-1 text-sm font-medium text-ink-700">
                  A {formatDistance(selected.distanceKm)} de ti
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={googleMapsUrl(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Cómo llegar
                </a>
                <a
                  href={wazeUrl(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-ink-300 px-3 py-2 text-sm font-medium text-ink-700"
                >
                  Waze
                </a>
                <Link
                  href={`/centros/${selected.slug}`}
                  className="rounded-lg border border-ink-300 px-3 py-2 text-sm font-medium text-ink-700"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Lista ------------------------------------------------------------ */}
        <div className={cn("space-y-3", view === "list" ? "block" : "hidden lg:block")}>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink-300 bg-white p-8 text-center">
              <p className="font-medium text-ink-700">No encontramos centros con esos filtros.</p>
              <p className="mt-1 text-sm text-ink-500">
                Prueba con otro departamento o quita algún filtro. Si conoces un centro activo,{" "}
                <Link href="/registrar" className="text-brand-700 underline underline-offset-2">
                  regístralo aquí
                </Link>
                .
              </p>
            </div>
          ) : (
            filtered.map((center) => <CenterCard key={center.slug} center={center} />)
          )}
        </div>
      </div>
    </div>
  );
}
