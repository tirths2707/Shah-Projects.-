"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { dishes } from "@/lib/menu-data";
import { formatPrice, regions } from "@/lib/regions";
import type { RegionId } from "@/lib/regions";
import type { CartLineItem } from "@/lib/types";

interface Line extends CartLineItem {
  key: string;
}

export default function NewOrder({ onPlaced }: { onPlaced: () => void }) {
  const [regionId, setRegionId] = useState<RegionId>("calgary-ca");
  const [lines, setLines] = useState<Line[]>([]);
  const [customer, setCustomer] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.unitPrice[regionId] * l.quantity, 0),
    [lines, regionId],
  );

  function addDish(id: string) {
    const dish = dishes.find((d) => d.id === id);
    if (!dish) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === dish.id);
      if (existing) {
        return prev.map((l) => (l.id === dish.id ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [
        ...prev,
        {
          key: dish.id,
          id: dish.id,
          name: dish.name,
          format: dish.format,
          unitPrice: dish.price,
          quantity: 1,
          isRitual: dish.tier === "premium-ritual",
        },
      ];
    });
  }

  function changeQty(id: string, delta: number) {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0),
    );
  }

  async function submit() {
    if (lines.length === 0) return;
    setSubmitting(true);
    setError(null);

    const region = regions[regionId];
    const items: CartLineItem[] = lines.map((l) => ({
      id: l.id,
      name: l.name,
      format: l.format,
      unitPrice: l.unitPrice,
      quantity: l.quantity,
      isRitual: l.isRitual,
      ...(l.detail ? { detail: l.detail } : {}),
    }));

    const { error: err } = await supabase.from("orders").insert({
      id: crypto.randomUUID(),
      customer_name: customer.trim() || "Walk-in",
      phone: null,
      email: null,
      items,
      subtotal: total,
      total,
      special_instructions: notes.trim() || null,
      region: regionId,
      currency: region.currency,
      pickup_location: region.label,
      order_channel: "counter",
      payment_status: "paid", // taken at the counter
      status: "new",
    });

    setSubmitting(false);
    if (err) {
      setError("Could not save the order. Try again.");
      return;
    }
    setLines([]);
    setCustomer("");
    setNotes("");
    onPlaced();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* Menu grid */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-espresso">Tap to add</h2>
          <div className="flex rounded-full border border-espresso/10 p-0.5">
            {Object.values(regions).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRegionId(r.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  regionId === r.id ? "bg-espresso text-white" : "text-espresso/55"
                }`}
              >
                {r.currency}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {dishes.map((dish) => (
            <button
              key={dish.id}
              type="button"
              onClick={() => addDish(dish.id)}
              className="flex flex-col rounded-xl border border-espresso/10 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-coral/40 active:scale-95"
            >
              <span className="text-sm font-semibold leading-tight text-espresso">
                {dish.name}
              </span>
              <span className="mt-1 text-xs font-medium text-coral">
                {formatPrice(dish.price[regionId], regionId)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Order ticket */}
      <div className="h-fit rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-espresso">Order ticket</h2>

        {lines.length === 0 ? (
          <p className="mt-4 text-sm text-espresso/45">
            Tap menu items to build the order.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {lines.map((l) => (
              <div key={l.key} className="flex items-center gap-2 text-sm">
                <div className="flex-1">
                  <p className="font-medium text-espresso">{l.name}</p>
                  <p className="text-xs text-espresso/45">
                    {formatPrice(l.unitPrice[regionId], regionId)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => changeQty(l.id, -1)}
                  className="h-7 w-7 rounded-full border border-espresso/15 text-espresso hover:border-coral hover:text-coral"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-5 text-center">{l.quantity}</span>
                <button
                  type="button"
                  onClick={() => changeQty(l.id, 1)}
                  className="h-7 w-7 rounded-full border border-espresso/15 text-espresso hover:border-coral hover:text-coral"
                  aria-label="Increase"
                >
                  +
                </button>
                <span className="w-16 text-right font-semibold text-espresso">
                  {formatPrice(l.unitPrice[regionId] * l.quantity, regionId)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-3 border-t border-espresso/10 pt-4">
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Customer name (optional)"
            className="w-full rounded-xl border-2 border-espresso/10 bg-cream px-3 py-2 text-sm text-espresso outline-none focus:border-coral"
          />
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="w-full rounded-xl border-2 border-espresso/10 bg-cream px-3 py-2 text-sm text-espresso outline-none focus:border-coral"
          />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-espresso/10 pt-4">
          <span className="font-display text-base font-semibold text-espresso">Total</span>
          <span className="text-xl font-bold text-espresso">{formatPrice(total, regionId)}</span>
        </div>

        {error && <p className="mt-2 text-sm text-coral">{error}</p>}

        <button
          type="button"
          disabled={lines.length === 0 || submitting}
          onClick={submit}
          className="mt-4 w-full rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:bg-coral-dark disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Place order (paid)"}
        </button>
      </div>
    </div>
  );
}
