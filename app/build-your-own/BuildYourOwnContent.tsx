"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRegion } from "@/lib/region-context";
import { breadFormats, byoBases, byoFlavorTosses } from "@/lib/menu-data";
import { formatPrice, regions } from "@/lib/regions";
import type { RegionalPrice } from "@/lib/types";
import { FormatIcon } from "@/components/icons";

export default function BuildYourOwnContent() {
  const { addItem } = useCart();
  const { regionId } = useRegion();
  const [baseId, setBaseId] = useState(byoBases[0].id);
  const [formatId, setFormatId] = useState(breadFormats[0].id);
  const [flavorId, setFlavorId] = useState(byoFlavorTosses[0].id);
  const [added, setAdded] = useState(false);

  const base = byoBases.find((b) => b.id === baseId)!;
  const format = breadFormats.find((f) => f.id === formatId)!;
  const flavor = byoFlavorTosses.find((f) => f.id === flavorId)!;

  const totalPriceByRegion: RegionalPrice = useMemo(() => {
    const result = {} as RegionalPrice;
    for (const id of Object.keys(regions) as (keyof RegionalPrice)[]) {
      result[id] = format.basePrice[id] + flavor.addOn[id];
    }
    return result;
  }, [format, flavor]);

  function handleAdd() {
    addItem({
      id: `byo-${baseId}-${formatId}-${flavorId}`,
      name: `Build Your Own — ${base.label}`,
      format: format.id,
      unitPrice: totalPriceByRegion,
      isRitual: flavor.addOn[regionId] > 0,
      detail: `${format.label} · ${flavor.label} toss`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  const optionClass = (active: boolean) =>
    `rounded-xl border px-4 py-3 text-left text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${
      active
        ? "border-espresso bg-espresso text-white shadow-md shadow-espresso/20"
        : "border-espresso/10 bg-white text-espresso hover:border-coral/40"
    }`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-espresso sm:text-5xl">
        Build Your Own
      </h1>
      <p className="mt-3 max-w-2xl text-espresso/60">
        Pick a base, a bread format, and a flavor toss. Every combination still gets a story.
      </p>

      <div className="mt-10 space-y-10">
        {/* Step 1 — Base */}
        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">Step 1 — Base</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {byoBases.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBaseId(b.id)}
                className={optionClass(baseId === b.id)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </section>

        {/* Step 2 — Bread */}
        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">Step 2 — Bread</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {breadFormats.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormatId(f.id)}
                className={optionClass(formatId === f.id)}
              >
                <div className="flex items-center gap-2">
                  <FormatIcon
                    format={f.id}
                    className={`h-5 w-5 ${formatId === f.id ? "text-white" : "text-coral"}`}
                  />
                  <span>{f.label}</span>
                </div>
                <div
                  className={`mt-1 text-xs font-normal ${
                    formatId === f.id ? "text-white/70" : "text-espresso/50"
                  }`}
                >
                  {formatPrice(f.basePrice[regionId], regionId)}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 3 — Flavor toss */}
        <section>
          <h2 className="font-display text-lg font-semibold text-espresso">
            Step 3 — Flavor toss
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {byoFlavorTosses.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFlavorId(f.id)}
                className={optionClass(flavorId === f.id)}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span>{f.label}</span>
                  {f.addOn[regionId] > 0 && (
                    <span className={flavorId === f.id ? "text-white" : "text-coral"}>
                      +{formatPrice(f.addOn[regionId], regionId)}
                    </span>
                  )}
                </div>
                <div
                  className={`mt-1 text-xs italic ${
                    flavorId === f.id ? "text-white/70" : "text-espresso/50"
                  }`}
                >
                  {f.region} &middot; &ldquo;{f.phrase}&rdquo;
                </div>
                <div
                  className={`mt-1 text-xs ${
                    flavorId === f.id ? "text-white/60" : "text-espresso/50"
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
      <div className="mt-12 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg sm:flex-row sm:items-center">
        <div
          key={formatId}
          className="animate-mesh flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-coral/12 via-cream to-basil/10 transition-transform duration-500"
        >
          <FormatIcon format={formatId} className="h-10 w-10 text-espresso/30" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold text-espresso">Your creation</h3>
          <p className="mt-1 text-sm text-espresso/60">
            {base.label} in a {format.label}, tossed in {flavor.label}.
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-espresso/10 pt-4 sm:border-t-0 sm:pt-0">
          <span className="text-2xl font-bold text-espresso">
            {formatPrice(totalPriceByRegion[regionId], regionId)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={`rounded-full px-6 py-3 text-sm font-bold text-white transition active:scale-95 ${
              added ? "bg-basil" : "bg-coral hover:bg-coral-dark"
            }`}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
