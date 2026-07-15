import type { BreadFormatInfo, ByoBase, ByoFlavorToss, Dish } from "./types";

// NOTE: All prices below are launch-estimate placeholders (not in the brand
// guide, which only specifies the +₹10-15 Premium Ritual add-on). Swap
// `priceInr` / `basePriceInr` / `addOnInr` for real numbers once pricing is
// locked for the Nadiad location.
//
// `emoji` is a stand-in for real food photography — no external image host
// is reachable from this build environment. Swap each card's icon for a
// real photo later by adding an `image` field and using it in DishCard.

export const breadFormats: BreadFormatInfo[] = [
  {
    id: "classic-grilled",
    label: "Classic Grilled Sandwich",
    description: "Sliced bread, triangle-cut",
    basePriceInr: 89,
    emoji: "🥪",
  },
  {
    id: "pita-pocket",
    label: "Pita Pocket",
    description: "Signature pressed format",
    basePriceInr: 99,
    emoji: "🫓",
  },
  {
    id: "sub-roll",
    label: "Sub Roll",
    description: "Hero-sized, loaded",
    basePriceInr: 139,
    emoji: "🥖",
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
    priceInr: 89,
    emoji: "🥔",
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
    priceInr: 89,
    emoji: "🔥",
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
    priceInr: 104,
    emoji: "🧀",
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
    priceInr: 89,
    emoji: "🌽",
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
    priceInr: 89,
    emoji: "🥢",
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
    priceInr: 89,
    emoji: "🥕",
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
    priceInr: 99,
    emoji: "🍢",
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
    priceInr: 99,
    emoji: "🫘",
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
    priceInr: 99,
    emoji: "🍳",
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
    priceInr: 114,
    emoji: "🍲",
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
    priceInr: 99,
    emoji: "🥒",
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
    priceInr: 139,
    emoji: "🫑",
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
    priceInr: 139,
    emoji: "🥡",
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
    priceInr: 139,
    emoji: "🌶️",
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
    priceInr: 154,
    emoji: "🍛",
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
    priceInr: 139,
    emoji: "🔥",
  },
];

export const byoBases: ByoBase[] = [
  { id: "paneer-tikka-crumble", label: "Paneer Tikka Crumble" },
  { id: "chickpea-masala-mash", label: "Chickpea Masala Mash" },
  { id: "tofu-bhurji", label: "Tofu Bhurji" },
  { id: "dal-makhani-mash", label: "Dal Makhani Mash" },
];

export const byoFlavorTosses: ByoFlavorToss[] = [
  {
    id: "peri-peri",
    label: "Peri-Peri",
    region: "Goa",
    phrase: "Kitem Re?",
    ritual: "Heat dropper, customer-controlled spice",
    addOnInr: 15,
  },
  {
    id: "schezwan",
    label: "Schezwan",
    region: "Mumbai/Kolkata",
    phrase: "Amchi Mumbai",
    ritual: "Fire Vial dropper",
    addOnInr: 15,
  },
  {
    id: "tandoori",
    label: "Tandoori",
    region: "Punjab",
    phrase: "Rangla Punjab",
    ritual: "Clay-toned wax seal, no extra cost",
    addOnInr: 0,
  },
  {
    id: "achari",
    label: "Achari",
    region: "Rajasthan",
    phrase: "Padharo Mhare Desh",
    ritual: "Pickle-oil potion dropper",
    addOnInr: 15,
  },
  {
    id: "plain",
    label: "Plain",
    region: "Nadiad, Gujarat",
    phrase: "Kem Cho",
    ritual: "No ritual — purity is the story",
    addOnInr: 0,
  },
];

const accentClasses = [
  "from-tomato/25 to-golden/25",
  "from-basil/20 to-golden/25",
  "from-golden/25 to-tomato/20",
];

export function accentForDish(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return accentClasses[hash % accentClasses.length];
}

export function dishesByFormat(format: Dish["format"]) {
  return dishes.filter((d) => d.format === format);
}

export function emojiForCartItem(item: { id: string; format: Dish["format"] }): string {
  const dish = dishes.find((d) => d.id === item.id);
  if (dish) return dish.emoji;
  return breadFormats.find((f) => f.id === item.format)?.emoji ?? "🥪";
}
