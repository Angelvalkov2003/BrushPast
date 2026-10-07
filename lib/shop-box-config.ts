import { SHOP_COLLECTIONS } from "./shop-config";
import { PHOTO } from "./photo-placeholder";

export type BoxTypeId = "a" | "b" | "c" | "d";

/**
 * Launch categories. Kept as a string union for TypeScript today;
 * prefer iterating BOX_CATEGORY_ROWS so new categories can be added later
 * without rewriting every UI surface.
 */
export type BoxCategoryKey = "coffee" | "tshirt" | "print";

export type BoxPairComboId = "print-tshirt" | "print-coffee" | "tshirt-coffee";

export type BoxBuilderStep = "choose" | "review" | "message";

export type BoxPriceMode =
  | "fixed-box"
  | "pair-lookup"
  | "category-fixed"
  | "sku-sum-discount";

export type BoxSelectionItem = {
  id: string;
  productId: string;
  variantId: string;
  categoryKey: BoxCategoryKey;
  title: string;
  handle: string;
  imageUrl: string;
  variantLabel: string;
  sku?: string;
  unitPrice: number;
  quantity: number;
  maxQuantity?: number;
};

export type BoxDraft = {
  type: BoxTypeId;
  comboId?: BoxPairComboId;
  items: BoxSelectionItem[];
  giftMessage: string;
};

export type BoxTypeRules = {
  maxTotal: number | null;
  maxPerCategory: number | null;
  distinctCategories: boolean;
  priceMode: BoxPriceMode;
  minTotal: number;
};

export type BoxHubCard = {
  type: BoxTypeId;
  name: string;
  eyebrow: string;
  description: string;
  cta: string;
  href: string | null;
  available: boolean;
  comingSoon: boolean;
  imageAlt: string;
  imageNote: string;
  photoNumber: number;
};

export const BOX_BUILDER_STEPS: { id: BoxBuilderStep; label: string }[] = [
  { id: "choose", label: "Choose Items" },
  { id: "review", label: "Review Box" },
  { id: "message", label: "Message (optional)" },
];

/** Config-driven category list — extend here when new product families launch. */
export const BOX_CATEGORY_ROWS: {
  key: BoxCategoryKey;
  slug: string;
  label: string;
  /** Fixed One Piece Gift Box retail price (GBP). */
  singlePriceGbp: number;
}[] = [
  {
    key: "coffee",
    slug: SHOP_COLLECTIONS[1].slug,
    label: "Coffee",
    singlePriceGbp: 16,
  },
  {
    key: "tshirt",
    slug: SHOP_COLLECTIONS[0].slug,
    label: "T-Shirt",
    singlePriceGbp: 39,
  },
  {
    key: "print",
    slug: SHOP_COLLECTIONS[2].slug,
    label: "Print",
    singlePriceGbp: 28,
  },
];

export const BOX_CATEGORY_SLUGS = BOX_CATEGORY_ROWS.map((row) => row.slug);

export function boxCategoryLabelFromSlug(
  slug: string | null | undefined,
): string | null {
  if (!slug) return null;
  return BOX_CATEGORY_ROWS.find((row) => row.slug === slug)?.label ?? null;
}

export function boxCategoriesFromAdmin<T extends { id: string; slug: string | null }>(
  categories: T[],
) {
  return BOX_CATEGORY_ROWS.flatMap((row) => {
    const category = categories.find((item) => item.slug === row.slug);
    return category ? [{ ...row, id: category.id }] : [];
  });
}

export const BOX_TYPE_RULES: Record<BoxTypeId, BoxTypeRules> = {
  a: {
    maxTotal: 3,
    maxPerCategory: 1,
    distinctCategories: true,
    priceMode: "fixed-box",
    minTotal: 3,
  },
  b: {
    maxTotal: 2,
    maxPerCategory: 1,
    distinctCategories: true,
    priceMode: "pair-lookup",
    minTotal: 2,
  },
  c: {
    maxTotal: 1,
    maxPerCategory: 1,
    distinctCategories: false,
    // Retail from BOX_CATEGORY_ROWS.singlePriceGbp (e.g. coffee £16) — not DB variant.price.
    priceMode: "category-fixed",
    minTotal: 1,
  },
  d: {
    // Allow 4+ so the “15% off more than three” offer can apply.
    maxTotal: 6,
    maxPerCategory: 6,
    distinctCategories: false,
    priceMode: "sku-sum-discount",
    minTotal: 2,
  },
};

/** The Next Chapter Box fixed price (GBP). */
export const NEXT_CHAPTER_PRICE_GBP = 75;

/** Build Your Own Gift Box discounts on combined retail. */
export const BYO_DISCOUNT = {
  twoItems: 0.05,
  threeItems: 0.1,
  moreThanThree: 0.15,
} as const;

export const PAIR_COMBO_META: Record<
  BoxPairComboId,
  { categories: [BoxCategoryKey, BoxCategoryKey]; label: string }
> = {
  "print-coffee": {
    categories: ["coffee", "print"],
    label: "Coffee + Print",
  },
  "tshirt-coffee": {
    categories: ["coffee", "tshirt"],
    label: "Coffee + T-Shirt",
  },
  "print-tshirt": {
    categories: ["tshirt", "print"],
    label: "T-Shirt + Print",
  },
};

