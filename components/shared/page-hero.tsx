import type { ReactNode } from "react";
import clsx from "clsx";

import { SectionEyebrow } from "components/home/home-decor";
import {
  PAGE_HERO_CONTAINER_CLASS,
  PAGE_HERO_CONTENT_CLASS,
  PAGE_HERO_GRID_INDEX_CLASS,
  PAGE_HERO_GRID_SPLIT_CLASS,
  PAGE_HERO_H1_CLASS,
  PAGE_HERO_HAND_CLASS,
  PAGE_HERO_INTRO_CLASS,
  PAGE_HERO_SECTION_CLASS,
  PAGE_HERO_TITLE_GAP_CLASS,
  PAGE_HERO_WHISPER_ASIDE_CLASS,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  handLine?: ReactNode;
  intro?: ReactNode;
  /** Content between intro and actions — cards, extra copy, buttons inline */
  children?: ReactNode;
  actions?: ReactNode;
  /** Right column (split layout) */
  media?: ReactNode;
  /** Right column whisper (index layout) */
  aside?: ReactNode;
  variant?: "split" | "index";
  as?: "header" | "section";
  titleUppercase?: boolean;
  titleClassName?: string;
  contentClassName?: string;
  className?: string;
};

/** Unified marketing / hub page hero — consistent padding, type scale, texture. */
export function PageHero({
  eyebrow,
  title,
  handLine,
  intro,
  children,
  actions,
  media,
  aside,
  variant = "split",
  as = "header",
  titleUppercase = false,
  titleClassName,
  contentClassName,
  className,
}: PageHeroProps) {
  if (variant === "index") {
    return (
      <TextureSection
        as={as}
        texture="secondary"
        overlay="cream"
        className={clsx(PAGE_HERO_SECTION_CLASS, className)}
      >
        <div className={clsx(PAGE_HERO_CONTAINER_CLASS, PAGE_HERO_GRID_INDEX_CLASS)}>
          <div className={clsx(PAGE_HERO_CONTENT_CLASS, contentClassName)}>
            {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
            <h1
              className={clsx(
                PAGE_HERO_H1_CLASS,
                PAGE_HERO_TITLE_GAP_CLASS,
                titleUppercase && "uppercase",
                titleClassName,
              )}
            >
              {title}
            </h1>
            {intro ? <p className={PAGE_HERO_INTRO_CLASS}>{intro}</p> : null}
            {children}
            {actions ? <div className="mt-8">{actions}</div> : null}
          </div>
          {aside ? (
            <div className="min-w-0 lg:pt-1 lg:text-right">
              <p className={PAGE_HERO_WHISPER_ASIDE_CLASS}>{aside}</p>
            </div>
          ) : null}
        </div>
      </TextureSection>
    );
  }

  return (
    <TextureSection
      as={as}
      texture="secondary"
      overlay="heroShell"
      className={clsx(PAGE_HERO_SECTION_CLASS, className)}
    >
      <div className={clsx(PAGE_HERO_CONTAINER_CLASS, PAGE_HERO_GRID_SPLIT_CLASS)}>
        <div className={clsx(PAGE_HERO_CONTENT_CLASS, contentClassName)}>
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <h1
            className={clsx(
              PAGE_HERO_H1_CLASS,
              PAGE_HERO_TITLE_GAP_CLASS,
              titleUppercase && "uppercase",
              titleClassName,
            )}
          >
            {title}
          </h1>
          {handLine ? <p className={PAGE_HERO_HAND_CLASS}>{handLine}</p> : null}
          {intro ? <p className={PAGE_HERO_INTRO_CLASS}>{intro}</p> : null}
          {children}
          {actions ? (
            <div className="mt-9 flex flex-wrap items-center gap-4">{actions}</div>
          ) : null}
        </div>
        {media ? <div className="min-w-0">{media}</div> : null}
      </div>
    </TextureSection>
  );
}
