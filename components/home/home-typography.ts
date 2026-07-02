import { Caveat, Inter, Oswald } from "next/font/google";

/** Handwritten — nav, body, section headings, labels, CTAs */
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
/** CSS utility — guarantees Oswald on page titles */
export const bpTitleUtility = "bp-title";
/** CSS utility — guarantees Inter on subtitles under page titles */
export const bpSubtitleUtility = "bp-subtitle";

export const bpFontVariables = `${homeHand.variable} ${bpTitle.variable} ${bpSubtitle.variable}`;

/** @deprecated Use bpSubtitle */
export const homeSerif = bpSubtitle;
/** @deprecated Use bpSubtitleClass */
export const homeSerifClass = bpSubtitleClass;
