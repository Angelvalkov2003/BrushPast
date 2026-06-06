import { formatPrice } from "lib/currency";
import { SHIPPING_UK } from "lib/site-config";

export const UK_SHIPPING_SUMMARY = `UK delivery: ${SHIPPING_UK.tracked48.label} from ${formatPrice(SHIPPING_UK.tracked48.price)} (${SHIPPING_UK.tracked48.days}), ${SHIPPING_UK.dpd.label} from ${formatPrice(SHIPPING_UK.dpd.price)} (${SHIPPING_UK.dpd.days}). Free delivery on orders over ${formatPrice(SHIPPING_UK.freeOver)}.`;

export const UK_VAT_NOTE = "All prices in GBP (£). UK VAT applied where applicable.";
