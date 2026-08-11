import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DirectionsButton } from "@/components/centers/directions-button";
import SingleCenterMap from "@/components/map/lazy-single-map";
import { PrecisionNotice, VerificationBadge } from "@/components/centers/verification-badge";
import { ReportCenterForm } from "@/components/forms/report-center-form";
import { Badge } from "@/components/ui/badge";
import { getAllSlugs, getCenterBySlug } from "@/lib/centers";
import { formatDate, formatDateTime, hasEnded, isStale, relativeTime } from "@/lib/format";
import { CENTER_TYPE_LABELS } from "@/lib/items";
import { telUrl, whatsappUrl } from "@/lib/maps";

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

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <nav aria-label="Migas de pan" className="mb-4 text-sm">
        <Link href="/" className="text-brand-700 underline underline-offset-2">
          ← Todos los centros
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
          ⚠ La campaña publicada terminaba el {formatDate(center.ends_at)}. Confirma con la organización
          antes de desplazarte.
        </p>
      )}
      {!ended && stale && (
        <p role="status" className="mt-4 rounded-lg bg-caution-50 px-3 py-2 text-sm text-caution-700">
          ⚠ Confirma antes de desplazarte: hace más de 48 horas que no verificamos esta información.
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

      <div className="mt-4 space-y-2">
        <DirectionsButton center={center} />
        <div className="grid grid-cols-2 gap-2">
          {center.whatsapp && (
            <a
              href={whatsappUrl(center.whatsapp, `Hola, escribo por el centro de acopio ${center.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-ink-300 bg-white px-4 py-3 text-center font-medium text-ink-700"
            >
              💬 WhatsApp
            </a>
          )}
          {center.phone && (
            <a
              href={telUrl(center.phone)}
              className="rounded-lg border border-ink-300 bg-white px-4 py-3 text-center font-medium text-ink-700"
            >
              📞 Llamar
            </a>
          )}
        </div>
        {center.phone && (
          <p className="text-center text-sm text-ink-500">{center.phone}</p>
        )}
      </div>

      {center.schedule_text && (
        <section className="mt-5 rounded-xl border border-ink-100 bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Horario</h2>
          <p className="mt-1 text-ink-900">{center.schedule_text}</p>
          {(center.starts_at || center.ends_at) && (
            <p className="mt-1 text-sm text-ink-500">
              {center.starts_at && `Desde el ${formatDate(center.starts_at)}`}
              {center.starts_at && center.ends_at && " · "}
              {center.ends_at && `hasta el ${formatDate(center.ends_at)}`}
            </p>
          )}
        </section>
      )}

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
              <li key={item}>✕ {item}</li>
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
