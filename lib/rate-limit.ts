/**
 * Rate limiting simple, en memoria del proceso.
 *
 * LIMITACIÓN CONOCIDA: en un despliegue serverless con varias instancias, cada
 * una lleva su propio contador, así que el límite efectivo es más laxo. Es
 * suficiente para frenar spam básico y NO retrasa el lanzamiento. Junto con el
 * honeypot y la validación con Zod cubre el MVP.
 *
 * Para endurecerlo después: mover los contadores a Upstash Redis o al WAF.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

export function rateLimit(key: string, limit: number, windowSeconds: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  // Limpieza oportunista para que el mapa no crezca sin control.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** IP del cliente detrás del proxy de Vercel. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "desconocida";
}
