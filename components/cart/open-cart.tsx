import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center text-bp-text">
      <ShoppingBagIcon
        className={clsx("h-6 w-6 stroke-[1.5]", className)}
        aria-hidden
      />

      {quantity ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-bp-accent px-1 text-[10px] font-bold leading-none text-bp-canvas">
          {quantity > 9 ? "9+" : quantity}
        </span>
      ) : null}
    </div>
  );
}
