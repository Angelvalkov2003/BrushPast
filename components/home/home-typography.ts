import { Caveat, Inter, Oswald, Stick_No_Bills } from "next/font/google";

/**
 * Public site typography (admin excluded via body.bp-site):
 * - Oswald: primary headings / CTAs (bp-title) — used widely
 * - Stick No Bills: selected display headings (bp-display)
 * - DIN: supporting / subtitle font when local files are present in
 *   public/fonts/DIN-*.woff2 — otherwise falls back to Inter (see globals.css)
 * - Inter: body UI until DIN files are supplied
 * - Caveat: story voice only (bp-story-voice) — reduced sitewide use
 */
export const homeHand = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-home-hand",
  display: "swap",
  preload: false,
});

/** Page titles / CTAs — Oswald */
export const bpTitle = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bp-title",
});

/** Selected hero / section display headings — Stick No Bills */
export const bpDisplay = Stick_No_Bills({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bp-display",
  display: "swap",
});

/** Body / supporting — Inter (DIN when font files are added) */
export const bpSubtitle = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bp-subtitle",
});

export const homeHandClass = homeHand.className;
export const bpTitleClass = bpTitle.className;
export const bpDisplayClass = bpDisplay.className;
export const bpSubtitleClass = bpSubtitle.className;

/** CSS utility — Caveat; prefer bp-story-voice for personal stories only */
export const bpHandUtility = "bp-hand";
/** Personal story copy only */
export const bpStoryVoiceUtility = "bp-story-voice";
/**
 * Quiet asides — now Oswald-aligned via CSS (no cursive).
 * Prefer bpTitleUtility for real headings.
 */
export const bpWhisperUtility = "bp-whisper";
export const bpTitleUtility = "bp-title";
/** Stick No Bills display headings */
export const bpDisplayUtility = "bp-display";
export const bpSubtitleUtility = "bp-subtitle";
export const bpBodyUtility = "bp-body";
export const bpBodySmUtility = "bp-body-sm";
export const bpLinkUtility = "bp-link";
export const bpEmphasisUtility = "bp-emphasis";

export const bpBodyClass = `${bpSubtitleClass} ${bpSubtitleUtility}`;
export const bpBodySmClass = `${bpSubtitleClass} ${bpBodySmUtility}`;

/** Primary page h1 — Stick No Bills, largest heading on the page */
export const bpPageTitleClass = `${bpDisplayClass} ${bpDisplayUtility} font-bold text-bp-text`;
export const bpPageTitleSizeClass =
  "text-[clamp(2.75rem,7vw,5rem)] leading-[0.92]";
export const bpPageH1Class = `${bpPageTitleClass} ${bpPageTitleSizeClass}`;

/** Shared page-hero layout tokens — keep marketing heroes aligned sitewide */
export const PAGE_HERO_SECTION_CLASS = "px-4 py-14 md:px-10 md:py-24";
/** @deprecated Same as PAGE_HERO_SECTION_CLASS — kept for imports */
export const PAGE_HERO_SECTION_INDEX_CLASS = PAGE_HERO_SECTION_CLASS;
export const PAGE_HERO_SECTION_COMPACT_CLASS = "px-4 py-10 md:px-10 md:py-14";
export const PAGE_HERO_CONTAINER_CLASS = "mx-auto max-w-[1400px]";
/** Top-align columns so eyebrow/h1 start at the same height regardless of media height */
export const PAGE_HERO_GRID_SPLIT_CLASS =
  "grid gap-12 md:grid-cols-2 md:items-start md:gap-16";
export const PAGE_HERO_GRID_INDEX_CLASS =
  "flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between";
export const PAGE_HERO_CONTENT_CLASS = "flex min-w-0 flex-col";
export const PAGE_HERO_H1_CLASS = bpPageH1Class;
export const PAGE_HERO_H1_INDEX_CLASS = PAGE_HERO_H1_CLASS;
export const PAGE_HERO_H1_STORY_CLASS = `${bpPageH1Class} text-[clamp(3rem,10vw,6.5rem)] uppercase leading-[0.88] tracking-tighter`;
export const PAGE_HERO_H1_MINIMAL_CLASS = `${bpPageH1Class} text-[clamp(2.25rem,5vw,3.5rem)]`;
export const PAGE_HERO_TITLE_GAP_CLASS = "mt-3";
export const PAGE_HERO_HAND_CLASS = `${homeHandClass} mt-3 text-[clamp(1.75rem,4vw,2.35rem)] leading-snug text-bp-accent`;
export const PAGE_HERO_WHISPER_ASIDE_CLASS = `${homeHandClass} ${bpWhisperUtility} max-w-xs text-[clamp(1.75rem,4vw,2.35rem)] leading-snug text-bp-text lg:ml-auto`;
export const PAGE_HERO_WHISPER_INLINE_CLASS = `${homeHandClass} ${bpWhisperUtility} mt-8 text-[clamp(1.75rem,4vw,2.35rem)] leading-snug text-bp-text`;
export const PAGE_HERO_INTRO_CLASS = `${bpBodyClass} mt-6 max-w-xl text-bp-text/85`;
export const PAGE_HERO_BODY_CLASS = `${bpBodyClass} mt-4 max-w-xl text-bp-text/85`;
export const PAGE_HERO_MEDIA_FRAMELESS_CLASS =
  "aspect-[4/5] min-h-[280px] md:min-h-[420px]";
export const PAGE_HERO_POLAROID_WRAP_CLASS =
  "mx-auto w-full max-w-md md:max-w-none";

export const bpFontVariables = `${homeHand.variable} ${bpTitle.variable} ${bpDisplay.variable} ${bpSubtitle.variable}`;

/** @deprecated Use bpSubtitle */
export const homeSerif = bpSubtitle;
/** @deprecated Use bpSubtitleClass */
export const homeSerifClass = bpSubtitleClass;
