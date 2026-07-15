"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { supabase } from "@/lib/supabase";
import { emojiForCartItem } from "@/lib/menu-data";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalInr, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("orders").insert({
      customer_name: name,
      phone,
      email: email || null,
      items,
      subtotal: subtotalInr,
      total: subtotalInr,
      special_instructions: notes || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong placing your order. Please try again.");
      return;
    }

    clearCart();
    router.push("/order-confirmed");
  }

  const inputClass =
    "mt-1 w-full rounded-xl border-2 border-espresso/10 bg-cream px-3 py-2.5 text-sm text-espresso outline-none transition focus:border-tomato";
  const labelClass = "block text-xs font-bold uppercase tracking-wide text-espresso/50";

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-espresso">Your cart is empty</h1>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-full bg-tomato px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-espresso">Checkout</h1>
      <p className="mt-2 text-sm text-espresso/60">
        Orders are for pickup at our Nadiad, Gujarat location. Pay in-store on collection.
      </p>

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
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
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

          {error && <p className="text-sm text-tomato">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-tomato px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-tomato-dark disabled:opacity-60"
          >
            {submitting ? "Placing order…" : `Place order — ₹${subtotalInr}`}
          </button>
        </form>

        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-display text-sm font-semibold text-espresso">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-tomato/15 to-golden/20 text-lg">
                  {emojiForCartItem(item)}
                </div>
                <div className="flex flex-1 justify-between text-sm text-espresso/70">
                  <span>
                    {item.quantity}× {item.name}
                  </span>
                  <span>₹{item.unitPriceInr * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-espresso/10 pt-4 text-base font-bold text-espresso">
            <span>Total</span>
            <span className="text-tomato">₹{subtotalInr}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
