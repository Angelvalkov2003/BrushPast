import {
  BOX_TYPE_RULES,
  BYO_DISCOUNT,
  NEXT_CHAPTER_PRICE_GBP,
  comboFromCategories,
  singlePriceForCategory,
  type BoxCategoryKey,
  type BoxDraft,
  type BoxPairComboId,
  type BoxSelectionItem,
  type BoxTypeId,
} from "./shop-box-config";

/**
 * Two Piece Gift Boxes fixed prices (GBP).
 */
export const PAIR_PRICES_GBP: Record<BoxPairComboId, number> = {
  "print-coffee": 40,
  "tshirt-coffee": 50,
  "print-tshirt": 60,
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

/**
 * When BYO holds exactly one of each half of an official Two Piece pair,
 * charge the same fixed pair price (not the 5% BYO tier).
 */
export function byoMatchingPairCombo(
  items: BoxSelectionItem[],
): BoxPairComboId | undefined {
  if (countItems(items) !== 2) return undefined;
  const keys: BoxCategoryKey[] = items.flatMap((item) =>
    Array.from({ length: item.quantity }, () => item.categoryKey),
  );
  if (keys.length !== 2 || keys[0] === keys[1]) return undefined;
  return comboFromCategories(keys);
}

export type ByoPriceBreakdown = {
  count: number;
  retail: number;
  total: number;
  discountGbp: number;
  discountLabel: string | null;
  pairCombo?: BoxPairComboId;
};

export function byoPriceBreakdown(items: BoxSelectionItem[]): ByoPriceBreakdown {
  const count = countItems(items);
  const retail = categoryRetailSum(items);
  if (count <= 0) {
    return {
      count: 0,
      retail: 0,
      total: 0,
      discountGbp: 0,
      discountLabel: null,
    };
  }
  if (count === 1) {
    const first = items[0];
    const total = first ? singlePriceForCategory(first.categoryKey) : 0;
    return {
      count,
      retail: total,
      total,
      discountGbp: 0,
      discountLabel: null,
    };
  }

  const pairCombo = byoMatchingPairCombo(items);
  if (pairCombo) {
    const total = PAIR_PRICES_GBP[pairCombo];
    return {
      count,
      retail,
      total,
      discountGbp: Math.round((retail - total) * 100) / 100,
      discountLabel: "Two Piece Gift Box price",
      pairCombo,
    };
  }

  const rate =
    count === 2
      ? BYO_DISCOUNT.twoItems
      : count === 3
        ? BYO_DISCOUNT.threeItems
        : BYO_DISCOUNT.moreThanThree;
  const total = Math.round(retail * (1 - rate) * 100) / 100;
  const pct = Math.round(rate * 100);
  return {
    count,
    retail,
    total,
    discountGbp: Math.round((retail - total) * 100) / 100,
    discountLabel: `${pct}% Build Your Own discount`,
  };
}

export function byoDiscountedPrice(items: BoxSelectionItem[]): number {
  return byoPriceBreakdown(items).total;
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
    case "category-fixed":
      // One Piece Gift Box: fixed category retail (coffee £16.50, etc.), not DB variant.price.
      return categoryRetailSum(items);
    case "sku-sum-discount":
      return byoDiscountedPrice(items);
    default:
      return skuSum(items);
  }
}

export function priceOfDraft(draft: BoxDraft): number {
  return priceOfBox(draft.type, draft.items, draft.comboId);
}
