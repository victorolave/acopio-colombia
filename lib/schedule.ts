import { freshness } from "./format";
import type { CollectionCenter } from "./types";

/**
 * Un horario que no es un horario.
 *
 * 19 de los 94 centros publicados traen «Consultar por teléfono antes de
 * asistir» en `schedule_text`. La fuente nunca publicó horas: alguien escribió
 * la recomendación dentro del campo. Mostrar ese texto bajo un título HORARIO
 * con un icono de reloj lo disfraza de dato, y quien escanea la tarjeta cree
 * que ya sabe cuándo ir.
 *
 * Aquí se clasifica para poder decirlo como lo que es: no sabemos el horario.
 */
export type ScheduleKind = "hours" | "ask" | "unknown";

/** Verbos con los que las fuentes rellenaron el campo en lugar de dar horas. */
const ASK_PATTERN = /^\s*(consultar|confirmar|preguntar|verificar)\b/i;

export function classifySchedule(text: string | null | undefined): ScheduleKind {
  if (!text || !text.trim()) return "unknown";
  return ASK_PATTERN.test(text) ? "ask" : "hours";
}

/**
 * ¿Puede la persona averiguar si vale la pena ir, SIN ir?
 *
 * Con horas publicadas mira el reloj; con teléfono o WhatsApp, llama. Sin
 * ninguna de las dos, la única forma de saberlo es desplazarse hasta allá, que
 * es justo el viaje que la herramienta existe para evitar.
 */
export function canConfirmBeforeGoing(center: AdvisoryInput): boolean {
  return (
    classifySchedule(center.schedule_text) === "hours" || Boolean(center.phone || center.whatsapp)
  );
}

export type AdvisoryLevel = "ok" | "caution" | "warning";

export type TripAdvisory = {
  level: AdvisoryLevel;
  /** Línea corta, para escanear en la tarjeta. */
  short: string;
  /** Frase completa, para la ficha. */
  long: string;
  /** ¿Hay teléfono o WhatsApp para confirmar antes de salir? */
  reachable: boolean;
};

type AdvisoryInput = Pick<
  CollectionCenter,
  "schedule_text" | "phone" | "whatsapp" | "last_verified_at"
>;

/**
 * Qué tan seguro es desplazarse hasta este centro AHORA.
 *
 * El eje no es la antigüedad del dato sino si la persona puede confirmar antes
 * de gastar el viaje. Un centro verificado hace 30 horas CON teléfono es más
 * seguro que uno verificado hace 6 sin horario y sin número: en el primero
 * llamas, en el segundo apuestas.
 *
 * Por eso la frescura entra como agravante y no como mensaje principal. Así el
 * aviso sigue diferenciando aunque todos los centros compartan fecha de
 * verificación, que es exactamente lo que pasa con el seed nacional.
 */
export function tripAdvisory(center: AdvisoryInput, now: Date = new Date()): TripAdvisory {
  const kind = classifySchedule(center.schedule_text);
  const reachable = Boolean(center.phone || center.whatsapp);
  const hours = center.schedule_text?.trim() ?? "";

  if (kind === "hours") {
    if (freshness(center.last_verified_at, now) === "stale") {
      return {
        level: "caution",
        short: `${hours} · sin confirmar`,
        long: `Horario publicado por la fuente: ${hours}. No lo hemos vuelto a confirmar, así que puede haber cambiado.`,
        reachable,
      };
    }
    return {
      level: "ok",
      short: hours,
      long: `Horario publicado por la fuente: ${hours}.`,
      reachable,
    };
  }

  if (reachable) {
    return {
      level: "caution",
      short: "Horario sin publicar · llama antes",
      long: "La fuente no publicó horario. Llama o escribe por WhatsApp antes de salir: es el dato que más cambia durante una emergencia y el que más viajes arruina.",
      reachable,
    };
  }

  return {
    level: "warning",
    short: "Sin horario ni teléfono",
    long: "La fuente no publicó horario ni un número de contacto, así que no hay forma de confirmar antes de llegar. Revisa el enlace de la fuente o busca a la organización responsable antes de desplazarte.",
    reachable,
  };
}
