import { NextResponse } from "next/server";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

// Live order feed for the owner/kitchen dashboard. Reads orders through the
// service-role key on the server only — the anon browser client never gets
// SELECT access, so customer order details are never exposed publicly.
//
// Gated by a shared password (ADMIN_PASSWORD env var). This is a simple
// prototype gate, not a full auth system — fine for one owner, but move to
// real accounts (Supabase Auth) before giving multiple staff access.
//
// Requires on the deployment: SUPABASE_SERVICE_ROLE_KEY and ADMIN_PASSWORD.

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "The order dashboard isn't configured yet. Add SUPABASE_SERVICE_ROLE_KEY and ADMIN_PASSWORD to the deployment's environment variables.",
      },
      { status: 503 },
    );
  }

  const { password } = (await request.json().catch(() => ({}))) as { password?: string };

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      "id, customer_name, phone, email, items, total, currency, region, pickup_location, payment_status, status, special_instructions, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: "Could not load orders." }, { status: 500 });
  }

  return NextResponse.json({ orders: data });
}
