import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Hanya dipakai di route handler. Service role key melewati RLS, jadi
// file ini tidak boleh di-import dari komponen "use client".
export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY belum diisi di .env.local");
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
