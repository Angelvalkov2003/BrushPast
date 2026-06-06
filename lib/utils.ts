import { ReadonlyURLSearchParams } from "next/navigation";
import { formatPrice as formatGbpPrice } from "lib/currency";
import { SITE_URL } from "lib/site-config";

export const baseUrl =
  process.env.VERCEL_URL != null
    ? `https://${process.env.VERCEL_URL}`
    : SITE_URL;

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
