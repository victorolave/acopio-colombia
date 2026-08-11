import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * Cliente anónimo SIN cookies, para leer los centros públicos.
 *
 * Por qué existe: los datos públicos no dependen de la sesión del visitante
 * (RLS solo expone `verified` y `reported` al rol `anon`). Usar el cliente
 * ligado a cookies aquí rompía `generateStaticParams`, que corre en build y no
 * tiene request scope: «cookies was called outside a request scope».
 *
 * Además permite prerenderizar las fichas de centro como HTML estático.
 */
export function createSupabasePublicClient() {
  if (!isSupabaseConfigured) return null;

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
