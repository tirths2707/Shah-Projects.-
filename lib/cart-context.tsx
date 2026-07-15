"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLineItem } from "./types";
import type { RegionId } from "./regions";

const STORAGE_KEY = "snackit-cart";

// Guards against stale localStorage carts from before unitPrice became a
// per-region object (it used to be a single unitPriceInr number) — without
// this, an old cached cart crashes price rendering on every page that reads
// unitPrice[regionId].
function isValidCartLineItem(value: unknown): value is CartLineItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartLineItem>;
  return (
    typeof item.id === "string" &&
    typeof item.unitPrice === "object" &&
    item.unitPrice !== null &&
    typeof item.unitPrice["nadiad-in" as keyof typeof item.unitPrice] === "number" &&
    typeof item.unitPrice["calgary-ca" as keyof typeof item.unitPrice] === "number" &&
    typeof item.quantity === "number"
  );
}

export function cartSubtotal(items: CartLineItem[], regionId: RegionId): number {
  return items.reduce((sum, i) => sum + i.unitPrice[regionId] * i.quantity, 0);
}

interface CartContextValue {
  items: CartLineItem[];
  addItem: (item: Omit<CartLineItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // localStorage is only readable client-side, so state can't be
    // initialized from it during SSR without a hydration mismatch.
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const valid = Array.isArray(parsed) ? parsed.filter(isValidCartLineItem) : [];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (valid.length) setItems(valid);
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartLineItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, quantity } : i));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
