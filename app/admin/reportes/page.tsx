import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "../auth";
import { resolveReport } from "../actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/format";
import { REPORT_REASONS } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Report = {
  id: string;
  center_id: string | null;
  center_slug: string | null;
  reason: string;
  comment: string;
  evidence_url: string | null;
  reporter_contact: string | null;
  resolved: boolean;
  created_at: string;
};

const REASON_LABELS = Object.fromEntries(REPORT_REASONS.map((r) => [r.value, r.label]));

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { estado } = await searchParams;
  const showResolved = estado === "resueltos";

  const supabase = await createSupabaseServerClient();
  const { data } = (await supabase
    ?.from("center_reports")
    .select("*")
    .eq("resolved", showResolved)
    .order("created_at", { ascending: false })) ?? { data: [] };

  const reports = (data ?? []) as Report[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Link href="/admin" className="text-sm text-brand-700 underline underline-offset-2">
        ← Volver al panel
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-ink-900">Reportes de la comunidad</h1>
      <p className="mt-1 text-sm text-ink-500">
        Un reporte nunca cambia el centro automáticamente. Revísalo y decide.
      </p>

      <nav aria-label="Filtro de reportes" className="mt-4 flex gap-1.5">
        <Link
          href="/admin/reportes"
          aria-current={!showResolved ? "page" : undefined}
          className={`rounded-full border px-3 py-1.5 text-sm ${!showResolved ? "border-brand-600 bg-brand-600 font-medium text-white" : "border-ink-300 bg-white text-ink-700"}`}
        >
          Sin resolver
        </Link>
        <Link
          href="/admin/reportes?estado=resueltos"
          aria-current={showResolved ? "page" : undefined}
          className={`rounded-full border px-3 py-1.5 text-sm ${showResolved ? "border-brand-600 bg-brand-600 font-medium text-white" : "border-ink-300 bg-white text-ink-700"}`}
        >
          Resueltos
        </Link>
      </nav>

      <div className="mt-5 space-y-3">
        {reports.length === 0 && (
          <p className="rounded-xl border border-dashed border-ink-300 bg-white p-8 text-center text-ink-500">
            No hay reportes {showResolved ? "resueltos" : "sin resolver"}.
          </p>
        )}

        {reports.map((report) => (
          <article key={report.id} className="rounded-xl border border-ink-100 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="font-semibold text-ink-900">
                {REASON_LABELS[report.reason] ?? report.reason}
              </h2>
              <span className="text-xs text-ink-500">{formatDateTime(report.created_at)}</span>
            </div>

            {report.center_slug && (
              <p className="mt-1 text-sm">
                Centro:{" "}
                <Link
                  href={`/centros/${report.center_slug}`}
                  className="text-brand-700 underline underline-offset-2"
                >
                  {report.center_slug}
                </Link>
                {report.center_id && (
                  <>
                    {" · "}
                    <Link
                      href={`/admin/centros/${report.center_id}`}
                      className="text-brand-700 underline underline-offset-2"
                    >
                      editar
                    </Link>
                  </>
                )}
              </p>
            )}

            <p className="mt-2 text-ink-700">{report.comment}</p>

            {report.evidence_url && (
              <p className="mt-1 text-sm">
                Evidencia:{" "}
                <a
                  href={report.evidence_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 underline underline-offset-2"
                >
                  {report.evidence_url}
                </a>
              </p>
            )}

            {report.reporter_contact && (
              <p className="mt-1 text-sm text-ink-500">Contacto: {report.reporter_contact}</p>
            )}

            {!report.resolved && (
              <form action={resolveReport} className="mt-3">
                <input type="hidden" name="id" value={report.id} />
                <button
                  type="submit"
                  className="rounded-lg border border-ink-300 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
                >
                  Marcar como revisado
                </button>
              </form>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
