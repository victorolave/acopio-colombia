"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { DONATION_CATEGORIES } from "@/lib/items";
import { DEPARTMENTS } from "@/lib/validation";
import { cn } from "@/lib/utils";

const LocationPicker = dynamic(() => import("@/components/map/location-picker"), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse rounded-lg bg-ink-100" />,
});

type Position = { latitude: number; longitude: number };

const FIELD =
  "mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-base text-ink-900 placeholder:text-ink-500";
const LABEL = "block text-sm font-medium text-ink-700";

export function RegisterCenterForm() {
  const [position, setPosition] = useState<Position | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const toggleItem = (label: string) =>
    setItems((prev) => (prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!position) {
      setError("Marca la ubicación del centro en el mapa.");
      return;
    }
    if (items.length === 0) {
      setError("Indica al menos qué recibe el centro.");
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
          Revisaremos la fuente suministrada antes de publicarlo, para evitar información incorrecta
          durante la emergencia.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
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
        </div>

        <div>
          <span className={LABEL}>Ubicación en el mapa *</span>
          <div className="mt-1">
            <LocationPicker value={position} onChange={setPosition} />
          </div>
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

      {/* Contacto ----------------------------------------------------------- */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink-900">Contacto</legend>
        <p className="text-sm text-ink-500">
          Necesitamos al menos un mecanismo de contacto para poder verificar el centro. No pedimos
          cédula.
        </p>

        <div>
          <label htmlFor="contactName" className={LABEL}>
            Nombre de la persona responsable *
          </label>
          <input id="contactName" name="contactName" required maxLength={160} className={FIELD} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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

        <div>
          <label htmlFor="contactEmail" className={LABEL}>
            Correo
          </label>
          <input id="contactEmail" name="contactEmail" type="email" maxLength={160} className={FIELD} />
        </div>

        <div>
          <label htmlFor="nit" className={LABEL}>
            NIT de la organización <span className="font-normal text-ink-500">(opcional)</span>
          </label>
          <input id="nit" name="nit" maxLength={40} className={FIELD} />
        </div>
      </fieldset>

      {/* Validación --------------------------------------------------------- */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink-900">Validación</legend>

        <div>
          <label htmlFor="verificationUrl" className={LABEL}>
            ¿Dónde podemos verificar que este centro está activo? *
          </label>
          <p className="mt-1 text-sm text-ink-500">
            Enlace de la alcaldía, gobernación, la organización, una publicación oficial o su cuenta
            verificada de Instagram, Facebook o X.
          </p>
          <input
            id="verificationUrl"
            name="verificationUrl"
            type="url"
            required
            placeholder="https://…"
            className={FIELD}
          />
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

      {/* Consentimiento ----------------------------------------------------- */}
      <div className="space-y-3 rounded-xl border border-ink-100 bg-white p-4">
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 accent-brand-600"
          />
          <span>
            Confirmo que la información suministrada es correcta y que tengo autorización para publicar
            los datos de contacto del centro. *
          </span>
        </label>
        <p className="rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
          Los centros enviados por la comunidad son revisados antes de aparecer públicamente.
        </p>
      </div>

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
        className="w-full rounded-lg bg-brand-600 px-4 py-3 text-lg font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar para revisión"}
      </button>
    </form>
  );
}