export const BOX_HUB_CARDS: BoxHubCard[] = [
  {
    type: "a",
    name: "The Next Chapter Box",
    eyebrow: "All three",
    description:
      "Coffee, a T-shirt and a fine art print together in one gift box.",
    cta: "Build this box →",
    href: "/shop/box/a",
    available: true,
    comingSoon: false,
    imageAlt:
      "Photograph of a sealed Brush Past gift box tied with twine, representing The Next Chapter Box",
    imageNote:
      "IMAGE NEEDED: Photograph of a sealed Brush Past gift box tied with twine, representing The Next Chapter Box.",
    photoNumber: PHOTO.boxHubNextChapter,
  },
  {
    type: "b",
    name: "Two Piece Gift Boxes",
    eyebrow: "Choose two",
    description:
      "Three fixed pairings — coffee + print, coffee + t-shirt, or t-shirt + print.",
    cta: "Choose a pairing →",
    href: "/shop/box/b",
    available: true,
    comingSoon: false,
    imageAlt:
      "Two gifts paired together — a print stacked with a coffee bag — representing Two Piece Gift Boxes",
    imageNote:
      "IMAGE NEEDED: Two gifts paired together (a print stacked with a coffee bag), representing Two Piece Gift Boxes.",
    photoNumber: PHOTO.boxHubPairings,
  },
  {
    type: "c",
    name: "One Piece Gift Boxes",
    eyebrow: "Choose one",
    description:
      "One piece packed as a Brush Past gift box — coffee, t-shirt or print.",
    cta: "Choose one piece →",
    href: "/shop/box/c",
    available: true,
    comingSoon: false,
    imageAlt: "A single wrapped gift on a table, representing One Piece Gift Boxes",
    imageNote:
      "IMAGE NEEDED: A single wrapped gift on a table, representing One Piece Gift Boxes.",
    photoNumber: PHOTO.boxHubSingle,
  },
  {
    type: "d",
    name: "Build Your Own Gift Box",
    eyebrow: "Pick and mix",
    description:
      "Mix any pieces, including duplicates. 5% off two, 10% off three, 15% off more than three.",
    cta: "Mix your box →",
    href: "/shop/box/d",
    available: true,
    comingSoon: false,
    imageAlt:
      "An open gift box with a t-shirt, a print and a coffee bag mixed together, representing Build Your Own Gift Box",
    imageNote:
      "IMAGE NEEDED: An open gift box with a t-shirt, a print and a coffee bag mixed together, representing Build Your Own Gift Box.",
    photoNumber: PHOTO.boxHubBuildOwn,
  },
];

export const BOX_GIFT_MESSAGE_MAX = 500;

export function isBoxTypeId(value: string): value is BoxTypeId {
  return value === "a" || value === "b" || value === "c" || value === "d";
}

export function isBoxPairComboId(value: string): value is BoxPairComboId {
  return (
    value === "print-tshirt" ||
    value === "print-coffee" ||
    value === "tshirt-coffee"
  );
}

export function isBoxCategoryKey(value: string): value is BoxCategoryKey {
  return BOX_CATEGORY_ROWS.some((row) => row.key === value);
}

export function boxTypeLabel(type: BoxTypeId | string | null | undefined): string {
  switch (type) {
    case "a":
      return "The Next Chapter Box";
    case "b":
      return "Two Piece Gift Boxes";
    case "c":
      return "One Piece Gift Boxes";
    case "d":
      return "Build Your Own Gift Box";
    default:
      return type ? String(type) : "Box";
  }
}

export function categoryLabel(key: BoxCategoryKey): string {
  return BOX_CATEGORY_ROWS.find((row) => row.key === key)?.label ?? key;
}

export function singlePriceForCategory(key: BoxCategoryKey): number {
  return (
    BOX_CATEGORY_ROWS.find((row) => row.key === key)?.singlePriceGbp ?? 0
  );
}

export function boxComboIdToDb(
  comboId?: BoxPairComboId,
): "print_tshirt" | "print_coffee" | "tshirt_coffee" | undefined {
  if (!comboId) return undefined;
  return comboId.replaceAll("-", "_") as
    | "print_tshirt"
    | "print_coffee"
    | "tshirt_coffee";
}

export function categoriesForCombo(
  comboId: BoxPairComboId,
): [BoxCategoryKey, BoxCategoryKey] {
  return PAIR_COMBO_META[comboId].categories;
}

export function comboFromCategories(
  keys: BoxCategoryKey[],
): BoxPairComboId | undefined {
  const set = new Set(keys);
  if (set.size !== 2) return undefined;
  const entry = (
    Object.entries(PAIR_COMBO_META) as [
      BoxPairComboId,
      (typeof PAIR_COMBO_META)[BoxPairComboId],
    ][]
  ).find(([, meta]) =>
    meta.categories.every((key) => set.has(key)),
  );
  return entry?.[0];
}

export function boxTypeIntro(type: BoxTypeId): { lead: string; choose: string } {
  switch (type) {
    case "a":
      return {
        lead: "The Next Chapter Box — coffee, a T-shirt and a fine art print together. Choose each design, add a gift message, and we pack it as a gift box.",
        choose:
          "Pick one piece in every collection. Choosing another in the same collection replaces it.",
      };
    case "c":
      return {
        lead: "One Piece Gift Boxes — one piece packed as a Brush Past gift box. Choose the design (and size for t-shirts), add a gift message, and checkout.",
        choose: "Choose one design from this collection.",
      };
    case "b":
      return {
        lead: "Two Piece Gift Boxes — a fixed two-piece gift. Choose the design for each piece in the pair, add a gift message, and checkout.",
        choose: "Choose one design for each piece in this pairing.",
      };
    case "d":
      return {
        lead: "Build Your Own Gift Box — mix any pieces from any collection. Duplicates are welcome. 5% off any two, 10% off any three, 15% off more than three.",
        choose:
          "Add at least two pieces (up to six). You can pick the same category more than once.",
      };
  }
}

export function emptyBoxDraft(
  type: BoxTypeId,
  comboId?: BoxPairComboId,
): BoxDraft {
  return {
    type,
    comboId,
    items: [],
    giftMessage: "",
  };
}
