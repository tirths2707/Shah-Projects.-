import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Confirms a Stripe Checkout Session and marks the matching order as paid.
//
// KNOWN LIMITATION: this only runs when the customer's browser lands back on
// /order-confirmed after paying. If they close the tab mid-flow, the order
// stays "pending" forever. A Stripe webhook (checkout.session.completed) is
// the robust fix for production — not added here since it needs a separate
// STRIPE_WEBHOOK_SECRET and a publicly reachable endpoint to register with
// Stripe, which this environment can't set up on your behalf.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");

  if (!sessionId || !orderId) {
    return NextResponse.json({ error: "Missing session_id or order_id." }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.client_reference_id !== orderId) {
    return NextResponse.json({ error: "Session/order mismatch." }, { status: 400 });
  }

  const paid = session.payment_status === "paid";

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({
        payment_status: paid ? "paid" : "failed",
        stripe_session_id: sessionId,
      })
      .eq("id", orderId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ paid, order: data });
  } catch {
    return NextResponse.json({ error: "Order confirmation is not configured yet." }, { status: 503 });
  }
}
