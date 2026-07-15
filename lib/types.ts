export type BreadFormat = "classic-grilled" | "pita-pocket" | "sub-roll";

export type DishTier = "standard" | "premium-ritual";

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
  priceInr: number;
}

export interface BreadFormatInfo {
  id: BreadFormat;
  label: string;
  description: string;
  basePriceInr: number;
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
  addOnInr: number;
}

export interface CartLineItem {
  id: string;
  name: string;
  format: BreadFormat;
  unitPriceInr: number;
  quantity: number;
  isRitual: boolean;
  detail?: string;
}
