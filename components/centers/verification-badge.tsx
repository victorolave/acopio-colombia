import { Badge } from "@/components/ui/badge";
import type { VerificationStatus } from "@/lib/types";

/**
 * El estado de verificación nunca se comunica solo con color: siempre lleva
 * icono y texto, para daltonismo y lectores de pantalla.
 */
export function VerificationBadge({ status }: { status: VerificationStatus }) {
  if (status === "verified") {
    return (
      <Badge tone="brand">
        <span aria-hidden="true">✓</span> Verificado
      </Badge>
    );
  }

  if (status === "reported") {
    return (
      <Badge tone="caution">
        <span aria-hidden="true">!</span> Reportado — confirma antes de ir
      </Badge>
    );
  }

  if (status === "inactive") {
    return <Badge tone="muted">Inactivo</Badge>;
  }

  if (status === "disputed") {
    return <Badge tone="caution">Fuentes contradictorias</Badge>;
  }

  return <Badge tone="muted">Pendiente de revisión</Badge>;
}

/** Aviso de precisión del pin. Es información honesta, no un detalle menor. */
export function PrecisionNotice({ precision }: { precision: "exact" | "approximate" | "municipality" }) {
  if (precision === "exact") return null;

  const text =
    precision === "municipality"
      ? "Ubicación aproximada al municipio. Guíate por la dirección y confirma con el centro."
      : "El punto en el mapa es aproximado. Guíate por la dirección escrita.";

  return (
    <p className="flex items-start gap-1.5 text-xs text-caution-700">
      <span aria-hidden="true">◎</span>
      <span>{text}</span>
    </p>
  );
}
