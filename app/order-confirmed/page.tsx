import Link from "next/link";

export const metadata = {
  title: "Order confirmed — SnackIt",
};

export default function OrderConfirmedPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="animate-pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-basil/15 text-4xl">
        🎉
      </div>
      <h1 className="font-display mt-6 text-4xl font-bold text-espresso">Order placed!</h1>
      <p className="mt-3 text-espresso/60">
        Thanks for ordering from SnackIt. Head to our Nadiad, Gujarat location to pick up and pay
        in-store.
      </p>
      <Link
        href="/menu"
        className="mt-8 inline-block rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral-dark"
      >
        Back to menu
      </Link>
    </div>
  );
}
