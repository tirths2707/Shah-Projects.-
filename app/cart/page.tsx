"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotalInr } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-black uppercase text-parchment">
          Your cart is empty
        </h1>
        <p className="mt-3 text-parchment/60">Add something from the menu to get started.</p>
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
      <h1 className="font-display text-4xl font-black uppercase text-parchment">Your cart</h1>

      <div className="mt-8 divide-y-2 divide-outline border-2 border-outline bg-cocoa-light">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-5">
            <div className="flex-1">
              <p className="font-display text-sm font-bold uppercase text-parchment">
                {item.name}
              </p>
              {item.detail && (
                <p className="mt-0.5 text-xs text-parchment/50">{item.detail}</p>
              )}
              <p className="font-label mt-1 text-sm text-amber">₹{item.unitPriceInr}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="h-8 w-8 border-2 border-outline text-parchment transition hover:border-ember"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium text-parchment">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 border-2 border-outline text-parchment transition hover:border-ember"
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>

            <p className="font-label w-20 text-right text-sm font-bold text-parchment">
              ₹{item.unitPriceInr * item.quantity}
            </p>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-parchment/40 transition hover:text-ember"
              aria-label={`Remove ${item.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-2 border-ember bg-cocoa-light px-6 py-5">
        <span className="font-display text-lg font-extrabold uppercase text-parchment">
          Subtotal
        </span>
        <span className="font-label text-2xl font-bold text-ember">₹{subtotalInr}</span>
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-4">
        <Link
          href="/menu"
          className="border-2 border-parchment/30 px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-parchment transition hover:border-parchment"
        >
          Add more items
        </Link>
        <Link
          href="/checkout"
          className="border-2 border-ember bg-ember px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
