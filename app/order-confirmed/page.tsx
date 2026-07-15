import Link from "next/link";

export const metadata = {
  title: "Order confirmed — SnackIt",
};

export default function OrderConfirmedPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-2xl font-bold text-plum">
        ✓
      </div>
      <h1 className="mt-6 font-display text-3xl font-extrabold text-plum">Order placed!</h1>
      <p className="mt-3 text-plum/70">
        Thanks for ordering from SnackIt. Head to our Nadiad, Gujarat location to pick up and pay
        in-store.
      </p>
      <Link
        href="/menu"
        className="mt-8 inline-block rounded-full bg-plum px-6 py-3 text-sm font-semibold text-cream transition hover:bg-plum/90"
      >
        Back to menu
      </Link>
    </div>
  );
}
