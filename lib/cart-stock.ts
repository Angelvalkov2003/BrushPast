import { formatInsufficientStockMessage } from "lib/inventory";

export type StockCheckResult = { ok: true } | { ok: false; error: string };

export function resolveVariantMaxQuantity(
  variant: { maxQuantity?: number },
  product?: { inventoryType?: string | null; inventoryQuantity?: number | null },
): number | undefined {
  if (variant.maxQuantity !== undefined) return variant.maxQuantity;
  if (product?.inventoryType && product.inventoryType !== "unlimited") {
    return product.inventoryQuantity ?? 0;
  }
  return undefined;
}

export function checkStockQuantity(
  currentQuantity: number,
  delta: number,
  maxQuantity: number | undefined,
  productTitle: string,
  variantTitle: string,
): StockCheckResult {
  if (maxQuantity === undefined) return { ok: true };

  const requested = currentQuantity + delta;
  if (requested > maxQuantity) {
    return {
      ok: false,
      error: formatInsufficientStockMessage(
        productTitle,
        variantTitle,
        maxQuantity,
        requested,
      ),
    };
  }

  return { ok: true };
}
