import Link from "next/link";
import DishCard from "@/components/DishCard";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import { dishes } from "@/lib/menu-data";

const featured = dishes.filter((d) => d.tier === "premium-ritual").slice(0, 3);

const regions = ["Mumbai", "Punjab", "Rajasthan", "Goa", "Gujarat", "Delhi", "Kolkata"];
const tickerItems = [...regions, ...regions];

const features = [
  {
    n: "01",
    title: "A regional story, every time",
    body: "Every dish carries a regional story and a local-language phrase — from Mumbai's street carts to Punjab's tandoor tradition to Rajasthan's pickle culture.",
  },
  {
    n: "02",
    title: "The Premium Ritual",
    body: "Select dishes come with a hands-on ritual — a cheese vial you plunge yourself, a wax-sealed wrap you peel open. Food as a moment, not just a meal.",
  },
  {
    n: "03",
    title: "Build Your Own",
    body: 'Pick a base, a bread format, and a flavor toss — from fiery peri-peri to Gujarat\'s own plain-and-pure "Kem Cho."',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="animate-mesh absolute inset-0 -z-10 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-coral) 14%, transparent), transparent 45%), radial-gradient(circle at 80% 70%, color-mix(in srgb, var(--color-basil) 14%, transparent), transparent 45%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <p className="inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-espresso/70">
            <span className="h-1.5 w-1.5 rounded-full bg-basil" />
            Nadiad, Gujarat &middot; 100% Vegetarian
          </p>
          <h1 className="font-display mt-6 text-5xl font-bold leading-[1.05] text-espresso sm:text-7xl">
            Craving something
            <br />
            <span className="text-coral">real?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-espresso/60">
            That&rsquo;s SnackIt — quick-serve sandwiches with a story behind every bite. Grilled,
            pocketed, or loaded into a sub. Pick a signature dish, or build your own.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-espresso/10 transition duration-300 hover:-translate-y-0.5 hover:bg-coral hover:shadow-xl hover:shadow-coral/20"
            >
              See the menu
            </Link>
            <Link
              href="/build-your-own"
              className="rounded-full border border-espresso/15 bg-white px-7 py-3.5 text-sm font-semibold text-espresso transition duration-300 hover:-translate-y-0.5 hover:border-coral hover:text-coral"
            >
              Build your own
            </Link>
          </div>
        </div>

        {/* Region ticker */}
        <div className="relative overflow-hidden border-y border-espresso/8 bg-white py-4">
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
            {tickerItems.concat(tickerItems).map((r, i) => (
              <span
                key={i}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/35"
              >
                {r} &nbsp;&middot;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-3 gap-6">
          <StatCounter value={16} label="Signature dishes" />
          <StatCounter value={7} label="Regional stories" />
          <StatCounter value={100} suffix="%" label="Vegetarian" />
        </div>
      </section>

      {/* Featured dishes */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
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
          <div className="grid gap-10 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.n} delay={i * 100}>
                <div className="h-full border-t-2 border-coral pt-4">
                  <span className="font-display text-sm font-bold text-coral">{f.n}</span>
                  <h2 className="font-display mt-2 text-lg font-semibold text-espresso">
                    {f.title}
                  </h2>
                  <p className="mt-2 text-sm text-espresso/60">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-espresso">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white">Ready to order?</h2>
          <p className="mt-2 text-white/60">
            Browse the full 16-dish menu or build your own from scratch.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-coral px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-coral-dark hover:shadow-xl hover:shadow-coral/30"
            >
              View menu
            </Link>
            <Link
              href="/waitlist"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
