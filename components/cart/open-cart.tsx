"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function OpenCart({
  className,
  quantity,
  pulseKey = 0,
}: {
  className?: string;
  quantity?: number;
  pulseKey?: number;
}) {
  const [wiggle, setWiggle] = useState(false);
  const prevPulse = useRef(pulseKey);

  useEffect(() => {
    if (pulseKey > 0 && pulseKey !== prevPulse.current) {
      prevPulse.current = pulseKey;
      setWiggle(true);
      const timer = window.setTimeout(() => setWiggle(false), 560);
      return () => window.clearTimeout(timer);
    }
  }, [pulseKey]);

  return (
    <div
      className={clsx(
        "relative flex h-11 w-11 items-center justify-center text-bp-text",
        wiggle && "animate-cart-wiggle",
      )}
    >
      <ShoppingBagIcon
        className={clsx("h-6 w-6 stroke-[1.5] transition-transform", className)}
        aria-hidden
      />

      {quantity ? (
        <span
          className={clsx(
            "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-bp-accent px-1 text-[10px] font-bold leading-none text-bp-canvas",
            wiggle && "animate-badge-pop",
          )}
        >
          {quantity > 9 ? "9+" : quantity}
        </span>
      ) : wiggle ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] animate-badge-pop items-center justify-center rounded-full bg-bp-accent px-1 text-[10px] font-bold leading-none text-bp-canvas">
          1
        </span>
      ) : null}
    </div>
  );
}
