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
  if (count === 3) {
    return Math.round(retail * (1 - BYO_DISCOUNT.threeItems) * 100) / 100;
  }
  return Math.round(retail * (1 - BYO_DISCOUNT.moreThanThree) * 100) / 100;
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
      // One Piece Gift Box: fixed category retail (coffee £16, etc.), not DB variant.price.
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
