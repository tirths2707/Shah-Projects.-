"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { FormatIcon } from "@/components/icons";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotalInr } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-espresso">Your cart is empty</h1>
        <p className="mt-3 text-espresso/60">Add something from the menu to get started.</p>
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
      <h1 className="font-display text-4xl font-bold text-espresso">Your cart</h1>

      <div className="mt-8 divide-y divide-espresso/10 rounded-2xl bg-white p-2 shadow-sm">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-coral/10 via-cream to-basil/10">
              <FormatIcon format={item.format} className="h-6 w-6 text-espresso/30" />
            </div>

            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-espresso">{item.name}</p>
              {item.detail && <p className="mt-0.5 text-xs text-espresso/50">{item.detail}</p>}
              <p className="mt-1 text-sm font-medium text-coral">₹{item.unitPriceInr}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="h-8 w-8 rounded-full border border-espresso/15 text-espresso transition hover:border-coral hover:text-coral"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium text-espresso">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 rounded-full border border-espresso/15 text-espresso transition hover:border-coral hover:text-coral"
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>

            <p className="w-20 text-right text-sm font-bold text-espresso">
              ₹{item.unitPriceInr * item.quantity}
            </p>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-espresso/30 transition hover:text-coral"
              aria-label={`Remove ${item.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-espresso/[0.04] px-6 py-5">
        <span className="font-display text-lg font-semibold text-espresso">Subtotal</span>
        <span className="text-2xl font-bold text-coral">₹{subtotalInr}</span>
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-4">
        <Link
          href="/menu"
          className="rounded-full border border-espresso/15 px-6 py-3 text-sm font-bold text-espresso transition hover:border-coral hover:text-coral"
        >
          Add more items
        </Link>
        <Link
          href="/checkout"
          className="rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
