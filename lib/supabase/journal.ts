import { displayImageUrl, sanitizeImageUrl } from "lib/image-url";
import { createServerClient } from "./server";

export type PublicJournalPost = {
  id: string;
  slug: string | null;
  title: string | null;
  description: string | null;
  main_image_url: string | null;
  body: string | null;
  sort_order: number;
  created_at: string;
  images: { id: string; image_url: string | null; sort_order: number }[];
};

type JournalRow = {
  id: string;
  slug: string | null;
  title: string | null;
  description: string | null;
  main_image_url: string | null;
  body: string | null;
  sort_order: number;
  created_at: string;
  journal_post_images?: { id: string; image_url: string | null; sort_order: number }[];
};

const POST_SELECT = `
  id,
  slug,
  title,
  description,
  main_image_url,
  body,
  sort_order,
  created_at,
  journal_post_images ( id, image_url, sort_order )
`;

function mapJournalRow(row: JournalRow): PublicJournalPost {
  const images = (row.journal_post_images ?? [])
    .slice()
    .sort((a, b) => b.sort_order - a.sort_order);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    main_image_url: sanitizeImageUrl(row.main_image_url),
    body: row.body,
    sort_order: row.sort_order,
    created_at: row.created_at,
    images: images.map((img) => ({
      id: img.id,
      image_url: sanitizeImageUrl(img.image_url),
      sort_order: img.sort_order,
    })),
  };
}

export async function getPublicJournalPosts(): Promise<PublicJournalPost[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("journal_posts")
    .select(POST_SELECT)
    .eq("status", "active")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPublicJournalPosts:", error.message);
    return [];
  }

  return ((data ?? []) as JournalRow[]).map(mapJournalRow);
}

export async function getPublicJournalPostBySlug(slug: string): Promise<PublicJournalPost | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("journal_posts")
    .select(POST_SELECT)
    .eq("slug", slug.trim())
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("getPublicJournalPostBySlug:", error.message);
    return null;
  }

  return mapJournalRow(data as JournalRow);
}

export function journalPostHref(slug: string | null): string | null {
  if (!slug?.trim()) return null;
  return `/journal/${slug.trim()}`;
}

export function formatJournalDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function journalBodyParagraphs(body: string | null): string[] {
  if (!body?.trim()) return [];
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function journalGalleryUrls(post: PublicJournalPost): string[] {
  return post.images
    .map((img) => displayImageUrl(img.image_url))
    .filter((url): url is string => Boolean(url));
}
