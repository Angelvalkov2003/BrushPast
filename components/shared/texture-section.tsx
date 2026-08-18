import type { ReactNode } from "react";
import clsx from "clsx";
import { PANEL_OVERLAY_CLASS } from "components/shared/panel-overlay";

export const TEXTURE_IMAGES = {
  primary: "/background.webp",
  secondary: "/background2.webp",
} as const;

export type TextureVariant = keyof typeof TEXTURE_IMAGES;

export type TextureOverlay =
  | "accent"
  | "cream"
  | "heroShell"
  | "story"
  | "warm";

const TEXTURE_OVERLAY_CLASS: Record<TextureOverlay, string> = {
  accent: "bg-bp-accent-bg/78 backdrop-blur-[1px]",
  cream: PANEL_OVERLAY_CLASS.cream,
  heroShell: PANEL_OVERLAY_CLASS.heroShell,
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
      className={clsx("relative border-b border-bp-text/10", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-top bg-repeat-y bg-[length:100%_auto]"
          style={{ backgroundImage: `url(${TEXTURE_IMAGES[texture]})` }}
        />
        <div
          className={clsx("absolute inset-0", TEXTURE_OVERLAY_CLASS[overlay])}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
