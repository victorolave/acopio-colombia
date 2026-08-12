"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { trackEvent, trackSubmitCenter } from "@/lib/analytics";
import type { GeocodePrecision } from "@/lib/geocoding";
import { DONATION_CATEGORIES } from "@/lib/items";
import { DEPARTMENTS, evidenceKind, type EvidenceKind } from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { MapFocus } from "@/components/map/location-picker";

const LocationPicker = dynamic(() => import("@/components/map/location-picker"), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse rounded-lg bg-ink-100" />,
});

type Position = { latitude: number; longitude: number };

/** Quién puso el pin. Solo "manual" cuenta como decisión humana. */
type PinSource = "manual" | "geocoder";

type Lookup =
  | { status: "idle" }
  | { status: "searching" }
  | { status: "found"; displayName: string; precision: GeocodePrecision }
  | { status: "empty" }
  | { status: "error"; message: string };

/** A menor confianza del geocodificador, encuadre más abierto: no fingimos precisión. */
const FOCUS_ZOOM: Record<GeocodePrecision, number> = {
  exact: 17,
  approximate: 15.5,
  municipality: 12.5,
};

const PRECISION_NOTE: Record<GeocodePrecision, string> = {
  exact:
    "Parece una dirección con número, pero verifica el pin: el buscador se equivoca con la nomenclatura colombiana.",
  approximate:
    "El punto cayó sobre la vía o el barrio, no sobre el número. Arrastra el pin hasta la entrada del centro.",
  municipality:
    "Solo pudimos ubicar el municipio. Arrastra el pin hasta la entrada del centro antes de enviar.",
};

const FIELD =
  "mt-1 min-h-12 w-full rounded-xl border border-ink-300 bg-white px-3 py-2.5 text-base text-ink-900 placeholder:text-ink-500";
const LABEL = "block text-sm font-medium text-ink-700";

const EVIDENCE_NOTE: Record<EvidenceKind, string> = {
  url: "Listo: con el enlace podemos revisarlo.",
  contact: "Listo: con el contacto podemos confirmarlo por llamada.",
  both: "Enlace y contacto. Así se revisa más rápido.",
};

/** Lee la prueba directamente del DOM: es la fuente autoritativa, sin estado intermedio. */
function readEvidence(form: HTMLFormElement): EvidenceKind | null {
  const data = new FormData(form);
  const read = (key: string) => String(data.get(key) ?? "").trim() || null;

  return evidenceKind({
    verificationUrl: read("verificationUrl"),
    contactPhone: read("contactPhone"),
    contactWhatsapp: read("contactWhatsapp"),
    contactEmail: read("contactEmail"),
  });
}

