import { getSupabaseServiceClient } from "lib/supabase/service";
import type { CheckoutLineItem } from "lib/supabase/checkout-orders";

type InventoryRow = {
  inventory_type: string;
  inventory_quantity: number | null;
  variant_name?: string | null;
  product_title?: string | null;
};

export function isLimitedInventoryType(type: string | null | undefined) {
  return type === "limited" || type === "single";
}

export function formatInsufficientStockMessage(
  productTitle: string,
  variantLabel: string | null | undefined,
  available: number,
  requested: number,
) {
  const label = variantLabel?.trim();
  const item = label ? `${productTitle} (${label})` : productTitle;
  if (available <= 0) {
    return `${item} is out of stock.`;
  }
  return `Only ${available} available for ${item}. You requested ${requested}.`;
}

function aggregateRequested(items: CheckoutLineItem[]) {
  const map = new Map<
    string,
    { productId: string; variantId?: string; productTitle: string; quantity: number }
  >();

  for (const item of items) {
    const key = item.variant_id ? `v:${item.variant_id}` : `p:${item.product_id}`;
    const existing = map.get(key);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      map.set(key, {
        productId: item.product_id,
        variantId: item.variant_id,
        productTitle: item.product_title,
        quantity: item.quantity,
      });
    }
  }

  return [...map.values()];
}

async function loadVariantInventory(variantId: string): Promise<InventoryRow | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("product_variants")
    .select("inventory_type, inventory_quantity, variant_name, status")
    .eq("id", variantId)
    .maybeSingle();

  if (error || !data || data.status !== "active") return null;
  return data;
}

async function loadProductInventory(productId: string): Promise<InventoryRow | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("products")
    .select("inventory_type, inventory_quantity, title, status")
    .eq("id", productId)
    .maybeSingle();

  if (error || !data || data.status !== "active") return null;
  return {
    inventory_type: data.inventory_type,
    inventory_quantity: data.inventory_quantity,
    product_title: data.title,
  };
}

export async function validateCheckoutInventory(items: CheckoutLineItem[]) {
  const aggregated = aggregateRequested(items);

  for (const line of aggregated) {
    const row = line.variantId
      ? await loadVariantInventory(line.variantId)
      : await loadProductInventory(line.productId);

    if (!row) {
      throw new Error(`${line.productTitle} is no longer available.`);
    }

    if (!isLimitedInventoryType(row.inventory_type)) continue;

    const available = row.inventory_quantity ?? 0;
    if (line.quantity > available) {
      throw new Error(
        formatInsufficientStockMessage(
          line.productTitle,
          row.variant_name,
          available,
          line.quantity,
        ),
      );
    }
  }
}

export async function decrementInventoryForOrder(orderId: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.rpc("decrement_inventory_for_order", {
    p_order_id: orderId,
  });

  if (!error) return;

  const message = error.message ?? "Could not update stock for this order.";
  if (message.includes("Insufficient")) {
    throw new Error(
      "Some items are no longer available in the requested quantity. Please review your bag and try again.",
    );
  }
  throw new Error(message);
}

export async function markOrderInventoryDecremented(orderId: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase
    .from("orders")
    .update({ inventory_decremented_at: new Date().toISOString() })
    .eq("id", orderId);
  if (error) throw new Error(error.message);
}

export async function rollbackCheckoutOrder(orderId: string) {
  const supabase = getSupabaseServiceClient();
  await supabase.from("order_items").delete().eq("order_id", orderId);
  await supabase.from("orders").delete().eq("id", orderId);
}
