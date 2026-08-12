import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { evidenceKind, submissionSchema, type EvidenceKind } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { slugify } from "@/lib/utils";

/**
 * Nota de moderación según la prueba que trajo el envío. No son intercambiables:
 * un enlace se revisa leyendo, un contacto se revisa llamando. Decirlo aquí
 * ahorra que quien modera lo deduzca centro por centro.
 */
const EVIDENCE_NOTE: Record<EvidenceKind, string> = {
  url: "Enviado desde el formulario público con enlace de verificación. Pendiente de revisar la fuente.",
  contact:
    "Enviado desde el formulario público SIN enlace: la única prueba es el contacto del centro. Confirmar por llamada antes de publicar.",
  both: "Enviado desde el formulario público con enlace y contacto del centro. Pendiente de revisar.",
};

/**
 * Registro de un centro enviado por la comunidad.
 *
 * SIEMPRE entra como `pending`. Nunca se publica automáticamente: ese es el
 * principio central del producto.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`submission:${ip}`, 5, 3600);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Demasiados envíos desde esta conexión. Intenta más tarde." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Revisa los datos del formulario.", field: first?.path?.[0] },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: si viene relleno es un bot. Respondemos 200 para no darle señal.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "El registro de centros no está disponible en este momento. Escríbenos para reportar el centro.",
      },
      { status: 503 },
    );
  }

  const baseSlug = slugify(`${data.name}-${data.municipality}`);
  const slug = `${baseSlug}-${Date.now().toString(36).slice(-4)}`;

  // El esquema ya garantiza que hay al menos una prueba: aquí nunca es null.
  const kind = evidenceKind(data) ?? "contact";

  const { error } = await supabase.from("collection_centers").insert({
    slug,
    name: data.name,
    organization: data.organization,
    type: "general",
    department: data.department,
    municipality: data.municipality,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
    // El pin lo ubicó una persona sobre el mapa: es lo más confiable que tenemos.
    location_precision: "exact",
    accepted_items: data.acceptedItems,
    urgent_needs: [],
    rejected_items: [],
    schedule_text: data.scheduleText,
    phone: data.contactPhone,
    whatsapp: data.contactWhatsapp,
    email: data.contactEmail,
    source_name: "Enviado por la comunidad",
    source_url: data.verificationUrl,
    verification_status: "pending",
    verification_notes: EVIDENCE_NOTE[kind],
    submitted_by_name: data.contactName,
    submitted_by_email: data.contactEmail,
    submitted_by_phone: data.contactPhone ?? data.contactWhatsapp,
    submitted_nit: data.nit,
    verification_url: data.verificationUrl,
    evidence_url: data.evidenceUrl,
  });

  if (error) {
    console.error("[submissions] error al insertar:", error.message);
    return NextResponse.json({ error: "No pudimos guardar el centro. Intenta de nuevo." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
