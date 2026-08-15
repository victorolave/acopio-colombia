"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CenterCard } from "./center-card";
import { CoverageNudge } from "./coverage-nudge";
import { VolunteerDialog, VolunteerFabButton } from "./volunteer-fab";
import { VolunteerLink } from "@/components/volunteer-callout";
import { useGeolocation } from "./use-geolocation";
import {
  ActiveFilterChips,
  EMPTY_FILTERS,
  FiltersBar,
  FiltersSheet,
  countActiveFilters,
  type FilterState,
} from "@/components/filters/filters";
import { BottomSheet, type SnapPoint } from "@/components/ui/bottom-sheet";
import { IconAlert, IconCrosshair } from "@/components/ui/icons";
import { calculateDistance } from "@/lib/distance";
import { centerAcceptsCategory } from "@/lib/items";
import { canConfirmBeforeGoing } from "@/lib/schedule";
import type { CenterWithDistance, CollectionCenter } from "@/lib/types";
import { normalize } from "@/lib/utils";

const CentersMap = dynamic(() => import("@/components/map/centers-map"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-ink-100" />,
});

/**
 * Un ÚNICO árbol para móvil y escritorio.
 *
 * La primera versión de este rediseño tenía dos ramas, una por tamaño de
 * pantalla, y eso renderizaba la lista dos veces: 140 tarjetas en el HTML en
 * lugar de 70, con cada botón duplicado para los lectores de pantalla. Aquí la
 * diferencia entre móvil y escritorio es solo CSS.
 */
