/** Numbered placeholder copy for Polaroid / framed photo slots. */
export function formatPhotoPlaceholderLabel(number: number): string {
  return `снимка ${number}`;
}

/**
 * Public URLs for numbered site photos in /public/mainphotos.
 * Missing numbers stay placeholders until assets are added.
 * Position 2 reuses the high-quality снимка 12 artwork.
 */
export const PHOTO_SRC: Partial<Record<number, string>> = {
  1: "/mainphotos/1i2.png",
  2: "/mainphotos/12.png",
  3: "/mainphotos/3.jpg",
  5: "/mainphotos/5.jpg",
  6: "/mainphotos/6.jpg",
  7: "/mainphotos/7.jpg",
  8: "/mainphotos/8.jpg",
  9: "/mainphotos/9.jpg",
  10: "/mainphotos/10.jpg",
  11: "/mainphotos/11.jpg",
  12: "/mainphotos/12.png",
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
  contactPeckham: 24,
  contactJoinWorkshop: 25,
  contactCollaborate: 26,
  contactSupportWork: 27,
  sponsorHeroWorkshop: 28,
  sponsorHeroSketchbook: 29,
  sponsorArtistProjects: 30,
  sponsorWorkshopsEducation: 31,
  sponsorExhibitionsEvents: 32,
  sponsorStudioResources: 33,
  sponsorCommunityInitiatives: 34,
  sponsorTestimonial: 35,
  sponsorClosingMug: 36,
  boxHubNextChapter: 37,
  boxHubPairings: 38,
  boxHubSingle: 39,
  boxHubBuildOwn: 40,
} as const;
