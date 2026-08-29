import {
  BOX_CATEGORY_ROWS,
  BOX_TYPE_RULES,
  PAIR_COMBO_META,
  categoriesForCombo,
  comboFromCategories,
  type BoxCategoryKey,
  type BoxDraft,
  type BoxPairComboId,
  type BoxSelectionItem,
  type BoxTypeId,
} from "./shop-box-config";

export function totalItemCount(items: BoxSelectionItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function countInCategory(
  items: BoxSelectionItem[],
  key: BoxCategoryKey,
): number {
  return items
    .filter((item) => item.categoryKey === key)
    .reduce((sum, item) => sum + item.quantity, 0);
}

export function isBoxComplete(draft: BoxDraft): boolean {
  const rules = BOX_TYPE_RULES[draft.type];
  const total = totalItemCount(draft.items);
  if (total < rules.minTotal) return false;
  if (rules.maxTotal != null && total > rules.maxTotal) return false;

  if (draft.type === "a") {
    return BOX_CATEGORY_ROWS.every(
      (row) => countInCategory(draft.items, row.key) === 1,
    );
  }

  if (draft.type === "b" && draft.comboId) {
    const required = categoriesForCombo(draft.comboId);
    return required.every((key) => countInCategory(draft.items, key) === 1);
  }

  return true;
}

export function canSelectInCategory(
  draft: BoxDraft,
  categoryKey: BoxCategoryKey,
): { ok: boolean; replaces: boolean; reason?: string } {
  const rules = BOX_TYPE_RULES[draft.type];
  const total = totalItemCount(draft.items);

  if (draft.type === "c") {
    return { ok: true, replaces: total > 0 };
  }

  if (draft.type === "b") {
    if (
      draft.comboId &&
      !PAIR_COMBO_META[draft.comboId].categories.includes(categoryKey)
    ) {
      return {
        ok: false,
        replaces: false,
        reason: "This pairing does not include that collection.",
      };
    }
    return {
      ok: true,
      replaces: countInCategory(draft.items, categoryKey) > 0,
    };
  }

  if (draft.type === "a") {
    return {
      ok: true,
      replaces: countInCategory(draft.items, categoryKey) > 0,
    };
  }

  // Build Your Own (d)
  if (rules.maxTotal != null && total >= rules.maxTotal) {
    return {
      ok: false,
      replaces: false,
      reason: `This box holds up to ${rules.maxTotal} pieces.`,
    };
  }

  if (rules.maxPerCategory != null) {
    const inCategory = countInCategory(draft.items, categoryKey);
    if (inCategory >= rules.maxPerCategory) {
      return {
        ok: false,
        replaces: false,
        reason: `You can add up to ${rules.maxPerCategory} from this category.`,
      };
    }
  }

  return { ok: true, replaces: false };
}

export function applySelection(
  draft: BoxDraft,
  item: BoxSelectionItem,
): BoxDraft {
  if (draft.type === "c") {
    return { ...draft, items: [{ ...item, quantity: 1 }] };
  }

  if (draft.type === "a" || draft.type === "b") {
    const rest = draft.items.filter(
      (current) => current.categoryKey !== item.categoryKey,
    );
    return { ...draft, items: [...rest, { ...item, quantity: 1 }] };
  }

  // Build Your Own — allow duplicates (separate lines per variant)
  const existingIndex = draft.items.findIndex(
    (current) =>
      current.productId === item.productId &&
      current.variantId === item.variantId,
  );

  if (existingIndex >= 0) {
    const rules = BOX_TYPE_RULES.d;
    const total = totalItemCount(draft.items);
    if (rules.maxTotal != null && total >= rules.maxTotal) {
      return draft;
    }
    return {
      ...draft,
      items: draft.items.map((current, index) =>
        index === existingIndex
          ? { ...current, quantity: current.quantity + 1 }
          : current,
      ),
    };
  }

  if (
    BOX_TYPE_RULES.d.maxTotal != null &&
    totalItemCount(draft.items) >= BOX_TYPE_RULES.d.maxTotal
  ) {
    return draft;
  }

  return { ...draft, items: [...draft.items, { ...item, quantity: 1 }] };
}

export function removeSelection(
  draft: BoxDraft,
  itemId: string,
): BoxDraft {
  return { ...draft, items: draft.items.filter((item) => item.id !== itemId) };
}

export function selectedItemInCategory(
  draft: BoxDraft,
  categoryKey: BoxCategoryKey,
): BoxSelectionItem | undefined {
  return draft.items.find((item) => item.categoryKey === categoryKey);
}

export function isProductSelected(
  draft: BoxDraft,
  productId: string,
): boolean {
  return draft.items.some((item) => item.productId === productId);
}

export function categoryStatusLabel(
  draft: BoxDraft,
  categoryKey: BoxCategoryKey,
): string {
  const count = countInCategory(draft.items, categoryKey);
  if (draft.type === "c" || draft.type === "a" || draft.type === "b") {
    const selected = selectedItemInCategory(draft, categoryKey);
    return selected ? "Selected" : "Pick one";
  }
  return count > 0 ? `${count} selected` : "None";
}

/**
 * After a cart edit, infer the correct box type + optional pairing combo.
 *
 * Confirmed (BYO):
 * - 3 → 2 items: stay Build Your Own (−7%)
 * - 1 item: Single Collection at full category price
 *
 * Fixed journeys (a/b):
 * - 2 items matching an official pair → Curated Pairings
 * - 1 item → Single Collection
 */
export function inferBoxFromContents(
  items: BoxSelectionItem[],
  previousType: BoxTypeId,
  previousComboId?: BoxPairComboId,
): { type: BoxTypeId; comboId?: BoxPairComboId } {
  const count = totalItemCount(items);
  if (count <= 0) {
    return { type: previousType, comboId: previousComboId };
  }

  if (count === 1) {
    return { type: "c" };
  }

  if (previousType === "d") {
    return { type: "d" };
  }

  if (count === 2) {
    const keys = items.flatMap((item) =>
      Array.from({ length: item.quantity }, () => item.categoryKey),
    );
    const unique = [...new Set(keys)];
    const combo =
      unique.length === 2 ? comboFromCategories(unique) : undefined;
    if (combo) {
      return { type: "b", comboId: combo };
    }
    if (previousType === "b" && previousComboId) {
      return { type: "b", comboId: previousComboId };
    }
    return { type: "d" };
  }

  if (count >= 3) {
    if (previousType === "a") {
      const hasAll = BOX_CATEGORY_ROWS.every(
        (row) => countInCategory(items, row.key) === 1,
      );
      if (hasAll && count === 3) return { type: "a" };
    }
    return { type: "d" };
  }

  return { type: previousType, comboId: previousComboId };
}

/** @deprecated Prefer inferBoxFromContents */
export function boxTypeAfterContentChange(
  type: BoxTypeId,
  remainingCount: number,
): BoxTypeId {
  if (remainingCount === 1) return "c";
  if (type === "b" && remainingCount === 1) return "c";
  return type;
}

export function categoryRowsForBuilder(options: {
  type: BoxTypeId;
  lockedCategory?: BoxCategoryKey;
  comboId?: BoxPairComboId;
}) {
  if (options.type === "c" && options.lockedCategory) {
    return BOX_CATEGORY_ROWS.filter(
      (row) => row.key === options.lockedCategory,
    );
  }
  if (options.type === "b" && options.comboId) {
    const allowed = new Set(categoriesForCombo(options.comboId));
    return BOX_CATEGORY_ROWS.filter((row) => allowed.has(row.key));
  }
  return BOX_CATEGORY_ROWS;
}
