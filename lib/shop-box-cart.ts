import type { CartItem } from "./types";
import {
  categoryLabel,
  boxTypeLabel,
  type BoxCategoryKey,
  type BoxPairComboId,
  type BoxSelectionItem,
  type BoxTypeId,
} from "./shop-box-config";
import { priceOfBox } from "./shop-box-pricing";
import { inferBoxFromContents } from "./shop-box-rules";

export type FlattenedOrderLine = {
  product_id: string;
  variant_id?: string;
  product_title: string;
  quantity: number;
  unit_price: number;
  sku?: string;
  box_category_key?: BoxCategoryKey;
  source_box_type?: BoxTypeId;
};

export type BoxCartPayload = {
  type: BoxTypeId;
  comboId?: BoxPairComboId;
  giftMessage: string;
  contents: BoxSelectionItem[];
  boxPrice: number;
};

export function isBoxCartItem(item: CartItem): boolean {
  return item.kind === "box" && Boolean(item.box);
}

export function boxContentsLabel(contents: BoxSelectionItem[]): string {
  return contents
    .map((item) => `${categoryLabel(item.categoryKey)}: ${item.title}`)
    .join(", ");
}

export function boxStripeName(item: CartItem): string {
  if (!isBoxCartItem(item) || !item.box) {
    return item.product.title;
  }
  const typeName = boxTypeLabel(item.box.type);
  const inner = boxContentsLabel(item.box.contents);
  return inner ? `${typeName} (${inner})` : typeName;
}

export function boxStripeDescription(item: CartItem): string | undefined {
  if (!isBoxCartItem(item) || !item.box) return undefined;
  const extras = item.box.contents
    .map((content) => {
      const variant = content.variantLabel ? ` — ${content.variantLabel}` : "";
      return `${content.title}${variant}`;
    })
    .join("; ");
  return extras || undefined;
}

export function emptyBoxImage(): CartItem["product"]["image"] {
  return {
    id: "box",
    url: "",
    altText: boxTypeLabel("c"),
  };
}

export function cartProductFromBox(
  contents: BoxSelectionItem[],
  title: string,
): CartItem["product"] {
  const first = contents[0];
  return {
    id: first?.productId ?? "box",
    title,
    handle: first?.handle ?? "",
    image: first
      ? {
          id: first.productId,
          url: first.imageUrl,
          altText: first.title,
        }
      : emptyBoxImage(),
  };
}

export function flattenCartItemToOrderLines(
  item: CartItem,
): FlattenedOrderLine[] {
  if (isBoxCartItem(item) && item.box) {
    return item.box.contents.map((content) => ({
      product_id: content.productId,
      variant_id:
        content.variantId !== content.productId ? content.variantId : undefined,
      product_title: content.variantLabel
        ? `${content.title} - ${content.variantLabel}`
        : content.title,
      quantity: content.quantity * item.quantity,
      unit_price: content.unitPrice,
      sku: content.sku,
      box_category_key: content.categoryKey,
      source_box_type: item.box!.type,
    }));
  }

  return [
    {
      product_id: item.productId,
      variant_id:
        item.variantId !== item.productId ? item.variantId : undefined,
      product_title: item.product.title,
      quantity: item.quantity,
      unit_price: item.price,
      sku: item.variant.sku,
    },
  ];
}

export function collectGiftMessages(items: CartItem[]): string {
  return items
    .map((item) => item.box?.giftMessage?.trim())
    .filter((message): message is string => Boolean(message))
    .join("\n\n");
}

export function primaryBoxFromCart(items: CartItem[]): BoxCartPayload | null {
  const box = items.find(isBoxCartItem)?.box;
  return box ?? null;
}

export function recalcBoxCartItem(item: CartItem): CartItem | null {
  if (!isBoxCartItem(item) || !item.box) return item;

  const contents = item.box.contents.filter((content) => content.quantity > 0);
  if (contents.length === 0) return null;

  const inferred = inferBoxFromContents(
    contents,
    item.box.type,
    item.box.comboId,
  );
  const boxPrice = priceOfBox(inferred.type, contents, inferred.comboId);

  return {
    ...item,
    price: boxPrice,
    product: cartProductFromBox(contents, boxTypeLabel(inferred.type)),
    box: {
      ...item.box,
      type: inferred.type,
      comboId: inferred.comboId,
      contents,
      boxPrice,
    },
  };
}

export function removeBoxContentItem(
  item: CartItem,
  contentId: string,
): CartItem | null {
  if (!isBoxCartItem(item) || !item.box) return item;
  const contents = item.box.contents.filter((content) => content.id !== contentId);
  return recalcBoxCartItem({
    ...item,
    box: { ...item.box, contents },
  });
}

export function selectionLabel(item: BoxSelectionItem): string {
  const cat = categoryLabel(item.categoryKey as BoxCategoryKey);
  return item.variantLabel
    ? `${cat}: ${item.title} (${item.variantLabel})`
    : `${cat}: ${item.title}`;
}
