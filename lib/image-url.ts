/**
 * Image URLs safe for next/image and <img>.
 * Rejects seed placeholders like (product-name.jpg) and bare filenames.
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url?.trim()) return false;
  const u = url.trim();

  if (u.startsWith("(") && u.endsWith(")")) return false;

  if (u.startsWith("https://") || u.startsWith("http://")) {
    try {
      new URL(u);
      return true;
    } catch {
      return false;
    }
  }

  return u.startsWith("/") && !u.startsWith("//");
}

export function sanitizeImageUrl(url: string | null | undefined): string | null {
  if (!isValidImageUrl(url)) return null;
  return url!.trim();
}

/** For next/image src — undefined when not displayable */
export function displayImageUrl(url: string | null | undefined): string | undefined {
  return sanitizeImageUrl(url) ?? undefined;
}
