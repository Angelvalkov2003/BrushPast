import { ReadonlyURLSearchParams } from "next/navigation";
import { formatPrice as formatGbpPrice } from "lib/currency";
import { SITE_URL } from "lib/site-config";

/** Prefer explicit public site URL so OG/social previews resolve to the canonical host. */
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_ENV === "production" ? SITE_URL : null) ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL != null
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null) ||
  (process.env.VERCEL_URL != null ? `https://${process.env.VERCEL_URL}` : null) ||
  SITE_URL;

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

/** @deprecated Use formatPrice from lib/currency */
export const formatPrice = formatGbpPrice;
