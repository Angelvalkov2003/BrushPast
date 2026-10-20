import type { ProductVariant } from "lib/types";

export type CoffeeFormat = "beans" | "ground";
export type CoffeeGrind = "filter" | "cafetiere";

export const COFFEE_FORMAT_LABELS: Record<CoffeeFormat, string> = {
  beans: "Whole beans",
  ground: "Ground",
};

export const COFFEE_GRIND_LABELS: Record<CoffeeGrind, string> = {
  filter: "Filter",
  cafetiere: "Cafetière",
};

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[—–]/g, "-");
}

/** Hide espresso grind from storefront; keep beans + filter + cafetière. */
export function isCoffeeStorefrontVariant(variant: ProductVariant): boolean {
  const t = normalizeTitle(variant.title);
  if (!variant.available) return false;
  if (t.includes("espresso") && t.includes("ground")) return false;
  return t.includes("whole bean") || t.includes("ground");
}

export function classifyCoffeeVariant(
  variant: ProductVariant,
): { format: CoffeeFormat; grind?: CoffeeGrind } | null {
  const t = normalizeTitle(variant.title);
  if (t.includes("whole bean")) return { format: "beans" };
  if (!t.includes("ground")) return null;
  if (t.includes("filter")) return { format: "ground", grind: "filter" };
  if (t.includes("cafet") || t.includes("french")) {
    return { format: "ground", grind: "cafetiere" };
  }
  return null;
}

export function coffeeStorefrontVariants(
  variants: ProductVariant[],
): ProductVariant[] {
  return variants.filter(isCoffeeStorefrontVariant);
}

export function findCoffeeVariant(
  variants: ProductVariant[],
  format: CoffeeFormat,
  grind: CoffeeGrind | null,
): ProductVariant | null {
  const pool = coffeeStorefrontVariants(variants);
  if (format === "beans") {
    return (
      pool.find((v) => classifyCoffeeVariant(v)?.format === "beans") ?? null
    );
  }
  if (!grind) return null;
  return (
    pool.find((v) => {
      const c = classifyCoffeeVariant(v);
      return c?.format === "ground" && c.grind === grind;
    }) ?? null
  );
}

export function formatCoffeeCartLabel(variant: ProductVariant): string {
  const c = classifyCoffeeVariant(variant);
  if (!c) {
    return variant.title.replace(/[—–]/g, "-");
  }
  if (c.format === "beans") return COFFEE_FORMAT_LABELS.beans;
  if (c.grind) {
    return `${COFFEE_FORMAT_LABELS.ground} - ${COFFEE_GRIND_LABELS[c.grind]}`;
  }
  return COFFEE_FORMAT_LABELS.ground;
}

export function isCoffeeProduct(product: {
  categoryKey?: string;
  productType?: string | null;
  handle?: string;
}): boolean {
  if (product.categoryKey === "coffee") return true;
  const type = product.productType?.toLowerCase() ?? "";
  if (type === "coffee" || type === "coffee-edition") return true;
  return product.handle === "new-page";
}
