"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { supabase } from "@/lib/supabase";

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
    "mt-1 w-full border-0 border-b-2 border-parchment/30 bg-transparent px-1 py-2 text-sm text-parchment outline-none focus:border-ember";
  const labelClass = "font-label block text-xs font-bold uppercase tracking-wide text-parchment/70";

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-black uppercase text-parchment">
          Your cart is empty
        </h1>
        <Link
          href="/menu"
          className="mt-6 inline-block border-2 border-ember bg-ember px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-black uppercase text-parchment">Checkout</h1>
      <p className="mt-2 text-sm text-parchment/60">
        Orders are for pickup at our Nadiad, Gujarat location. Pay in-store on collection.
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {error && <p className="text-sm text-ember">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full border-2 border-ember bg-ember px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember disabled:opacity-60"
          >
            {submitting ? "Placing order…" : `Place order — ₹${subtotalInr}`}
          </button>
        </form>

        <div className="h-fit border-2 border-outline bg-cocoa-light p-6">
          <h2 className="font-display text-sm font-extrabold uppercase text-parchment">
            Order summary
          </h2>
          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-parchment/70">
                <span>
                  {item.quantity}× {item.name}
                </span>
                <span>₹{item.unitPriceInr * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="font-label mt-4 flex justify-between border-t-2 border-outline pt-4 text-base font-bold text-parchment">
            <span>Total</span>
            <span className="text-ember">₹{subtotalInr}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
