import { PHOTO_SRC } from "lib/photo-placeholder";

/** Critical above-the-fold photos for home / shop hubs. */
export const HOME_CRITICAL_IMAGES = [
  PHOTO_SRC[1],
  PHOTO_SRC[2],
  PHOTO_SRC[3],
].filter(Boolean) as string[];

export const SHOP_CRITICAL_IMAGES = [
  PHOTO_SRC[5],
  PHOTO_SRC[12],
  PHOTO_SRC[14],
  PHOTO_SRC[15],
  PHOTO_SRC[16],
  PHOTO_SRC[17],
].filter(Boolean) as string[];

export const BOX_BUILDER_CRITICAL_IMAGES = [
  PHOTO_SRC[6],
  PHOTO_SRC[7],
  PHOTO_SRC[8],
  PHOTO_SRC[9],
  PHOTO_SRC[10],
  PHOTO_SRC[11],
  PHOTO_SRC[12],
].filter(Boolean) as string[];

/** Server-safe <link rel="preload"> tags for LCP photos. */
export function CriticalImagePreloads({ hrefs }: { hrefs: string[] }) {
  const unique = [...new Set(hrefs)];
  return (
    <>
      {unique.map((href) => (
        <link
          key={href}
          rel="preload"
          as="image"
          href={href}
          fetchPriority="high"
        />
      ))}
    </>
  );
}
