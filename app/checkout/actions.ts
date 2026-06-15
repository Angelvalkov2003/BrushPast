"use server";

import {
  createCheckoutOrder,
  type CreateCheckoutOrderInput,
} from "lib/supabase/checkout-orders";

export async function createOrder(
  data: CreateCheckoutOrderInput & { privacy_policy_accepted?: boolean },
) {
  if (data.privacy_policy_accepted !== true) {
    throw new Error("You must accept the Privacy Policy to continue.");
  }

  const { privacy_policy_accepted: _accepted, ...orderData } = data;

  try {
    return await createCheckoutOrder(orderData);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create order";
    throw new Error(msg);
  }
}
