"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/regions";
import type { RegionId } from "@/lib/regions";
import type { CartLineItem } from "@/lib/types";

interface OrderRow {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  items: CartLineItem[];
  total: number;
  currency: string;
  region: RegionId;
  pickup_location: string;
  payment_status: string;
  status: string;
  special_instructions: string | null;
  created_at: string;
}

const POLL_MS = 5000;

function timeAgo(iso: string) {
  const secs = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString();
}

export default function AdminContent() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const seenIds = useRef<Set<string>>(new Set());

  const fetchOrders = useCallback(
    async (pw: string, isFirst: boolean) => {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not load orders.");

      const incoming: OrderRow[] = data.orders ?? [];
      if (isFirst) {
        incoming.forEach((o) => seenIds.current.add(o.id));
      } else {
        const fresh = incoming.filter((o) => !seenIds.current.has(o.id));
        if (fresh.length) {
          fresh.forEach((o) => seenIds.current.add(o.id));
          setNewIds((prev) => {
            const next = new Set(prev);
            fresh.forEach((o) => next.add(o.id));
            return next;
          });
          fresh.forEach((o) =>
            setTimeout(() => {
              setNewIds((prev) => {
                const next = new Set(prev);
                next.delete(o.id);
                return next;
              });
            }, 6000),
          );
        }
      }
      setOrders(incoming);
    },
    [],
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await fetchOrders(password, true);
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(() => {
      fetchOrders(password, false).catch(() => {
        /* keep last data on a transient failure */
      });
    }, POLL_MS);
    return () => clearInterval(interval);
  }, [authed, password, fetchOrders]);

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 py-24 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-espresso">Order dashboard</h1>
        <p className="mt-2 text-sm text-espresso/60">Enter the dashboard password to continue.</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border-2 border-espresso/10 bg-cream px-3 py-2.5 text-sm text-espresso outline-none transition focus:border-coral"
          />
          {error && <p className="text-sm text-coral">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral-dark disabled:opacity-60"
          >
            {loading ? "Checking…" : "Open dashboard"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-espresso">Live orders</h1>
          <p className="mt-1 text-sm text-espresso/55">
            New orders appear here automatically — refreshing every {POLL_MS / 1000}s.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-basil/10 px-3 py-1.5 text-xs font-semibold text-basil">
          <span className="h-2 w-2 animate-pulse rounded-full bg-basil" />
          Live
        </span>
      </div>

      {orders.length === 0 ? (
        <p className="mt-12 text-center text-espresso/50">
          No orders yet. New ones will pop in here the moment they&rsquo;re placed.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => {
            const isNew = newIds.has(order.id);
            return (
              <div
                key={order.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                  isNew ? "animate-pop border-coral ring-2 ring-coral/30" : "border-espresso/8"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {isNew && (
                        <span className="rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          New
                        </span>
                      )}
                      <h2 className="font-display text-lg font-semibold text-espresso">
                        {order.customer_name}
                      </h2>
                    </div>
                    <p className="mt-0.5 text-xs text-espresso/50">
                      {order.phone}
                      {order.email ? ` · ${order.email}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-espresso">
                      {formatPrice(order.total, order.region)}
                    </div>
                    <div className="text-xs text-espresso/50">{timeAgo(order.created_at)}</div>
                  </div>
                </div>

                <ul className="mt-3 space-y-1 border-t border-espresso/8 pt-3 text-sm text-espresso/75">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>
                        {item.quantity}× {item.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {order.special_instructions && (
                  <p className="mt-2 rounded-lg bg-espresso/[0.04] px-2.5 py-1.5 text-xs text-espresso/65">
                    <span className="font-semibold text-espresso">Note: </span>
                    {order.special_instructions}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-espresso/[0.05] px-2.5 py-1 font-medium text-espresso/70">
                    {order.pickup_location}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${
                      order.payment_status === "paid"
                        ? "bg-basil/12 text-basil"
                        : order.payment_status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-espresso/[0.05] text-espresso/70"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
