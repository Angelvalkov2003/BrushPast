"use server";

import {
  createCheckoutOrder,
  type CreateCheckoutOrderInput,
} from "lib/supabase/checkout-orders";

export async function createOrder(data: CreateCheckoutOrderInput) {
  try {
    return await createCheckoutOrder(data);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create order";
    throw new Error(msg);
  }
}
