"use client";

import { useEffect, useState } from "react";
import { FormatIcon } from "@/components/icons";
import type { BreadFormat } from "@/lib/types";

// A coded, brand-safe "combining three" animation for the hero — cross-fades
// and gently zooms between the three sandwich formats on a shifting gradient.
// Built from original SVG marks (no third-party photos). Real food photos can
// be dropped in later by swapping each frame's <FormatIcon> for an <Image>.
const frames: {
  format: BreadFormat;
  label: string;
  tagline: string;
  gradient: string;
}[] = [
  {
    format: "classic-grilled",
    label: "Grilled",
    tagline: "Pressed golden, griddle-marked",
    gradient: "from-coral/25 via-cream to-golden/20",
  },
  {
    format: "pita-pocket",
    label: "Pocketed",
    tagline: "Stuffed, folded, fresh",
    gradient: "from-basil/20 via-cream to-coral/20",
  },
  {
    format: "sub-roll",
    label: "Loaded",
    tagline: "Hero-sized, piled high",
    gradient: "from-golden/25 via-cream to-basil/20",
  },
];

const INTERVAL_MS = 2600;

export default function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % frames.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      {/* Soft brand halo */}
      <div className="animate-mesh absolute inset-0 rounded-[2rem] bg-gradient-to-br from-coral/15 via-transparent to-basil/15 blur-2xl" />

      {frames.map((frame, i) => (
        <div
          key={frame.format}
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] border border-espresso/8 bg-gradient-to-br ${frame.gradient} shadow-xl shadow-espresso/5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            i === active
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-90 opacity-0"
          }`}
        >
          <FormatIcon format={frame.format} className="h-28 w-28 text-espresso/30" />
          <span className="font-display mt-4 text-2xl font-bold text-espresso">
            {frame.label}
          </span>
          <span className="mt-1 text-sm text-espresso/55">{frame.tagline}</span>
        </div>
      ))}

      {/* Progress dots */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
        {frames.map((frame, i) => (
          <button
            key={frame.format}
            type="button"
            aria-label={`Show ${frame.label}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-coral" : "w-1.5 bg-espresso/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
