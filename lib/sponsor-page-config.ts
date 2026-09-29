/**
 * Public Sponsor page copy — aligned with Figma “Become a Sponsor” mockup.
 * Payment tiers live in lib/sponsor-config.ts.
 */

import { PHOTO } from "./photo-placeholder";

export const SPONSOR_PAGE = {
  hero: {
    eyebrow: "Support the Foundation",
    title: "Make creativity possible.",
    whisper: "Give someone space to create.",
    body: "Donate to Brush Past Foundation, our registered charity. Your gift supports creative workshops, mentoring and opportunities for people whose voices are too often brushed past.",
    primaryCta: "Make a donation",
    primaryHref: "#choose-your-impact",
    secondaryCta: "Other ways to give",
    secondaryHref: "/contact#contact-form",
  },
  organisations: {
    title: "One mission. Two organisations.",
    foundation: {
      name: "Brush Past Foundation",
      body: "Receives charitable donations and funds charitable work.",
    },
    cic: {
      name: "Brush Past CIC",
      body: "Makes and sells products and handles commercial partnerships.",
    },
  },
  chooseImpact: {
    eyebrow: "Choose your impact",
    title: "Make a donation",
    whisper: "Choose an amount to support the Foundation's charitable work.",
    disclaimer:
      "Your donation goes to Brush Past Foundation. No product or service is included.",
    cta: "Donate to the charity",
    note: "Payment preview only. Connect to the Foundation's donation account before publishing.",
  },
  partnership: {
    eyebrow: "For organisations",
    title: "Partner with Brush Past CIC",
    body: "Commission a workshop, T-shirts or gift boxes for your staff, stakeholders or events. This is a commercial partnership with the CIC.",
    cta: "Discuss a partnership",
    ctaHref: "/contact#contact-form",
  },
} as const;

export const SPONSOR_HERO_PHOTOS = {
  workshop: {
    alt: "Sponsor collage — workshop",
    note: "IMAGE NEEDED: Workshop / collage photo for sponsor hero.",
    photoNumber: PHOTO.sponsorHeroWorkshop,
  },
  sketchbook: {
    alt: "Sponsor collage — sketchbook",
    note: "IMAGE NEEDED: Sketchbook / dried flower still life.",
    photoNumber: PHOTO.sponsorHeroSketchbook,
  },
} as const;
