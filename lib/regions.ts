export type RegionId = "nadiad-in" | "calgary-ca";

export interface RegionConfig {
  id: RegionId;
  countryCodes: string[]; // ISO country codes that map to this region
  label: string; // "Nadiad, Gujarat"
  country: string;
  currency: "INR" | "CAD";
  currencySymbol: string;
  locale: string;
  paymentMode: "in-store" | "online";
  pickupLine: string; // shown on checkout / order-confirmed
}

export const regions: Record<RegionId, RegionConfig> = {
  "nadiad-in": {
    id: "nadiad-in",
    countryCodes: ["IN"],
    label: "Nadiad, Gujarat",
    country: "India",
    currency: "INR",
    currencySymbol: "₹",
    locale: "en-IN",
    paymentMode: "in-store",
    pickupLine: "Orders are for pickup at our Nadiad, Gujarat location. Pay in-store on collection.",
  },
  "calgary-ca": {
    id: "calgary-ca",
    countryCodes: ["CA"],
    label: "Calgary, Alberta",
    country: "Canada",
    currency: "CAD",
    currencySymbol: "CA$",
    locale: "en-CA",
    paymentMode: "online",
    pickupLine: "Orders are for pickup at our Calgary, Alberta location. Pay online to confirm.",
  },
};

export const defaultRegion: RegionId = "nadiad-in";

export function regionForCountryCode(code: string | null | undefined): RegionId {
  if (!code) return defaultRegion;
  const match = Object.values(regions).find((r) => r.countryCodes.includes(code.toUpperCase()));
  return match?.id ?? defaultRegion;
}

export function formatPrice(amount: number, region: RegionId): string {
  const { currencySymbol, currency } = regions[region];
  const value = currency === "INR" ? Math.round(amount).toString() : amount.toFixed(2);
  return `${currencySymbol}${value}`;
}
