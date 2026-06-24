import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl } from "lib/supabase/config";

/** Server-only. Bypasses RLS - use only in admin API/actions. */
export function getSupabaseServiceClient() {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
