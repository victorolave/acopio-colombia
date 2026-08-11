"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SnapPoint = "peek" | "half" | "full";

/** Cuánto se desplaza la hoja hacia abajo en cada posición, sobre su propia altura. */
const TRANSLATE: Record<SnapPoint, number> = { full: 0, half: 38, peek: 72 };

const ORDER: SnapPoint[] = ["peek", "half", "full"];

type Props = {
  snap: SnapPoint;
  onSnapChange: (snap: SnapPoint) => void;
  /** Contenido fijo de la cabecera: se arrastra y no hace scroll. */
  header: React.ReactNode;
  children: React.ReactNode;
  label: string;
};

/**
 * Hoja inferior con tres posiciones, el patrón estándar de los buscadores con
 * mapa (Google Maps, Airbnb, Uber).
 *
 * Por qué no un alternador «Mapa | Lista»: obliga a elegir entre ver DÓNDE está
 * un centro y ver CUÁL es. La pregunta que trae a alguien aquí —«¿cuál me queda
 * más cerca?»— necesita las dos cosas a la vez.
 *
 * Decisiones de interacción:
 *  - El arrastre vive SOLO en la cabecera. La lista conserva su scroll nativo,
 *    así se evita el conflicto de gestos entre arrastrar la hoja y desplazar el
 *    contenido, que es lo que hace que estas hojas se sientan rotas.
 *  - Hay control por teclado y por pulsación además del gesto: nunca se depende
 *    solo de arrastrar.
 *  - Respeta `prefers-reduced-motion`.
 */
export function BottomSheet({ snap, onSnapChange, header, children, label }: Props) {
  const sheetRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<{ startY: number; startTranslate: number; height: number } | null>(null);
  const [dragTranslate, setDragTranslate] = useState<number | null>(null);

  const nearestSnap = useCallback((translate: number): SnapPoint => {
    let best: SnapPoint = "half";
    let bestDistance = Infinity;
    for (const point of ORDER) {
      const distance = Math.abs(TRANSLATE[point] - translate);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = point;
      }
    }
    return best;
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const height = sheetRef.current?.offsetHeight ?? 1;
    dragRef.current = { startY: event.clientY, startTranslate: TRANSLATE[snap], height };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const deltaPercent = ((event.clientY - drag.startY) / drag.height) * 100;
    setDragTranslate(Math.min(TRANSLATE.peek + 6, Math.max(-4, drag.startTranslate + deltaPercent)));
  };

  const endDrag = () => {
    const drag = dragRef.current;
    if (!drag) return;
    if (dragTranslate !== null) onSnapChange(nearestSnap(dragTranslate));
    dragRef.current = null;
    setDragTranslate(null);
  };

  /** Un toque en la cabecera avanza a la siguiente posición y vuelve al inicio. */
  const cycle = () => {
    const index = ORDER.indexOf(snap);
    onSnapChange(ORDER[(index + 1) % ORDER.length]);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && snap === "full") onSnapChange("half");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snap, onSnapChange]);

  const translate = dragTranslate ?? TRANSLATE[snap];

  return (
    <section
      ref={sheetRef}
      aria-label={label}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex h-[92dvh] flex-col rounded-t-2xl bg-white shadow-[0_-8px_30px_-12px_rgb(15_23_42/0.25)]",
        "translate-y-[var(--sheet-y)]",
        // En escritorio deja de ser una hoja y se comporta como columna.
        "lg:static lg:h-auto lg:translate-y-0 lg:rounded-none lg:bg-transparent lg:shadow-none",
        dragTranslate === null && "transition-transform duration-300 ease-out motion-reduce:transition-none",
      )}
      style={{ "--sheet-y": `${translate}%` } as React.CSSProperties}
    >
      {/* Zona de arrastre. Es también un botón real, para teclado y lectores. */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="shrink-0 cursor-grab touch-none select-none px-4 pb-2 pt-2 active:cursor-grabbing lg:cursor-auto lg:touch-auto lg:px-0 lg:pt-0"
      >
        <button
          type="button"
          onClick={cycle}
          aria-label={
            snap === "full" ? "Contraer la lista de centros" : "Expandir la lista de centros"
          }
          aria-expanded={snap === "full"}
          className="mx-auto flex h-6 w-full max-w-24 items-center justify-center lg:hidden"
        >
          <span aria-hidden="true" className="h-1.5 w-11 rounded-full bg-ink-300" />
        </button>
        <div className="pt-1">{header}</div>
      </div>

      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
          "lg:overflow-visible lg:px-0 lg:pb-8",
          // Sin scroll interno cuando la hoja está abajo: evita desplazar
          // contenido que no se ve. Con clase, no en línea, para que la regla
          // de escritorio pueda ganarle.
          snap === "peek" && "max-lg:overflow-hidden",
        )}
      >
        {children}
      </div>
    </section>
  );
}
