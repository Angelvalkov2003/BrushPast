import { sanitizeImageUrl } from "lib/image-url";
import { createServerClient } from "./server";

export type PublicStory = {
  id: string;
  slug: string | null;
  title: string | null;
  short_description: string | null;
  image_url: string | null;
  page_url: string | null;
  tags: string[] | null;
  sort_order: number;
  created_at: string;
  creator_name: string | null;
  creator_is_anonymous: boolean;
};

const STORY_SELECT = `
  id,
  slug,
  title,
  short_description,
  image_url,
  tags,
  sort_order,
  created_at,
  creators ( name, is_anonymous )
`;

const STORY_SELECT_WITH_PAGE_URL = `
  id,
  slug,
  title,
  short_description,
  image_url,
  page_url,
  tags,
  sort_order,
  created_at,
  creators ( name, is_anonymous )
`;

type StoryRow = {
  id: string;
  slug: string | null;
  title: string | null;
  short_description: string | null;
  image_url: string | null;
  page_url?: string | null;
  tags: string[] | null;
  sort_order: number;
  created_at: string;
  creators: { name: string | null; is_anonymous: boolean } | { name: string | null; is_anonymous: boolean }[] | null;
};

function defaultPageUrl(slug: string | null): string | null {
  if (!slug?.trim()) return null;
  return `/stories/${slug.trim()}`;
}

function mapStoryRow(row: StoryRow): PublicStory {
  const creator = Array.isArray(row.creators) ? row.creators[0] : row.creators;
  const slug = row.slug;
  return {
    id: row.id,
    slug,
    title: row.title,
    short_description: row.short_description,
    image_url: sanitizeImageUrl(row.image_url),
    page_url: row.page_url?.trim() || defaultPageUrl(slug),
    tags: row.tags ?? [],
    sort_order: row.sort_order,
    created_at: row.created_at,
    creator_name: creator?.name ?? null,
    creator_is_anonymous: creator?.is_anonymous ?? false,
  };
}

function isMissingPageUrlColumn(message: string | undefined): boolean {
  return !!message?.includes("page_url") && message.includes("does not exist");
}

async function fetchActiveStories(supabase: Awaited<ReturnType<typeof createServerClient>>) {
  const withUrl = await supabase
    .from("stories")
    .select(STORY_SELECT_WITH_PAGE_URL)
    .eq("status", "active")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (!withUrl.error) return withUrl.data as StoryRow[] | null;

  if (!isMissingPageUrlColumn(withUrl.error.message)) {
    console.error("getPublicStories:", withUrl.error.message);
    return null;
  }

  const fallback = await supabase
    .from("stories")
    .select(STORY_SELECT)
    .eq("status", "active")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (fallback.error) {
    console.error("getPublicStories:", fallback.error.message);
    return null;
  }
  return fallback.data as StoryRow[] | null;
}

export async function getPublicStories(): Promise<PublicStory[]> {
  const supabase = await createServerClient();
  const data = await fetchActiveStories(supabase);
  if (!data) return [];
  return data.map(mapStoryRow);
}

export async function getPublicStoryBySlug(slug: string): Promise<PublicStory | null> {
  const supabase = await createServerClient();
  const trimmed = slug.trim();

  const withUrl = await supabase
    .from("stories")
    .select(STORY_SELECT_WITH_PAGE_URL)
    .eq("slug", trimmed)
    .eq("status", "active")
    .maybeSingle();

  if (!withUrl.error && withUrl.data) {
    return mapStoryRow(withUrl.data as StoryRow);
  }

  if (withUrl.error && !isMissingPageUrlColumn(withUrl.error.message)) {
    console.error("getPublicStoryBySlug:", withUrl.error.message);
    return null;
  }

  const fallback = await supabase
    .from("stories")
    .select(STORY_SELECT)
    .eq("slug", trimmed)
    .eq("status", "active")
    .maybeSingle();

  if (fallback.error || !fallback.data) return null;
  return mapStoryRow(fallback.data as StoryRow);
}
