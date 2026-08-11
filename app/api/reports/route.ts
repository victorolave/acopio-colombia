import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { reportSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Reporte de información incorrecta sobre un centro publicado.
 * NO modifica el centro: queda registrado para revisión de un administrador.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`report:${ip}`, 10, 3600);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Demasiados reportes desde esta conexión. Intenta más tarde." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = reportSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Revisa los datos del reporte." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Los reportes no están disponibles en este momento." },
      { status: 503 },
    );
  }

  // Cuando la app sirve el seed estático, el id es el slug y no un UUID.
  const centerSlug =
    typeof payload.centerSlug === "string" ? payload.centerSlug : String(data.centerId);

  const { error } = await supabase.from("center_reports").insert({
    center_id: UUID_RE.test(data.centerId) ? data.centerId : null,
    center_slug: centerSlug,
    reason: data.reason,
    comment: data.comment,
    evidence_url: data.evidenceUrl,
    reporter_contact: data.reporterContact,
  });

  if (error) {
    console.error("[reports] error al insertar:", error.message);
    return NextResponse.json({ error: "No pudimos guardar el reporte." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
