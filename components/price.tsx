import clsx from "clsx";
import { CURRENCY_CODE, formatPrice } from "lib/currency";

const Price = ({
  amount,
  className,
  currencyCode = CURRENCY_CODE,
  currencyCodeClassName,
  showCurrencyCode = false,
}: {
  amount: string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
  /** @deprecated BGN dual display removed - UK GBP only */
  showBgn?: boolean;
  showCurrencyCode?: boolean;
} & React.ComponentProps<"p">) => {
  const pounds = parseFloat(amount);
  const formatted = formatPrice(pounds, { currency: currencyCode });

  return (
    <p suppressHydrationWarning className={clsx("whitespace-nowrap", className)}>
      <span>{formatted}</span>
      {showCurrencyCode ? (
        <span className={clsx("ml-1 inline text-xs opacity-70", currencyCodeClassName)}>
          {currencyCode}
        </span>
      ) : null}
    </p>
  );
};

export default Price;
