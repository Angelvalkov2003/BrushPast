import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "canvas" | "surface" | "dark";

const variantClass: Record<Variant, string> = {
  canvas: "bg-bp-canvas text-bp-text",
  surface: "bp-surface",
  dark: "bp-dark",
};

/** Layout section using brand palette (public site only). */
export function PublicSection({
  variant = "canvas",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={clsx(variantClass[variant], className)}>{children}</section>
  );
}
