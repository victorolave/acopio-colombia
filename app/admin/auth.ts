import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminSession = { userId: string; email: string };

/**
 * Devuelve la sesión sólo si el usuario está en la tabla `admin_users`.
 * Estar autenticado en Supabase NO basta para administrar.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id, email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return { userId: data.user_id, email: data.email };
}
