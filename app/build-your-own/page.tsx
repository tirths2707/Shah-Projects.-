"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { breadFormats, byoBases, byoFlavorTosses } from "@/lib/menu-data";

export default function BuildYourOwnPage() {
  const { addItem } = useCart();
  const [baseId, setBaseId] = useState(byoBases[0].id);
  const [formatId, setFormatId] = useState(breadFormats[0].id);
  const [flavorId, setFlavorId] = useState(byoFlavorTosses[0].id);
  const [added, setAdded] = useState(false);

  const base = byoBases.find((b) => b.id === baseId)!;
  const format = breadFormats.find((f) => f.id === formatId)!;
  const flavor = byoFlavorTosses.find((f) => f.id === flavorId)!;

  const totalPrice = useMemo(() => format.basePriceInr + flavor.addOnInr, [format, flavor]);

  function handleAdd() {
    addItem({
      id: `byo-${baseId}-${formatId}-${flavorId}`,
      name: `Build Your Own — ${base.label}`,
      format: format.id,
      unitPriceInr: totalPrice,
      isRitual: flavor.addOnInr > 0,
      detail: `${format.label} · ${flavor.label} toss`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold text-plum sm:text-4xl">
        Build Your Own
      </h1>
      <p className="mt-3 max-w-2xl text-plum/70">
        Pick a base, a bread format, and a flavor toss. Every combination still gets a story.
      </p>

      <div className="mt-10 space-y-10">
        {/* Step 1 — Base */}
        <section>
          <h2 className="font-display text-lg font-bold text-plum">Step 1 — Base</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {byoBases.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBaseId(b.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  baseId === b.id
                    ? "border-plum bg-plum text-cream"
                    : "border-plum/15 bg-white text-plum hover:border-plum/40"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </section>

        {/* Step 2 — Bread */}
        <section>
          <h2 className="font-display text-lg font-bold text-plum">Step 2 — Bread</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {breadFormats.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormatId(f.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  formatId === f.id
                    ? "border-plum bg-plum text-cream"
                    : "border-plum/15 bg-white text-plum hover:border-plum/40"
                }`}
              >
                <div>{f.label}</div>
                <div
                  className={`mt-1 text-xs font-normal ${
                    formatId === f.id ? "text-cream/70" : "text-plum/50"
                  }`}
                >
                  ₹{f.basePriceInr}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 3 — Flavor toss */}
        <section>
          <h2 className="font-display text-lg font-bold text-plum">Step 3 — Flavor toss</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {byoFlavorTosses.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFlavorId(f.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  flavorId === f.id
                    ? "border-plum bg-plum text-cream"
                    : "border-plum/15 bg-white text-plum hover:border-plum/40"
                }`}
              >
                <div className="flex items-center justify-between font-medium">
                  <span>{f.label}</span>
                  {f.addOnInr > 0 && (
                    <span className={flavorId === f.id ? "text-lime" : "text-crust"}>
                      +₹{f.addOnInr}
                    </span>
                  )}
                </div>
                <div
                  className={`mt-1 text-xs italic ${
                    flavorId === f.id ? "text-cream/70" : "text-plum/50"
                  }`}
                >
                  {f.region} &middot; &ldquo;{f.phrase}&rdquo;
                </div>
                <div
                  className={`mt-1 text-xs ${flavorId === f.id ? "text-cream/60" : "text-plum/50"}`}
                >
                  {f.ritual}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Summary */}
      <div className="mt-12 rounded-2xl border border-plum/10 bg-white p-6">
        <h3 className="font-display text-lg font-bold text-plum">Your creation</h3>
        <p className="mt-2 text-sm text-plum/70">
          {base.label} in a {format.label}, tossed in {flavor.label}.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-plum/10 pt-4">
          <span className="font-display text-2xl font-bold text-plum">₹{totalPrice}</span>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-plum transition hover:brightness-95 active:scale-95"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
