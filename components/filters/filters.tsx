"use client";

import { useEffect, useRef } from "react";
import { IconClose, IconFilter, IconSearch } from "@/components/ui/icons";
import { DONATION_CATEGORIES } from "@/lib/items";
import { cn } from "@/lib/utils";

export type FilterState = {
  query: string;
  department: string;
  categories: string[];
  onlyVerified: boolean;
  /** Solo centros con horario publicado o con un número al que llamar. */
  onlyConfirmable: boolean;
};

export const EMPTY_FILTERS: FilterState = {
  query: "",
  department: "",
  categories: [],
  onlyVerified: false,
  onlyConfirmable: false,
};

export function countActiveFilters(value: FilterState): number {
  return (
    value.categories.length +
    (value.department ? 1 : 0) +
    (value.onlyVerified ? 1 : 0) +
    (value.onlyConfirmable ? 1 : 0)
  );
}

// ---------------------------------------------------------------------------
// Barra compacta: lo único que ocupa espacio permanente.
//
// Antes, el bloque de filtros mostraba siempre el buscador, el selector de
// departamento, diez chips de categoría y una casilla. En un teléfono eso
// empujaba el primer resultado casi dos pantallas hacia abajo. Ahora los
// filtros se piden cuando se necesitan.
// ---------------------------------------------------------------------------

export function FiltersBar({
  value,
  onChange,
  onOpenFilters,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onOpenFilters: () => void;
}) {
  const active = countActiveFilters(value);

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-500" />
        <label htmlFor="buscar" className="sr-only">
          Buscar ciudad, municipio o centro
        </label>
        <input
          id="buscar"
          type="search"
          inputMode="search"
          enterKeyHint="search"
          placeholder="Buscar ciudad o centro"
          value={value.query}
          onChange={(e) => onChange({ ...value, query: e.target.value })}
          className="h-11 w-full rounded-xl border border-ink-300 bg-white pl-9 pr-3 text-base text-ink-900 placeholder:text-ink-500"
        />
      </div>

      <button
        type="button"
        onClick={onOpenFilters}
        className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-ink-300 bg-white px-3 text-sm font-medium text-ink-700 active:bg-ink-50"
      >
        <IconFilter className="size-4" />
        Filtros
        {active > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-brand-600 text-xs font-semibold text-white">
            {active}
          </span>
        )}
      </button>
    </div>
  );
}

