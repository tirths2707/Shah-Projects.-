import { NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartLineItem } from "@/lib/types";
import { regions, type RegionId } from "@/lib/regions";

// Requires STRIPE_SECRET_KEY (Vercel project settings, server-side env var)
// from a Stripe account — get it from dashboard.stripe.com/apikeys.

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Online payment isn't configured yet. Please contact us to place this order." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as {
    orderId: string;
    items: CartLineItem[];
    regionId: RegionId;
  };
  const { orderId, items, regionId } = body;
  const region = regions[regionId];

  if (region.paymentMode !== "online") {
    return NextResponse.json({ error: "This region does not use online payment." }, { status: 400 });
  }
  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: orderId,
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: region.currency.toLowerCase(),
        unit_amount: Math.round(item.unitPrice[regionId] * 100),
        product_data: { name: item.name },
      },
    })),
    success_url: `${origin}/order-confirmed?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
    cancel_url: `${origin}/checkout`,
  });

  return NextResponse.json({ url: session.url });
}
