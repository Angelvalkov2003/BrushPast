import { getSupabaseServiceClient } from "lib/supabase/service";

export type CheckoutLineItem = {
  product_id: string;
  variant_id?: string;
  product_title: string;
  quantity: number;
  unit_price: number;
  sku?: string;
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
  items: CheckoutLineItem[];
  subtotal: number;
  shipping_total: number;
  grand_total: number;
};

export async function createCheckoutOrder(input: CreateCheckoutOrderInput) {
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
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(rows);
  if (itemsError) throw new Error(itemsError.message);

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