export function CentersExplorer({
  centers,
  staleCount,
}: {
  centers: CollectionCenter[];
  /**
   * Cuántos centros publicados superaron el umbral de frescura.
   *
   * Llega calculado desde el servidor A PROPÓSITO. `isStale()` depende de la
   * hora actual, así que calcularlo aquí daría un número en el render del
   * servidor y potencialmente otro en el del cliente, y React marcaría el
   * desajuste de hidratación. Es exactamente el mismo problema que
   * `CoverageNudge` resuelve con `useSyncExternalStore`; aquí basta con no
   * calcularlo dos veces.
   */
  staleCount: number;
}) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  // Vive aquí, y no dentro del mapa, por la misma razón que `filtersOpen`: el
  // diálogo tiene que renderizarse en la raíz para escapar del contexto de
  // apilamiento del contenedor del mapa. Ver la nota en `volunteer-fab.tsx`.
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [snap, setSnap] = useState<SnapPoint>("half");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  /**
   * Qué tarjeta tiene el puntero encima. Solo existe para el ratón: una lista
   * junto a un mapa sin ningún vínculo visible entre las dos obliga a leer el
   * nombre en la tarjeta y buscarlo a ojo entre 118 chinchetas. Al pasar por
   * encima, su marcador crece.
   *
   * A diferencia de `selectedSlug`, NO mueve el mapa. Encuadrar de nuevo cada
   * vez que el ratón cruza la lista sería mareante, y además impredecible.
   */
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const geo = useGeolocation();

  const departments = useMemo(
    () => Array.from(new Set(centers.map((c) => c.department))).sort((a, b) => a.localeCompare(b, "es")),
    [centers],
  );

  /** Municipios con más centros: el atajo cuando alguien no comparte ubicación. */
  const topCities = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of centers) counts.set(c.municipality, (counts.get(c.municipality) ?? 0) + 1);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([city]) => city);
  }, [centers]);

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
      if (filters.onlyConfirmable && !canConfirmBeforeGoing(center)) return false;
      if (filters.department && center.department !== filters.department) return false;
      if (
        filters.categories.length > 0 &&
        !filters.categories.some((id) => centerAcceptsCategory(center.accepted_items, id))
      ) {
        return false;
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

  /** Al tocar un marcador, la hoja sube y la tarjeta se desplaza a la vista. */
  const selectFromMap = useCallback((slug: string | null) => {
    setSelectedSlug(slug);
    if (slug) setSnap((current) => (current === "peek" ? "half" : current));
  }, []);

  useEffect(() => {
    if (!selectedSlug) return;
    listRef.current
      ?.querySelector(`[data-slug="${selectedSlug}"]`)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedSlug]);

  const locating = geo.status === "requesting";
  const hasLocation = geo.status === "granted";

  return (
    /**
     * `minmax(0, …)` NO es decorativo, es EL arreglo.
     *
     * `grid-cols-[1.1fr_1fr]` compila a `minmax(auto, 1.1fr)`, y ese `auto`
     * significa «no bajes del min-content de la columna». La columna de la lista
     * contiene direcciones con `truncate` —o sea `white-space: nowrap`—, cuyo
     * min-content es la cadena ENTERA: 941 px en el peor centro. Resultado
     * medido en el navegador: la lista se quedaba 971 px y el mapa 129. El mapa
     * de un buscador con mapa era una tira de 129 px en TODA pantalla grande.
     *
     * Con `minmax(0, …)` la pista puede encogerse por debajo de su contenido y
     * el `truncate` hace por fin su trabajo. La lista se fija en un ancho de
     * lectura cómodo y el mapa se queda con todo lo demás, que es el reparto que
     * pide la tarea: el texto no mejora al estirarse, el mapa sí.
     */
    <div className="lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-4 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-5">
      {/* Mapa: pantalla completa bajo la cabecera en móvil, columna fija en escritorio.
          Es el contenedor posicionado del que cuelga `VolunteerFab`: por eso el
          botón puede ser `absolute` y quedarse dentro de la columna en escritorio
          en lugar de flotar sobre toda la ventana. En escritorio el posicionado
          lo da `lg:relative` —antes lo daba `lg:sticky`, que ya no hace falta
          porque la página no se desplaza— y sin `z-index`, para NO abrir un
          contexto de apilamiento que vuelva a encerrar el diálogo de voluntarios. */}
      <div className="max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:top-14 max-lg:z-0 lg:relative lg:h-full lg:overflow-hidden lg:rounded-2xl lg:border lg:border-ink-100">
        <CentersMap
          centers={filtered}
          userPosition={geo.position}
          selectedSlug={selectedSlug}
          highlightedSlug={hoveredSlug}
          onSelect={selectFromMap}
        />
        <VolunteerFabButton open={volunteerOpen} onOpen={() => setVolunteerOpen(true)} />
      </div>

      <BottomSheet
        snap={snap}
        onSnapChange={setSnap}
        label="Lista de centros de acopio"
        header={
          <div className="space-y-2.5">
            {!hasLocation && (
              <button
                type="button"
                onClick={geo.request}
                disabled={locating}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 font-semibold text-white transition-colors hover:bg-brand-700 active:bg-brand-700 disabled:opacity-70 lg:w-auto"
              >
                <IconCrosshair className="size-5" />
                {locating ? "Buscando tu ubicación…" : "Ver centros cerca de mí"}
              </button>
            )}

            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-[15px] font-semibold text-ink-900" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? "centro" : "centros"}
                {hasLocation && <span className="font-normal text-ink-500"> · por cercanía</span>}
              </h2>
              {countActiveFilters(filters) > 0 && (
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="min-h-9 text-xs font-medium text-brand-700 hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <FiltersBar
              value={filters}
              onChange={setFilters}
              onOpenFilters={() => setFiltersOpen(true)}
            />
            <ActiveFilterChips value={filters} onChange={setFilters} />
          </div>
        }
      >
        <CoverageNudge centerCount={centers.length} departmentCount={departments.length} />

        {!hasLocation && (
          <div className="mb-3 rounded-xl border border-ink-100 bg-white p-3 lg:bg-ink-50">
            <p className="text-sm font-medium text-ink-900">¿En qué ciudad estás?</p>
            <p className="mt-0.5 text-xs text-ink-500">
              Sin tu ubicación no podemos ordenar por cercanía. Elige tu ciudad o compártela.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {topCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setFilters({ ...filters, query: city })}
                  className="min-h-9 rounded-full border border-ink-300 bg-white px-3 text-xs font-medium text-ink-700 transition-colors hover:border-ink-500 hover:bg-ink-50 active:bg-ink-50"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {geo.message && (
          <p
            role="status"
            className="mb-3 flex items-start gap-1.5 rounded-xl bg-caution-50 p-3 text-sm text-caution-700"
          >
            <IconAlert className="mt-0.5 size-4 shrink-0" />
            {geo.message}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink-300 bg-white p-6 text-center">
            <p className="font-medium text-ink-700">No encontramos centros con esos filtros.</p>
            <p className="mt-1 text-sm text-ink-500">
              Prueba con otro departamento o quita algún filtro. Si conoces un centro activo,{" "}
              <Link href="/registrar" className="text-brand-700 underline underline-offset-2">
                regístralo
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul ref={listRef} className="space-y-2.5" onMouseLeave={() => setHoveredSlug(null)}>
            {filtered.map((center) => (
              <li key={center.slug} data-slug={center.slug}>
                <CenterCard
                  center={center}
                  selected={center.slug === selectedSlug}
                  onSelect={setSelectedSlug}
                  onHover={setHoveredSlug}
                />
              </li>
            ))}
          </ul>
        )}

        {/* El pie de página no es alcanzable en la portada —ni en móvil ni en
            escritorio, porque ninguna de las dos hace scroll—, así que el aviso
            vive aquí. Y con él la convocatoria de voluntarios, que si no quedaría
            fuera del alcance de justo quien más ha mirado la lista. Va al FINAL y
            en una línea, no arriba y en bloque: `CoverageNudge` ya ocupa ese
            hueco, y quien llegó hasta aquí abajo es el lector que de verdad se
            implica. */}
        <p className="py-4 text-center text-xs text-ink-500">
          La información puede cambiar rápidamente. Revisa la fecha de actualización antes de
          desplazarte.{" "}
          <Link href="/metodologia" className="underline underline-offset-2 hover:text-ink-700">
            Cómo verificamos
          </Link>
          <VolunteerLink className="mt-1 block underline underline-offset-2 hover:text-ink-700" />
          {/* Solo en escritorio: en móvil esta línea ya la lleva el pie de las
              demás páginas y aquí robaría espacio a la lista. */}
          <span className="mt-1 hidden lg:block">
            Proyecto ciudadano independiente. No representa a ninguna entidad gubernamental.
          </span>
        </p>
      </BottomSheet>

      <FiltersSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        value={filters}
        onChange={setFilters}
        departments={departments}
        resultCount={filtered.length}
      />

      <VolunteerDialog
        open={volunteerOpen}
        onClose={() => setVolunteerOpen(false)}
        staleCount={staleCount}
        totalCount={centers.length}
      />
    </div>
  );
}
