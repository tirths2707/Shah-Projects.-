import Link from "next/link";
import DishCard from "@/components/DishCard";
import Reveal from "@/components/Reveal";
import { dishes } from "@/lib/menu-data";

const featured = dishes.filter((d) => d.tier === "premium-ritual").slice(0, 3);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-golden/20 via-cream to-cream">
        <span className="animate-float absolute left-[6%] top-16 text-6xl opacity-80 sm:text-7xl">
          🥪
        </span>
        <span className="animate-float-slow absolute right-[8%] top-32 text-5xl opacity-80 sm:text-6xl">
          🌶️
        </span>
        <span className="animate-float absolute bottom-10 left-[18%] text-5xl opacity-70 sm:text-6xl">
          🧀
        </span>
        <span className="animate-float-slow absolute bottom-24 right-[20%] text-4xl opacity-70 sm:text-5xl">
          🫓
        </span>

        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <p className="inline-block rounded-full bg-basil/10 px-4 py-1.5 text-sm font-bold text-basil">
            📍 Nadiad, Gujarat &middot; 100% Vegetarian
          </p>
          <h1 className="font-display mt-6 text-5xl font-bold leading-[1.05] text-espresso sm:text-7xl">
            Craving something
            <br />
            <span className="text-tomato">real?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-espresso/70">
            That&rsquo;s SnackIt — quick-serve sandwiches with a story behind every bite. Grilled,
            pocketed, or loaded into a sub. Pick a signature dish, or build your own.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-tomato px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-tomato/30 transition hover:-translate-y-0.5 hover:bg-tomato-dark hover:shadow-xl"
            >
              See the menu
            </Link>
            <Link
              href="/build-your-own"
              className="rounded-full border-2 border-espresso/15 bg-white px-7 py-3.5 text-sm font-bold text-espresso transition hover:-translate-y-0.5 hover:border-tomato hover:text-tomato"
            >
              Build your own
            </Link>
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display text-center text-2xl font-bold text-espresso">
            Fan favorites, with a ritual
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dish, i) => (
            <Reveal key={dish.id} delay={i * 100}>
              <DishCard dish={dish} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brand story */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-2xl bg-cream p-6">
                <div className="text-3xl">🗺️</div>
                <h2 className="font-display mt-3 text-lg font-semibold text-espresso">
                  A regional story, every time
                </h2>
                <p className="mt-2 text-sm text-espresso/60">
                  Every dish carries a regional story and a local-language phrase — from
                  Mumbai&rsquo;s street carts to Punjab&rsquo;s tandoor tradition to Rajasthan&rsquo;s
                  pickle culture.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl bg-cream p-6">
                <div className="text-3xl">✨</div>
                <h2 className="font-display mt-3 text-lg font-semibold text-espresso">
                  The Premium Ritual
                </h2>
                <p className="mt-2 text-sm text-espresso/60">
                  Select dishes come with a hands-on ritual — a cheese vial you plunge yourself, a
                  wax-sealed wrap you peel open. Food as a moment, not just a meal.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="h-full rounded-2xl bg-cream p-6">
                <div className="text-3xl">🛠️</div>
                <h2 className="font-display mt-3 text-lg font-semibold text-espresso">
                  Build Your Own
                </h2>
                <p className="mt-2 text-sm text-espresso/60">
                  Pick a base, a bread format, and a flavor toss — from fiery peri-peri to
                  Gujarat&rsquo;s own plain-and-pure &ldquo;Kem Cho.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-gradient-to-br from-tomato to-tomato-dark">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white">Ready to order?</h2>
          <p className="mt-2 text-white/80">
            Browse the full 16-dish menu or build your own from scratch.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-tomato transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              View menu
            </Link>
            <Link
              href="/waitlist"
              className="rounded-full border-2 border-white/60 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
