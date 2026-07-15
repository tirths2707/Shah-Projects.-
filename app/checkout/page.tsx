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

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-extrabold text-plum">Your cart is empty</h1>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-full bg-plum px-6 py-3 text-sm font-semibold text-cream transition hover:bg-plum/90"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold text-plum">Checkout</h1>
      <p className="mt-2 text-sm text-plum/70">
        Orders are for pickup at our Nadiad, Gujarat location. Pay in-store on collection.
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-plum">
              Name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm text-plum outline-none focus:border-plum"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-plum">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm text-plum outline-none focus:border-plum"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-plum">
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm text-plum outline-none focus:border-plum"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-plum">
              Special instructions (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm text-plum outline-none focus:border-plum"
            />
          </div>

          {error && <p className="text-sm text-pink">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-plum px-6 py-3 text-sm font-semibold text-cream transition hover:bg-plum/90 disabled:opacity-60"
          >
            {submitting ? "Placing order…" : `Place order — ₹${subtotalInr}`}
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-plum/10 bg-white p-6">
          <h2 className="font-display text-sm font-bold text-plum">Order summary</h2>
          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-plum/80">
                <span>
                  {item.quantity}× {item.name}
                </span>
                <span>₹{item.unitPriceInr * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-plum/10 pt-4 font-display text-base font-bold text-plum">
            <span>Total</span>
            <span>₹{subtotalInr}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
