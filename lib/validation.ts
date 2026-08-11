import { z } from "zod";

/** Departamentos de Colombia + Bogotá D.C. */
export const DEPARTMENTS = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bogotá D.C.",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Guainía",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés y Providencia",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada",
] as const;

const trimmed = (max: number) => z.string().trim().max(max);

const optionalText = (max: number) =>
  trimmed(max)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null));

export const submissionSchema = z
  .object({
    name: trimmed(160).min(3, "El nombre del centro es obligatorio"),
    organization: trimmed(160).min(2, "Indica la organización responsable"),
    department: z.enum(DEPARTMENTS, { error: () => "Selecciona un departamento" }),
    municipality: trimmed(120).min(2, "Indica el municipio"),
    address: trimmed(240).min(5, "Indica la dirección"),

    latitude: z.coerce.number().min(-4.3).max(13.5),
    longitude: z.coerce.number().min(-82).max(-66.8),

    acceptedItems: z.array(trimmed(80)).min(1, "Indica al menos qué recibe el centro"),
    scheduleText: trimmed(200).min(3, "Indica el horario de atención"),

    contactName: trimmed(160).min(3, "Indica quién es la persona responsable"),
    contactPhone: optionalText(40),
    contactWhatsapp: optionalText(40),
    contactEmail: z
      .string()
      .trim()
      .email("Correo inválido")
      .max(160)
      .optional()
      .or(z.literal(""))
      .transform((v) => (v && v.length > 0 ? v : null)),

    nit: optionalText(40),

    verificationUrl: z.string().trim().url("Debe ser un enlace válido (https://...)").max(500),
    evidenceUrl: optionalText(500),

    consent: z.literal(true, {
      // zod 4 reemplazó `errorMap` por `error`.
      error: () => "Debes confirmar la autorización para publicar los datos",
    }),

    /**
     * Campo trampa anti-spam: los bots lo rellenan, las personas no lo ven.
     * Se acepta cualquier valor a propósito: la decisión la toma el route handler,
     * que responde 200 sin guardar nada. Rechazarlo aquí le confirmaría al bot
     * que detectamos la trampa.
     */
    website: z.string().max(200).optional(),
  })
  .refine((data) => data.contactPhone || data.contactWhatsapp || data.contactEmail, {
    message: "Deja al menos un teléfono, WhatsApp o correo de contacto",
    path: ["contactPhone"],
  });

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const REPORT_REASONS = [
  { value: "closed", label: "El centro está cerrado" },
  { value: "schedule_changed", label: "Cambió el horario" },
  { value: "items_changed", label: "Ya no reciben estos artículos" },
  { value: "wrong_address", label: "Dirección incorrecta" },
  { value: "false_information", label: "Información falsa" },
  { value: "other", label: "Otro" },
] as const;

export const reportSchema = z.object({
  centerId: z.string().uuid().or(z.string().min(1)),
  reason: z.enum(["closed", "schedule_changed", "items_changed", "wrong_address", "false_information", "other"]),
  comment: z.string().trim().min(5, "Cuéntanos brevemente qué cambió").max(1000),
  evidenceUrl: z
    .string()
    .trim()
    .url("Debe ser un enlace válido")
    .max(500)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v && v.length > 0 ? v : null)),
  reporterContact: z.string().trim().max(160).optional().transform((v) => (v && v.length > 0 ? v : null)),
  /** Honeypot: ver nota en submissionSchema. */
  website: z.string().max(200).optional(),
});

export type ReportInput = z.infer<typeof reportSchema>;
