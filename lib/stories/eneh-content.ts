/** Hand-coded copy for /stories/eneh - Eneh's Day in Photos */

export type EnehPhoto = {
  src: string;
  caption?: string;
};

export const ENEH_STORY = {
  slug: "eneh",
  title: "Eneh",
  headline: "Eneh's Day in Photos",
  tags: "Photography. Community. Wholesome.",
  intro:
    "Eneh took some pictures of her day and the things she likes. I hope you enjoy them and find them as wholesome as we did!",
  heroImage: "/stories/ENEH'S-DAY-IN-PHOTOS/1.jpg",
  photos: [
    {
      src: "/stories/ENEH'S-DAY-IN-PHOTOS/1.jpg",
      caption: "Zalbeth is funny. Zal Zal is my sister.",
    },
    {
      src: "/stories/ENEH'S-DAY-IN-PHOTOS/2.jpg",
      caption: "The leaves fall off the tree when it's very windy.",
    },
    {
      src: "/stories/ENEH'S-DAY-IN-PHOTOS/3.jpg",
      caption: "All the leaves fall off the tree when it's so cold.",
    },
    { src: "/stories/ENEH'S-DAY-IN-PHOTOS/4.jpg" },
    { src: "/stories/ENEH'S-DAY-IN-PHOTOS/5.avif" },
  ] satisfies EnehPhoto[],
  closingQuote: "I hope you enjoy them and find them as wholesome as we did!",
} as const;
