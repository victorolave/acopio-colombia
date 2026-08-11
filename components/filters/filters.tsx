"use client";

import { DONATION_CATEGORIES } from "@/lib/items";
import { cn } from "@/lib/utils";

export type FilterState = {
  query: string;
  department: string;
  categories: string[];
  onlyVerified: boolean;
};

type Props = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  departments: string[];
  resultCount: number;
};

export function Filters({ value, onChange, departments, resultCount }: Props) {
  const toggleCategory = (id: string) => {
    const next = value.categories.includes(id)
      ? value.categories.filter((c) => c !== id)
      : [...value.categories, id];
    onChange({ ...value, categories: next });
  };

  const hasFilters =
    value.query !== "" || value.department !== "" || value.categories.length > 0 || value.onlyVerified;

  return (
    <section aria-label="Filtros" className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="buscar" className="sr-only">
            Buscar ciudad, municipio o centro
          </label>
          <input
            id="buscar"
            type="search"
            inputMode="search"
            placeholder="Buscar ciudad, municipio o centro"
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            className="w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-base text-ink-900 placeholder:text-ink-500"
          />
        </div>

        <div>
          <label htmlFor="departamento" className="sr-only">
            Departamento
          </label>
          <select
            id="departamento"
            value={value.department}
            onChange={(e) => onChange({ ...value, department: e.target.value })}
            className="w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-base text-ink-900 sm:w-56"
          >
            <option value="">Todos los departamentos</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-ink-700">¿Qué quieres donar?</legend>
        <div className="flex flex-wrap gap-1.5">
          {DONATION_CATEGORIES.map((category) => {
            const active = value.categories.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  active
                    ? "border-brand-600 bg-brand-600 font-medium text-white"
                    : "border-ink-300 bg-white text-ink-700 hover:border-ink-500",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-3">
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={value.onlyVerified}
            onChange={(e) => onChange({ ...value, onlyVerified: e.target.checked })}
            className="h-4 w-4 rounded border-ink-300 accent-brand-600"
          />
          Mostrar solo centros verificados
        </label>

        <div className="flex items-center gap-3">
          <p aria-live="polite" className="text-sm font-medium text-ink-700">
            {resultCount} {resultCount === 1 ? "centro encontrado" : "centros encontrados"}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() =>
                onChange({ query: "", department: "", categories: [], onlyVerified: false })
              }
              className="text-sm text-brand-700 underline underline-offset-2"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
