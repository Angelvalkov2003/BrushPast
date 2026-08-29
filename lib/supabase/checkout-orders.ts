import { getSupabaseServiceClient } from "lib/supabase/service";
import {
  decrementInventoryForOrder,
  markOrderInventoryDecremented,
  rollbackCheckoutOrder,
  validateCheckoutInventory,
} from "lib/inventory";
import type { BoxCategoryKey, BoxTypeId } from "lib/shop-box-config";

export type CheckoutLineItem = {
  product_id: string;
  variant_id?: string;
  product_title: string;
  quantity: number;
  unit_price: number;
  sku?: string;
  box_category_key?: BoxCategoryKey;
  source_box_type?: BoxTypeId;
};

export type CreateCheckoutOrderInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address_line_1: string;
  address_line_2?: string;
  city?: string;
  county?: string;
  postcode?: string;
  country?: string;
  shipping_method_name: string;
  shipping_price: number;
  courier_name?: string;
  payment_method: "card" | "cash_on_delivery";
  customer_note?: string;
  gift_message?: string;
  box_type?: BoxTypeId;
  box_combo_id?: "print_tshirt" | "print_coffee" | "tshirt_coffee";
  optional_contribution_gbp?: number;
  contribution_allocation?: string;
  items: CheckoutLineItem[];
  subtotal: number;
  shipping_total: number;
  grand_total: number;
};

export async function createCheckoutOrder(input: CreateCheckoutOrderInput) {
  await validateCheckoutInventory(input.items);

  const supabase = getSupabaseServiceClient();
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      phone: input.phone || null,
      address_line_1: input.address_line_1,
      address_line_2: input.address_line_2 || null,
      city: input.city || null,
      county: input.county || null,
      postcode: input.postcode || null,
      country: input.country || "GB",
      courier_name: input.courier_name || null,
      shipping_method_name: input.shipping_method_name,
      shipping_price: input.shipping_price,
      shipping_total: input.shipping_total,
      payment_method: input.payment_method,
      payment_status: "pending",
      order_status: "pending",
      subtotal: input.subtotal,
      grand_total: input.grand_total,
      customer_note: input.customer_note || null,
      gift_message: input.gift_message || null,
      box_type: input.box_type || null,
      box_combo_id: input.box_combo_id || null,
      optional_contribution_gbp:
        input.optional_contribution_gbp != null &&
        input.optional_contribution_gbp > 0
          ? input.optional_contribution_gbp
          : null,
      contribution_allocation: input.contribution_allocation || null,
    })
    .select()
    .single();

  if (error || !order) throw new Error(error?.message || "Failed to create order");

  const rows = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    variant_id: item.variant_id || null,
    product_title: item.product_title,
    sku: item.sku || null,
    quantity: item.quantity,
    unit_price: item.unit_price,
    line_total: item.unit_price * item.quantity,
    box_category_key: item.box_category_key || null,
    source_box_type: item.source_box_type || null,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(rows);
  if (itemsError) {
    await rollbackCheckoutOrder(order.id);
    throw new Error(itemsError.message);
  }

  try {
    await decrementInventoryForOrder(order.id);
    await markOrderInventoryDecremented(order.id);
  } catch (inventoryError) {
    await rollbackCheckoutOrder(order.id);
    throw inventoryError;
  }

  return order;
}

export async function setOrderStripeSession(orderId: string, sessionId: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase
    .from("orders")
    .update({ stripe_checkout_session_id: sessionId })
    .eq("id", orderId);
  if (error) throw new Error(error.message);
}

export async function getCheckoutOrderById(orderId: string) {
  const supabase = getSupabaseServiceClient();
  const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
  if (error || !order) throw new Error("Order not found");
  const { data: items } = await supabase
    .from("order_items")
    .select("product_title, quantity, unit_price, line_total")
    .eq("order_id", orderId);
  return { ...order, items: items ?? [] };
}