export function RegisterCenterForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [pinSource, setPinSource] = useState<PinSource>("manual");
  const [pinConfirmed, setPinConfirmed] = useState(false);
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const [lookup, setLookup] = useState<Lookup>({ status: "idle" });
  const [items, setItems] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  /** Solo alimenta el indicador en vivo. La decisión de enviar relee el DOM. */
  const [evidence, setEvidence] = useState<EvidenceKind | null>(null);

  /**
   * El formulario es la única página cuyo embudo nos interesa completo, así que
   * la visita se mide desde aquí y no desde un componente aparte: este árbol y
   * la página son lo mismo.
   */
  useEffect(() => {
    trackEvent("view_register");
  }, []);

  /**
   * «Empezó a llenarlo» tiene que incluir tocar el mapa o marcar una categoría,
   * no solo escribir: son botones, y un botón no dispara `input`.
   */
  /**
   * El `nonce` solo tiene que ser distinto del anterior para que el mapa vuelva
   * a encuadrar. Un contador lo garantiza; `Date.now()` no: dos búsquedas en el
   * mismo milisegundo daban el mismo valor y el mapa se quedaba quieto.
   */
  const focusNonce = useRef(0);

  const startedRef = useRef(false);
  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("start_register");
  };

  const handleFormInput = () => {
    markStarted();
    if (formRef.current) setEvidence(readEvidence(formRef.current));
  };

  const toggleItem = (label: string) => {
    markStarted();
    setItems((prev) => (prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]));
  };

  /** Tocar el mapa o arrastrar el pin es un acto humano: ya no hace falta confirmarlo. */
  const handlePickPosition = (next: Position) => {
    markStarted();
    setPosition(next);
    setPinSource("manual");
  };

  async function handleLocateAddress() {
    markStarted();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const address = String(data.get("address") ?? "").trim();
    const municipality = String(data.get("municipality") ?? "").trim();
    const department = String(data.get("department") ?? "").trim();

    if (!address || !municipality || !department) {
      setLookup({
        status: "error",
        message: "Escribe la dirección, el municipio y el departamento antes de buscar.",
      });
      return;
    }

    setLookup({ status: "searching" });

    try {
      const res = await fetch("/api/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, municipality, department }),
      });
      const body = await res.json();

      if (!res.ok) {
        setLookup({ status: "error", message: body.error ?? "No pudimos buscar la dirección." });
        return;
      }
      if (!body.found) {
        setLookup({ status: "empty" });
        return;
      }

      const precision = body.precision as GeocodePrecision;
      setPosition({ latitude: body.latitude, longitude: body.longitude });
      setPinSource("geocoder");
      setPinConfirmed(false);
      setFocus({
        latitude: body.latitude,
        longitude: body.longitude,
        zoom: FOCUS_ZOOM[precision],
        nonce: (focusNonce.current += 1),
      });
      setLookup({ status: "found", displayName: body.displayName, precision });
      setError(null);
    } catch {
      setLookup({
        status: "error",
        message: "No pudimos buscar la dirección. Revisa tu conexión o marca el punto a mano.",
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!position) {
      setError("Marca la ubicación del centro en el mapa.");
      return;
    }
    if (pinSource === "geocoder" && !pinConfirmed) {
      setError(
        "El pin lo puso el buscador automático. Arrástralo hasta la entrada del centro o confirma que está en el lugar correcto.",
      );
      return;
    }
    if (items.length === 0) {
      setError("Indica al menos qué recibe el centro.");
      return;
    }

    const kind = readEvidence(event.currentTarget);
    if (!kind) {
      setError(
        "Necesitamos al menos una forma de comprobar el centro: un enlace donde se anuncie, o un teléfono, WhatsApp o correo del centro.",
      );
      return;
    }

    setStatus("sending");
    const form = new FormData(event.currentTarget);

    const payload = {
      name: form.get("name"),
      organization: form.get("organization"),
      department: form.get("department"),
      municipality: form.get("municipality"),
      address: form.get("address"),
      latitude: position.latitude,
      longitude: position.longitude,
      acceptedItems: items,
      scheduleText: form.get("scheduleText"),
      contactName: form.get("contactName"),
      contactPhone: form.get("contactPhone"),
      contactWhatsapp: form.get("contactWhatsapp"),
      contactEmail: form.get("contactEmail"),
      nit: form.get("nit"),
      verificationUrl: form.get("verificationUrl"),
      evidenceUrl: form.get("evidenceUrl"),
      consent: form.get("consent") === "on",
      website: form.get("website"),
    };

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "No pudimos enviar la información.");
        setStatus("error");
        return;
      }
      trackSubmitCenter(kind);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("No pudimos enviar la información. Revisa tu conexión.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-6">
        <h2 className="text-xl font-bold text-brand-700">Gracias.</h2>
        <p className="mt-2 text-ink-700">Recibimos la información del centro de acopio.</p>
        <p className="mt-2 text-ink-700">
          Revisaremos lo que nos indicaste antes de publicarlo, para evitar información incorrecta
          durante la emergencia.
        </p>

        {/* Quien acaba de registrar un centro es, con diferencia, la persona con
            más probabilidad de conocer otro. Es el momento de pedirlo. */}
        <div className="mt-4 border-t border-brand-100 pt-4">
          <p className="font-medium text-ink-900">¿Conoces otro acopio?</p>
          <p className="mt-1 text-sm text-ink-700">
            Todavía queda mucho territorio sin cubrir. Si viste otro punto recibiendo donaciones,
            regístralo también: toma menos que la primera vez.
          </p>
          <button
            type="button"
            onClick={() => {
              startedRef.current = false;
              setPosition(null);
              setPinSource("manual");
              setPinConfirmed(false);
              setFocus(null);
              setLookup({ status: "idle" });
              setItems([]);
              setEvidence(null);
              setError(null);
              setStatus("idle");
            }}
            className="mt-3 min-h-12 w-full rounded-xl bg-brand-600 px-4 font-semibold text-white transition-colors hover:bg-brand-700 sm:w-auto"
          >
            Registrar otro centro
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={handleFormInput}
      className="space-y-8"
      noValidate
    >
      {/* Información del centro -------------------------------------------- */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink-900">Información del centro</legend>

        <div>
          <label htmlFor="name" className={LABEL}>
            Nombre del centro *
          </label>
          <input id="name" name="name" required maxLength={160} className={FIELD} />
        </div>

        <div>
          <label htmlFor="organization" className={LABEL}>
            Organización responsable *
          </label>
          <input id="organization" name="organization" required maxLength={160} className={FIELD} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="department" className={LABEL}>
              Departamento *
            </label>
            <select id="department" name="department" required defaultValue="" className={FIELD}>
              <option value="" disabled>
                Selecciona…
              </option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="municipality" className={LABEL}>
              Municipio *
            </label>
            <input id="municipality" name="municipality" required maxLength={120} className={FIELD} />
          </div>
        </div>

        <div>
          <label htmlFor="address" className={LABEL}>
            Dirección *
          </label>
          <input
            id="address"
            name="address"
            required
            maxLength={240}
            placeholder="Ej.: Carrera 52 #30A-97, barrio Guayabal"
            className={FIELD}
          />
          <button
            type="button"
            onClick={handleLocateAddress}
            disabled={lookup.status === "searching"}
            className="mt-2 min-h-11 w-full rounded-xl border border-brand-600 px-4 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 disabled:opacity-60 sm:w-auto"
          >
            {lookup.status === "searching" ? "Buscando…" : "Ubicar dirección en el mapa"}
          </button>

          {lookup.status === "found" && (
            <p className="mt-2 rounded-lg bg-ink-100 px-3 py-2 text-sm text-ink-700">
              El buscador entendió: <span className="font-medium">{lookup.displayName}</span>.{" "}
              {PRECISION_NOTE[lookup.precision]}
            </p>
          )}
          {lookup.status === "empty" && (
            <p className="mt-2 rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
              No encontramos esa dirección. Marca el punto tocando el mapa.
            </p>
          )}
          {lookup.status === "error" && (
            <p role="alert" className="mt-2 rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
              {lookup.message}
            </p>
          )}
        </div>

        <div>
          <span className={LABEL}>Ubicación en el mapa *</span>
          <div className="mt-1">
            <LocationPicker value={position} onChange={handlePickPosition} focus={focus} />
          </div>

          {pinSource === "geocoder" && position && (
            <label className="mt-2 flex items-start gap-3 rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
              <input
                type="checkbox"
                checked={pinConfirmed}
                onChange={(event) => setPinConfirmed(event.target.checked)}
                className="mt-0.5 size-5 shrink-0 rounded border-ink-300 accent-brand-600"
              />
              <span>
                Revisé el mapa y el pin está sobre la entrada del centro. *
              </span>
            </label>
          )}
        </div>

        <fieldset>
          <legend className={LABEL}>Qué recibe *</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DONATION_CATEGORIES.map((category) => {
              const active = items.includes(category.label);
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleItem(category.label)}
                  className={cn(
                    "min-h-11 rounded-xl border px-3.5 text-sm transition-colors",
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

        <div>
          <label htmlFor="scheduleText" className={LABEL}>
            Horario *
          </label>
          <input
            id="scheduleText"
            name="scheduleText"
            required
            maxLength={200}
            placeholder="Ej.: Lunes a sábado, 8:00 a. m. – 5:00 p. m."
            className={FIELD}
          />
        </div>
      </fieldset>

      {/* Cómo lo comprobamos ------------------------------------------------ */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink-900">Cómo lo comprobamos</legend>
        <p className="rounded-xl border border-ink-100 bg-white p-3 text-sm text-ink-700">
          Con <span className="font-semibold">una sola</span> de las dos nos alcanza: un enlace donde
          se anuncie el centro, o un contacto del centro con el que podamos confirmarlo. No hace falta
          que seas quien lo organiza, y no pedimos tu cédula.
        </p>

        <div>
          <label htmlFor="verificationUrl" className={LABEL}>
            Enlace donde se anuncia el centro
          </label>
          <p className="mt-1 text-sm text-ink-500">
            Publicación de la alcaldía, la gobernación, la organización responsable, un comunicado
            oficial o su cuenta verificada de Instagram, Facebook o X.
          </p>
          <input
            id="verificationUrl"
            name="verificationUrl"
            type="url"
            placeholder="https://…"
            className={FIELD}
          />
        </div>

        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-ink-100" />
          <span className="text-sm font-medium text-ink-500">o</span>
          <span className="h-px flex-1 bg-ink-100" />
        </div>

        <div>
          <span className={LABEL}>Contacto del centro</span>
          <p className="mt-1 text-sm text-ink-500">
            Un número al que podamos llamar es la prueba más rápida de todas: en una llamada
            confirmamos el centro. Estos datos se publican en la ficha, así que déjalos solo si son
            del centro y puedes compartirlos.
          </p>

          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contactPhone" className={LABEL}>
                Teléfono
              </label>
              <input id="contactPhone" name="contactPhone" type="tel" maxLength={40} className={FIELD} />
            </div>
            <div>
              <label htmlFor="contactWhatsapp" className={LABEL}>
                WhatsApp
              </label>
              <input
                id="contactWhatsapp"
                name="contactWhatsapp"
                type="tel"
                maxLength={40}
                className={FIELD}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="contactEmail" className={LABEL}>
              Correo
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              maxLength={160}
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label htmlFor="evidenceUrl" className={LABEL}>
            Enlace a evidencia adicional <span className="font-normal text-ink-500">(opcional)</span>
          </label>
          <p className="mt-1 text-sm text-ink-500">
            Foto del punto, comunicado o volante institucional publicado en línea.
          </p>
          <input id="evidenceUrl" name="evidenceUrl" type="url" placeholder="https://…" className={FIELD} />
        </div>
      </fieldset>

      {/* Quién nos lo cuenta -------------------------------------------------- */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink-900">
          Quién nos lo cuenta <span className="text-base font-normal text-ink-500">(opcional)</span>
        </legend>
        <p className="text-sm text-ink-500">
          Nos sirve para volver a escribirte si algo no cuadra. Nunca se publica.
        </p>

        <div>
          <label htmlFor="contactName" className={LABEL}>
            Tu nombre o el de la persona responsable
          </label>
          <input id="contactName" name="contactName" maxLength={160} className={FIELD} />
        </div>

        <div>
          <label htmlFor="nit" className={LABEL}>
            NIT de la organización
          </label>
          <input id="nit" name="nit" maxLength={40} className={FIELD} />
        </div>
      </fieldset>

      {/* Consentimiento ----------------------------------------------------- */}
      <div className="space-y-3 rounded-xl border border-ink-100 bg-white p-4">
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 size-5 shrink-0 rounded border-ink-300 accent-brand-600"
          />
          <span>
            Confirmo que la información es correcta y que, si dejé datos de contacto del centro, puedo
            compartirlos para publicarlos. *
          </span>
        </label>
        <p className="rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
          Los centros enviados por la comunidad son revisados antes de aparecer públicamente.
        </p>
      </div>

      {/*
        La regla «al menos una prueba» se reparte entre dos campos lejanos entre
        sí. Sin este resumen es invisible hasta que el envío falla, que es el
        peor momento para enterarse.
      */}
      <p
        aria-live="polite"
        className={cn(
          "rounded-xl px-3 py-2 text-sm",
          evidence ? "bg-brand-50 text-brand-700" : "bg-ink-100 text-ink-700",
        )}
      >
        {evidence
          ? EVIDENCE_NOTE[evidence]
          : "Falta la prueba: añade el enlace donde se anuncia el centro o un contacto del centro."}
      </p>

      {/* Honeypot anti-spam */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor="register-website">No llenar este campo</label>
        <input id="register-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-13 w-full rounded-xl bg-brand-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar para revisión"}
      </button>
    </form>
  );
}
