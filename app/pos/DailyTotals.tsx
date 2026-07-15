"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice, regions } from "@/lib/regions";
import type { RegionId } from "@/lib/regions";
import type { PosOrder } from "@/lib/pos";

export default function DailyTotals() {
  const [orders, setOrders] = useState<PosOrder[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    supabase
      .from("orders")
      .select("*")
      .gte("created_at", start.toISOString())
      .then(({ data, error: err }) => {
        if (err) {
          setError("Could not load today's totals.");
          return;
        }
        setOrders((data ?? []) as PosOrder[]);
      });
  }, []);

  if (error) return <p className="py-12 text-center text-sm text-coral">{error}</p>;
  if (!orders) return <p className="py-12 text-center text-sm text-espresso/50">Loading…</p>;

  const count = orders.length;
  const online = orders.filter((o) => o.order_channel !== "counter").length;
  const counter = orders.filter((o) => o.order_channel === "counter").length;

  // Revenue is kept per-region because the two markets use different
  // currencies — summing them into one number would be meaningless.
  const revenueByRegion = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.region] = (acc[o.region] ?? 0) + Number(o.total);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-espresso">Today so far</h2>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <div className="font-display text-3xl font-bold text-espresso">{count}</div>
          <div className="mt-1 text-xs text-espresso/55">Orders</div>
        </div>
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <div className="font-display text-3xl font-bold text-espresso">{online}</div>
          <div className="mt-1 text-xs text-espresso/55">Online</div>
        </div>
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <div className="font-display text-3xl font-bold text-espresso">{counter}</div>
          <div className="mt-1 text-xs text-espresso/55">Counter</div>
        </div>
      </div>

      <h3 className="font-display mt-8 text-sm font-semibold text-espresso">Revenue</h3>
      <div className="mt-3 space-y-2">
        {Object.keys(revenueByRegion).length === 0 ? (
          <p className="text-sm text-espresso/45">No sales yet today.</p>
        ) : (
          (Object.keys(revenueByRegion) as RegionId[]).map((region) => (
            <div
              key={region}
              className="flex items-center justify-between rounded-xl bg-white px-5 py-3 shadow-sm"
            >
              <span className="text-sm text-espresso/70">
                {regions[region]?.label ?? region}
              </span>
              <span className="font-display text-lg font-bold text-espresso">
                {formatPrice(revenueByRegion[region], region)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
