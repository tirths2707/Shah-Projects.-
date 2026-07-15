"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRegion } from "@/lib/region-context";

type ConfirmState = "checking" | "paid" | "failed" | "unavailable" | "none";

export default function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const { region } = useRegion();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");
  const [state, setState] = useState<ConfirmState>(sessionId && orderId ? "checking" : "none");

  useEffect(() => {
    if (!sessionId || !orderId) return;
    fetch(`/api/checkout/confirm?session_id=${sessionId}&order_id=${orderId}`)
      .then((res) => res.json())
      .then((data) => setState(data.paid ? "paid" : data.error ? "unavailable" : "failed"))
      .catch(() => setState("unavailable"));
  }, [sessionId, orderId]);

  if (state === "checking") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-espresso">Confirming payment…</h1>
        <p className="mt-3 text-espresso/60">This only takes a moment.</p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-espresso">Payment didn&rsquo;t go through</h1>
        <p className="mt-3 text-espresso/60">
          Your order wasn&rsquo;t charged. Please try checking out again.
        </p>
        <Link
          href="/checkout"
          className="mt-8 inline-block rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          Back to checkout
        </Link>
      </div>
    );
  }

  if (state === "unavailable") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-espresso">
          Couldn&rsquo;t confirm payment
        </h1>
        <p className="mt-3 text-espresso/60">
          If you were charged, contact us with your order details and we&rsquo;ll sort it out.
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="animate-pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-basil/15 text-4xl">
        🎉
      </div>
      <h1 className="font-display mt-6 text-4xl font-bold text-espresso">
        {state === "paid" ? "Payment confirmed!" : "Order placed!"}
      </h1>
      <p className="mt-3 text-espresso/60">
        Thanks for ordering from SnackIt. Head to our {region.label} location to pick up
        {region.paymentMode === "in-store" ? " and pay in-store." : "."}
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
