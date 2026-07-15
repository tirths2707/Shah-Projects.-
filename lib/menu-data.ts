import type { BreadFormatInfo, ByoBase, ByoFlavorToss, Dish, RegionalPrice } from "./types";

// NOTE: All prices below are launch-estimate placeholders.
// - INR (nadiad-in) prices reflect the brand guide, which only specifies
//   the +₹10-15 Premium Ritual add-on for real numbers.
// - CAD (calgary-ca) prices are rough Calgary quick-serve benchmarks, not
//   numbers from the business — swap them out once real Calgary pricing is
//   provided.
//
// Dish cards use a gradient tile + format icon (components/icons.tsx) as a
// stand-in for real food photography — no external image host is reachable
// from this build environment. Swap in real photos later by adding an
// `image` field and using it in DishCard.

const CLASSIC: RegionalPrice = { "nadiad-in": 89, "calgary-ca": 8.99 };
const CLASSIC_RITUAL: RegionalPrice = { "nadiad-in": 104, "calgary-ca": 10.49 };
const POCKET: RegionalPrice = { "nadiad-in": 99, "calgary-ca": 9.99 };
const POCKET_RITUAL: RegionalPrice = { "nadiad-in": 114, "calgary-ca": 11.49 };
const SUB: RegionalPrice = { "nadiad-in": 139, "calgary-ca": 12.99 };
const SUB_RITUAL: RegionalPrice = { "nadiad-in": 154, "calgary-ca": 14.49 };

export const breadFormats: BreadFormatInfo[] = [
  {
    id: "classic-grilled",
    label: "Classic Grilled Sandwich",
    description: "Sliced bread, triangle-cut",
    basePrice: CLASSIC,
  },
  {
    id: "pita-pocket",
    label: "Pita Pocket",
    description: "Signature pressed format",
    basePrice: POCKET,
  },
  {
    id: "sub-roll",
    label: "Sub Roll",
    description: "Hero-sized, loaded",
    basePrice: SUB,
  },
];

export const dishes: Dish[] = [
  // Section 1 — Classic Grilled Sandwich
  {
    id: "bombay-magic-grill",
    name: "Bombay Magic Grill",
    format: "classic-grilled",
    tier: "standard",
    filling: "Spiced potato, mint chutney, tomato, cucumber, beetroot",
    region: "Mumbai, Maharashtra",
    phrase: "Amchi Mumbai",
    story: "The sandwich born on Mumbai's street corners, sold from carts since the 1970s.",
    price: CLASSIC,
  },
  {
    id: "paneer-tikka-blaze",
    name: "Paneer Tikka Blaze",
    format: "classic-grilled",
    tier: "standard",
    filling: "Grilled paneer tikka, onion, capsicum, mint mayo",
    region: "Punjab",
    phrase: "Rangla Punjab",
    story: "The tandoor tradition, grilled and golden, no clay oven required.",
    price: CLASSIC,
  },
  {
    id: "cheese-chutney-melt",
    name: "Cheese Chutney Melt",
    format: "classic-grilled",
    tier: "premium-ritual",
    filling: "Green chutney, cheese, tomato, cucumber",
    region: "Mumbai, Maharashtra",
    phrase: "Amchi Mumbai",
    story: "The after-school classic every Indian kid grew up ordering.",
    ritual:
      "Comes with a food-safe Cheese Vial (syringe) and a marked slit in the sandwich — press the plunger yourself before the first bite.",
    price: CLASSIC_RITUAL,
  },
  {
    id: "corn-cheese-toast",
    name: "Corn & Cheese Toast",
    format: "classic-grilled",
    tier: "standard",
    filling: "Sweet corn, spiced butter, cheese",
    region: "Mumbai, Maharashtra",
    phrase: "Amchi Mumbai",
    story: "A monsoon-season favorite from Mumbai's roadside stalls.",
    price: CLASSIC,
  },
  {
    id: "schezwan-veggie-toast",
    name: "Schezwan Veggie Toast",
    format: "classic-grilled",
    tier: "standard",
    filling: "Schezwan sauce, cabbage, carrot, capsicum, cheese",
    region: "Mumbai/Kolkata (Indo-Chinese)",
    phrase: "Amchi Mumbai",
    story: "India's love affair with Indo-Chinese flavor.",
    price: CLASSIC,
  },
  {
    id: "tandoori-veggie-grill",
    name: "Tandoori Veggie Grill",
    format: "classic-grilled",
    tier: "standard",
    filling: "Tandoori-spiced mixed vegetables, mint chutney, cheese",
    region: "Punjab/Delhi",
    phrase: "Rangla Punjab",
    story: "Smoky clay-oven flavor, brought to bread.",
    price: CLASSIC,
  },

  // Section 2 — Pita Pocket
  {
    id: "tikka-fold",
    name: "Tikka Fold",
    format: "pita-pocket",
    tier: "standard",
    filling: "Paneer tikka crumble, mint chutney",
    region: "Punjab",
    phrase: "Rangla Punjab",
    story: "Punjab's tandoor tradition, folded and sealed.",
    price: POCKET,
  },
  {
    id: "chickpea-pocket",
    name: "Chickpea Pocket",
    format: "pita-pocket",
    tier: "standard",
    filling: "Chickpea masala mash, spiced yogurt",
    region: "North India",
    phrase: "Khaana Khaya?",
    story: "A protein-packed staple across North Indian homes.",
    price: POCKET,
  },
  {
    id: "tofu-bhurji-pocket",
    name: "Tofu Bhurji Pocket",
    format: "pita-pocket",
    tier: "standard",
    filling: "Spiced tofu scramble, herbs",
    region: "Pan-India (modern)",
    phrase: "Khaana Khaya?",
    story: "A modern, plant-based twist on classic egg bhurji.",
    price: POCKET,
  },
  {
    id: "dal-makhani-fold",
    name: "Dal Makhani Fold",
    format: "pita-pocket",
    tier: "premium-ritual",
    filling: "Thick dal makhani mash, pickled onion",
    region: "Punjab",
    phrase: "Rangla Punjab",
    story: "Punjab's most celebrated comfort dish, slow-simmered through the night.",
    ritual:
      'Wrapped in parchment sealed with a wax-look sticker stamped "M" — peel it to reveal the story card underneath.',
    price: POCKET_RITUAL,
  },
  {
    id: "achari-paneer-pocket",
    name: "Achari Paneer Pocket",
    format: "pita-pocket",
    tier: "standard",
    filling: "Pickle-spiced paneer, onion",
    region: "Rajasthan",
    phrase: "Padharo Mhare Desh",
    story: "The tang of Rajasthan's pickle culture, aged in brine for generations.",
    price: POCKET,
  },

  // Section 3 — Sub Roll
  {
    id: "paneer-tikka-sub-supreme",
    name: "Paneer Tikka Sub Supreme",
    format: "sub-roll",
    tier: "standard",
    filling: "Grilled paneer tikka, onion, bell pepper",
    region: "Punjab",
    phrase: "Rangla Punjab",
    story: "A hearty, full-size take on the classic tikka.",
    price: SUB,
  },
  {
    id: "schezwan-paneer-sub",
    name: "Schezwan Paneer Sub",
    format: "sub-roll",
    tier: "standard",
    filling: "Schezwan paneer, cabbage slaw",
    region: "Mumbai/Kolkata (Indo-Chinese)",
    phrase: "Amchi Mumbai",
    story: "Indo-Chinese heat, sub-sized.",
    price: SUB,
  },
  {
    id: "chickpea-peri-peri-sub",
    name: "Chickpea Peri-Peri Sub",
    format: "sub-roll",
    tier: "standard",
    filling: "Chickpea mash, peri-peri sauce",
    region: "Goa",
    phrase: "Kitem Re?",
    story: "Peri-peri arrived in India through Goa's Portuguese trade history.",
    price: SUB,
  },
  {
    id: "dal-makhani-loaded-sub",
    name: "Dal Makhani Loaded Sub",
    format: "sub-roll",
    tier: "premium-ritual",
    filling: "Thick dal makhani, crispy onions",
    region: "Punjab",
    phrase: "Rangla Punjab",
    story: "Punjab's richest comfort food, loaded into a hero-sized sub.",
    ritual: 'Sealed with a wax sticker stamped "Loaded" — the brand\'s signature hero-item mark.',
    price: SUB_RITUAL,
  },
  {
    id: "tandoori-veg-sub",
    name: "Tandoori Veg Sub",
    format: "sub-roll",
    tier: "standard",
    filling: "Mixed tandoori vegetables, mint mayo",
    region: "Punjab/Delhi",
    phrase: "Rangla Punjab",
    story: "The tandoor tradition, sub-sized.",
    price: SUB,
  },
];

