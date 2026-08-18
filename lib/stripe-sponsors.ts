import { stripe } from "lib/stripe";
import { STRIPE_CURRENCY, toStripeMinorUnits } from "lib/currency";
import { sponsorTierLabel, type SponsorTierId } from "lib/sponsor-config";

export async function createSponsorCheckoutSession(input: {
  sponsorId: string;
  amountGbp: number;
  tier: SponsorTierId;
  email: string;
  name: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    submit_type: "donate",
    customer_email: input.email,
    locale: "en-GB",
    currency: STRIPE_CURRENCY,
    line_items: [
      {
        price_data: {
          currency: STRIPE_CURRENCY,
          product_data: {
            name: `Brush Past sponsorship — ${sponsorTierLabel(input.tier)}`,
            description: `Thank you, ${input.name}. Your support funds workshops, artists and community programmes.`,
          },
          unit_amount: toStripeMinorUnits(input.amountGbp),
        },
        quantity: 1,
      },
    ],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: {
      kind: "sponsorship",
      sponsorId: input.sponsorId,
    },
    client_reference_id: input.sponsorId,
  });
}
