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
  { title: "Stories are shared", icon: "storiesAreShared" },
  { title: "Stories become collections", icon: "storiesBecomeCollections" },
  { title: "Profits create change", icon: "profitsCreateChange" },
  { title: "You keep a story close", icon: "keepAStoryClose" },
];

export const HOME_IMPACT_PILLARS: { title: string; icon: HomepageIconKey }[] = [
  { title: "Creators earn fairly", icon: "creatorsEarnFairly" },
  { title: "Workshops and skills funded", icon: "workshopsSkillsFunded" },
  { title: "Recovery organisations supported", icon: "recoveryOrganisationsSupported" },
];
