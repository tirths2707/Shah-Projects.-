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
    <div className="flex flex-col rounded-lg border-2 border-outline bg-cocoa-light p-5 transition hover:border-ember">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-sage"
            aria-label="Vegetarian"
            title="Vegetarian"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          </span>
          <h3 className="font-display text-base font-extrabold uppercase leading-snug text-parchment">
            {dish.name}
          </h3>
        </div>
        {dish.tier === "premium-ritual" && (
          <span className="font-label shrink-0 bg-ember px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-cocoa">
            Ritual
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-parchment/70">{dish.filling}</p>

      <div className="font-label mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber">
        <span>{dish.region}</span>
        <span aria-hidden>&middot;</span>
        <span>&ldquo;{dish.phrase}&rdquo;</span>
      </div>

      <p className="mt-3 text-sm text-parchment/60">{dish.story}</p>

      {dish.ritual && (
        <p className="mt-3 border-l-2 border-ember bg-cocoa px-3 py-2 text-xs text-parchment/80">
          <span className="font-label font-bold uppercase text-ember">The Ritual: </span>
          {dish.ritual}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t-2 border-outline pt-4">
        <span className="font-label text-lg font-bold text-parchment">₹{dish.priceInr}</span>
        <button
          type="button"
          onClick={handleAdd}
          className="border-2 border-ember bg-ember px-4 py-2 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember active:scale-95"
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
