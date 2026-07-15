import type { RegionId } from "./regions";

export type BreadFormat = "classic-grilled" | "pita-pocket" | "sub-roll";

export type DishTier = "standard" | "premium-ritual";

// Price per market region (RegionId, e.g. "nadiad-in" / "calgary-ca") — not
// to be confused with `Dish.region`, which is the dish's regional-story
// origin in India (e.g. "Mumbai, Maharashtra").
export type RegionalPrice = Record<RegionId, number>;

export interface Dish {
  id: string;
  name: string;
  format: BreadFormat;
  tier: DishTier;
  filling: string;
  region: string;
  phrase: string;
  story: string;
  ritual?: string;
  price: RegionalPrice;
}

export interface BreadFormatInfo {
  id: BreadFormat;
  label: string;
  description: string;
  basePrice: RegionalPrice;
}

export interface ByoBase {
  id: string;
  label: string;
}

export interface ByoFlavorToss {
  id: string;
  label: string;
  region: string;
  phrase: string;
  ritual: string;
  addOn: RegionalPrice;
}

export interface CartLineItem {
  id: string;
  name: string;
  format: BreadFormat;
  unitPrice: RegionalPrice;
  quantity: number;
  isRitual: boolean;
  detail?: string;
}
