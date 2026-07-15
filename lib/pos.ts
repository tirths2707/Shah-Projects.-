import type { CartLineItem } from "./types";
import type { RegionId } from "./regions";

export type OrderStatus = "new" | "preparing" | "ready" | "completed";

// Live orders (that staff act on) exclude completed. 'pending' is treated as
// 'new' so any orders created before the POS existed still show up.
export const activeStatuses: OrderStatus[] = ["new", "preparing", "ready"];

export const statusLabels: Record<OrderStatus, string> = {
  new: "New",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
};

// The button that advances an order to its next stage.
export const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  new: "preparing",
  preparing: "ready",
  ready: "completed",
  completed: null,
};

export const nextStatusLabel: Record<OrderStatus, string | null> = {
  new: "Start preparing",
  preparing: "Mark ready",
  ready: "Complete",
  completed: null,
};

export function normalizeStatus(raw: string): OrderStatus {
  if (raw === "preparing" || raw === "ready" || raw === "completed") return raw;
  return "new"; // covers "new", legacy "pending", and anything unexpected
}

export interface PosOrder {
  id: string;
  customer_name: string;
  phone: string | null;
  email: string | null;
  items: CartLineItem[];
  total: number;
  currency: string;
  region: RegionId;
  pickup_location: string;
  order_channel: string;
  payment_status: string;
  status: string;
  special_instructions: string | null;
  created_at: string;
}
