"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/regions";
import type { RegionId } from "@/lib/regions";
import {
  normalizeStatus,
  nextStatus,
  nextStatusLabel,
  statusLabels,
  activeStatuses,
  type OrderStatus,
  type PosOrder,
} from "@/lib/pos";

const POLL_MS = 5000;

const statusStyles: Record<OrderStatus, string> = {
  new: "bg-coral/12 text-coral",
  preparing: "bg-amber-100 text-amber-700",
  ready: "bg-basil/12 text-basil",
  completed: "bg-espresso/[0.06] text-espresso/60",
};

function timeAgo(iso: string) {
  const secs = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export default function OrdersBoard() {
  const [orders, setOrders] = useState<PosOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [busyId, setBusyId] = useState<string | null>(null);
  const seen = useRef<Set<string>>(new Set());
  const first = useRef(true);

  const load = useCallback(async () => {
    const { data, error: err } = await supabase
      .from("orders")
      .select("*")
      .in("status", activeStatuses)
      .order("created_at", { ascending: true });

    if (err) {
      setError("Could not load orders.");
      return;
    }
    setError(null);
    const rows = (data ?? []) as PosOrder[];

    if (first.current) {
      rows.forEach((o) => seen.current.add(o.id));
      first.current = false;
    } else {
      const fresh = rows.filter((o) => !seen.current.has(o.id));
      fresh.forEach((o) => {
        seen.current.add(o.id);
        setNewIds((prev) => new Set(prev).add(o.id));
        setTimeout(
          () =>
            setNewIds((prev) => {
              const n = new Set(prev);
              n.delete(o.id);
              return n;
            }),
          6000,
        );
      });
    }
    setOrders(rows);
  }, []);

  useEffect(() => {
    // load() is async — its setState calls happen after an await, not
    // synchronously — but the lint rule can't see that.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    const interval = setInterval(load, POLL_MS);
    return () => clearInterval(interval);
  }, [load]);

  async function advance(order: PosOrder) {
    const current = normalizeStatus(order.status);
    const next = nextStatus[current];
    if (!next) return;
    setBusyId(order.id);
    const { error: err } = await supabase
      .from("orders")
      .update({ status: next })
      .eq("id", order.id);
    setBusyId(null);
    if (err) {
      setError("Could not update the order. Try again.");
      return;
    }
    // Completed orders drop off the active board immediately.
    if (next === "completed") {
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: next } : o)),
      );
    }
  }

  if (error) {
    return <p className="py-12 text-center text-sm text-coral">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-espresso/55">No active orders right now.</p>
        <p className="mt-1 text-sm text-espresso/40">
          New website and counter orders appear here the moment they&rsquo;re placed.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {orders.map((order) => {
        const status = normalizeStatus(order.status);
        const isNew = newIds.has(order.id);
        const region = order.region as RegionId;
        return (
          <div
            key={order.id}
            className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
              isNew ? "animate-pop border-coral ring-2 ring-coral/30" : "border-espresso/8"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyles[status]}`}
                  >
                    {statusLabels[status]}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      order.order_channel === "counter"
                        ? "bg-espresso/[0.06] text-espresso/60"
                        : "bg-coral/10 text-coral"
                    }`}
                  >
                    {order.order_channel === "counter" ? "Counter" : "Online"}
                  </span>
                </div>
                <h3 className="font-display mt-1.5 text-base font-semibold text-espresso">
                  {order.customer_name || "Walk-in"}
                </h3>
                {order.phone && <p className="text-xs text-espresso/50">{order.phone}</p>}
              </div>
              <div className="text-right">
                <div className="font-display text-lg font-bold text-espresso">
                  {formatPrice(order.total, region)}
                </div>
                <div className="text-xs text-espresso/45">{timeAgo(order.created_at)}</div>
              </div>
            </div>

            <ul className="mt-3 space-y-1 border-t border-espresso/8 pt-3 text-sm text-espresso/75">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.quantity}× {item.name}
                </li>
              ))}
            </ul>

            {order.special_instructions && (
              <p className="mt-2 rounded-lg bg-espresso/[0.04] px-2.5 py-1.5 text-xs text-espresso/65">
                <span className="font-semibold text-espresso">Note: </span>
                {order.special_instructions}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between gap-3">
              <span
                className={`text-xs font-medium ${
                  order.payment_status === "paid" ? "text-basil" : "text-espresso/50"
                }`}
              >
                {order.payment_status === "paid" ? "Paid" : "Pay at pickup"}
              </span>
              {nextStatus[status] && (
                <button
                  type="button"
                  disabled={busyId === order.id}
                  onClick={() => advance(order)}
                  className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral-dark active:scale-95 disabled:opacity-60"
                >
                  {busyId === order.id ? "…" : nextStatusLabel[status]}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
