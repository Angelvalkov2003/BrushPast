/** Homepage copy + fallbacks when categories missing in DB */

import { SHOP_COLLECTIONS } from "lib/shop-config";

const HOME_SHOP_SLUGS = ["wear-the-story", "drink-the-story", "frame-the-story"] as const;

export const HOME_SHOP_WAYS = SHOP_COLLECTIONS.filter((c) =>
  (HOME_SHOP_SLUGS as readonly string[]).includes(c.slug),
).map((c, i) => ({
  slug: c.slug,
  title: c.name,
  description: c.short_description,
  cta: c.shop_cta,
  image: i === 0 ? "/home-hero.png" : (null as string | null),
}));

export const HOME_HOW_IT_WORKS = [
  { title: "Stories are shared", icon: "chat" as const },
  { title: "Stories become collections", icon: "pencil" as const },
  { title: "Profits create change", icon: "heart" as const },
  { title: "You keep a story close", icon: "gift" as const },
];

export const HOME_IMPACT_PILLARS = [
  { title: "Creators earn fairly", icon: "users" as const },
  { title: "Workshops and skills funded", icon: "building" as const },
  { title: "Recovery organisations supported", icon: "hand-heart" as const },
];
