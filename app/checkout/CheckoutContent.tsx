"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useCart, cartSubtotal } from "@/lib/cart-context";
import { useRegion } from "@/lib/region-context";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { formatPrice } from "@/lib/regions";
import { FormatIcon } from "@/components/icons";

export default function CheckoutContent() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { region, regionId } = useRegion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = cartSubtotal(items, regionId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setSubmitting(false);
      setError(
        "Ordering isn't connected yet (missing Supabase configuration on this deployment). This is a setup issue, not something wrong with your order — please contact the site owner.",
      );
      return;
    }

    const { data: order, error: insertError } = await supabase
      .from("orders")
      .insert({
        customer_name: name,
        phone,
        email: email || null,
        items,
        subtotal,
        total: subtotal,
        special_instructions: notes || null,
        region: regionId,
        currency: region.currency,
        pickup_location: region.label,
        payment_status: region.paymentMode === "online" ? "pending" : "unpaid",
      })
      .select()
      .single();

    if (insertError || !order) {
      // Logged (not shown to the customer) so the site owner can check
      // browser devtools for the real Supabase error — RLS denial, network
      // failure, and schema mismatch all land here otherwise indistinguishable.
      if (insertError) console.error("Order insert failed:", insertError);
      setSubmitting(false);
      setError("Something went wrong placing your order. Please try again.");
      return;
    }

    if (region.paymentMode === "in-store") {
      clearCart();
      router.push("/order-confirmed");
      return;
    }

    // Online payment: hand off to Stripe Checkout.
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, items, regionId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Could not start payment.");
      clearCart();
      window.location.assign(data.url);
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Could not start payment. Please try again.");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border-2 border-espresso/10 bg-cream px-3 py-2.5 text-sm text-espresso outline-none transition focus:border-coral";
  const labelClass = "block text-xs font-bold uppercase tracking-wide text-espresso/50";

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-espresso">Your cart is empty</h1>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-espresso">Checkout</h1>
      <p className="mt-2 text-sm text-espresso/60">{region.pickupLine}</p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email {region.paymentMode === "online" ? "" : "(optional)"}
            </label>
            <input
              id="email"
              type="email"
              required={region.paymentMode === "online"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="notes" className={labelClass}>
              Special instructions (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-coral">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral-dark disabled:opacity-60"
          >
            {submitting
              ? region.paymentMode === "online"
                ? "Redirecting to payment…"
                : "Placing order…"
              : region.paymentMode === "online"
                ? `Pay ${formatPrice(subtotal, regionId)}`
                : `Place order — ${formatPrice(subtotal, regionId)}`}
          </button>
        </form>

        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-display text-sm font-semibold text-espresso">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-coral/10 via-cream to-basil/10">
                  <FormatIcon format={item.format} className="h-4 w-4 text-espresso/30" />
                </div>
                <div className="flex flex-1 justify-between text-sm text-espresso/70">
                  <span>
                    {item.quantity}× {item.name}
                  </span>
                  <span>{formatPrice(item.unitPrice[regionId] * item.quantity, regionId)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-espresso/10 pt-4 text-base font-bold text-espresso">
            <span>Total</span>
            <span className="text-coral">{formatPrice(subtotal, regionId)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
