"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { accentForDish } from "@/lib/menu-data";
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
    <div className="group flex gap-4 rounded-2xl border border-espresso/10 bg-card p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Picture */}
      <div
        className={`relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accentForDish(
          dish.id,
        )} text-5xl transition duration-300 group-hover:scale-105`}
      >
        <span className="drop-shadow-sm">{dish.emoji}</span>
        {dish.tier === "premium-ritual" && (
          <span className="absolute -right-2 -top-2 rounded-full bg-golden px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-espresso shadow">
            Ritual
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className="flex h-3 w-3 shrink-0 items-center justify-center rounded-sm border border-basil"
            aria-label="Vegetarian"
            title="Vegetarian"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-basil" />
          </span>
          <h3 className="font-display text-base font-semibold leading-snug text-espresso">
            {dish.name}
          </h3>
        </div>

        <p className="mt-1 line-clamp-2 text-sm text-espresso/60">{dish.filling}</p>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-tomato">
          <span>{dish.region}</span>
          <span aria-hidden>&middot;</span>
          <span className="italic">&ldquo;{dish.phrase}&rdquo;</span>
        </div>

        {dish.ritual && (
          <p className="mt-2 rounded-lg bg-golden/10 px-2.5 py-1.5 text-xs text-espresso/70">
            <span className="font-semibold text-tomato-dark">The Ritual: </span>
            {dish.ritual}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-espresso">₹{dish.priceInr}</span>
          <button
            type="button"
            onClick={handleAdd}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition active:scale-95 ${
              added
                ? "bg-basil text-white"
                : "bg-tomato text-white hover:bg-tomato-dark"
            }`}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
