import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b-2 border-outline bg-cocoa">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-label text-sm font-bold uppercase tracking-[0.2em] text-sage">
            Nadiad, Gujarat &middot; 100% Vegetarian
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-parchment sm:text-7xl">
            Craving something
            <br />
            <span className="text-ember">real?</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-parchment/70">
            That&rsquo;s SnackIt — quick-serve sandwiches with a story behind every bite. Grilled,
            pocketed, or loaded into a sub. Pick a signature dish, or build your own.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="border-2 border-ember bg-ember px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember"
            >
              See the menu
            </Link>
            <Link
              href="/build-your-own"
              className="border-2 border-parchment/30 px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-parchment transition hover:border-parchment"
            >
              Build your own
            </Link>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border-2 border-outline bg-cocoa-light p-6">
            <h2 className="font-display text-lg font-extrabold uppercase text-parchment">
              A regional story, every time
            </h2>
            <p className="mt-2 text-sm text-parchment/60">
              Every dish carries a regional story and a local-language phrase — from Mumbai&rsquo;s
              street carts to Punjab&rsquo;s tandoor tradition to Rajasthan&rsquo;s pickle culture.
            </p>
          </div>
          <div className="rounded-lg border-2 border-outline bg-cocoa-light p-6">
            <h2 className="font-display text-lg font-extrabold uppercase text-parchment">
              The Premium Ritual
            </h2>
            <p className="mt-2 text-sm text-parchment/60">
              Select dishes come with a hands-on ritual — a cheese vial you plunge yourself, a
              wax-sealed wrap you peel open. Food as a moment, not just a meal.
            </p>
          </div>
          <div className="rounded-lg border-2 border-outline bg-cocoa-light p-6">
            <h2 className="font-display text-lg font-extrabold uppercase text-parchment">
              Build Your Own
            </h2>
            <p className="mt-2 text-sm text-parchment/60">
              Pick a base, a bread format, and a flavor toss — from fiery peri-peri to Gujarat&rsquo;s
              own plain-and-pure &ldquo;Kem Cho.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t-2 border-outline bg-cocoa-light">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold uppercase text-parchment">
            Ready to order?
          </h2>
          <p className="mt-2 text-sm text-parchment/60">
            Browse the full 16-dish menu or build your own from scratch.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="border-2 border-ember bg-ember px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember"
            >
              View menu
            </Link>
            <Link
              href="/waitlist"
              className="border-2 border-sage px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-sage transition hover:bg-sage hover:text-cocoa"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
