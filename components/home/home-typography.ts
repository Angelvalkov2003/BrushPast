import { Caveat, Lora } from "next/font/google";

/** Handwritten display - headlines, labels, flourishes */
export const homeHand = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-home-hand",
});

/** Warm literary body - cozy retro serif */
export const homeSerif = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-home-serif",
});

export const homeHandClass = homeHand.className;
export const homeSerifClass = homeSerif.className;
