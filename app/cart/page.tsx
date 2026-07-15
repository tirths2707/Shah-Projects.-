"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotalInr } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-extrabold text-plum">Your cart is empty</h1>
        <p className="mt-3 text-plum/70">Add something from the menu to get started.</p>
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
      <h1 className="font-display text-3xl font-extrabold text-plum">Your cart</h1>

      <div className="mt-8 divide-y divide-plum/10 rounded-2xl border border-plum/10 bg-white">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-5">
            <div className="flex-1">
              <p className="font-display text-sm font-bold text-plum">{item.name}</p>
              {item.detail && <p className="mt-0.5 text-xs text-plum/60">{item.detail}</p>}
              <p className="mt-1 text-sm text-plum/70">₹{item.unitPriceInr}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="h-8 w-8 rounded-full border border-plum/20 text-plum transition hover:bg-plum/5"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium text-plum">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 rounded-full border border-plum/20 text-plum transition hover:bg-plum/5"
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-display text-sm font-bold text-plum">
              ₹{item.unitPriceInr * item.quantity}
            </p>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-plum/40 transition hover:text-pink"
              aria-label={`Remove ${item.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-mustard/25 px-6 py-5">
        <span className="font-display text-lg font-bold text-plum">Subtotal</span>
        <span className="font-display text-2xl font-bold text-plum">₹{subtotalInr}</span>
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-4">
        <Link
          href="/menu"
          className="rounded-full border border-plum/20 px-6 py-3 text-sm font-semibold text-plum transition hover:bg-plum/5"
        >
          Add more items
        </Link>
        <Link
          href="/checkout"
          className="rounded-full bg-plum px-6 py-3 text-sm font-semibold text-cream transition hover:bg-plum/90"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
