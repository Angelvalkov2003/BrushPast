import { getSupabaseServiceClient } from "lib/supabase/service";
import type {
  AdminOrder,
  AdminOrderDetail,
  OrderStatus,
  PaymentStatus,
} from "lib/types/admin";

export async function getAllOrdersAdmin(): Promise<AdminOrder[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, first_name, last_name, email, phone, payment_method, payment_status, order_status, subtotal, shipping_total, grand_total, optional_contribution_gbp, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as AdminOrder[];
}

export async function getOrderByIdAdmin(
  id: string,
): Promise<AdminOrderDetail | null> {
  const supabase = getSupabaseServiceClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !order) return null;

  const { data: items } = await supabase
    .from("order_items")
    .select("id, product_title, sku, quantity, unit_price, line_total")
    .eq("order_id", id);

  return {
    ...(order as AdminOrder),
    ...(order as object),
    items: items ?? [],
  } as AdminOrderDetail;
}

export async function updateOrderStatusAdmin(
  id: string,
  order_status: OrderStatus,
) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ order_status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateOrderAdmin(
  id: string,
  input: Partial<{
    order_status: OrderStatus;
    payment_status: PaymentStatus;
    admin_note: string;
  }>,
) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("orders")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getAdminDashboardStats() {
  const supabase = getSupabaseServiceClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "payment_status, payment_method, order_status, subtotal, shipping_total, grand_total, created_at",
    );

  if (error) throw new Error(error.message);

  const list = orders ?? [];
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const countsTowardWeekRevenue = (o: (typeof list)[number]) => {
    if (o.order_status === "cancelled" || o.order_status === "refunded")
      return false;
    if (
      o.payment_status === "failed" ||
      o.payment_status === "refunded" ||
      o.payment_status === "cancelled"
    )
      return false;
    if (new Date(o.created_at).getTime() < weekAgo) return false;
    return true;
  };

  const productTotal = (o: (typeof list)[number]) => {
    if (o.subtotal != null) return Number(o.subtotal);
    const grand = Number(o.grand_total ?? 0);
    const shipping = Number(o.shipping_total ?? 0);
    return Math.max(0, grand - shipping);
  };

  return {
    totalOrders: list.length,
    pendingPayment: list.filter((o) => o.payment_status === "pending").length,
    weekRevenue: list
      .filter(countsTowardWeekRevenue)
      .reduce((sum, o) => sum + productTotal(o), 0),
  };
}
