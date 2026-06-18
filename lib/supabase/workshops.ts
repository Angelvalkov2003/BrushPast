import { sanitizeImageUrl } from "lib/image-url";
import { createServerClient } from "./server";

export type PublicWorkshop = {
  id: string;
  slug: string | null;
  title: string | null;
  short_description: string | null;
  image_url: string | null;
  location_label: string | null;
  workshop_category: string | null;
  page_url: string | null;
  sort_order: number;
  created_at: string;
};

const WORKSHOP_SELECT = `
  id,
  slug,
  title,
  short_description,
  image_url,
  location_label,
  workshop_category,
  page_url,
  sort_order,
  created_at
`;

type WorkshopRow = {
  id: string;
  slug: string | null;
  title: string | null;
  short_description: string | null;
  image_url: string | null;
  location_label: string | null;
  workshop_category: string | null;
  page_url: string | null;
  sort_order: number;
  created_at: string;
};

function defaultPageUrl(slug: string | null): string | null {
  if (!slug?.trim()) return null;
  return `/workshops/${slug.trim()}`;
}

function mapWorkshopRow(row: WorkshopRow): PublicWorkshop {
  const slug = row.slug;
  return {
    id: row.id,
    slug,
    title: row.title,
    short_description: row.short_description,
    image_url: sanitizeImageUrl(row.image_url),
    location_label: row.location_label,
    workshop_category: row.workshop_category,
    page_url: row.page_url?.trim() || defaultPageUrl(slug),
    sort_order: row.sort_order,
    created_at: row.created_at,
  };
}

export async function getPublicWorkshops(): Promise<PublicWorkshop[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("workshops")
    .select(WORKSHOP_SELECT)
    .eq("status", "active")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPublicWorkshops:", error.message);
    return [];
  }

  return (data as WorkshopRow[]).map(mapWorkshopRow);
}

export async function getPublicWorkshopBySlug(slug: string): Promise<PublicWorkshop | null> {
  const supabase = await createServerClient();
  const trimmed = slug.trim();

  const { data, error } = await supabase
    .from("workshops")
    .select(WORKSHOP_SELECT)
    .eq("slug", trimmed)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) return null;
  return mapWorkshopRow(data as WorkshopRow);
}
