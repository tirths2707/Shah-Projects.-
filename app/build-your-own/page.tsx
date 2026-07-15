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
      <h1 className="font-display text-4xl font-black uppercase text-parchment sm:text-5xl">
        Build Your Own
      </h1>
      <p className="mt-3 max-w-2xl text-parchment/70">
        Pick a base, a bread format, and a flavor toss. Every combination still gets a story.
      </p>

      <div className="mt-10 space-y-10">
        {/* Step 1 — Base */}
        <section>
          <h2 className="font-display text-lg font-extrabold uppercase text-parchment">
            Step 1 — Base
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {byoBases.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBaseId(b.id)}
                className={`border-2 px-4 py-3 text-left font-label text-sm font-bold uppercase tracking-wide transition ${
                  baseId === b.id
                    ? "border-ember bg-ember text-cocoa"
                    : "border-outline bg-cocoa-light text-parchment hover:border-parchment/50"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </section>

        {/* Step 2 — Bread */}
        <section>
          <h2 className="font-display text-lg font-extrabold uppercase text-parchment">
            Step 2 — Bread
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {breadFormats.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormatId(f.id)}
                className={`border-2 px-4 py-3 text-left font-label text-sm font-bold uppercase tracking-wide transition ${
                  formatId === f.id
                    ? "border-ember bg-ember text-cocoa"
                    : "border-outline bg-cocoa-light text-parchment hover:border-parchment/50"
                }`}
              >
                <div>{f.label}</div>
                <div
                  className={`mt-1 text-xs font-normal normal-case ${
                    formatId === f.id ? "text-cocoa/70" : "text-parchment/50"
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
          <h2 className="font-display text-lg font-extrabold uppercase text-parchment">
            Step 3 — Flavor toss
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {byoFlavorTosses.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFlavorId(f.id)}
                className={`border-2 px-4 py-3 text-left transition ${
                  flavorId === f.id
                    ? "border-ember bg-ember text-cocoa"
                    : "border-outline bg-cocoa-light text-parchment hover:border-parchment/50"
                }`}
              >
                <div className="flex items-center justify-between font-label text-sm font-bold uppercase tracking-wide">
                  <span>{f.label}</span>
                  {f.addOnInr > 0 && (
                    <span className={flavorId === f.id ? "text-cocoa" : "text-amber"}>
                      +₹{f.addOnInr}
                    </span>
                  )}
                </div>
                <div
                  className={`mt-1 text-xs normal-case italic ${
                    flavorId === f.id ? "text-cocoa/70" : "text-parchment/50"
                  }`}
                >
                  {f.region} &middot; &ldquo;{f.phrase}&rdquo;
                </div>
                <div
                  className={`mt-1 text-xs normal-case ${
                    flavorId === f.id ? "text-cocoa/60" : "text-parchment/50"
                  }`}
                >
                  {f.ritual}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Summary */}
      <div className="mt-12 rounded-lg border-2 border-outline bg-cocoa-light p-6">
        <h3 className="font-display text-lg font-extrabold uppercase text-parchment">
          Your creation
        </h3>
        <p className="mt-2 text-sm text-parchment/70">
          {base.label} in a {format.label}, tossed in {flavor.label}.
        </p>
        <div className="mt-4 flex items-center justify-between border-t-2 border-outline pt-4">
          <span className="font-label text-2xl font-bold text-parchment">₹{totalPrice}</span>
          <button
            type="button"
            onClick={handleAdd}
            className="border-2 border-ember bg-ember px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember active:scale-95"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
