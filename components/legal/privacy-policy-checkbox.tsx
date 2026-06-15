"use client";

import Link from "next/link";
import clsx from "clsx";

type Variant = "dark" | "light";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  className?: string;
  variant?: Variant;
  /** Extra context after the policy link, e.g. "for this order" */
  suffix?: string;
};

const textClass: Record<Variant, string> = {
  dark: "text-bp-canvas/85",
  light: "text-bp-text/80",
};

const linkClass = "font-semibold text-bp-accent underline underline-offset-2 hover:opacity-80";

export function PrivacyPolicyCheckbox({
  checked,
  onChange,
  id = "privacy-policy",
  className,
  variant = "light",
  suffix,
}: Props) {
  return (
    <label
      className={clsx(
        "flex cursor-pointer items-start gap-3 text-sm leading-relaxed",
        textClass[variant],
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-bp-text/25 accent-bp-accent"
      />
      <span>
        I agree to the{" "}
        <Link href="/privacy" className={linkClass} target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        {suffix ? ` ${suffix}` : null}. *
      </span>
    </label>
  );
}
