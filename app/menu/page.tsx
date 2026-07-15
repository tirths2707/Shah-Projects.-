import DishCard from "@/components/DishCard";
import Reveal from "@/components/Reveal";
import { breadFormats, dishesByFormat } from "@/lib/menu-data";

export const metadata = {
  title: "Menu — SnackIt",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-espresso sm:text-5xl">The Menu</h1>
        <p className="mt-3 text-espresso/60">
          Sixteen signature dishes across three formats. Every one carries a regional story — and
          select dishes come with a hands-on Premium Ritual.
        </p>
        <p className="mt-3 text-xs text-espresso/40">
          Prices shown are launch estimates and subject to change.
        </p>
      </div>

      {breadFormats.map((format) => (
        <section key={format.id} className="mt-14">
          <div className="flex items-center gap-3 border-b-2 border-espresso/10 pb-4">
            <span className="text-3xl">{format.emoji}</span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">
                {format.label}
              </h2>
              <p className="text-sm text-espresso/50">{format.description}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dishesByFormat(format.id).map((dish, i) => (
              <Reveal key={dish.id} delay={(i % 3) * 80}>
                <DishCard dish={dish} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
