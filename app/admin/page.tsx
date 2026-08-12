import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "./auth";
import { setVerificationStatus, signOut } from "./actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VerificationBadge } from "@/components/centers/verification-badge";
import { formatDateTime } from "@/lib/format";
import { evidenceKind, type EvidenceKind } from "@/lib/validation";
import type { AdminCenter, VerificationStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const TABS: { value: VerificationStatus; label: string }[] = [
  { value: "pending", label: "Pendientes" },
  { value: "reported", label: "Reportados" },
  { value: "verified", label: "Verificados" },
  { value: "disputed", label: "Disputados" },
  { value: "inactive", label: "Inactivos" },
];

/**
 * Con qué se puede comprobar un envío, y en qué orden conviene atenderlo.
 *
 * Un enlace se revisa leyendo; un contacto obliga a llamar. Los envíos que solo
 * traen contacto son los que más tiempo cuestan y los que más fácil se quedan
 * estancados, así que se marcan.
 */
const EVIDENCE: Record<EvidenceKind, { label: string; tone: string }> = {
  url: { label: "Enlace", tone: "border-ink-300 text-ink-700" },
  contact: { label: "Solo contacto", tone: "border-caution-700 text-caution-700" },
  both: { label: "Enlace + contacto", tone: "border-brand-600 text-brand-700" },
};

/** La prueba solo tiene sentido en lo que llegó por el formulario público. */
function submissionEvidence(center: AdminCenter): EvidenceKind | null {
  const fromForm = Boolean(
    center.verification_url ||
      center.submitted_by_name ||
      center.submitted_by_phone ||
      center.submitted_by_email,
  );
  if (!fromForm) return null;

  return evidenceKind({
    verificationUrl: center.verification_url,
    contactPhone: center.phone,
    contactWhatsapp: center.whatsapp,
    contactEmail: center.email,
  });
}

function EvidenceTag({ center }: { center: AdminCenter }) {
  const kind = submissionEvidence(center);
  if (!kind) return <span className="text-ink-500">—</span>;

  const { label, tone } = EVIDENCE[kind];
  return (
    <span className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${tone}`}>
      {label}
    </span>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { estado } = await searchParams;
  const active = (TABS.find((t) => t.value === estado)?.value ?? "pending") as VerificationStatus;

  const supabase = await createSupabaseServerClient();
  const { data } = (await supabase
    ?.from("collection_centers")
    .select("*")
    .eq("verification_status", active)
    .order("created_at", { ascending: false })) ?? { data: [] };

  const centers = (data ?? []) as AdminCenter[];

  const { count: openReports } =
    (await supabase
      ?.from("center_reports")
      .select("id", { count: "exact", head: true })
      .eq("resolved", false)) ?? { count: 0 };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Administración</h1>
          <p className="text-sm text-ink-500">{session.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/reportes"
            className="rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm font-medium text-ink-700"
          >
            Reportes {openReports ? `(${openReports})` : ""}
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm font-medium text-ink-700"
            >
              Salir
            </button>
          </form>
        </div>
      </div>

      <nav aria-label="Estados" className="mt-5 flex flex-wrap gap-1.5">
        {TABS.map((tab) => (
          <Link
            key={tab.value}
            href={`/admin?estado=${tab.value}`}
            aria-current={active === tab.value ? "page" : undefined}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              active === tab.value
                ? "border-brand-600 bg-brand-600 font-medium text-white"
                : "border-ink-300 bg-white text-ink-700"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="mt-5 overflow-x-auto rounded-xl border border-ink-100 bg-white">
        <table className="w-full min-w-[64rem] text-sm">
          <caption className="sr-only">Centros en estado {active}</caption>
          <thead className="bg-ink-50 text-left text-ink-500">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium">Centro</th>
              <th scope="col" className="px-3 py-2 font-medium">Ciudad</th>
              <th scope="col" className="px-3 py-2 font-medium">Organización</th>
              <th scope="col" className="px-3 py-2 font-medium">Fuente</th>
              <th scope="col" className="px-3 py-2 font-medium">Prueba</th>
              <th scope="col" className="px-3 py-2 font-medium">Verificado</th>
              <th scope="col" className="px-3 py-2 font-medium">Estado</th>
              <th scope="col" className="px-3 py-2 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {centers.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-ink-500">
                  No hay centros en este estado.
                </td>
              </tr>
            )}
            {centers.map((center) => (
              <tr key={center.id} className="align-top">
                <td className="px-3 py-3">
                  <Link href={`/admin/centros/${center.id}`} className="font-medium text-brand-700 hover:underline">
                    {center.name}
                  </Link>
                  <p className="text-xs text-ink-500">{center.address}</p>
                </td>
                <td className="px-3 py-3 text-ink-700">
                  {center.municipality}
                  <p className="text-xs text-ink-500">{center.department}</p>
                </td>
                <td className="px-3 py-3 text-ink-700">{center.organization ?? "—"}</td>
                <td className="px-3 py-3">
                  {center.source_url ? (
                    <a
                      href={center.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 underline underline-offset-2"
                    >
                      {center.source_name}
                    </a>
                  ) : (
                    <span className="text-ink-500">{center.source_name}</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <EvidenceTag center={center} />
                </td>
                <td className="px-3 py-3 text-ink-500">
                  {formatDateTime(center.last_verified_at) ?? "—"}
                </td>
                <td className="px-3 py-3">
                  <VerificationBadge status={center.verification_status} />
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(
                      [
                        ["verified", "Verificar"],
                        ["reported", "Marcar reportado"],
                        ["disputed", "Disputado"],
                        ["inactive", "Inactivo"],
                      ] as const
                    )
                      .filter(([status]) => status !== center.verification_status)
                      .map(([status, label]) => (
                        <form key={status} action={setVerificationStatus}>
                          <input type="hidden" name="id" value={center.id} />
                          <input type="hidden" name="status" value={status} />
                          <button
                            type="submit"
                            className="rounded border border-ink-300 px-2 py-1 text-xs text-ink-700 hover:bg-ink-50"
                          >
                            {label}
                          </button>
                        </form>
                      ))}
                    <Link
                      href={`/admin/centros/${center.id}`}
                      className="rounded border border-ink-300 px-2 py-1 text-xs text-ink-700 hover:bg-ink-50"
                    >
                      Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
