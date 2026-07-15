import { createClient } from "@supabase/supabase-js";

// Falls back to a placeholder so a missing env var fails requests at runtime
// instead of crashing the Next.js static build for every page that imports this.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-key";

// Lets callers distinguish "env vars missing" from a genuine insert/network
// failure, so the UI can show a diagnosable message instead of a generic one.
export const isSupabaseConfigured = supabaseUrl !== "https://placeholder.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);
