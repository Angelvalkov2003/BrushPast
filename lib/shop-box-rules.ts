import {
  BOX_CATEGORY_ROWS,
  BOX_TYPE_RULES,
  type BoxCategoryKey,
  type BoxDraft,
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
    return { ok: true, replaces: total >= 2 };
  }

  if (draft.type === "a") {
    return {
      ok: true,
      replaces: countInCategory(draft.items, categoryKey) > 0,
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

  if (rules.maxTotal != null && total >= rules.maxTotal) {
    return {
      ok: false,
      replaces: false,
      reason: `This box holds up to ${rules.maxTotal} pieces.`,
    };
  }

  return { ok: true, replaces: false };
}

/** Complete Box: one per category. Single Box: the new pick replaces any previous item. */
export function applySelection(
  draft: BoxDraft,
  item: BoxSelectionItem,
): BoxDraft {
  if (draft.type === "c") {
    return { ...draft, items: [{ ...item, quantity: 1 }] };
  }

  if (draft.type === "a") {
    const rest = draft.items.filter(
      (current) => current.categoryKey !== item.categoryKey,
    );
    return { ...draft, items: [...rest, { ...item, quantity: 1 }] };
  }

  if (draft.type === "b") {
    const sameProduct = draft.items.find(
      (current) => current.productId === item.productId,
    );
    if (sameProduct) {
      return {
        ...draft,
        items: draft.items.map((current) =>
          current.productId === item.productId ? { ...item, quantity: 1 } : current,
        ),
      };
    }
    if (draft.items.length < 2) {
      return { ...draft, items: [...draft.items, { ...item, quantity: 1 }] };
    }
    return {
      ...draft,
      items: [draft.items[1]!, { ...item, quantity: 1 }],
    };
  }

  const existingIndex = draft.items.findIndex(
    (current) =>
      current.productId === item.productId &&
      current.variantId === item.variantId,
  );

  if (existingIndex >= 0) {
    const next = draft.items.map((current, index) =>
      index === existingIndex
        ? { ...current, quantity: current.quantity + item.quantity }
        : current,
    );
    return { ...draft, items: next };
  }

  return { ...draft, items: [...draft.items, item] };
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

export function boxTypeAfterContentChange(
  type: BoxTypeId,
  remainingCount: number,
): BoxTypeId {
  if (type === "b" && remainingCount === 1) return "c";
  return type;
}
