import DishCard from "@/components/DishCard";
import { breadFormats, dishesByFormat } from "@/lib/menu-data";

export const metadata = {
  title: "Menu — SnackIt",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold text-plum sm:text-4xl">The Menu</h1>
        <p className="mt-3 text-plum/70">
          Sixteen signature dishes across three formats. Every one carries a regional story — and
          select dishes come with a hands-on Premium Ritual.
        </p>
        <p className="mt-3 text-xs text-plum/50">
          Prices shown are launch estimates and subject to change.
        </p>
      </div>

      {breadFormats.map((format) => (
        <section key={format.id} className="mt-14">
          <div className="border-b border-plum/10 pb-4">
            <h2 className="font-display text-2xl font-bold text-plum">{format.label}</h2>
            <p className="mt-1 text-sm text-plum/60">{format.description}</p>
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
