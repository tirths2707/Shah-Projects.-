"use client";

import { useState } from "react";
import { useRegion } from "@/lib/region-context";
import { regions } from "@/lib/regions";

export default function RegionSwitcher() {
  const { region, setRegionId } = useRegion();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-espresso/10 bg-white px-3 py-1.5 text-xs font-semibold text-espresso/70 transition hover:border-coral hover:text-coral"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-basil" />
        {region.label}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close region menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-espresso/10 bg-white shadow-lg">
            {Object.values(regions).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setRegionId(r.id);
                  setOpen(false);
                }}
                className={`flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left text-sm transition hover:bg-cream ${
                  r.id === region.id ? "bg-cream" : ""
                }`}
              >
                <span className="font-semibold text-espresso">{r.label}</span>
                <span className="text-xs text-espresso/50">
                  {r.country} &middot; {r.currency}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
