"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "./auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { VerificationStatus } from "@/lib/types";

export type ActionState = { error?: string; success?: string };

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase no está configurado en este despliegue." };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Ingresa tu correo y contraseña." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Credenciales inválidas." };

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

/**
 * Cambia el estado de verificación de un centro.
 *
 * Al verificar (o al editar necesidades) se actualiza `last_verified_at`:
 * la frescura del dato es lo que hace confiable al sitio.
 */
export async function setVerificationStatus(formData: FormData): Promise<void> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as VerificationStatus;
  if (!id || !status) return;

  // `moderated_at` se sella SIEMPRE, no solo al verificar: es la marca que
  // impide que el seed vuelva a pisar esta decisión.
  const patch: Record<string, unknown> = {
    verification_status: status,
    moderated_at: new Date().toISOString(),
  };
  if (status === "verified") {
    patch.last_verified_at = new Date().toISOString();
    patch.verified_by = session.userId;
  }

  const { error } = await supabase.from("collection_centers").update(patch).eq("id", id);
  if (error) console.error("[admin] no se pudo cambiar el estado:", error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCenter(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase no está configurado." };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Falta el identificador del centro." };

  const splitList = (value: FormDataEntryValue | null) =>
    String(value ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  const { error } = await supabase
    .from("collection_centers")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim() || null,
      address: String(formData.get("address") ?? "").trim(),
      municipality: String(formData.get("municipality") ?? "").trim(),
      department: String(formData.get("department") ?? "").trim(),
      schedule_text: String(formData.get("schedule_text") ?? "").trim() || null,
      phone: String(formData.get("phone") ?? "").trim() || null,
      whatsapp: String(formData.get("whatsapp") ?? "").trim() || null,
      accepted_items: splitList(formData.get("accepted_items")),
      urgent_needs: splitList(formData.get("urgent_needs")),
      rejected_items: splitList(formData.get("rejected_items")),
      source_name: String(formData.get("source_name") ?? "").trim(),
      source_url: String(formData.get("source_url") ?? "").trim() || null,
      verification_notes: String(formData.get("verification_notes") ?? "").trim() || null,
      // Editar la información equivale a volver a verificarla.
      last_verified_at: new Date().toISOString(),
      moderated_at: new Date().toISOString(),
      verified_by: session.userId,
    })
    .eq("id", id);

  if (error) return { error: `No se pudo guardar: ${error.message}` };

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: "Cambios guardados y fecha de verificación actualizada." };
}

export async function resolveReport(formData: FormData): Promise<void> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase
    .from("center_reports")
    .update({ resolved: true, resolved_at: new Date().toISOString(), resolved_by: session.userId })
    .eq("id", id);

  revalidatePath("/admin/reportes");
}
