import { displayImageUrl } from "lib/image-url";
import { storyCardImageUrl, storyHref, storyQuote } from "lib/story-display";
import { workshopHref } from "lib/workshop-display";
import type { PublicStory } from "lib/supabase/stories";

export function organisationHref(org: {
  page_url?: string | null;
  external_url?: string | null;
  slug?: string | null;
}): string | null {
  const page = org.page_url?.trim();
  if (page) return page.startsWith("/") ? page : `/${page}`;
  const external = org.external_url?.trim();
  if (external) return external;
  if (org.slug?.trim()) return `/organisations/${org.slug.trim()}`;
  return null;
}

export function organisationLinkExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function mapStoryRowToLink(row: {
  title: string | null;
  slug: string | null;
  page_url: string | null;
  image_url: string | null;
  short_description: string | null;
  is_anonymous?: boolean | null;
}) {
  const slug = row.slug?.trim() || "";
  const story: PublicStory = {
    id: slug,
    slug: row.slug,
    title: row.title,
    short_description: row.short_description,
    image_url: row.image_url,
    page_url: row.page_url,
    tags: null,
    sort_order: 0,
    created_at: "",
    creator_name: row.title,
    creator_is_anonymous: row.is_anonymous ?? false,
  };
  const pageUrl = storyHref(story);
  if (!pageUrl) return null;

  return {
    title: row.title || slug || "Story",
    slug,
    pageUrl,
    imageUrl: storyCardImageUrl(story) ?? null,
    quote: storyQuote(story) || null,
  };
}

export function mapWorkshopRowToLink(row: {
  title: string | null;
  slug: string | null;
  page_url: string | null;
  image_url: string | null;
  location_label: string | null;
}) {
  const pageUrl = workshopHref({ page_url: row.page_url });
  if (!pageUrl) return null;

  return {
    title: row.title || row.slug || "Workshop",
    slug: row.slug,
    pageUrl,
    imageUrl: displayImageUrl(row.image_url) ?? null,
    locationLabel: row.location_label?.trim() || null,
  };
}

export function mapOrganisationRowToLink(row: {
  name: string | null;
  slug: string | null;
  page_url: string | null;
  external_url: string | null;
  image_url: string | null;
  short_description: string | null;
}) {
  const href = organisationHref(row);
  if (!href) return null;

  return {
    name: row.name || row.slug || "Organisation",
    slug: row.slug,
    href,
    imageUrl: displayImageUrl(row.image_url) ?? null,
    shortDescription: row.short_description?.trim() || null,
    external: organisationLinkExternal(href),
  };
}
