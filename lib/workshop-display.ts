import type { PublicWorkshop } from "lib/supabase/workshops";
import { WORKSHOP_NO_1 } from "lib/workshops/workshop-no-1-content";

const WORKSHOP_DESCRIPTION_FALLBACKS: Record<string, string> = {
  [WORKSHOP_NO_1.slug]: WORKSHOP_NO_1.tagline,
};

export function workshopHref(
  workshop: Pick<PublicWorkshop, "page_url">,
): string | null {
  const custom = workshop.page_url?.trim();
  return custom || null;
}

export function hasWorkshopPage(workshop: Pick<PublicWorkshop, "page_url">): boolean {
  return !!workshop.page_url?.trim();
}

export function workshopListDescription(
  workshop: Pick<PublicWorkshop, "slug" | "short_description">,
): string | null {
  const desc = workshop.short_description?.trim();
  if (desc) return desc;

  const slug = workshop.slug?.trim();
  if (slug && WORKSHOP_DESCRIPTION_FALLBACKS[slug]) {
    return WORKSHOP_DESCRIPTION_FALLBACKS[slug]!;
  }

  return null;
}
