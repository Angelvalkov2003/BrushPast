import type { PublicWorkshop } from "lib/supabase/workshops";

export function workshopHref(
  workshop: Pick<PublicWorkshop, "page_url">,
): string | null {
  const custom = workshop.page_url?.trim();
  return custom || null;
}

export function hasWorkshopPage(workshop: Pick<PublicWorkshop, "page_url">): boolean {
  return !!workshop.page_url?.trim();
}
