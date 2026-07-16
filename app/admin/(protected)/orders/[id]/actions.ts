"use server";

import { isAdmin } from "lib/supabase/auth";
import { updateOrderAdmin } from "lib/supabase/admin-orders";
import type { OrderStatus, PaymentStatus } from "lib/types/admin";

export async function updateOrderAdminAction(
  orderId: string,
  data: {
    order_status?: OrderStatus;
    payment_status?: PaymentStatus;
    admin_note?: string;
  },
) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await updateOrderAdmin(orderId, data);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to update order" };
  }
}
