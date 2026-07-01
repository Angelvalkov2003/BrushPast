/**
 * BrushPast brand palette - public site only (not admin).
 * Use Tailwind: bg-bp-canvas, text-bp-text, bg-bp-surface, text-bp-accent, bg-bp-accent-bg, bg-bp-dark
 * Or CSS vars: var(--bp-canvas), etc.
 */

export const BRAND_COLORS = {
  /** Navbar + default page background */
  canvas: "#f3ede6",
  /** Primary text */
  text: "#010200",
  /** Secondary sections / alternate backgrounds */
  surface: "#efe7de",
  /** CTAs, links, highlights */
  accent: "#bf3201",
  /** Warm accent surfaces — cards, section washes, placeholders */
  accentBg: "#c8a67a",
  /** Footer and dark bands */
  dark: "#131312",
} as const;

export type BrandColorKey = keyof typeof BRAND_COLORS;

/** CSS custom property names (without --) */
export const BRAND_CSS_VARS = {
  canvas: "--bp-canvas",
  text: "--bp-text",
  surface: "--bp-surface",
  accent: "--bp-accent",
  accentBg: "--bp-accent-bg",
  dark: "--bp-dark",
} as const;
