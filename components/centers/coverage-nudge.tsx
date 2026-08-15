"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { IconClose } from "@/components/ui/icons";
import { DEPARTMENTS } from "@/lib/validation";

const DISMISS_KEY = "acopio:cobertura-oculta";

/**
 * `localStorage` es estado externo al árbol de React, y además no emite eventos
 * en la misma pestaña que lo escribe. `useSyncExternalStore` es la forma
 * correcta de leerlo: no hay `setState` dentro de un efecto y la hidratación no
 * se desajusta, porque el servidor responde por `getServerSnapshot`.
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Respaldo para cuando el almacenamiento está bloqueado: al menos se cierra en esta visita. */
let dismissedInSession = false;

function isDismissed(): boolean {
  if (dismissedInSession) return true;
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    // Modo incógnito o almacenamiento bloqueado: preferimos mostrarlo.
    return false;
  }
}

/** En el servidor lo damos por oculto: el HTML inicial no promete lo que el cliente puede retirar. */
function isDismissedOnServer(): boolean {
  return true;
}

function dismiss() {
  dismissedInSession = true;
  try {
    window.localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // Sin almacenamiento no se recuerda entre visitas, pero sí se cierra en esta.
  }
  for (const listener of listeners) listener();
}

/**
 * Invitación a registrar acopios, con la brecha real en cifras.
 *
 * Dos decisiones que importan:
 *
 * 1. Es DESCARTABLE y se recuerda. Quien abre este sitio suele estar buscando
 *    dónde llevar ayuda con el carro cargado; nuestra petición no puede
 *    convertirse en un peaje que hay que sortear cada vez.
 *
 * 2. Dice números, no adjetivos. «Nos falta mucho» no mueve a nadie; «estamos
 *    en 9 de 33 departamentos» sí, y además es verificable contra el mapa que
 *    la persona está viendo. Son datos que la portada ya calculaba.
 */
export function CoverageNudge({
  centerCount,
  departmentCount,
}: {
  centerCount: number;
  departmentCount: number;
}) {
  const dismissed = useSyncExternalStore(subscribe, isDismissed, isDismissedOnServer);
  if (dismissed) return null;

  const missing = DEPARTMENTS.length - departmentCount;

  return (
    <div className="mb-3 rounded-xl border border-brand-100 bg-brand-50 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-brand-700">Aún nos queda mucho por cubrir</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Ocultar este mensaje"
          className="-m-1 grid size-9 shrink-0 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-white/60 active:bg-white/60"
        >
          <IconClose className="size-4" />
        </button>
      </div>

      <p className="mt-1 text-sm text-ink-700">
        Llevamos {centerCount} {centerCount === 1 ? "acopio publicado" : "acopios publicados"} en{" "}
        {departmentCount} de {DEPARTMENTS.length} departamentos
        {missing > 0 && (
          <>
            :{" "}
            <span className="font-medium">
              en {missing} todavía no hay ninguno
            </span>
          </>
        )}
        . Si ves un acopio que no está en el mapa, vuelve y regístralo.
      </p>

      <Link
        href="/registrar"
        className="mt-2.5 inline-flex min-h-11 items-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 active:bg-brand-700"
      >
        Registrar un acopio
      </Link>
    </div>
  );
}
