import {
  BOX_TYPE_RULES,
  type BoxDraft,
  type BoxPairComboId,
  type BoxSelectionItem,
  type BoxTypeId,
} from "./shop-box-config";

/**
 * Type B pair prices in GBP. Null until PM confirms amounts.
 * Source of truth for the app until admin can edit `box_pair_prices`.
 */
export const PAIR_PRICES_GBP: Record<BoxPairComboId, number | null> = {
  "print-tshirt": null,
  "print-coffee": null,
  "tshirt-coffee": null,
};

export function skuSum(items: BoxSelectionItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
}

export function priceOfBox(
  type: BoxTypeId,
  items: BoxSelectionItem[],
  comboId?: BoxPairComboId,
): number {
  const rules = BOX_TYPE_RULES[type];
  if (rules.priceMode === "pair-lookup" && comboId) {
    const lookup = PAIR_PRICES_GBP[comboId];
    if (lookup != null) return lookup;
  }
  return skuSum(items);
}

export function priceOfDraft(draft: BoxDraft): number {
  return priceOfBox(draft.type, draft.items, draft.comboId);
}
