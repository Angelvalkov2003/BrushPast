import Stripe from "stripe";

/**
 * Separate Stripe account for charity donations / sponsorships.
 * Shop checkout keeps using `lib/stripe` (STRIPE_SECRET_KEY).
 */
export function getDonationsStripe(): Stripe {
  const key = process.env.STRIPE_DONATIONS_SECRET_KEY?.trim();
  if (!key) {
    throw new Error(
      "STRIPE_DONATIONS_SECRET_KEY is not set. Add the charity Stripe secret key to enable donations.",
    );
  }
  return new Stripe(key, {
    apiVersion: "2024-11-20.acacia" as any,
  });
}

export function isDonationsStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_DONATIONS_SECRET_KEY?.trim());
}
