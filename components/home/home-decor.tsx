import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { homeHandClass } from "./home-typography";

export function HomeSectionTitle({
  eyebrow,
  title,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={`${homeHandClass} text-xl text-bp-accent md:text-2xl`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`${homeHandClass} mt-1 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-bp-text`}
      >
        {title}
      </h2>
    </div>
  );
}

const TILTS = [-1.25, 0.85, -0.65, 1.1] as const;

export function PolaroidFrame({
  children,
  className,
  index = 0,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  tilt?: boolean;
}) {
  const tiltDeg = TILTS[index % TILTS.length] ?? 0;

  return (
    <div
      className={clsx(
        "relative bg-[#faf6f0] p-2.5 pb-9 shadow-[4px_5px_0_rgba(1,2,0,0.14)] border border-bp-text/10 transition-transform duration-500 hover:rotate-0",
        className,
      )}
      style={tilt ? { transform: `rotate(${tiltDeg}deg)` } : undefined}
    >
      {children}
    </div>
  );
}

export function IndexCard({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={clsx(
        "border border-bp-text/12 bg-[#faf7f2] p-6 shadow-[2px_3px_0_rgba(1,2,0,0.06)] md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function HomeCta({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
}) {
  return (
    <Link
      href={href}
      className={clsx(
        `${homeHandClass} inline-flex items-center gap-2 px-7 py-3 text-lg font-bold transition-all`,
        variant === "primary"
          ? "bg-bp-accent text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          : "border-2 border-bp-text bg-bp-canvas/80 text-bp-text shadow-[3px_3px_0_rgba(1,2,0,0.08)] hover:bg-bp-text hover:text-bp-canvas hover:shadow-none",
      )}
    >
      {children}
    </Link>
  );
}
