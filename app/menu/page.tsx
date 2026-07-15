import DishCard from "@/components/DishCard";
import { breadFormats, dishesByFormat } from "@/lib/menu-data";

export const metadata = {
  title: "Menu — SnackIt",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-black uppercase text-parchment sm:text-5xl">
          The Menu
        </h1>
        <p className="mt-3 text-parchment/70">
          Sixteen signature dishes across three formats. Every one carries a regional story — and
          select dishes come with a hands-on Premium Ritual.
        </p>
        <p className="font-label mt-3 text-xs uppercase tracking-wide text-parchment/40">
          Prices shown are launch estimates and subject to change.
        </p>
      </div>

      {breadFormats.map((format) => (
        <section key={format.id} className="mt-14">
          <div className="border-b-2 border-outline pb-4">
            <h2 className="font-display text-2xl font-extrabold uppercase text-parchment">
              {format.label}
            </h2>
            <p className="mt-1 text-sm text-parchment/50">{format.description}</p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dishesByFormat(format.id).map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
