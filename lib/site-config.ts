/** BrushPast — hardcoded site values (not from env). */

export const SITE_NAME = "BrushPast";

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://brushpast.org"
    : "http://localhost:3000";

export const CONTACT_PHONE = "+44 0000 000000";

export const INSTAGRAM_URL = "https://www.instagram.com/brushpast";

/** Omit Facebook link in UI when empty. */
export const FACEBOOK_URL = "";
