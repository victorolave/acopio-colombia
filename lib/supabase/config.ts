export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * La app funciona sin Supabase leyendo el seed estático. Esto permite desplegar
 * en minutos durante la emergencia y conectar la base de datos después, sin
 * bloquear la publicación de información que ya está verificada.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
