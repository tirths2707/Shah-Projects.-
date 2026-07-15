import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-plum text-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-lime">
            Nadiad, Gujarat
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            Craving something real?
            <br />
            That&rsquo;s SnackIt.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/80">
            Quick-serve, vegetarian-first sandwiches with a story behind every bite — grilled,
            pocketed, or loaded into a sub. Pick a signature dish, or build your own.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-plum transition hover:brightness-95"
            >
              See the menu
            </Link>
            <Link
              href="/build-your-own"
              className="rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-cream/10"
            >
              Build your own
            </Link>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-display text-xl font-bold text-plum">A regional story, every time</h2>
            <p className="mt-2 text-sm text-plum/70">
              Every dish carries a regional story and a local-language phrase — from Mumbai&rsquo;s
              street carts to Punjab&rsquo;s tandoor tradition to Rajasthan&rsquo;s pickle culture.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-plum">The Premium Ritual</h2>
            <p className="mt-2 text-sm text-plum/70">
              Select dishes come with a hands-on ritual — a cheese vial you plunge yourself, a
              wax-sealed wrap you peel open. Food as a moment, not just a meal.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-plum">Build Your Own</h2>
            <p className="mt-2 text-sm text-plum/70">
              Pick a base, a bread format, and a flavor toss — from fiery peri-peri to Gujarat&rsquo;s
              own plain-and-pure &ldquo;Kem Cho.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="rounded-3xl bg-mustard/25 px-8 py-10 text-center">
            <h2 className="font-display text-2xl font-bold text-plum">Ready to order?</h2>
            <p className="mt-2 text-sm text-plum/70">
              Browse the full 16-dish menu or build your own from scratch.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-plum px-6 py-3 text-sm font-semibold text-cream transition hover:bg-plum/90"
              >
                View menu
              </Link>
              <Link
                href="/waitlist"
                className="rounded-full border border-plum/20 px-6 py-3 text-sm font-semibold text-plum transition hover:bg-plum/5"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
