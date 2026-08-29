import Stripe from "stripe";
import { STRIPE_CURRENCY, toStripeMinorUnits } from "lib/currency";
import { boxStripeDescription, boxStripeName, isBoxCartItem } from "lib/shop-box-cart";
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
  contributionGbp = 0,
  contributionLabel?: string,
) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    cart.items.map((item) => {
      const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData =
        {
          name: isBoxCartItem(item) ? boxStripeName(item) : item.product.title,
          images: item.product.image.url ? [item.product.image.url] : [],
        };
      const description = isBoxCartItem(item)
        ? boxStripeDescription(item)
        : undefined;
      if (description) productData.description = description;

      return {
        price_data: {
          currency: STRIPE_CURRENCY,
          product_data: productData,
          unit_amount: toStripeMinorUnits(item.price),
        },
        quantity: item.quantity,
      };
    });

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

  if (contributionGbp > 0) {
    lineItems.push({
      price_data: {
        currency: STRIPE_CURRENCY,
        product_data: {
          name: contributionLabel || "Additional contribution",
          images: [],
        },
        unit_amount: toStripeMinorUnits(contributionGbp),
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
    metadata: {
      orderId,
      contributionGbp: contributionGbp > 0 ? String(contributionGbp) : "",
    },
    client_reference_id: orderId,
  });
}
