/**
 * Public Sponsor page copy — aligned with Figma “Become a Sponsor” mockup.
 * Payment tiers live in lib/sponsor-config.ts.
 */

import { PHOTO } from "./photo-placeholder";

export const SPONSOR_PAGE = {
  hero: {
    eyebrow: "Support Brush Past",
    title: "Become a Sponsor.",
    whisper: "Help creativity reach further.",
    body: "Your support funds artists, workshops and the next chapter of community storytelling. Every contribution helps creativity reach further.",
    primaryCta: "Become a sponsor",
    primaryHref: "#choose-your-impact",
    secondaryCta: "Other ways to give",
    secondaryHref: "/contact#contact-form",
  },
  values: [
    {
      title: "Direct Impact",
      note: "Funding that reaches projects and people.",
      icon: "heart" as const,
    },
    {
      title: "Sustainable Creative Ecosystem",
      note: "Support that keeps creativity cycling.",
      icon: "leaf" as const,
    },
    {
      title: "Community & Connection",
      note: "Workshops, events and shared spaces.",
      icon: "people" as const,
    },
    {
      title: "Transparency",
      note: "Regular updates on where support goes.",
      icon: "sparkle" as const,
    },
    {
      title: "Meaningful Change",
      note: "Stories and opportunities that last.",
      icon: "gift" as const,
    },
  ],
  whereSupportGoes: {
    title: "Where Your Support Goes",
    items: [
      {
        title: "Artist Projects",
        note: "Materials, mentoring and time to make new work.",
        imageNote: "IMAGE NEEDED: Artist working in studio.",
        photoNumber: PHOTO.sponsorArtistProjects,
      },
      {
        title: "Workshops & Education",
        note: "Safe creative spaces for people rebuilding identity.",
        imageNote: "IMAGE NEEDED: Workshop session.",
        photoNumber: PHOTO.sponsorWorkshopsEducation,
      },
      {
        title: "Exhibitions & Events",
        note: "Public moments where stories meet community.",
        imageNote: "IMAGE NEEDED: Exhibition or mural.",
        photoNumber: PHOTO.sponsorExhibitionsEvents,
      },
      {
        title: "Studio & Resources",
        note: "Tools, space and support for making.",
        imageNote: "IMAGE NEEDED: Studio resources / blueprints.",
        photoNumber: PHOTO.sponsorStudioResources,
      },
      {
        title: "Community Initiatives",
        note: "Partnerships that open new doors.",
        imageNote: "IMAGE NEEDED: Community gathering.",
        photoNumber: PHOTO.sponsorCommunityInitiatives,
      },
    ],
  },
  chooseImpact: {
    eyebrow: "Choose your impact",
    title: "Choose your impact",
    whisper: "Every amount funds workshops, artists and the next story.",
  },
  testimonial: {
    eyebrow: "Real stories. Real impact.",
    quote:
      "Thanks to our sponsors, I had the time, materials and space to finally create the work I've been dreaming about.",
    attribution: "— Brush Past Artist",
    imageNote: "IMAGE NEEDED: Artwork / sketchbook still life.",
    photoNumber: PHOTO.sponsorTestimonial,
  },
  cycle: {
    title: "The Cycle of Creativity",
    intro:
      "Sponsorship keeps a living loop of making, sharing and reinvesting — so the next story can begin.",
    steps: [
      {
        title: "Create",
        note: "Ideas are born in community.",
        icon: "create" as const,
      },
      {
        title: "Produce",
        note: "Working with artists to bring ideas to life.",
        icon: "produce" as const,
      },
      {
        title: "Share",
        note: "Gifts and exhibitions that inspire.",
        icon: "share" as const,
      },
      {
        title: "Reinvest",
        note: "Support returns to creators and programmes.",
        icon: "reinvest" as const,
      },
    ],
  },
  closing: {
    title: "Be part of something creative.",
    thankYou: "Thank you.",
    cta: "Become a sponsor",
    ctaHref: "#choose-your-impact",
    note: "Art of empowerment.",
    imageNote: "IMAGE NEEDED: Hand holding Brush Past mug.",
    photoNumber: PHOTO.sponsorClosingMug,
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
