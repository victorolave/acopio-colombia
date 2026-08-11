"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { REPORT_REASONS } from "@/lib/validation";

type Props = { centerId: string; centerSlug: string };

/**
 * Reportar información incorrecta. NUNCA modifica el centro automáticamente:
 * el reporte queda para revisión de un administrador.
 */
export function ReportCenterForm({ centerId, centerSlug }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      centerId,
      centerSlug,
      reason: formData.get("reason"),
      comment: formData.get("comment"),
      evidenceUrl: formData.get("evidenceUrl"),
      reporterContact: formData.get("reporterContact"),
      website: formData.get("website"), // honeypot
    };

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "No pudimos enviar el reporte.");
        setStatus("error");
        return;
      }
      trackEvent("report_center", centerSlug);
      setStatus("done");
    } catch {
      setError("No pudimos enviar el reporte. Revisa tu conexión.");
      setStatus("error");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-ink-700 underline underline-offset-2 hover:text-ink-900"
      >
        ¿Información incorrecta? Reportar
      </button>
    );
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
        <p className="font-medium text-brand-700">Gracias por avisar.</p>
        <p className="mt-1 text-sm text-ink-700">
          Revisaremos tu reporte antes de cambiar la información publicada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-ink-100 bg-white p-4">
      <h3 className="font-semibold text-ink-900">¿Qué cambió?</h3>

      <fieldset className="mt-3 space-y-2">
        <legend className="sr-only">Motivo del reporte</legend>
        {REPORT_REASONS.map((reason, index) => (
          <label key={reason.value} className="flex items-center gap-2 text-sm text-ink-700">
            <input
              type="radio"
              name="reason"
              value={reason.value}
              defaultChecked={index === 0}
              required
              className="h-4 w-4 accent-brand-600"
            />
            {reason.label}
          </label>
        ))}
      </fieldset>

      <div className="mt-3">
        <label htmlFor="comment" className="block text-sm font-medium text-ink-700">
          Comentario
        </label>
        <textarea
          id="comment"
          name="comment"
          required
          minLength={5}
          maxLength={1000}
          rows={3}
          className="mt-1 w-full rounded-lg border border-ink-300 px-3 py-2 text-base"
          placeholder="Cuéntanos brevemente qué encontraste"
        />
      </div>

      <div className="mt-3">
        <label htmlFor="evidenceUrl" className="block text-sm font-medium text-ink-700">
          Fuente o evidencia <span className="font-normal text-ink-500">(opcional)</span>
        </label>
        <input
          id="evidenceUrl"
          name="evidenceUrl"
          type="url"
          placeholder="https://…"
          className="mt-1 w-full rounded-lg border border-ink-300 px-3 py-2 text-base"
        />
      </div>

      <div className="mt-3">
        <label htmlFor="reporterContact" className="block text-sm font-medium text-ink-700">
          Tu contacto <span className="font-normal text-ink-500">(opcional, por si necesitamos confirmar)</span>
        </label>
        <input
          id="reporterContact"
          name="reporterContact"
          type="text"
          maxLength={160}
          className="mt-1 w-full rounded-lg border border-ink-300 px-3 py-2 text-base"
        />
      </div>

      {/* Honeypot anti-spam: oculto para personas, tentador para bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor="report-website">No llenar este campo</label>
        <input id="report-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-caution-700">
          {error}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar reporte"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-ink-300 px-4 py-2.5 font-medium text-ink-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
