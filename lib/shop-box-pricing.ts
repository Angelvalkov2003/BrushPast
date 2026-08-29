import {
  BOX_TYPE_RULES,
  BYO_DISCOUNT,
  NEXT_CHAPTER_PRICE_GBP,
  singlePriceForCategory,
  type BoxDraft,
  type BoxPairComboId,
  type BoxSelectionItem,
  type BoxTypeId,
} from "./shop-box-config";

/**
 * Curated Pairings fixed prices (GBP).
 * Matches box_pair_prices seed / Alexandra brief.
 */
export const PAIR_PRICES_GBP: Record<BoxPairComboId, number> = {
  "print-coffee": 40,
  "tshirt-coffee": 47,
  "print-tshirt": 58,
};

function countItems(items: BoxSelectionItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function skuSum(items: BoxSelectionItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
}

/** Retail sum using category-fixed single prices × quantity. */
export function categoryRetailSum(items: BoxSelectionItem[]): number {
  return items.reduce(
    (sum, item) =>
      sum + singlePriceForCategory(item.categoryKey) * item.quantity,
    0,
  );
}

export function byoDiscountedPrice(items: BoxSelectionItem[]): number {
  const count = countItems(items);
  const retail = categoryRetailSum(items);
  if (count <= 0) return 0;
  if (count === 1) {
    const first = items[0];
    return first ? singlePriceForCategory(first.categoryKey) : 0;
  }
  if (count === 2) {
    return Math.round(retail * (1 - BYO_DISCOUNT.twoItems) * 100) / 100;
  }
  return Math.round(retail * (1 - BYO_DISCOUNT.threeItems) * 100) / 100;
}

export function priceOfBox(
  type: BoxTypeId,
  items: BoxSelectionItem[],
  comboId?: BoxPairComboId,
): number {
  const rules = BOX_TYPE_RULES[type];
  const count = countItems(items);

  if (count === 0) return 0;

  switch (rules.priceMode) {
    case "fixed-box":
      return NEXT_CHAPTER_PRICE_GBP;
    case "pair-lookup": {
      if (comboId && PAIR_PRICES_GBP[comboId] != null) {
        return PAIR_PRICES_GBP[comboId];
      }
      return categoryRetailSum(items);
    }
    case "category-fixed": {
      const first = items[0];
      return first ? singlePriceForCategory(first.categoryKey) * first.quantity : 0;
    }
    case "sku-sum-discount":
      return byoDiscountedPrice(items);
    default:
      return skuSum(items);
  }
}

export function priceOfDraft(draft: BoxDraft): number {
  return priceOfBox(draft.type, draft.items, draft.comboId);
}
