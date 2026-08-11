import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackCenterView } from "@/components/analytics-events";
import { IconAlert, IconArrowLeft, IconClock, IconClose } from "@/components/ui/icons";
import { CenterActionBar } from "@/components/centers/center-action-bar";
import SingleCenterMap from "@/components/map/lazy-single-map";
import { PrecisionNotice, VerificationBadge } from "@/components/centers/verification-badge";
import { ReportCenterForm } from "@/components/forms/report-center-form";
import { Badge } from "@/components/ui/badge";
import { getAllSlugs, getCenterBySlug } from "@/lib/centers";
import { formatDate, formatDateTime, hasEnded, isStale, relativeTime, staleAfterHours } from "@/lib/format";
import { CENTER_TYPE_LABELS } from "@/lib/items";
import { tripAdvisory } from "@/lib/schedule";
import { cn } from "@/lib/utils";


export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const center = await getCenterBySlug(slug);
  if (!center) return { title: "Centro no encontrado" };

  const description = `${center.address}, ${center.municipality}. Recibe: ${center.accepted_items
    .slice(0, 6)
    .join(", ")}.`;

  return {
    title: `${center.name} — ${center.municipality}`,
    description,
    openGraph: { title: `${center.name} — ${center.municipality}`, description, type: "article" },
  };
}

export default async function CenterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const center = await getCenterBySlug(slug);
  if (!center) notFound();

  const updated = relativeTime(center.last_verified_at);
  const absolute = formatDateTime(center.last_verified_at);
  const stale = isStale(center.last_verified_at);
  const ended = hasEnded(center.ends_at);
  const advisory = tripAdvisory(center);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 pb-28 lg:pb-6">
      <TrackCenterView slug={center.slug} />
      <nav aria-label="Migas de pan" className="mb-4 text-sm">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-brand-700 hover:underline"
        >
          <IconArrowLeft className="size-4" />
          Todos los centros
        </Link>
      </nav>

      <header>
        <h1 className="text-2xl font-bold leading-tight text-ink-900">{center.name}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <VerificationBadge status={center.verification_status} />
          <Badge tone="neutral">{CENTER_TYPE_LABELS[center.type] ?? center.type}</Badge>
        </div>
        {center.organization && (
          <p className="mt-2 text-ink-700">
            <span className="font-medium">Organización responsable:</span> {center.organization}
          </p>
        )}
      </header>

      {ended && (
        <p role="status" className="mt-4 rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
          <IconAlert className="mt-0.5 inline size-4 shrink-0 align-text-top" /> La campaña publicada
          terminaba el {formatDate(center.ends_at)}. Confirma con la organización antes de desplazarte.
        </p>
      )}
      {!ended && stale && (
        <p role="status" className="mt-4 rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
          <IconAlert className="mt-0.5 inline size-4 shrink-0 align-text-top" /> Confirma antes de
          desplazarte: hace más de {staleAfterHours()} horas que no verificamos esta información.
        </p>
      )}

      <section className="mt-5 rounded-xl border border-ink-100 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Dirección</h2>
        <p className="mt-1 text-ink-900">{center.address}</p>
        <p className="text-ink-700">
          {center.municipality}, {center.department}
        </p>
        <div className="mt-2">
          <PrecisionNotice precision={center.location_precision} />
        </div>
      </section>

      <div className="mt-4 overflow-hidden rounded-xl border border-ink-100">
        <SingleCenterMap
          latitude={center.latitude}
          longitude={center.longitude}
          label={center.name}
          precise={center.location_precision === "exact"}
        />
      </div>

      <div className="mt-4">
        <CenterActionBar center={center} />
        {center.phone && (
          <p className="mt-2 text-center text-sm text-ink-500 lg:text-left">{center.phone}</p>
        )}
      </div>

      {/* Esta sección se renderiza SIEMPRE, tenga horario o no.
          Antes desaparecía cuando `schedule_text` era null, y una sección
          ausente se lee como «no aplica» en vez de «no lo sabemos»: la persona
          baja, no ve nada sobre horarios y asume que puede ir cuando quiera. */}
      <section
        className={cn(
          "mt-5 rounded-xl border p-4",
          advisory.level === "ok" ? "border-ink-100 bg-white" : "border-caution-100 bg-caution-50",
        )}
      >
        <h2 className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-ink-500">
          <IconClock className="size-4" />
          Horario
        </h2>
        <p className={cn("mt-1", advisory.level === "ok" ? "text-ink-900" : "text-caution-700")}>
          {advisory.long}
        </p>
        {(center.starts_at || center.ends_at) && (
          <p className="mt-1 text-sm text-ink-500">
            {center.starts_at && `Desde el ${formatDate(center.starts_at)}`}
            {center.starts_at && center.ends_at && " · "}
            {center.ends_at && `hasta el ${formatDate(center.ends_at)}`}
          </p>
        )}
      </section>

      {center.urgent_needs.length > 0 && (
        <section className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Necesita con urgencia
          </h2>
          <ul className="mt-2 space-y-1 text-ink-900">
            {center.urgent_needs.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-4 rounded-xl border border-ink-100 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Qué recibe</h2>
        <ul className="mt-2 grid gap-1 text-ink-900 sm:grid-cols-2">
          {center.accepted_items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      {center.rejected_items.length > 0 && (
        <section className="mt-4 rounded-xl border border-ink-100 bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Qué NO recibe</h2>
          <ul className="mt-2 space-y-1 text-ink-700">
            {center.rejected_items.map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <IconClose className="mt-0.5 size-4 shrink-0 text-caution-700" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-4 rounded-xl border border-ink-100 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Verificación y fuente
        </h2>
        <p className="mt-2 text-ink-900">
          <span className="font-medium">Última verificación: </span>
          {absolute ? `${absolute}${updated ? ` (${updated})` : ""}` : "sin registro"}
        </p>
        <p className="mt-1 text-ink-900">
          <span className="font-medium">Fuente: </span>
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
            center.source_name
          )}
          {center.source_published_at && (
            <span className="text-ink-500"> · publicado el {formatDate(center.source_published_at)}</span>
          )}
        </p>
        {center.verification_notes && (
          <p className="mt-2 text-sm text-ink-500">{center.verification_notes}</p>
        )}
      </section>

      <div className="mt-6">
        <ReportCenterForm centerId={center.id} centerSlug={center.slug} />
      </div>
    </div>
  );
}
