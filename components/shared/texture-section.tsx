import type { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";

export const TEXTURE_IMAGES = {
  primary: "/background.webp",
  secondary: "/background2.webp",
} as const;

export type TextureVariant = keyof typeof TEXTURE_IMAGES;

export function TextureSection({
  children,
  className,
  as = "section",
  texture = "primary",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "header";
  texture?: TextureVariant;
}) {
  const Tag = as;

  return (
    <Tag
      className={clsx("relative border-b border-bp-text/10 overflow-hidden", className)}
    >
      <Image
        src={TEXTURE_IMAGES[texture]}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-bp-accent-bg/78 backdrop-blur-[1px]"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
