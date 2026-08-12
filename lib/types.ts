export type VerificationStatus =
  | "verified"
  | "reported"
  | "pending"
  | "disputed"
  | "inactive";

export type CenterType =
  | "general"
  | "food"
  | "medical"
  | "rescue_supplies"
  | "animal_aid"
  | "mixed";

/**
 * Qué tan confiable es el pin en el mapa.
 * Las direcciones colombianas (carrera/calle/diagonal) no siempre resuelven bien
 * contra OpenStreetMap, así que la precisión se guarda y se muestra al usuario
 * en lugar de fingir exactitud.
 */
export type LocationPrecision = "exact" | "approximate" | "municipality";

export type CollectionCenter = {
  id: string;
  slug: string;

  name: string;
  organization: string | null;

  type: CenterType;

  department: string;
  municipality: string;
  address: string;

  latitude: number;
  longitude: number;
  location_precision: LocationPrecision;

  accepted_items: string[];
  urgent_needs: string[];
  rejected_items: string[];

  schedule_text: string | null;

  starts_at: string | null;
  ends_at: string | null;

  phone: string | null;
  whatsapp: string | null;
  email: string | null;

  source_name: string;
  source_url: string | null;
  source_published_at: string | null;

  verification_status: VerificationStatus;
  verification_notes: string | null;

  last_verified_at: string | null;

  created_at: string;
  updated_at: string;
};

/** Centro con la distancia calculada en memoria respecto al visitante. */
export type CenterWithDistance = CollectionCenter & { distanceKm: number | null };

/**
 * Centro visto desde el panel, con los campos del envío que NUNCA salen al
 * público: `lib/centers.ts` selecciona una lista explícita de columnas que los
 * excluye a propósito. Quien modera sí los necesita.
 */
export type AdminCenter = CollectionCenter & {
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  submitted_by_phone: string | null;
  submitted_nit: string | null;
  verification_url: string | null;
  evidence_url: string | null;
};

export type ReportReason =
  | "closed"
  | "schedule_changed"
  | "items_changed"
  | "wrong_address"
  | "false_information"
  | "other";
