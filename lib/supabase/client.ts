"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseAnonKey, getSupabaseUrl } from "lib/supabase/config";

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL. Please add it to your .env.local file.\n" +
    "Example: NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co"
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing Supabase public key. Add NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY to .env.local"
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    `Invalid NEXT_PUBLIC_SUPABASE_URL: "${supabaseUrl}". It must be a valid HTTP/HTTPS URL.\n` +
    "Example: https://your-project-id.supabase.co"
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
