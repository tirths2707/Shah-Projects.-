import Link from "next/link";

export const metadata = {
  title: "Order confirmed — SnackIt",
};

export default function OrderConfirmedPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-sage bg-cocoa-light text-2xl font-bold text-sage">
        ✓
      </div>
      <h1 className="mt-6 font-display text-4xl font-black uppercase text-parchment">
        Order placed!
      </h1>
      <p className="mt-3 text-parchment/60">
        Thanks for ordering from SnackIt. Head to our Nadiad, Gujarat location to pick up and pay
        in-store.
      </p>
      <Link
        href="/menu"
        className="mt-8 inline-block border-2 border-ember bg-ember px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember"
      >
        Back to menu
      </Link>
    </div>
  );
}
