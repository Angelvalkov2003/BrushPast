const STORIES_PREFIX = "/stories/";

/** Pull slug from stored path or full URL, e.g. jamie */
export function extractCreatorStorySlug(profileUrl: string | null | undefined): string {
  if (!profileUrl?.trim()) return "";

  const raw = profileUrl.trim().replace(/\/+$/, "");

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      const pathname = new URL(raw).pathname;
      if (pathname.startsWith(STORIES_PREFIX)) {
        return pathname.slice(STORIES_PREFIX.length);
      }
      return pathname.replace(/^\//, "");
    } catch {
      return raw;
    }
  }

  if (raw.startsWith(STORIES_PREFIX)) {
    return raw.slice(STORIES_PREFIX.length);
  }

  return raw.replace(/^\//, "");
}

/** Store canonical path: /stories/{slug} */
export function normalizeCreatorProfileUrl(slugOrUrl: string | undefined): string | undefined {
  if (!slugOrUrl?.trim()) return undefined;

  const slug = extractCreatorStorySlug(slugOrUrl)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");

  if (!slug) return undefined;

  return `${STORIES_PREFIX}${slug}`;
}

/** Full public URL for display or external links */
export function creatorProfileAbsoluteUrl(
  profileUrl: string | null | undefined,
  siteUrl: string,
): string | null {
  const path = normalizeCreatorProfileUrl(profileUrl ?? undefined);
  if (!path) return null;
  return `${siteUrl.replace(/\/$/, "")}${path}`;
}
