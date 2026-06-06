import Stripe from "stripe";
import { STRIPE_CURRENCY, toStripeMinorUnits } from "lib/currency";
import type { Cart } from "./types";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia" as any,
});

export async function createCheckoutSession(
  cart: Cart,
  successUrl: string,
  cancelUrl: string,
  orderId: string,
  shippingPence: number,
) {
  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: STRIPE_CURRENCY,
      product_data: {
        name: item.product.title,
        images: item.product.image.url ? [item.product.image.url] : [],
      },
      unit_amount: toStripeMinorUnits(item.price),
    },
    quantity: item.quantity,
  }));

  if (shippingPence > 0) {
    lineItems.push({
      price_data: {
        currency: STRIPE_CURRENCY,
        product_data: { name: "UK delivery", images: [] },
        unit_amount: shippingPence,
      },
      quantity: 1,
    });
  }

  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    currency: STRIPE_CURRENCY,
    locale: "en-GB",
    shipping_address_collection: { allowed_countries: ["GB"] },
    metadata: { orderId },
    client_reference_id: orderId,
  });
}
