import type { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";
import { PANEL_OVERLAY_CLASS } from "components/shared/panel-overlay";

export const TEXTURE_IMAGES = {
  primary: "/background.webp",
  secondary: "/background2.webp",
} as const;

export type TextureVariant = keyof typeof TEXTURE_IMAGES;

export type TextureOverlay = "accent" | "cream" | "story" | "warm";

const TEXTURE_OVERLAY_CLASS: Record<TextureOverlay, string> = {
  accent: "bg-bp-accent-bg/78 backdrop-blur-[1px]",
  cream: PANEL_OVERLAY_CLASS.cream,
  story: PANEL_OVERLAY_CLASS.story,
  warm: PANEL_OVERLAY_CLASS.warm,
};

export function TextureSection({
  children,
  className,
  as = "section",
  texture = "primary",
  overlay = "accent",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "header" | "div";
  texture?: TextureVariant;
  overlay?: TextureOverlay;
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
        className={clsx("absolute inset-0", TEXTURE_OVERLAY_CLASS[overlay])}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
