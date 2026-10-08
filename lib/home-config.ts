/** Homepage copy + fallbacks when categories missing in DB */

import type { HomepageIconKey } from "components/icons/brush-past-icons";
import { SHOP_COLLECTIONS } from "lib/shop-config";

export const HOME_SHOP_WAYS = SHOP_COLLECTIONS.map((c, i) => ({
  slug: c.slug,
  title: c.name,
  description: c.short_description,
  cta: c.shop_cta,
  image: i === 0 ? "/home-hero.png" : (null as string | null),
}));

export const HOME_HOW_IT_WORKS: { title: string; icon: HomepageIconKey }[] = [
  { title: "People create", icon: "storiesAreShared" },
  { title: "We support their ideas", icon: "storiesBecomeCollections" },
  { title: "Their work reaches you", icon: "keepAStoryClose" },
  { title: "Profits go back", icon: "profitsCreateChange" },
];

export const HOME_IMPACT_PILLARS: { title: string; icon: HomepageIconKey }[] = [
  { title: "Creators earn fairly", icon: "creatorsEarnFairly" },
  { title: "Workshops and skills funded", icon: "workshopsSkillsFunded" },
  {
    title: "Recovery organisations supported",
    icon: "recoveryOrganisationsSupported",
  },
];

/**
 * Homepage hero collage (снимка 1).
 * Polaroid details are baked into the artwork — render frameless in layout.
 */
export const HOME_HERO_COLLAGE = {
  ready: true,
  alt: "Brush Past collage — stories, makers and gifts",
  desktop: {
    src: "/homepage-main.jpg",
    width: 1400,
    height: 1750,
  },
  mobile: {
    src: "/homepage-main.jpg",
    width: 1200,
    height: 1500,
  },
} as const;
