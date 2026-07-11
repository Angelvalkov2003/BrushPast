import type { ElementType, ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";
import { PANEL_OVERLAY_CLASS } from "components/shared/panel-overlay";
import { bpStoryVoiceUtility } from "components/home/home-typography";
import {
  TEXTURE_IMAGES,
  TextureSection,
  type TextureOverlay,
  type TextureVariant,
} from "components/shared/texture-section";

/** Full story page shell — cardboard1 or 2 with warm cream wash. */
export function StoryPageShell({
  children,
  texture = "secondary",
  overlay = "story",
  className,
}: {
  children: ReactNode;
  texture?: TextureVariant;
  overlay?: TextureOverlay;
  className?: string;
}) {
  return (
    <TextureSection
      as="div"
      texture={texture}
      overlay={overlay}
      className={clsx(bpStoryVoiceUtility, "min-h-screen border-b-0 text-bp-text", className)}
    >
      {children}
    </TextureSection>
  );
}

/** Cream / white panel with cardboard texture underneath. */
export function StoryPanel({
  children,
  className,
  texture = "secondary",
  as = "div",
  tint,
}: {
  children: ReactNode;
  className?: string;
  texture?: TextureVariant;
  as?: ElementType;
  /** Optional colour wash on top of cardboard (e.g. story-specific quote tints). */
  tint?: string;
}) {
  const Tag = as;

  return (
    <Tag className={clsx("relative overflow-hidden", className)}>
      <Image
        src={TEXTURE_IMAGES[texture]}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 900px"
      />
      <div className={clsx("absolute inset-0", PANEL_OVERLAY_CLASS.story)} aria-hidden />
      {tint ? (
        <div className={clsx("pointer-events-none absolute inset-0", tint)} aria-hidden />
      ) : null}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
