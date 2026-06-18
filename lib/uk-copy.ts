import { formatPrice } from "lib/currency";
import { SHIPPING_UK } from "lib/site-config";

export const UK_SHIPPING_SUMMARY = `UK delivery via ${SHIPPING_UK.dpd.label} from ${formatPrice(SHIPPING_UK.dpd.price)} (${SHIPPING_UK.dpd.days}). Shipping is paid by the customer.`;

export const UK_RETURNS_SUMMARY =
  "Returns accepted within 30 days if items are unopened and unused. See our Returns & Refunds policy.";

export const UK_VAT_NOTE = "All prices in GBP (£). UK VAT applied where applicable.";
