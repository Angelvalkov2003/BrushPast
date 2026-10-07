/**
 * Public Support Us page copy (/sponsor).
 * Payment tiers live in lib/sponsor-config.ts.
 */

import {
  CHARITY_LEGAL_NAME,
  CHARITY_NUMBER,
  CIC_LEGAL_NAME,
  CIC_NUMBER,
} from "./site-config";

/**
 * Online Stripe for the charity is not wired yet — keep the donation UI disabled
 * until Brush Past Foundation has its own checkout. Contact remains open.
 */
export const DONATIONS_CHECKOUT_ENABLED = false;

export const SPONSOR_PAGE = {
  hero: {
    eyebrow: "Support Us",
    title: "Make creativity possible.",
    whisper: "Give someone space to create.",
    body: `Donate to ${CHARITY_LEGAL_NAME}, our registered charity. Your gift supports creative workshops, mentoring and opportunities for people whose voices are too often brushed past.`,
    primaryCta: "Make a donation",
    primaryHref: "#choose-your-impact",
    secondaryCta: "Other ways to give",
    secondaryHref: "/contact#contact-form",
  },
  organisations: {
    title: "One mission. Two organisations.",
    /** Single combined explanation — CIC + charity. */
    body: `${CIC_LEGAL_NAME} is the trading organisation behind the shop, products and commercial partnerships.${CIC_NUMBER ? ` Company number ${CIC_NUMBER}.` : ""} ${CHARITY_LEGAL_NAME} is the registered charity that receives donations to fund workshops and mentoring.${CHARITY_NUMBER ? ` Charity number ${CHARITY_NUMBER}.` : ""} Together they share one mission: more people creating, connecting and being heard.`,
  },
  chooseImpact: {
    eyebrow: "Choose your impact",
    title: "Make a donation",
    whisper: `Donations go to ${CHARITY_LEGAL_NAME}, our registered charity — not the CIC.`,
    disclaimer:
      "Your donation supports charitable work. No product or service is included.",
    cta: "Donate to the charity",
    disabledNote:
      "Online donations are not open yet. To support the Foundation, please get in touch — we will help you give securely.",
  },
  partnership: {
    eyebrow: "For organisations",
    title: `Partner with ${CIC_LEGAL_NAME}`,
    body: "Commission a workshop, T-shirts or gift boxes for your staff, stakeholders or events. This is a commercial partnership with the CIC.",
    cta: "Discuss a partnership",
    ctaHref: "/contact#contact-form",
  },
} as const;
