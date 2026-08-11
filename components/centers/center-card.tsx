import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "./verification-badge";
import { formatDistance } from "@/lib/distance";
import { formatDateTime, isStale, relativeTime } from "@/lib/format";
import type { CenterWithDistance } from "@/lib/types";

export function CenterCard({ center }: { center: CenterWithDistance }) {
  const distance = formatDistance(center.distanceKm);
  const updated = relativeTime(center.last_verified_at) ?? formatDateTime(center.last_verified_at);
  const stale = isStale(center.last_verified_at);

  return (
    <article className="rounded-xl border border-ink-100 bg-white p-4 transition hover:border-ink-300">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-ink-900">
          <Link href={`/centros/${center.slug}`} className="hover:underline">
            {center.name}
          </Link>
        </h3>
        {distance && (
          <span className="shrink-0 rounded-lg bg-ink-50 px-2 py-1 text-sm font-semibold tabular-nums text-ink-700">
            {distance}
          </span>
        )}
      </div>

      <p className="mt-1 text-sm text-ink-500">
        {center.address} · {center.municipality}, {center.department}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <VerificationBadge status={center.verification_status} />
        {center.organization && <Badge tone="neutral">{center.organization}</Badge>}
      </div>

      {center.urgent_needs.length > 0 && (
        <p className="mt-3 text-sm text-ink-700">
          <span className="font-medium">Necesita con urgencia: </span>
          {center.urgent_needs.slice(0, 4).join(", ")}
        </p>
      )}

      {center.accepted_items.length > 0 && (
        <p className="mt-1 text-sm text-ink-500">
          <span className="font-medium text-ink-700">Recibe: </span>
          {center.accepted_items.slice(0, 5).join(", ")}
          {center.accepted_items.length > 5 && ` y ${center.accepted_items.length - 5} más`}
        </p>
      )}

      {center.schedule_text && <p className="mt-1 text-sm text-ink-500">🕒 {center.schedule_text}</p>}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-ink-100 pt-3">
        <p className="text-xs text-ink-500">
          {updated ? `Verificado ${updated}` : "Sin fecha de verificación"}
          {stale && <span className="ml-1 text-caution-700">· ⚠ Confirma antes de desplazarte</span>}
        </p>
        <Link
          href={`/centros/${center.slug}`}
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          Ver detalles →
        </Link>
      </div>
    </article>
  );
}
