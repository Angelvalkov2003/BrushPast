export function buildJournalImageList(
  hero: string | null | undefined,
  gallery: string[],
): string[] {
  const images: string[] = [];
  if (hero) images.push(hero);
  for (const url of gallery) {
    if (!images.includes(url)) images.push(url);
  }
  return images;
}
