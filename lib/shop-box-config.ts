import { SHOP_COLLECTIONS } from "./shop-config";

export type BoxTypeId = "a" | "b" | "c" | "d";

export type BoxCategoryKey = "coffee" | "tshirt" | "print";

export type BoxPairComboId = "print-tshirt" | "print-coffee" | "tshirt-coffee";

export type BoxBuilderStep = "choose" | "review" | "message";

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
  priceMode: "sku-sum" | "pair-lookup";
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
  /** English description of the photo that should replace the placeholder. */
  imageAlt: string;
  imageNote: string;
};

export const BOX_BUILDER_STEPS: { id: BoxBuilderStep; label: string }[] = [
  { id: "choose", label: "Choose Items" },
  { id: "review", label: "Review Box" },
  { id: "message", label: "Add Message" },
];

export const BOX_CATEGORY_ROWS: {
  key: BoxCategoryKey;
  slug: string;
  label: string;
}[] = [
  { key: "coffee", slug: SHOP_COLLECTIONS[1].slug, label: "Coffee" },
  { key: "tshirt", slug: SHOP_COLLECTIONS[0].slug, label: "T-Shirt" },
  { key: "print", slug: SHOP_COLLECTIONS[2].slug, label: "Print" },
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
    priceMode: "sku-sum",
    minTotal: 3,
  },
  b: {
    maxTotal: 2,
    maxPerCategory: 2,
    distinctCategories: false,
    priceMode: "sku-sum",
    minTotal: 2,
  },
  c: {
    maxTotal: 1,
    maxPerCategory: 1,
    distinctCategories: false,
    priceMode: "sku-sum",
    minTotal: 1,
  },
  d: {
    maxTotal: 9,
    maxPerCategory: 3,
    distinctCategories: false,
    priceMode: "sku-sum",
    minTotal: 1,
  },
};

export const BOX_HUB_CARDS: BoxHubCard[] = [
  {
    type: "a",
    name: "Complete Box",
    eyebrow: "All three",
    description:
      "The complete creative box — one coffee, one t-shirt and one print, packed together.",
    cta: "Build this box →",
    href: "/shop/box/a",
    available: true,
    comingSoon: false,
    imageAlt:
      "Photograph of a sealed Brush Past gift box tied with twine, representing the Complete Box",
    imageNote:
      "IMAGE NEEDED: Photograph of a sealed Brush Past gift box tied with twine, representing the Complete Box.",
  },
  {
    type: "b",
    name: "Pair Box",
    eyebrow: "Choose two",
    description:
      "Two pieces from the archive — any coffee, t-shirt or print pairing you choose.",
    cta: "Build this pair →",
    href: "/shop/box/b",
    available: true,
    comingSoon: false,
    imageAlt:
      "Two gifts paired together — a print stacked with a coffee bag — representing the Pair Box",
    imageNote:
      "IMAGE NEEDED: Two gifts paired together (a print stacked with a coffee bag), representing the Pair Box.",
  },
  {
    type: "c",
    name: "Single Box",
    eyebrow: "Choose one",
    description:
      "One piece in a box — a t-shirt, a print, or a coffee edition. Choose the design, add a gift message, and we pack it as a box.",
    cta: "Choose one piece →",
    href: "/shop/box/c",
    available: true,
    comingSoon: false,
    imageAlt:
      "A single wrapped gift on a table, representing the Single Box",
    imageNote:
      "IMAGE NEEDED: A single wrapped gift on a table, representing the Single Box.",
  },
  {
    type: "d",
    name: "Custom Box",
    eyebrow: "Pick and mix",
    description:
      "Build a custom mix — up to three pieces from each category (t-shirt, print, coffee). Any combination that is not a standard pair or single.",
    cta: "Mix your box →",
    href: "/shop/box/d",
    available: true,
    comingSoon: true,
    imageAlt:
      "An open gift box with a t-shirt, a print and a coffee bag mixed together, representing the Custom Box",
    imageNote:
      "IMAGE NEEDED: An open gift box with a t-shirt, a print and a coffee bag mixed together, representing the Custom Box.",
  },
];

export const BOX_GIFT_MESSAGE_MAX = 500;

export function isBoxTypeId(value: string): value is BoxTypeId {
  return value === "a" || value === "b" || value === "c" || value === "d";
}

export function boxTypeLabel(type: BoxTypeId | string | null | undefined): string {
  switch (type) {
    case "a":
      return "Complete Box";
    case "b":
      return "Pair Box";
    case "c":
      return "Single Box";
    case "d":
      return "Custom Box";
    default:
      return type ? String(type) : "Box";
  }
}

export function categoryLabel(key: BoxCategoryKey): string {
  return BOX_CATEGORY_ROWS.find((row) => row.key === key)?.label ?? key;
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

export function boxTypeIntro(type: BoxTypeId): { lead: string; choose: string } {
  switch (type) {
    case "a":
      return {
        lead: "Choose one t-shirt, one coffee and one print. If a piece has sizes, pick one before it joins the box. Then review, add a gift message, and checkout.",
        choose:
          "This box holds one of each. Pick a piece in every collection — choosing another in the same collection replaces it.",
      };
    case "c":
      return {
        lead: "Pick one t-shirt, print or coffee. If the piece has sizes, choose one before it joins the box. Then review, add a gift message, and checkout.",
        choose:
          "Choose one piece from any collection. Picking another replaces the one already in your box.",
      };
    case "b":
      return {
        lead: "Pick any two pieces — coffee, t-shirts or prints. If a piece has sizes, choose one before it joins the box. Then review, add a gift message, and checkout.",
        choose:
          "Choose two pieces from any collection. A third pick replaces the first.",
      };
    case "d":
      return {
        lead: "Mix your own box — up to three from each collection. Then review, add a gift message, and checkout.",
        choose: "Add what you want. Up to three pieces from each collection.",
      };
  }
}

export function emptyBoxDraft(type: BoxTypeId): BoxDraft {
  return {
    type,
    items: [],
    giftMessage: "",
  };
}
