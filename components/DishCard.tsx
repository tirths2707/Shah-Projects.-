"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Dish } from "@/lib/types";

export default function DishCard({ dish }: { dish: Dish }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: dish.id,
      name: dish.name,
      format: dish.format,
      unitPriceInr: dish.priceInr,
      isRitual: dish.tier === "premium-ritual",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="flex flex-col rounded-2xl border border-plum/10 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-bold leading-snug text-plum">{dish.name}</h3>
        {dish.tier === "premium-ritual" && (
          <span className="shrink-0 rounded-full bg-pink/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-pink">
            Ritual
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-plum/70">{dish.filling}</p>

      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-crust">
        <span>{dish.region}</span>
        <span aria-hidden>&middot;</span>
        <span className="italic">&ldquo;{dish.phrase}&rdquo;</span>
      </div>

      <p className="mt-3 text-sm text-plum/60">{dish.story}</p>

      {dish.ritual && (
        <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-xs text-plum/80">
          <span className="font-semibold text-pink">The Ritual: </span>
          {dish.ritual}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-plum/10 pt-4">
        <span className="font-display text-lg font-bold text-plum">₹{dish.priceInr}</span>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-plum transition hover:brightness-95 active:scale-95"
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
