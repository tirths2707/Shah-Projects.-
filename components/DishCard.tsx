"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRegion } from "@/lib/region-context";
import { accentForDish } from "@/lib/menu-data";
import { formatPrice } from "@/lib/regions";
import { FormatIcon } from "@/components/icons";
import type { Dish } from "@/lib/types";

export default function DishCard({ dish }: { dish: Dish }) {
  const { addItem } = useCart();
  const { regionId } = useRegion();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: dish.id,
      name: dish.name,
      format: dish.format,
      unitPrice: dish.price,
      isRitual: dish.tier === "premium-ritual",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="group flex gap-4 rounded-2xl border border-espresso/8 bg-card p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-espresso/5">
      {/* Picture */}
      <div
        className={`animate-mesh relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${accentForDish(
          dish.id,
        )}`}
      >
        <FormatIcon
          format={dish.format}
          className="h-10 w-10 text-espresso/25 transition duration-300 group-hover:scale-110 group-hover:text-espresso/35"
        />
        {dish.tier === "premium-ritual" && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-espresso px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
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

        <p className="mt-1 line-clamp-2 text-sm text-espresso/55">{dish.filling}</p>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-coral">
          <span>{dish.region}</span>
          <span aria-hidden>&middot;</span>
          <span className="italic">&ldquo;{dish.phrase}&rdquo;</span>
        </div>

        {dish.ritual && (
          <p className="mt-2 rounded-lg bg-espresso/[0.04] px-2.5 py-1.5 text-xs text-espresso/65">
            <span className="font-semibold text-espresso">The Ritual: </span>
            {dish.ritual}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-espresso">
            {formatPrice(dish.price[regionId], regionId)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition active:scale-95 ${
              added ? "bg-basil text-white" : "bg-coral text-white hover:bg-coral-dark"
            }`}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
