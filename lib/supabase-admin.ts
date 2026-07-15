import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key — bypasses RLS. Never
// import this from a Client Component; it must stay off the browser bundle.
// Requires SUPABASE_SERVICE_ROLE_KEY (Vercel project settings, server-side
// env var, no NEXT_PUBLIC_ prefix) — get it from Supabase Dashboard →
// Project Settings → API.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured — set it in Vercel project env vars.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
