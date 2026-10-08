/** Numbered placeholder copy for Polaroid / framed photo slots. */
export function formatPhotoPlaceholderLabel(number: number): string {
  return `снимка ${number}`;
}

/**
 * Public URLs for numbered site photos in /public/mainphotos (and a few shop assets).
 * Missing numbers stay placeholders until assets are added.
 */
export const PHOTO_SRC: Partial<Record<number, string>> = {
  1: "/homepage-main.jpg",
  2: "/homepage2.png",
  3: "/mainphotos/3.jpg",
  4: "/mainphotos/photo1.png",
  5: "/mainphotos/5.jpg",
  /** Coffee gift box with question-mark window (shop one-piece coffee). */
  6: "/shop1.png",
  7: "/mainphotos/7.jpg",
  8: "/mainphotos/8.jpg",
  9: "/mainphotos/9.jpg",
  10: "/mainphotos/10.jpg",
  11: "/mainphotos/11.jpg",
  12: "/mainphotos/12.png",
  13: "/mainphotos/13.png",
  18: "/mainphotos/18.webp",
  19: "/mainphotos/19.jpg",
  20: "/mainphotos/20.jpg",
  23: "/mainphotos/23.jpg",
  24: "/mainphotos/35.jpg",
  25: "/mainphotos/25.jpg",
  26: "/mainphotos/26.jpg",
  27: "/mainphotos/27.jpg",
  28: "/mainphotos/28.jpg",
  29: "/mainphotos/29.jpg",
  31: "/mainphotos/31.jpg",
  32: "/mainphotos/32.jpg",
  34: "/mainphotos/34.jpg",
  35: "/mainphotos/35.jpg",
  37: "/mainphotos/31.jpg",
  38: "/mainphotos/32.jpg",
  /** One-piece hub — coffee box with question mark. */
  39: "/shop1.png",
  40: "/mainphotos/34.jpg",
  41: "/mainphotos/41.jpeg",
  42: "/workshops/workshop-no-1/hero.jpg",
  43: "/mainphotos/43.jpg",
};

export function photoSrcForNumber(number: number): string | undefined {
  return PHOTO_SRC[number];
}

/** Stable site-wide photo reference numbers (for placeholders and asset naming). */
export const PHOTO = {
  homeHero: 1,
  shopGiftHero: 2,
  homeGiftTeaserOpenBox: 3,
  homeGiftTeaserFlatLay: 4,
  shopImpact: 5,
  shopSingleCoffee: 6,
  shopSingleTshirt: 7,
  shopSinglePrint: 8,
  shopPairCoffeePrint: 9,
  shopPairCoffeeTshirt: 10,
  shopPairTshirtPrint: 11,
  shopNextChapter: 12,
  shopBuildOwn: 13,
  shopMobileSingle: 14,
  shopMobilePairings: 15,
  shopMobileNextChapter: 16,
  shopMobileBuildOwn: 17,
  shopStoryMeetArtist: 18,
  shopStoryBehindScenes: 19,
  shopStoryWorkshops: 20,
  shopStoryJournal: 21,
  shopStoryExhibitions: 22,
  aboutWorkshopMoments: 23,
  aboutFoundersPath: 43,
  /** Middle About section — “Two paths” card */
  aboutTwoPaths: 32,
  contactPeckham: 24,
  contactJoinWorkshop: 25,
  contactCollaborate: 26,
  contactSupportWork: 27,
  sponsorHeroWorkshop: 28,
  sponsorHeroSketchbook: 29,
  boxHubNextChapter: 37,
  boxHubPairings: 38,
  boxHubSingle: 39,
  boxHubBuildOwn: 40,
  pastWorkshopCottonGardens: 41,
  pastWorkshopEdwardAlsop: 42,
  workshopsHero: 20,
} as const;
