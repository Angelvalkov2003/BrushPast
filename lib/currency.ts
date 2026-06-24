/** UK shop - prices in pounds (GBP), not pence, in database and cart. */

export const CURRENCY_CODE = "GBP" as const;
export const STRIPE_CURRENCY = "gbp" as const;
export const LOCALE = "en-GB" as const;

/** Format a pound amount for display (e.g. 12.5 → £12.50). */
export function formatPrice(
  amount: number,
  options?: { currency?: string; locale?: string },
): string {
  const currency = options?.currency ?? CURRENCY_CODE;
  const locale = options?.locale ?? LOCALE;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  }).format(amount);
}

/** Stripe Checkout expects minor units (pence for GBP). */
export function toStripeMinorUnits(pounds: number): number {
  return Math.round(pounds * 100);
}

export function fromStripeMinorUnits(pence: number): number {
  return pence / 100;
}
