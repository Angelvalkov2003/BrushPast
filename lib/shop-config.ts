/**
 * Shop structure — three core collections (DB: `categories` table).
 * Products link via `product_categories` + stories.
 */

export const SHOP_COLLECTIONS = [
  {
    slug: "wear-the-story",
    name: "Wear it",
    short_description: "T-shirts and apparel featuring original artwork from our community.",
    shop_cta: "Explore apparel",
  },
  {
    slug: "drink-the-story",
    name: "Drink it",
    short_description: "Curated coffee editions and story cards — meaningful conversations.",
    shop_cta: "Discover coffee",
  },
  {
    slug: "frame-the-story",
    name: "Frame it",
    short_description: "Prints and original artwork to keep a voice on your wall.",
    shop_cta: "View prints",
  },
] as const;

/** `products.product_type` values from client brief */
export const PRODUCT_TYPES = [
  "t-shirt",
  "print",
  "coffee-edition",
  "gift-box",
  "story-card",
  "original-artwork",
  "workshop-edition",
] as const;

/** Tags for stories/products (stories use `tags` array; products via product_type + links) */
export const CONTENT_TAGS = [
  "photography",
  "writing",
  "art",
  "recovery",
  "workshops",
  "limited-editions",
  "coffee-editions",
  "community-stories",
  "anonymous",
] as const;
