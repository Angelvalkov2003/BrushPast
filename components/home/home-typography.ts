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

export const bpFontVariables = `${homeHand.variable} ${bpTitle.variable} ${bpDisplay.variable} ${bpSubtitle.variable}`;

/** @deprecated Use bpSubtitle */
export const homeSerif = bpSubtitle;
/** @deprecated Use bpSubtitleClass */
export const homeSerifClass = bpSubtitleClass;
