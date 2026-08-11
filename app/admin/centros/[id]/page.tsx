import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { EditCenterForm } from "./edit-form";
import { getAdminSession } from "../../auth";
import { setVerificationStatus } from "../../actions";
import { VerificationBadge } from "@/components/centers/verification-badge";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CollectionCenter } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminCenterPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = (await supabase?.from("collection_centers").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!data) notFound();
  const center = data as CollectionCenter & {
    submitted_by_name?: string | null;
    submitted_by_email?: string | null;
    submitted_by_phone?: string | null;
    verification_url?: string | null;
    evidence_url?: string | null;
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <Link href="/admin" className="text-sm text-brand-700 underline underline-offset-2">
        ← Volver al panel
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-ink-900">{center.name}</h1>
        <VerificationBadge status={center.verification_status} />
      </div>

      {(center.submitted_by_name || center.verification_url) && (
        <section className="mt-4 rounded-xl border border-ink-100 bg-white p-4 text-sm">
          <h2 className="font-semibold text-ink-900">Datos de quien lo envió</h2>
          <p className="mt-1 text-ink-700">Responsable: {center.submitted_by_name ?? "—"}</p>
          <p className="text-ink-700">Contacto: {center.submitted_by_phone ?? center.submitted_by_email ?? "—"}</p>
          {center.verification_url && (
            <p className="mt-1">
              Fuente de validación:{" "}
              <a
                href={center.verification_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 underline underline-offset-2"
              >
                {center.verification_url}
              </a>
            </p>
          )}
          {center.evidence_url && (
            <p>
              Evidencia:{" "}
              <a
                href={center.evidence_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 underline underline-offset-2"
              >
                {center.evidence_url}
              </a>
            </p>
          )}
        </section>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ["verified", "Aprobar y verificar"],
            ["reported", "Publicar como reportado"],
            ["disputed", "Rechazar / marcar en disputa"],
            ["inactive", "Marcar inactivo"],
          ] as const
        )
          .filter(([status]) => status !== center.verification_status)
          .map(([status, label]) => (
            <form key={status} action={setVerificationStatus}>
              <input type="hidden" name="id" value={center.id} />
              <input type="hidden" name="status" value={status} />
              <button
                type="submit"
                className="rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
              >
                {label}
              </button>
            </form>
          ))}
      </div>

      <hr className="my-6 border-ink-100" />

      <EditCenterForm center={center} />
    </div>
  );
}