export const byoBases: ByoBase[] = [
  { id: "paneer-tikka-crumble", label: "Paneer Tikka Crumble" },
  { id: "chickpea-masala-mash", label: "Chickpea Masala Mash" },
  { id: "tofu-bhurji", label: "Tofu Bhurji" },
  { id: "dal-makhani-mash", label: "Dal Makhani Mash" },
];

const FLAVOR_ADDON: RegionalPrice = { "nadiad-in": 15, "calgary-ca": 1.5 };
const NO_ADDON: RegionalPrice = { "nadiad-in": 0, "calgary-ca": 0 };

export const byoFlavorTosses: ByoFlavorToss[] = [
  {
    id: "peri-peri",
    label: "Peri-Peri",
    region: "Goa",
    phrase: "Kitem Re?",
    ritual: "Heat dropper, customer-controlled spice",
    addOn: FLAVOR_ADDON,
  },
  {
    id: "schezwan",
    label: "Schezwan",
    region: "Mumbai/Kolkata",
    phrase: "Amchi Mumbai",
    ritual: "Fire Vial dropper",
    addOn: FLAVOR_ADDON,
  },
  {
    id: "tandoori",
    label: "Tandoori",
    region: "Punjab",
    phrase: "Rangla Punjab",
    ritual: "Clay-toned wax seal, no extra cost",
    addOn: NO_ADDON,
  },
  {
    id: "achari",
    label: "Achari",
    region: "Rajasthan",
    phrase: "Padharo Mhare Desh",
    ritual: "Pickle-oil potion dropper",
    addOn: FLAVOR_ADDON,
  },
  {
    id: "plain",
    label: "Plain",
    region: "Nadiad, Gujarat",
    phrase: "Kem Cho",
    ritual: "No ritual — purity is the story",
    addOn: NO_ADDON,
  },
];

const accentClasses = [
  "from-coral/12 via-cream to-basil/10",
  "from-basil/10 via-cream to-coral/12",
  "from-coral/10 via-cream to-coral/16",
];

export function accentForDish(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return accentClasses[hash % accentClasses.length];
}

export function dishesByFormat(format: Dish["format"]) {
  return dishes.filter((d) => d.format === format);
}
