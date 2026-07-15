"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SandwichIcon } from "@/components/icons";
import OrdersBoard from "./OrdersBoard";
import NewOrder from "./NewOrder";
import DailyTotals from "./DailyTotals";

type Tab = "orders" | "new" | "today";

const tabs: { id: Tab; label: string }[] = [
  { id: "orders", label: "Live orders" },
  { id: "new", label: "New order" },
  { id: "today", label: "Today" },
];

export default function PosApp() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("orders");

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        router.replace("/pos/login");
        return;
      }
      setEmail(data.session.user.email ?? null);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/pos/login");
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/pos/login");
  }

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-espresso/50">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <SandwichIcon className="h-6 w-6 text-coral" />
            <span className="font-display text-lg font-bold text-espresso">SnackIt POS</span>
          </div>
          <div className="flex items-center gap-3">
            {email && <span className="hidden text-xs text-espresso/50 sm:inline">{email}</span>}
            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-espresso/15 px-3 py-1.5 text-xs font-semibold text-espresso transition hover:border-coral hover:text-coral"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl gap-1 px-4 sm:px-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
                tab === t.id
                  ? "border-coral text-coral"
                  : "border-transparent text-espresso/55 hover:text-espresso"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {tab === "orders" && <OrdersBoard />}
        {tab === "new" && <NewOrder onPlaced={() => setTab("orders")} />}
        {tab === "today" && <DailyTotals />}
      </main>
    </div>
  );
}
