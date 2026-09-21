/** BrushPast - site constants from brushpast.org (not env). */

export { BRAND_COLORS, BRAND_CSS_VARS } from "lib/brand-colors";
export type { BrandColorKey } from "lib/brand-colors";

export const SITE_NAME = "Brush Past";
export const SITE_NAME_SHORT = "BrushPast";

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://brushpast.org"
    : "http://localhost:3000";

/** Public contact (footer, contact page). Source: brushpast.org */
export const PUBLIC_CONTACT_EMAIL = "hello@brushpast.org";

/** UK display format. Source: brushpast.org footer */
export const CONTACT_PHONE = "07710 022 677";

/** E.164 for tel: links */
export const CONTACT_PHONE_TEL = "+447710022677";

export const INSTAGRAM_URL = "https://www.instagram.com/brushpast";

export const FACEBOOK_URL = "";

export const LEGAL_ENTITY =
  "Brush Past (Community Interest Company), United Kingdom";

export const SITE_TAGLINE =
  "A creative platform for stories of homelessness, addiction, and life challenges - expressed through art, writing, and photography.";

export const MISSION_SUMMARY =
  "Brush Past combines storytelling with a social enterprise model: specialty coffee gift boxes, exhibitions, creative workshops, and mentorship, while providing a digital platform to showcase members' work.";

export const PROFIT_REINVESTMENT =
  "65% of profits are reinvested directly with creators and partner organisations.";

/** UK shipping - prices in GBP; paid by the customer */
export type ShippingMethodId = "dpd" | "event_pickup";

export const SHIPPING_UK = {
  dpd: {
    id: "dpd" as const,
    label: "DPD",
    price: 8.0,
    days: "2–4 working days",
    courier: "DPD",
  },
  event_pickup: {
    id: "event_pickup" as const,
    label: "Pick up at event",
    price: 0,
    days: "Collect at the event — no delivery charge",
    courier: "Event pickup",
  },
} as const;

/**
 * Temporary test option. Hide on Vercel with:
 * NEXT_PUBLIC_SHOW_EVENT_PICKUP=false
 * (default: shown when unset)
 */
export const SHOW_EVENT_PICKUP =
  process.env.NEXT_PUBLIC_SHOW_EVENT_PICKUP !== "false";

export function shippingMethodsForCheckout() {
  const methods: (typeof SHIPPING_UK)[ShippingMethodId][] = [SHIPPING_UK.dpd];
  if (SHOW_EVENT_PICKUP) {
    methods.push(SHIPPING_UK.event_pickup);
  }
  return methods;
}

export function shippingMethodById(id: ShippingMethodId) {
  return SHIPPING_UK[id] ?? SHIPPING_UK.dpd;
}
