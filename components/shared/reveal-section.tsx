"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Reveal, type RevealVariant } from "./reveal";

type Props = ComponentPropsWithoutRef<"section"> & {
  variant?: RevealVariant;
  /** Stagger delay in ms */
  delay?: number;
};

/** Scroll-reveal wrapper for page sections (renders a semantic section). */
export function RevealSection({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  ...sectionProps
}: Props) {
  return (
    <Reveal variant={variant} delay={delay}>
      <section className={className} {...sectionProps}>
        {children}
      </section>
    </Reveal>
  );
}