/** Chips de lo que está filtrando ahora mismo, cada uno quitable de un toque. */
export function ActiveFilterChips({
  value,
  onChange,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const chips: { key: string; label: string; clear: () => void }[] = [];

  if (value.department) {
    chips.push({
      key: "dep",
      label: value.department,
      clear: () => onChange({ ...value, department: "" }),
    });
  }
  if (value.onlyVerified) {
    chips.push({
      key: "ver",
      label: "Solo verificados",
      clear: () => onChange({ ...value, onlyVerified: false }),
    });
  }
  if (value.onlyConfirmable) {
    chips.push({
      key: "conf",
      label: "Puedo confirmar antes de ir",
      clear: () => onChange({ ...value, onlyConfirmable: false }),
    });
  }
  for (const id of value.categories) {
    const category = DONATION_CATEGORIES.find((c) => c.id === id);
    if (!category) continue;
    chips.push({
      key: id,
      label: category.label,
      clear: () => onChange({ ...value, categories: value.categories.filter((c) => c !== id) }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <ul className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chips.map((chip) => (
        <li key={chip.key} className="shrink-0">
          <button
            type="button"
            onClick={chip.clear}
            className="inline-flex min-h-9 items-center gap-1 rounded-full bg-brand-50 py-1 pl-3 pr-2 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-100"
          >
            {chip.label}
            <IconClose className="size-3.5" />
            <span className="sr-only">Quitar filtro</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Hoja de filtros
// ---------------------------------------------------------------------------

export function FiltersSheet({
  open,
  onClose,
  value,
  onChange,
  departments,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  value: FilterState;
  onChange: (next: FilterState) => void;
  departments: string[];
  resultCount: number;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // Bloquea el scroll de fondo mientras la hoja está abierta.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const toggleCategory = (id: string) => {
    const next = value.categories.includes(id)
      ? value.categories.filter((c) => c !== id)
      : [...value.categories, id];
    onChange({ ...value, categories: next });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* El velo aísla el contenido y es la vía de escape más obvia al tocar fuera. */}
      <button
        type="button"
        aria-label="Cerrar filtros"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/50"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-filtros"
        tabIndex={-1}
        className="relative flex max-h-[88dvh] w-full flex-col rounded-t-2xl bg-white sm:max-w-md sm:rounded-2xl"
      >
        <header className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
          <h2 id="titulo-filtros" className="text-base font-semibold text-ink-900">
            Filtros
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="grid size-11 place-items-center rounded-lg text-ink-500 active:bg-ink-50"
          >
            <IconClose />
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-4">
          <fieldset>
            <legend className="text-sm font-semibold text-ink-900">¿Qué quieres donar?</legend>
            <p className="mt-0.5 text-xs text-ink-500">
              Se muestran los centros que reciben al menos una de las opciones marcadas.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DONATION_CATEGORIES.map((category) => {
                const isActive = value.categories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => toggleCategory(category.id)}
                    className={cn(
                      "min-h-11 rounded-xl border px-3.5 text-sm transition-colors",
                      isActive
                        ? "border-brand-600 bg-brand-600 font-medium text-white"
                        : "border-ink-300 bg-white text-ink-700 active:bg-ink-50",
                    )}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="departamento" className="text-sm font-semibold text-ink-900">
              Departamento
            </label>
            <select
              id="departamento"
              value={value.department}
              onChange={(e) => onChange({ ...value, department: e.target.value })}
              className="mt-2 h-11 w-full rounded-xl border border-ink-300 bg-white px-3 text-base text-ink-900"
            >
              <option value="">Todos los departamentos</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-sm font-semibold text-ink-900">Verificación</span>
            <label className="mt-2 flex min-h-11 items-center gap-3 rounded-xl border border-ink-300 px-3 py-2">
              <input
                type="checkbox"
                checked={value.onlyVerified}
                onChange={(e) => onChange({ ...value, onlyVerified: e.target.checked })}
                className="size-5 shrink-0 rounded border-ink-300 accent-brand-600"
              />
              <span className="text-sm text-ink-700">
                Solo centros verificados
                <span className="block text-xs text-ink-500">
                  Oculta los reportados, que no hemos podido confirmar con la entidad.
                </span>
              </span>
            </label>
          </div>

          {/* Completitud del dato como FILTRO, nunca como orden oculto.
              Con un ranking la persona no distingue si un centro no existe o
              solo quedó enterrado; con un filtro ve cambiar el contador y sabe
              exactamente qué acaba de sacrificar. */}
          <div>
            <span className="text-sm font-semibold text-ink-900">Antes de desplazarte</span>
            <label className="mt-2 flex min-h-11 items-center gap-3 rounded-xl border border-ink-300 px-3 py-2">
              <input
                type="checkbox"
                checked={value.onlyConfirmable}
                onChange={(e) => onChange({ ...value, onlyConfirmable: e.target.checked })}
                className="size-5 shrink-0 rounded border-ink-300 accent-brand-600"
              />
              <span className="text-sm text-ink-700">
                Solo los que puedo confirmar
                <span className="block text-xs text-ink-500">
                  Con horario publicado o con un número al que llamar. Oculta los centros a los que
                  solo se puede averiguar yendo.
                </span>
              </span>
            </label>
          </div>
        </div>

        <footer className="flex items-center gap-2 border-t border-ink-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="min-h-12 rounded-xl border border-ink-300 px-4 text-sm font-medium text-ink-700 active:bg-ink-50"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 flex-1 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white active:bg-brand-700"
          >
            Ver {resultCount} {resultCount === 1 ? "centro" : "centros"}
          </button>
        </footer>
      </div>
    </div>
  );
}
