"use client";

import { useEffect, useRef } from "react";
import { VolunteerCta, VolunteerPitch } from "@/components/volunteer-callout";
import { IconClose, IconPhone } from "@/components/ui/icons";
import { isVolunteerFormConfigured } from "@/lib/volunteer";

/**
 * Convocatoria de voluntarios lanzada desde el mapa.
 *
 * POR QUÉ FLOTA AQUÍ Y NO SOLO EN LA METODOLOGÍA
 * El bloque completo vive en `/metodologia`, que es la página con menos tráfico
 * del sitio: quien entra buscando dónde llevar ayuda no pasa por ahí. Pedir
 * voluntarios en la única página que nadie visita es no pedirlos.
 *
 * POR QUÉ ES UN BOTÓN Y NO EL TEXTO ENTERO
 * El argumento necesita cuatro párrafos para no dar miedo —qué es verificar,
 * cuánta falta hace, cuánto tiempo cuesta—, y cuatro párrafos encima del mapa
 * le tapan a la gente justo lo que vino a buscar. Un botón pequeño cuesta una
 * pulsación y no le quita el mapa a nadie.
 *
 * POR QUÉ EL BOTÓN Y EL DIÁLOGO SON DOS COMPONENTES SEPARADOS
 * Esto NO es una preferencia de estilo: es un bug que ya ocurrió. Con el
 * diálogo dentro del contenedor del mapa, se abría y la hoja inferior lo
 * pintaba por encima, cortándolo a media frase.
 *
 * La causa es que el contenedor del mapa lleva `max-lg:z-0`, y un `z-index`
 * sobre un elemento posicionado CREA UN CONTEXTO DE APILAMIENTO. Todo lo que
 * cuelga de él queda encerrado dentro y compite entre sí, no contra el resto de
 * la página: da igual que el diálogo pidiera `z-50`, porque ese 50 solo vale
 * dentro de una caja que en el documento vale 0. La hoja, con `z-30` y colgando
 * de la raíz, gana siempre.
 *
 * Por eso el botón se queda dentro del mapa (donde tiene que posicionarse) y el
 * diálogo sube a la raíz del explorador, que es exactamente cómo está resuelto
 * `FiltersSheet`. El estado vive arriba, igual que `filtersOpen`.
 */

/**
 * El botón flotante. Va DENTRO del contenedor del mapa.
 *
 * DÓNDE SE COLOCA, Y POR QUÉ AHÍ EXACTAMENTE
 *  - `absolute` dentro del contenedor del mapa, NO `fixed`. En escritorio el
 *    mapa es una columna de una rejilla; un `fixed` se saldría de ella y
 *    quedaría flotando sobre la lista.
 *  - EN MÓVIL, ARRIBA A LA IZQUIERDA. Abajo vive la hoja inferior, que se mueve
 *    entre tres posiciones, y cualquier separación fija choca con ella en
 *    alguna. Arriba a la derecha está el control de zoom de MapLibre
 *    (`NavigationControl`, ver `centers-map.tsx`).
 *  - EN ESCRITORIO, ABAJO A LA IZQUIERDA. Comparte fila con el zoom si va
 *    arriba, y esa fila resultó no ser segura: en local sobraban 62 px, pero
 *    el CI corre sobre Linux con otras fuentes, el texto del botón renderiza
 *    más ancho y los dos se solapaban. El margen existía solo en la máquina
 *    donde se diseñó. Abajo no comparte fila con nada —la atribución de
 *    MapLibre va a la derecha— y el problema desaparece por construcción en
 *    vez de por holgura.
 *  - `max-w` en móvil por lo mismo: ahí sí hay que compartir fila, así que el
 *    ancho se limita para que el botón NO PUEDA alcanzar el control aunque la
 *    fuente sea mucho más ancha de lo previsto. Antes de truncar, choca.
 *
 * No lleva manejadores de gestos. Es la lección de `bottom-sheet.tsx`: un
 * manejador entre el dedo y un control termina matando el `click`. Aquí solo
 * hay un `onClick`, y hay una prueba en `e2e/portada.spec.ts` que lo comprueba
 * en un navegador real, porque estar en el DOM no es funcionar.
 */
export function VolunteerFabButton({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  if (!isVolunteerFormConfigured) return null;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-expanded={open}
      className="absolute left-3 top-3 z-20 inline-flex min-h-11 max-w-[calc(100%-4.5rem)] items-center gap-2 rounded-full border border-brand-100 bg-white/95 px-3.5 text-sm font-semibold text-brand-700 shadow-md backdrop-blur hover:bg-brand-50 active:bg-brand-50 lg:bottom-3 lg:top-auto lg:max-w-[calc(100%-1.5rem)]"
    >
      <IconPhone className="size-4 shrink-0" />
      <span className="truncate">Ayúdanos a verificar</span>
    </button>
  );
}

/**
 * El diálogo. Va en la RAÍZ del explorador, fuera del contenedor del mapa.
 * Ver arriba por qué esto no es negociable.
 */
export function VolunteerDialog({
  open,
  onClose,
  staleCount,
  totalCount,
}: {
  open: boolean;
  onClose: () => void;
  staleCount: number;
  totalCount: number;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // Bloquea el scroll de fondo mientras el diálogo está abierto.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open || !isVolunteerFormConfigured) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* El velo aísla el contenido y es la vía de escape más obvia al tocar fuera. */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/50"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-voluntarios"
        tabIndex={-1}
        className="relative flex max-h-[88dvh] w-full flex-col rounded-t-2xl bg-white sm:max-w-md sm:rounded-2xl"
      >
        <header className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
          <h2 id="titulo-voluntarios" className="text-base font-semibold text-ink-900">
            Nos faltan manos para verificar
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid size-11 shrink-0 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-50 active:bg-ink-50"
          >
            <IconClose />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <VolunteerPitch staleCount={staleCount} totalCount={totalCount} />
        </div>

        {/* El botón vive FUERA de la zona con scroll. Con las tres vías
            explicadas el texto pasa de alto de pantalla, y si la acción va
            dentro del área desplazable queda bajo la línea de flote: el modal
            pediría desplazarse para encontrar aquello que vino a ofrecer. */}
        <div className="shrink-0 border-t border-ink-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <VolunteerCta />
        </div>
      </div>
    </div>
  );
}
