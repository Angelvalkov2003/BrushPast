"use server";

import {
  createCheckoutOrder,
  type CreateCheckoutOrderInput,
} from "lib/supabase/checkout-orders";
import { validateUkDeliveryFields, type UkDeliveryFormData } from "lib/uk-delivery";

export async function createOrder(
  data: CreateCheckoutOrderInput & {
    privacy_policy_accepted?: boolean;
    delivery?: UkDeliveryFormData;
  },
) {
  if (data.privacy_policy_accepted !== true) {
    throw new Error("You must accept the Privacy Policy to continue.");
  }

  if (data.delivery) {
    const deliveryResult = validateUkDeliveryFields(data.delivery);
    if (!deliveryResult.ok) {
      throw new Error(deliveryResult.error);
    }
    const delivery = deliveryResult.values;
    data.first_name = delivery.first_name;
    data.last_name = delivery.last_name;
    data.email = delivery.email;
    data.phone = delivery.phone;
    data.address_line_1 = delivery.address_line_1;
    data.address_line_2 = delivery.address_line_2 || undefined;
    data.postcode = delivery.postcode;
    data.city = delivery.city;
    data.county = delivery.county || undefined;
    data.country = "GB";
  }

  const { privacy_policy_accepted: _accepted, delivery: _delivery, ...orderData } =
    data;

  try {
    return await createCheckoutOrder(orderData);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create order";
    throw new Error(msg);
  }
}
