"use client";

import { useActionState } from "react";
import { updateCenter, type ActionState } from "../../actions";
import type { CollectionCenter } from "@/lib/types";

const FIELD = "mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2 text-base";
const LABEL = "block text-sm font-medium text-ink-700";

const initialState: ActionState = {};

export function EditCenterForm({ center }: { center: CollectionCenter }) {
  const [state, formAction, pending] = useActionState(updateCenter, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={center.id} />

      <div>
        <label htmlFor="name" className={LABEL}>Nombre</label>
        <input id="name" name="name" defaultValue={center.name} required className={FIELD} />
      </div>

      <div>
        <label htmlFor="organization" className={LABEL}>Organización</label>
        <input id="organization" name="organization" defaultValue={center.organization ?? ""} className={FIELD} />
      </div>

      <div>
        <label htmlFor="address" className={LABEL}>Dirección</label>
        <input id="address" name="address" defaultValue={center.address} required className={FIELD} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="municipality" className={LABEL}>Municipio</label>
          <input id="municipality" name="municipality" defaultValue={center.municipality} required className={FIELD} />
        </div>
        <div>
          <label htmlFor="department" className={LABEL}>Departamento</label>
          <input id="department" name="department" defaultValue={center.department} required className={FIELD} />
        </div>
      </div>

      <div>
        <label htmlFor="schedule_text" className={LABEL}>Horario</label>
        <input id="schedule_text" name="schedule_text" defaultValue={center.schedule_text ?? ""} className={FIELD} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={LABEL}>Teléfono</label>
          <input id="phone" name="phone" defaultValue={center.phone ?? ""} className={FIELD} />
        </div>
        <div>
          <label htmlFor="whatsapp" className={LABEL}>WhatsApp</label>
          <input id="whatsapp" name="whatsapp" defaultValue={center.whatsapp ?? ""} className={FIELD} />
        </div>
      </div>

      <div>
        <label htmlFor="urgent_needs" className={LABEL}>
          Necesidades urgentes <span className="font-normal text-ink-500">(una por línea)</span>
        </label>
        <textarea
          id="urgent_needs"
          name="urgent_needs"
          rows={3}
          defaultValue={center.urgent_needs.join("\n")}
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="accepted_items" className={LABEL}>
          Qué recibe <span className="font-normal text-ink-500">(una por línea)</span>
        </label>
        <textarea
          id="accepted_items"
          name="accepted_items"
          rows={6}
          defaultValue={center.accepted_items.join("\n")}
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="rejected_items" className={LABEL}>
          Qué NO recibe <span className="font-normal text-ink-500">(una por línea)</span>
        </label>
        <textarea
          id="rejected_items"
          name="rejected_items"
          rows={3}
          defaultValue={center.rejected_items.join("\n")}
          className={FIELD}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="source_name" className={LABEL}>Nombre de la fuente</label>
          <input id="source_name" name="source_name" defaultValue={center.source_name} required className={FIELD} />
        </div>
        <div>
          <label htmlFor="source_url" className={LABEL}>Enlace de la fuente</label>
          <input id="source_url" name="source_url" type="url" defaultValue={center.source_url ?? ""} className={FIELD} />
        </div>
      </div>

      <div>
        <label htmlFor="verification_notes" className={LABEL}>Notas de verificación</label>
        <textarea
          id="verification_notes"
          name="verification_notes"
          rows={3}
          defaultValue={center.verification_notes ?? ""}
          className={FIELD}
        />
      </div>

      <p className="rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
        Al guardar se actualiza automáticamente la fecha de última verificación.
      </p>

      {state.error && (
        <p role="alert" className="rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Guardar cambios"}
      </button>
    </form>
  );
}
