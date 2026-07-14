import { Caveat, Inter, Oswald } from "next/font/google";

/**
 * Public site typography (admin excluded via body.bp-site):
 * - Inter: default body, UI chrome, form labels
 * - Oswald: h1–h3, CTAs (bp-title)
 * - Caveat: only bp-whisper (captions/asides) and bp-story-voice (personal stories)
 */
export const homeHand = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-home-hand",
  display: "swap",
  preload: true,
});

/** Page titles (h1) */
export const bpTitle = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bp-title",
});

/** Subheadings directly under page titles */
export const bpSubtitle = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bp-subtitle",
});

export const homeHandClass = homeHand.className;
export const bpTitleClass = bpTitle.className;
export const bpSubtitleClass = bpSubtitle.className;
/** CSS utility — guarantees Caveat when paired with homeHandClass */
export const bpHandUtility = "bp-hand";
/** Wrapper for personal story copy (story pages, journal body, story cards) */
export const bpStoryVoiceUtility = "bp-story-voice";
/** Small labels, eyebrows, polaroid captions, quiet asides */
export const bpWhisperUtility = "bp-whisper";
/** CSS utility — guarantees Oswald on page titles */
export const bpTitleUtility = "bp-title";
/** CSS utility — guarantees Inter on subtitles under page titles */
export const bpSubtitleUtility = "bp-subtitle";
/** Inter body — default size (1.125rem) sitewide */
export const bpBodyUtility = "bp-body";
/** Inter small — meta, footer, captions (0.9375rem) */
export const bpBodySmUtility = "bp-body-sm";
/** Inter links — semibold + accent underline */
export const bpLinkUtility = "bp-link";
/** Inter emphasis — semibold, no underline */
export const bpEmphasisUtility = "bp-emphasis";

/** Inter body class bundle */
export const bpBodyClass = `${bpSubtitleClass} ${bpSubtitleUtility}`;
/** Inter small class bundle */
export const bpBodySmClass = `${bpSubtitleClass} ${bpBodySmUtility}`;

export const bpFontVariables = `${homeHand.variable} ${bpTitle.variable} ${bpSubtitle.variable}`;

/** @deprecated Use bpSubtitle */
export const homeSerif = bpSubtitle;
/** @deprecated Use bpSubtitleClass */
export const homeSerifClass = bpSubtitleClass;
